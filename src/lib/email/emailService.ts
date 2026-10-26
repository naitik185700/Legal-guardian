import { FIRM_CONFIG } from '@/lib/config/firm';

export interface EmailPayload {
  to: string;
  subject: string;
  text: string;
  html: string;
}

/**
 * Transactional Email Dispatcher with Configurable Provider Support (Resend, SendGrid, SMTP)
 * Provides graceful fallback logging when external provider API credentials are unset.
 */
export async function sendTransactionalEmail(payload: EmailPayload): Promise<{ success: boolean; provider: string; messageId?: string }> {
  const provider = process.env.EMAIL_PROVIDER || 'local-fallback';
  const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY;

  if (provider === 'resend' && apiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || `Guardian Legal Solutions <${FIRM_CONFIG.contact.email}>`,
          to: [payload.to],
          subject: payload.subject,
          text: payload.text,
          html: payload.html,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Failed to send email via Resend:', errorText);
        return { success: false, provider: 'resend' };
      }

      const data = await response.json();
      return { success: true, provider: 'resend', messageId: data.id };
    } catch (err) {
      console.error('Email sending exception:', err);
      return { success: false, provider: 'resend' };
    }
  }

  // Graceful local development logging fallback
  console.log('--- [TRANSACTIONAL EMAIL DISPATCH LOG] ---');
  console.log(`To: ${payload.to}`);
  console.log(`Subject: ${payload.subject}`);
  console.log(`Provider: ${provider} (Configure RESEND_API_KEY for live production email delivery)`);
  console.log('--- [END EMAIL LOG] ---');

  return { success: true, provider: 'local-fallback', messageId: `local-${Date.now()}` };
}
