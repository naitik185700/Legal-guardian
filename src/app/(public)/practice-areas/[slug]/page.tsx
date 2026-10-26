import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  ShieldAlert,
  ArrowLeft,
} from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';
import { HomeFaqSection } from '@/components/ui/HomeFaqSection';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FIRM_CONFIG.practiceAreas.map((pa) => ({
    slug: pa.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pa = FIRM_CONFIG.practiceAreas.find((item) => item.slug === slug);

  if (!pa) {
    return {
      title: 'Practice Area Not Found',
    };
  }

  return {
    title: `${pa.name} | Guardian Legal Solutions`,
    description: pa.shortDescription,
    alternates: {
      canonical: `/practice-areas/${pa.slug}`,
    },
    openGraph: {
      title: `${pa.name} | Guardian Legal Solutions`,
      description: pa.shortDescription,
      url: `${FIRM_CONFIG.domain}/practice-areas/${pa.slug}`,
    },
  };
}

export default async function PracticeAreaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pa = FIRM_CONFIG.practiceAreas.find((item) => item.slug === slug);

  if (!pa) {
    notFound();
  }

  const otherAreas = FIRM_CONFIG.practiceAreas.filter((item) => item.slug !== slug);

  return (
    <div className="bg-[#F8F6F1]">
      {/* Detail Header Banner */}
      <section className="bg-legal-charcoal text-white py-16 sm:py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center gap-2 text-xs text-legal-gold">
            <Link href="/practice-areas" className="hover:underline flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Practice Directory
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
            {pa.name}
          </h1>

          <p className="text-base sm:text-lg text-[#C8C2B8] max-w-3xl leading-relaxed font-light">
            {pa.shortDescription}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Link
              href={`/consultation?practiceArea=${pa.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover transition-colors rounded-sm"
            >
              <span>Request Consultation in This Area</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Cols: Detailed Overview, How We Assist, Stages, Checklist */}
            <div className="lg:col-span-8 space-y-12">
              {/* Detailed Overview */}
              <div className="bg-white p-8 sm:p-10 border border-legal-border rounded-sm shadow-subtle space-y-6">
                <h2 className="text-2xl font-serif text-legal-charcoal">
                  Overview & Evidentiary Scope
                </h2>
                <div className="text-base text-legal-body leading-relaxed space-y-4">
                  <p>{pa.fullDescription}</p>
                </div>

                <div className="pt-4 border-t border-legal-border">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-legal-charcoal mb-4">
                    Specific Disputes & Matters Handled:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-legal-body">
                    {pa.mattersCovered.map((matter, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-legal-gold shrink-0 mt-0.5" />
                        <span>{matter}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* How We Assist */}
              <div className="bg-white p-8 sm:p-10 border border-legal-border rounded-sm shadow-subtle space-y-6">
                <h2 className="text-2xl font-serif text-legal-charcoal">
                  How Our Counsel May Assist
                </h2>
                <div className="space-y-3">
                  {pa.howWeAssist.map((assist, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[#FCFBF9] border border-legal-border rounded-sm">
                      <span className="w-6 h-6 rounded-full bg-legal-gold/20 flex items-center justify-center text-xs font-bold text-legal-charcoal shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-legal-body leading-relaxed">{assist}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typical Stages */}
              <div className="bg-white p-8 sm:p-10 border border-legal-border rounded-sm shadow-subtle space-y-6">
                <h2 className="text-2xl font-serif text-legal-charcoal">
                  Typical Procedural Roadmap & Stages
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pa.stages.map((st) => (
                    <div key={st.step} className="p-5 bg-[#FCFBF9] border border-legal-border rounded-sm space-y-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-legal-gold">
                        Stage {st.step}
                      </span>
                      <h4 className="font-serif font-bold text-legal-charcoal text-base">{st.title}</h4>
                      <p className="text-xs text-legal-muted leading-relaxed">{st.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Document Preparation Checklist */}
              <div className="bg-white p-8 sm:p-10 border border-legal-border rounded-sm shadow-subtle space-y-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-legal-gold" />
                  <h2 className="text-2xl font-serif text-legal-charcoal">
                    Recommended Documents for Case Evaluation
                  </h2>
                </div>
                <p className="text-xs text-legal-muted">
                  Having organized documentary records expedites case analysis and reduces preliminary intake
                  turnaround.
                </p>
                <ul className="space-y-2 text-xs text-legal-body">
                  {pa.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 p-3 bg-[#FCFBF9] border border-legal-border rounded-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-legal-gold shrink-0 mt-1.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              {pa.faqs && pa.faqs.length > 0 && (
                <div className="bg-white p-8 sm:p-10 border border-legal-border rounded-sm shadow-subtle space-y-6">
                  <h2 className="text-2xl font-serif text-legal-charcoal">
                    Frequently Asked Questions in {pa.name}
                  </h2>
                  <HomeFaqSection
                    faqs={pa.faqs.map((f, i) => ({
                      id: `pa-faq-${i}`,
                      category: pa.name,
                      question: f.question,
                      answer: f.answer,
                      order: i,
                    }))}
                  />
                </div>
              )}
            </div>

            {/* Right 4 Cols: Quick Intake Card & Other Practice Areas */}
            <div className="lg:col-span-4 space-y-8">
              {/* Consultation Card */}
              <div className="bg-legal-charcoal text-white p-8 rounded-sm border border-[#2A2A2A] shadow-card space-y-6">
                <span className="w-10 h-1 bg-legal-gold block" />
                <h3 className="text-2xl font-serif text-white">
                  Schedule a Consultation in {pa.name}
                </h3>
                <p className="text-xs text-[#B8B2A7] leading-relaxed">
                  Our practice counsel is available for structured in-person conferences and secure encrypted
                  video consultations.
                </p>

                <div className="space-y-3 pt-2 text-xs text-[#A8A8A8]">
                  <p>✓ Strict Conflict Clearance Prior to Conference</p>
                  <p>✓ Factual & Documentary Evidence Scrutiny</p>
                  <p>✓ Transparent Advisory on Strategic Options</p>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/consultation?practiceArea=${pa.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-legal-black bg-legal-gold hover:bg-legal-gold-hover transition-colors rounded-sm"
                  >
                    <span>Request Booking</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Other Practice Areas List */}
              <div className="bg-white border border-legal-border p-6 rounded-sm shadow-subtle space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-legal-charcoal border-b border-legal-border pb-3">
                  Other Practice Areas
                </h4>
                <ul className="space-y-2 text-xs text-legal-body">
                  {otherAreas.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/practice-areas/${other.slug}`}
                        className="hover:text-legal-gold flex items-center justify-between py-1.5 transition-colors border-b border-legal-border/40"
                      >
                        <span>{other.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-legal-gold" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
