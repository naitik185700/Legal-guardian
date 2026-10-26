import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Scale, BookOpen, CheckCircle, ArrowRight, Award, Compass, Lock } from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';

export const metadata: Metadata = {
  title: 'About the Firm | Ethics, Vision & Practice',
  description:
    'Learn about Guardian Legal Solutions, our institutional ethics, approach to high-stakes dispute resolution, and commitment to rigorous legal advocacy.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#F8F6F1]">
      {/* Header Banner */}
      <section className="bg-legal-charcoal text-white py-16 sm:py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-legal-gold">
            <span>About Guardian Legal Solutions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
            An Unwavering Commitment to Legal Rigour, Ethics & Clarity
          </h1>
          <p className="text-base sm:text-lg text-[#C8C2B8] max-w-3xl leading-relaxed font-light">
            Founded on the fundamental precept that sound legal counsel combines exhaustive evidentiary
            preparation with strategic foresight, Guardian Legal Solutions serves commercial enterprises and
            private clients with steadfast integrity.
          </p>
        </div>
      </section>

      {/* Main Philosophy & Background */}
      <section className="py-16 sm:py-20 bg-white border-b border-legal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs uppercase font-semibold tracking-widest text-legal-gold">
                Firm Foundation
              </span>
              <h2 className="text-3xl font-serif text-legal-charcoal">
                Built Upon Intellectual Depth and Commercial Realism
              </h2>
              <p className="text-base text-legal-body leading-relaxed">
                At Guardian Legal Solutions, we recognize that our clients do not merely seek legal opinions;
                they require strategic solutions that preserve enterprise value, resolve deadlock, and insulate
                against future exposure.
              </p>
              <p className="text-base text-legal-body leading-relaxed">
                Our practice encompasses regular representation before the High Courts, appellate forums,
                and specialized tribunals, as well as complex transactional advisory in corporate governance,
                commercial contract drafting, and structured arbitrations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-[#F8F6F1] border border-legal-border rounded-sm">
                  <h4 className="font-serif font-bold text-legal-charcoal text-base">Direct Partner Attention</h4>
                  <p className="text-xs text-legal-body mt-1">
                    Every brief is personally evaluated and directed by senior counsel, ensuring high-calibre
                    advocacy at every juncture.
                  </p>
                </div>
                <div className="p-4 bg-[#F8F6F1] border border-legal-border rounded-sm">
                  <h4 className="font-serif font-bold text-legal-charcoal text-base">Objective Assessment</h4>
                  <p className="text-xs text-legal-body mt-1">
                    We provide candid, unvarnished risk evaluations rather than unwarranted assurances of
                    litigation outcomes.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#F8F6F1] border border-legal-border p-8 rounded-sm shadow-subtle space-y-6">
                <div className="flex items-center gap-3 border-b border-legal-border pb-4">
                  <img
                    src="/brand/guardian-emblem.png"
                    alt="Guardian Emblem"
                    className="w-12 h-12 object-contain"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-legal-charcoal text-lg">Guardian Legal Solutions</h3>
                    <p className="text-xs text-legal-gold">Chambers of Legal Practice</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs text-legal-body">
                  <div>
                    <p className="font-semibold text-legal-charcoal uppercase tracking-wider text-[11px]">Primary Seat of Practice</p>
                    <p className="mt-0.5">{FIRM_CONFIG.jurisdiction.primary}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-legal-charcoal uppercase tracking-wider text-[11px]">Core Practice Disciplines</p>
                    <p className="mt-0.5">Commercial Disputes, Arbitration, Corporate Governance, Contracts & Real Estate</p>
                  </div>
                  <div>
                    <p className="font-semibold text-legal-charcoal uppercase tracking-wider text-[11px]">Professional Affiliation</p>
                    <p className="mt-0.5">Advocates enrolled with the Bar Council of India & High Court Bar Associations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ethics, Confidentiality & Governance */}
      <section className="py-16 sm:py-20 bg-[#F8F6F1] border-b border-legal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs uppercase font-semibold tracking-widest text-legal-gold">
              Professional Ethics
            </span>
            <h2 className="text-3xl font-serif text-legal-charcoal">
              Our Professional Principles & Confidentiality Code
            </h2>
            <p className="text-sm text-legal-body leading-relaxed font-light">
              We adhere strictly to statutory professional conduct norms, attorney-client confidentiality,
              and disciplined conflict clearance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-legal-border rounded-sm space-y-4">
              <div className="w-10 h-10 rounded-sm bg-legal-gold/15 flex items-center justify-center text-legal-gold">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif text-legal-charcoal">Fiduciary Confidentiality</h3>
              <p className="text-xs text-legal-body leading-relaxed">
                All communications, corporate records, and litigation strategies are protected under
                professional confidentiality principles. Digital records are encrypted and secured against
                unauthorized access.
              </p>
            </div>

            <div className="bg-white p-8 border border-legal-border rounded-sm space-y-4">
              <div className="w-10 h-10 rounded-sm bg-legal-gold/15 flex items-center justify-center text-legal-gold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif text-legal-charcoal">Mandatory Conflict Checks</h3>
              <p className="text-xs text-legal-body leading-relaxed">
                Prior to accepting any brief or formal retainer, our registry executes rigorous conflict
                checks across adverse parties, ensuring our undivided fidelity to each client&apos;s cause.
              </p>
            </div>

            <div className="bg-white p-8 border border-legal-border rounded-sm space-y-4">
              <div className="w-10 h-10 rounded-sm bg-legal-gold/15 flex items-center justify-center text-legal-gold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif text-legal-charcoal">Transparent Engagement</h3>
              <p className="text-xs text-legal-body leading-relaxed">
                We believe in straightforward fee structures, documented scope of representation, and clear
                written retainers without hidden overheads or ambiguous cost escalations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-legal-charcoal text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-serif text-white">
            Discuss Your Matter with Guardian Legal Solutions
          </h2>
          <p className="text-sm text-[#BFB9AE] leading-relaxed max-w-2xl mx-auto font-light">
            Contact our chambers to schedule an initial consultation or preliminary matter evaluation with our
            counsel team.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover transition-colors rounded-sm"
            >
              <span>Request a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
