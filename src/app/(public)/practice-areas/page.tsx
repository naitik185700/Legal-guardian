import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronRight, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';

export const metadata: Metadata = {
  title: 'Practice Areas & Legal Services Directory',
  description:
    'Explore the verified practice areas of Guardian Legal Solutions: Commercial Litigation, Corporate Governance, Arbitration, Contract Vetting, Banking Disputes, and Real Estate Law.',
};

export default function PracticeAreasPage() {
  const practiceAreas = FIRM_CONFIG.practiceAreas;

  return (
    <div className="bg-[#F8F6F1]">
      {/* Directory Header Banner */}
      <section className="bg-legal-charcoal text-white py-16 sm:py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-legal-gold">
            <span>Verified Practice Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
            Comprehensive Legal Disciplines & Dispute Representation
          </h1>
          <p className="text-base sm:text-lg text-[#C8C2B8] max-w-3xl leading-relaxed font-light">
            Our practice spans high-stakes commercial disputes, appellate advocacy, corporate transactions,
            and specialized tribunal proceedings. Explore our active practice areas below.
          </p>
        </div>
      </section>

      {/* Practice Areas List */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {practiceAreas.map((pa, index) => (
            <div
              key={pa.slug}
              id={pa.slug}
              className="bg-white border border-legal-border rounded-sm shadow-subtle overflow-hidden p-8 sm:p-10 transition-all duration-300 hover:border-legal-gold/60"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-8 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-legal-ivory flex items-center justify-center font-serif text-sm font-bold text-legal-gold border border-legal-border">
                      {index + 1}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-legal-gold">
                      Verified Service
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-serif text-legal-charcoal">
                    <Link href={`/practice-areas/${pa.slug}`} className="hover:text-legal-gold transition-colors">
                      {pa.name}
                    </Link>
                  </h2>

                  <p className="text-base text-legal-body leading-relaxed">
                    {pa.fullDescription}
                  </p>

                  <div className="pt-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-legal-charcoal mb-3">
                      Types of Matters Covered:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-legal-body">
                      {pa.mattersCovered.map((matter, mIdx) => (
                        <div key={mIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-legal-gold shrink-0 mt-0.5" />
                          <span>{matter}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-[#FCFBF9] border border-legal-border p-6 rounded-sm space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-legal-charcoal mb-2">
                      Typical Procedural Stages
                    </h4>
                    <ol className="space-y-2 text-xs text-legal-muted">
                      {pa.stages.map((st) => (
                        <li key={st.step} className="flex items-start gap-2">
                          <span className="font-semibold text-legal-charcoal">{st.step}.</span>
                          <span>
                            <strong className="text-legal-charcoal">{st.title}:</strong> {st.description}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="pt-4 border-t border-legal-border space-y-3">
                    <Link
                      href={`/practice-areas/${pa.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-legal-black bg-legal-gold hover:bg-legal-gold-hover transition-colors rounded-sm"
                    >
                      <span>Explore Detailed Guidance</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/consultation?practiceArea=${pa.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-legal-charcoal hover:text-legal-gold transition-colors"
                    >
                      <span>Book Consultation For This Area</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
