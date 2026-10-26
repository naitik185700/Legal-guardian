import { NextRequest, NextResponse } from 'next/server';
import { enquirySchema } from '@/lib/validations/enquiry';
import { createEnquiry } from '@/lib/services/enquiryService';
import { sendTransactionalEmail } from '@/lib/email/emailService';
import { FIRM_CONFIG } from '@/lib/config/firm';

// Basic in-memory rate limiter per IP (max 5 requests per 10 minutes)
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
        { error: 'Too many submissions. Please wait a few minutes before submitting another enquiry.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parseResult = enquirySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const result = await createEnquiry(parseResult.data, ip);

    // Send confirmation email
    await sendTransactionalEmail({
      to: parseResult.data.email,
      subject: `Enquiry Acknowledgment [Ref: ${result.referenceNumber}] — Guardian Legal Solutions`,
      text: `Dear ${parseResult.data.fullName},\n\nThank you for reaching out to Guardian Legal Solutions. We have received your preliminary enquiry under Reference No. ${result.referenceNumber}.\n\nOur legal intake team will review your enquiry, perform necessary conflict checks, and contact you via your preferred method (${parseResult.data.preferredContactMethod}).\n\nPlease note: This acknowledgment does not create an advocate-client relationship.\n\nSincerely,\nChambers Intake Office\nGuardian Legal Solutions`,
      html: `<div style="font-family: Georgia, serif; color: #171717; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E7E1D7;">
        <h2 style="color: #171717; border-bottom: 2px solid #B59A62; padding-bottom: 12px;">Guardian Legal Solutions</h2>
        <p>Dear <strong>${parseResult.data.fullName}</strong>,</p>
        <p>We confirm receipt of your enquiry registered under Reference Number:</p>
        <div style="background-color: #F8F6F1; padding: 12px 16px; border-left: 4px solid #B59A62; font-family: monospace; font-size: 16px; margin: 16px 0;">
          <strong>${result.referenceNumber}</strong>
        </div>
        <p>Our intake counsel will review your matter details, conduct mandatory conflict checks, and connect with you shortly.</p>
        <p style="font-size: 12px; color: #777; margin-top: 24px; border-top: 1px solid #E7E1D7; padding-top: 12px;">
          <em>Notice: This communication is an acknowledgment only and does not establish an advocate-client relationship. All preliminary matters are governed by strict ethical confidentiality.</em>
        </p>
      </div>`,
    });

    return NextResponse.json({
      success: true,
      referenceNumber: result.referenceNumber,
      message: 'Your enquiry has been received by our chambers. A formal confirmation has been sent to your email.',
    });
  } catch (error) {
    console.error('Enquiry API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your enquiry. Please contact chambers directly.' },
      { status: 500 }
    );
  }
}
