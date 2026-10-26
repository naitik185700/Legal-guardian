import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Scale,
  Award,
  BookOpen,
  Mail,
  CheckCircle,
} from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FIRM_CONFIG.lawyers.map((l) => ({
    slug: l.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lawyer = FIRM_CONFIG.lawyers.find((item) => item.slug === slug);

  if (!lawyer) {
    return {
      title: 'Lawyer Not Found',
    };
  }

  return {
    title: `${lawyer.name} — ${lawyer.designation} | Guardian Legal Solutions`,
    description: `${lawyer.name}, ${lawyer.designation} at Guardian Legal Solutions. Qualifications: ${lawyer.qualifications.join(', ')}. Bar Admission: ${lawyer.barRegistrations[0]}.`,
    alternates: {
      canonical: `/our-lawyers/${lawyer.slug}`,
    },
  };
}

export default async function LawyerProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const lawyer = FIRM_CONFIG.lawyers.find((item) => item.slug === slug);

  if (!lawyer) {
    notFound();
  }

  return (
    <div className="bg-[#F8F6F1]">
      {/* Header Banner */}
      <section className="bg-legal-charcoal text-white py-16 sm:py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link href="/our-lawyers" className="hover:underline flex items-center gap-1.5 text-xs text-legal-gold">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Counsel Directory
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-950/60 border border-green-500/30 text-green-300 rounded text-xs uppercase tracking-wider font-semibold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Bar Enrolled Counsel
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white">
                {lawyer.name}
              </h1>
              <p className="text-sm sm:text-base text-legal-gold font-medium mt-1">
                {lawyer.designation}
              </p>
            </div>

            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover transition-colors rounded-sm"
            >
              <span>Consult Counsel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Profile Details */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Cols: Biography, Practice Experience, Ethics */}
            <div className="lg:col-span-8 space-y-10">
              <div className="bg-white p-8 sm:p-10 border border-legal-border rounded-sm shadow-subtle space-y-6">
                <h2 className="text-2xl font-serif text-legal-charcoal">
                  Professional Biography & Advocacy Background
                </h2>
                <div className="text-base text-legal-body leading-relaxed space-y-4">
                  <p>{lawyer.bio}</p>
                  <p>
                    Advocate {lawyer.name} regularly appears before the High Courts, Commercial Benches,
                    and specialized Tribunals. Practice emphasizes strategic evidence assembly, preliminary
                    injunctive relief, and client risk mitigation.
                  </p>
                </div>
              </div>

              <div className="bg-white p-8 sm:p-10 border border-legal-border rounded-sm shadow-subtle space-y-6">
                <h2 className="text-2xl font-serif text-legal-charcoal">
                  Core Practice Areas & Substantive Focus
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-legal-body">
                  {lawyer.practiceAreas.map((pa, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 p-3 bg-[#FCFBF9] border border-legal-border rounded-sm">
                      <Scale className="w-4 h-4 text-legal-gold shrink-0" />
                      <span className="font-medium text-legal-charcoal">{pa}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Credentials Card */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-[#FCFBF9] border border-legal-border p-6 rounded-sm shadow-subtle space-y-6">
                <h3 className="font-serif font-bold text-legal-charcoal text-lg border-b border-legal-border pb-3">
                  Bar Credentials & Education
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <p className="font-semibold text-legal-charcoal uppercase tracking-wider text-[11px]">
                      Qualifications
                    </p>
                    <ul className="mt-1 space-y-1 text-legal-muted">
                      {lawyer.qualifications.map((q, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-legal-gold" />
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-legal-charcoal uppercase tracking-wider text-[11px]">
                      Bar Registrations
                    </p>
                    <ul className="mt-1 space-y-1 font-mono text-[11px] text-legal-charcoal">
                      {lawyer.barRegistrations.map((b, idx) => (
                        <li key={idx} className="p-2 bg-white border border-legal-border rounded">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-legal-charcoal uppercase tracking-wider text-[11px]">
                      Working Languages
                    </p>
                    <p className="text-legal-muted mt-1">{lawyer.languages.join(', ')}</p>
                  </div>

                  {lawyer.email && (
                    <div className="pt-2 border-t border-legal-border">
                      <p className="font-semibold text-legal-charcoal uppercase tracking-wider text-[11px]">
                        Official Chambers Email
                      </p>
                      <a
                        href={`mailto:${lawyer.email}`}
                        className="text-legal-gold hover:underline mt-1 block truncate"
                      >
                        {lawyer.email}
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-legal-border">
                  <Link
                    href={`/consultation`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover transition-colors rounded-sm"
                  >
                    <span>Schedule Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
