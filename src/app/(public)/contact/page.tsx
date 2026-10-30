import React from 'react';
import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Scale, AlertCircle } from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

export const metadata: Metadata = {
  title: 'Contact Chambers & Practice Intake | Guardian Legal Solutions',
  description:
    'Contact the legal chambers of Guardian Legal Solutions. Official address, direct telephone lines, email enquiry, and verified intake coordination.',
};

export default function ContactPage() {
  return (
    <div className="bg-[#F8F6F1]">
      {/* Header Banner */}
      <section className="bg-legal-charcoal text-white py-16 sm:py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-legal-gold">
            <span>Chambers Intake & Communications</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
            Connect With Our Legal Chambers
          </h1>
          <p className="text-base sm:text-lg text-[#C8C2B8] max-w-3xl leading-relaxed font-light">
            Whether addressing urgent commercial disputes, contractual diligence, or seeking strategic
            litigation defense, our counsel is available through structured enquiry channels.
          </p>
        </div>
      </section>

      {/* Main Grid: Form on Left, Verified Chambers Info on Right */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 7 Cols: The Interactive Form */}
            <div className="lg:col-span-7">
              <EnquiryForm />
            </div>

            {/* Right 5 Cols: Chambers Information & Practice Details */}
            <div className="lg:col-span-5 space-y-8">
              {/* Chambers Card */}
              <div className="bg-white border border-legal-border p-8 rounded-sm shadow-subtle space-y-6">
                <h3 className="text-xl font-serif text-legal-charcoal border-b border-legal-border pb-4">
                  Chambers Address & Contact
                </h3>

                <div className="space-y-4 text-xs text-legal-body">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-legal-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-legal-charcoal text-sm">Chambers Location</p>
                      <p className="mt-1 text-legal-muted leading-relaxed">
                        {FIRM_CONFIG.contact.address.line1}
                        {FIRM_CONFIG.contact.address.line2 ? (
                          <>
                            <br />
                            {FIRM_CONFIG.contact.address.line2}
                          </>
                        ) : null}
                        <br />
                        {FIRM_CONFIG.contact.address.city}, {FIRM_CONFIG.contact.address.state} —{' '}
                        {FIRM_CONFIG.contact.address.postalCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-legal-border/60">
                    <Phone className="w-5 h-5 text-legal-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-legal-charcoal text-sm">Telephone Direct</p>
                      <a
                        href={`tel:${FIRM_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                        className="mt-1 block font-mono text-legal-gold hover:underline text-sm"
                      >
                        {FIRM_CONFIG.contact.phoneFormatted}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-legal-border/60">
                    <Mail className="w-5 h-5 text-legal-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-legal-charcoal text-sm">Chambers Registry Email</p>
                      <a
                        href={`mailto:${FIRM_CONFIG.contact.email}`}
                        className="mt-1 block text-legal-gold hover:underline"
                      >
                        {FIRM_CONFIG.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-legal-border/60">
                    <Clock className="w-5 h-5 text-legal-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-legal-charcoal text-sm">Registry Working Hours</p>
                      <p className="mt-1 text-legal-muted">
                        {FIRM_CONFIG.contact.hours.days}: {FIRM_CONFIG.contact.hours.time}
                        <br />
                        Timezone: {FIRM_CONFIG.contact.hours.timezone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Notice Card */}
              <div className="bg-[#FCFBF9] border border-legal-border p-6 rounded-sm text-xs text-legal-muted space-y-3">
                <div className="flex items-center gap-2 text-legal-charcoal font-semibold">
                  <ShieldCheck className="w-4 h-4 text-legal-gold" />
                  <span>Confidentiality & No Privilege Notice</span>
                </div>
                <p className="leading-relaxed">
                  Receipt of enquiries is subject to preliminary conflict of interest review. Please note
                  that sending unrequested proprietary documents or confidential corporate trade secrets does
                  not establish privilege until formal terms of engagement have been executed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
