import { NextRequest, NextResponse } from 'next/server';
import { consultationSchema } from '@/lib/validations/consultation';
import { createConsultation } from '@/lib/services/consultationService';
import { sendTransactionalEmail } from '@/lib/email/emailService';

const ipRequestMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequestMap.get(ip);
  if (!entry || entry.expiresAt < now) {
    ipRequestMap.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 5) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many consultation requests. Please try again later or call our chambers directly.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parseResult = consultationSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const result = await createConsultation(parseResult.data, ip);

    // Send confirmation email
    await sendTransactionalEmail({
      to: parseResult.data.email,
      subject: `Consultation Request Received [Ref: ${result.referenceNumber}] — Guardian Legal Solutions`,
      text: `Dear ${parseResult.data.fullName},\n\nWe have received your consultation booking request for ${parseResult.data.preferredDate} (${parseResult.data.preferredTimeSlot}).\n\nReference: ${result.referenceNumber}\nStatus: PENDING REGISTRAR CONFIRMATION\n\nOur intake office is currently completing conflict checks and will send you a formal calendar invite with conference access details.\n\nGuardian Legal Solutions`,
      html: `<div style="font-family: Georgia, serif; color: #171717; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E7E1D7;">
        <h2 style="color: #171717; border-bottom: 2px solid #B59A62; padding-bottom: 12px;">Guardian Legal Solutions</h2>
        <p>Dear <strong>${parseResult.data.fullName}</strong>,</p>
        <p>We confirm that your consultation request has been logged successfully.</p>
        <div style="background-color: #F8F6F1; padding: 14px 18px; border-left: 4px solid #B59A62; margin: 16px 0; font-size: 14px;">
          <p style="margin: 4px 0;"><strong>Reference ID:</strong> ${result.referenceNumber}</p>
          <p style="margin: 4px 0;"><strong>Requested Date:</strong> ${parseResult.data.preferredDate}</p>
          <p style="margin: 4px 0;"><strong>Requested Slot:</strong> ${parseResult.data.preferredTimeSlot}</p>
          <p style="margin: 4px 0;"><strong>Status:</strong> Under Review (Subject to Conflict Clearance)</p>
        </div>
        <p>A registrar coordinator will reach out to you within 24 business hours with formal confirmation and conference credentials.</p>
      </div>`,
    });

    return NextResponse.json({
      success: true,
      referenceNumber: result.referenceNumber,
      message: 'Your consultation request has been submitted for registrar review and conflict clearance.',
    });
  } catch (error) {
    console.error('Consultation API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while logging your consultation request.' },
      { status: 500 }
    );
  }
}
