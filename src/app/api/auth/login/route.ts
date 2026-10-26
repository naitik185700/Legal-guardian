import { NextRequest, NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validations/auth';
import { dbStore } from '@/lib/db/store';
import { verifyPassword, createSessionToken, setAdminSessionCookie } from '@/lib/auth/jwt';

// Login rate limiting (max 5 failed attempts per 15 minutes)
const loginAttempts = new Map<string, { attempts: number; blockedUntil: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const record = loginAttempts.get(ip);
    const now = Date.now();

    if (record && record.blockedUntil > now) {
      const waitSeconds = Math.ceil((record.blockedUntil - now) / 1000);
      return NextResponse.json(
        { error: `Too many failed attempts. Account locked temporarily for ${waitSeconds} seconds.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parseResult = loginSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Please enter a valid email and password' },
        { status: 400 }
      );
    }

    const { email, password } = parseResult.data;
    const users = dbStore.getAdminUsers();
    const admin = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.isActive);

    if (!admin) {
      // Record failed attempt
      const curr = record && record.blockedUntil < now ? 1 : (record?.attempts || 0) + 1;
      const blockedUntil = curr >= 5 ? now + 15 * 60 * 1000 : 0;
      loginAttempts.set(ip, { attempts: curr, blockedUntil });

      return NextResponse.json(
        { error: 'Invalid administrator credentials' },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, admin.passwordHash);
    if (!isValid) {
      const curr = record && record.blockedUntil < now ? 1 : (record?.attempts || 0) + 1;
      const blockedUntil = curr >= 5 ? now + 15 * 60 * 1000 : 0;
      loginAttempts.set(ip, { attempts: curr, blockedUntil });

      return NextResponse.json(
        { error: 'Invalid administrator credentials' },
        { status: 401 }
      );
    }

    // Reset failed attempts on success
    loginAttempts.delete(ip);

    const token = await createSessionToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    await setAdminSessionCookie(token);

    dbStore.logAction('ADMIN_LOGIN', 'Auth', `Admin ${admin.email} logged in successfully`);

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication service encountered an error' }, { status: 500 });
  }
}
