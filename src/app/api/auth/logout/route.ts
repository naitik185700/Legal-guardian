import { NextResponse } from 'next/server';
import { clearAdminSessionCookie, getAdminSession } from '@/lib/auth/jwt';
import { dbStore } from '@/lib/db/store';

export async function POST() {
  const session = await getAdminSession();
  if (session) {
    dbStore.logAction('ADMIN_LOGOUT', 'Auth', `Admin ${session.email} logged out`);
  }
  await clearAdminSessionCookie();
  return NextResponse.json({ success: true, message: 'Logged out successfully' });
}
