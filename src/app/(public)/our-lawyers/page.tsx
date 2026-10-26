import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Mail, BookOpen, Award, Scale } from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';

export const metadata: Metadata = {
  title: 'Our Lawyers & Counsel Directory | Bar Enrolled Advocates',
  description:
    'Meet the advocates and legal counsel of Guardian Legal Solutions. Verified bar admissions, qualifications, and dedicated court practice.',
};

export default function OurLawyersPage() {
  const lawyers = FIRM_CONFIG.lawyers;

  return (
    <div className="bg-[#F8F6F1]">
      {/* Directory Banner */}
      <section className="bg-legal-charcoal text-white py-16 sm:py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-legal-gold">
            <span>Chambers Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
            Advocates, Counsel & Practice Leads
          </h1>
          <p className="text-base sm:text-lg text-[#C8C2B8] max-w-3xl leading-relaxed font-light">
            Every counsel at Guardian Legal Solutions brings verified bar credentials, deep trial and appellate
            experience, and rigorous intellectual discipline to client representation.
          </p>
        </div>
      </section>

      {/* Lawyers Profiles List */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lawyers.map((lawyer) => (
              <div
                key={lawyer.slug}
                className="bg-white border border-legal-border rounded-sm overflow-hidden shadow-subtle hover:shadow-card hover:border-legal-gold/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-8 space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-full bg-legal-ivory flex items-center justify-center font-serif text-base font-bold text-legal-gold border border-legal-border">
                      <Scale className="w-5 h-5 text-legal-gold" />
                    </span>
                    <span className="px-2.5 py-0.5 text-[10px] uppercase font-semibold bg-green-50 text-green-700 border border-green-200 rounded">
                      Enrolled Advocate
                    </span>
                  </div>

                  <div>
                    <h2 className="text-2xl font-serif text-legal-charcoal">
                      <Link href={`/our-lawyers/${lawyer.slug}`} className="hover:text-legal-gold transition-colors">
                        {lawyer.name}
                      </Link>
                    </h2>
                    <p className="text-xs font-medium text-legal-gold mt-1 uppercase tracking-wider">
                      {lawyer.designation}
                    </p>
                  </div>

                  <p className="text-xs text-legal-body leading-relaxed">
                    {lawyer.bio}
                  </p>

                  <div className="pt-4 border-t border-legal-border space-y-2 text-xs">
                    <div>
                      <p className="font-semibold text-legal-charcoal text-[11px] uppercase tracking-wider">
                        Qualifications:
                      </p>
                      <p className="text-legal-muted mt-0.5">{lawyer.qualifications.join(', ')}</p>
                    </div>

                    <div>
                      <p className="font-semibold text-legal-charcoal text-[11px] uppercase tracking-wider">
                        Bar Enrollment:
                      </p>
                      <p className="text-legal-charcoal font-mono text-[11px] mt-0.5">
                        {lawyer.barRegistrations[0]}
                      </p>
                    </div>

                    <div>
                      <p className="font-semibold text-legal-charcoal text-[11px] uppercase tracking-wider">
                        Core Focus:
                      </p>
                      <p className="text-legal-muted mt-0.5">{lawyer.practiceAreas.join(' • ')}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-legal-border/60 flex items-center justify-between">
                  <Link
                    href={`/our-lawyers/${lawyer.slug}`}
                    className="text-xs font-semibold uppercase tracking-wider text-legal-charcoal hover:text-legal-gold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Full Biography</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/consultation`}
                    className="text-xs font-medium text-legal-gold hover:underline"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Institutional Counsel Statement */}
          <div className="bg-white border border-legal-border p-8 rounded-sm shadow-subtle text-xs text-legal-muted leading-relaxed space-y-2">
            <h4 className="font-serif font-bold text-legal-charcoal text-sm">
              Note on Bar Council Regulations & Advocate Engagement:
            </h4>
            <p>
              In strict accordance with the Advocates Act, 1961 and the Bar Council of India Rules, legal
              representation and professional appointments are governed by personal client choice and conflict
              clearance. Profile details provided herein reflect official bar enrollment entries and academic
              degrees for institutional informational compliance only.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
