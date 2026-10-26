import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { FIRM_CONFIG } from '@/lib/config/firm';
import { ShieldCheck, CalendarCheck, FileText, Clock, Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Request a Legal Consultation | Guardian Legal Solutions',
  description:
    'Book a structured legal consultation with counsel at Guardian Legal Solutions. Conflict checks, document review, and strategic advisory conferences.',
};

export default function ConsultationPage() {
  return (
    <div className="bg-[#F8F6F1]">
      {/* Consultation Header Banner */}
      <section className="bg-legal-charcoal text-white py-16 sm:py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-legal-gold">
            <span>Intake & Appointments</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
            Schedule a Confidential Legal Consultation
          </h1>
          <p className="text-base sm:text-lg text-[#C8C2B8] max-w-3xl leading-relaxed font-light">
            We provide strategic preliminary assessments across commercial disputes, arbitrations, corporate
            governance, and contract vetting. Complete the intake form below to begin.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Process Explanation */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Cols: Form */}
            <div className="lg:col-span-8">
              <Suspense
                fallback={
                  <div className="p-12 bg-white border border-legal-border flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-legal-gold" />
                  </div>
                }
              >
                <ConsultationForm />
              </Suspense>
            </div>

            {/* Right 4 Cols: Consultation Protocol Information */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white border border-legal-border p-6 rounded-sm shadow-subtle space-y-5">
                <h3 className="text-lg font-serif text-legal-charcoal border-b border-legal-border pb-3">
                  Consultation Protocol
                </h3>

                <div className="space-y-4 text-xs text-legal-body">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-legal-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-legal-charcoal">1. Conflict Verification</p>
                      <p className="text-legal-muted mt-0.5">
                        Prior to confirming any appointment, our registry verifies that no conflict exists
                        against named adverse parties.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarCheck className="w-5 h-5 text-legal-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-legal-charcoal">2. Formal Confirmation</p>
                      <p className="text-legal-muted mt-0.5">
                        Upon clearance, counsel issues a formal calendar invite with conference access credentials
                        and preparatory guidelines.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-legal-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-legal-charcoal">3. Document Submission</p>
                      <p className="text-legal-muted mt-0.5">
                        Clients are encouraged to submit core documents 24 hours prior to the conference to ensure
                        productive discussions.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-legal-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-legal-charcoal">4. Structured Conference</p>
                      <p className="text-legal-muted mt-0.5">
                        In-person chambers or encrypted video meeting with senior counsel covering factual
                        analysis and prospective remedies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regulatory Notice */}
              <div className="p-6 bg-[#FCFBF9] border border-legal-border rounded-sm text-xs text-legal-muted space-y-2">
                <p className="font-semibold text-legal-charcoal">Institutional Notice:</p>
                <p className="leading-relaxed">
                  This consultation portal allows prospective clients to propose meeting slots. All scheduled
                  engagements are confirmed in writing by the chambers coordinator and are subject to professional
                  ethics rules.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
