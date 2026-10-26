import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Scale,
  Award,
  BookOpen,
  FileCheck,
  CheckCircle2,
  Clock,
  Compass,
  Briefcase,
  Users,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';
import { dbStore } from '@/lib/db/store';
import { HomeFaqSection } from '@/components/ui/HomeFaqSection';

export default function HomePage() {
  const practiceAreas = FIRM_CONFIG.practiceAreas;
  const lawyers = FIRM_CONFIG.lawyers.filter((l) => l.featured);
  const articles = dbStore.getArticles().slice(0, 3);
  const faqs = dbStore.getFAQs().slice(0, 5);

  return (
    <div className="bg-[#F8F6F1]">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FCFBF9] to-[#F5F2EB] border-b border-legal-border py-16 sm:py-24 lg:py-28">
        {/* Subtle background ornamentation */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-no-repeat bg-right-top opacity-5 pointer-events-none">
          <img src="/brand/guardian-emblem.png" alt="" className="w-full h-auto" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Editorial Headline & Copy */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-legal-gold/10 border border-legal-gold/30 text-xs font-medium text-legal-charcoal tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-legal-gold" />
                Dedicated Legal Practice & Advisory
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-legal-charcoal leading-[1.15] tracking-tight">
                {FIRM_CONFIG.tagline}
              </h1>

              <p className="text-lg sm:text-xl text-legal-body leading-relaxed max-w-2xl font-light">
                {FIRM_CONFIG.subheadline}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/consultation"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-xs font-semibold tracking-wider uppercase text-legal-black bg-legal-gold hover:bg-legal-gold-hover transition-all duration-200 rounded-sm shadow-md hover:shadow-lg active:scale-[0.99]"
                >
                  <span>Request a Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/practice-areas"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 text-xs font-semibold tracking-wider uppercase text-legal-charcoal bg-transparent hover:bg-legal-gold/10 border border-legal-border hover:border-legal-gold transition-colors duration-200 rounded-sm"
                >
                  <span>Explore Our Services</span>
                  <ChevronRight className="w-4 h-4 text-legal-gold" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 border-t border-legal-border grid grid-cols-3 gap-4 sm:gap-6 text-legal-charcoal">
                <div>
                  <div className="flex items-center gap-1.5 text-legal-gold">
                    <Scale className="w-4 h-4" />
                    <span className="text-xs uppercase font-semibold tracking-wider">Practice</span>
                  </div>
                  <p className="text-sm font-serif font-bold text-legal-charcoal mt-1">High Courts</p>
                  <p className="text-xs text-legal-muted">& Special Tribunals</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-legal-gold">
                    <Shield className="w-4 h-4" />
                    <span className="text-xs uppercase font-semibold tracking-wider">Ethics</span>
                  </div>
                  <p className="text-sm font-serif font-bold text-legal-charcoal mt-1">100% Confidential</p>
                  <p className="text-xs text-legal-muted">Conflict Clearance</p>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-legal-gold">
                    <BookOpen className="w-4 h-4" />
                    <span className="text-xs uppercase font-semibold tracking-wider">Advisory</span>
                  </div>
                  <p className="text-sm font-serif font-bold text-legal-charcoal mt-1">Commercial</p>
                  <p className="text-xs text-legal-muted">& Dispute Strategy</p>
                </div>
              </div>
            </div>

            {/* Right: Editorial Legal Imagery */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-3 rounded-sm border border-legal-gold/40 transform translate-x-2 translate-y-2 pointer-events-none" />

                <div className="relative rounded-sm overflow-hidden shadow-elevated bg-white border border-legal-border">
                  <img
                    src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1000"
                    alt="Law Library and Legal Research Chambers - Guardian Legal Solutions"
                    className="w-full h-[400px] sm:h-[480px] object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle overlay caption */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-legal-black/90 via-legal-black/60 to-transparent p-6 text-white">
                    <p className="text-xs uppercase tracking-widest text-legal-gold font-semibold">
                      Chambers of Counsel
                    </p>
                    <p className="text-sm font-serif italic text-white/90 mt-1">
                      &quot;The rule of law is not just a standard of adjudication, but the benchmark of
                      commercial certitude.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTRODUCTION TO THE FIRM */}
      <section className="py-20 bg-white border-b border-legal-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-legal-gold">
            <span className="w-8 h-[1px] bg-legal-gold" />
            <span>Firm Heritage & Principles</span>
            <span className="w-8 h-[1px] bg-legal-gold" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif text-legal-charcoal leading-snug">
            Strategic Legal Representation Grounded in Procedural Mastery
          </h2>

          <p className="text-base sm:text-lg text-legal-body leading-relaxed max-w-3xl mx-auto font-light">
            Guardian Legal Solutions operates as an independent legal practice focused on high-stakes civil
            and commercial litigation, contract architecture, arbitral advocacy, and regulatory defense. We
            bring meticulous preparation, strategic depth, and unwavering adherence to professional ethics to
            every brief entrusted to our counsel.
          </p>

          <div className="pt-4 flex justify-center">
            <Link
              href="/about"
              className="text-xs font-semibold tracking-wider uppercase text-legal-charcoal hover:text-legal-gold inline-flex items-center gap-2 border-b border-legal-charcoal hover:border-legal-gold pb-1 transition-colors"
            >
              <span>Learn More About Our Philosophy & Governance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. PRACTICE AREAS GRID (CONFIG-DRIVEN) */}
      <section className="py-20 bg-[#F8F6F1] border-b border-legal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-semibold tracking-widest text-legal-gold">
                Verified Practice Disciplines
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-legal-charcoal">
                Areas of Legal Competence
              </h2>
            </div>
            <Link
              href="/practice-areas"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-legal-charcoal hover:text-legal-gold group"
            >
              <span>View Full Practice Directory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {practiceAreas.map((pa) => (
              <div
                key={pa.slug}
                className="bg-white border border-legal-border p-8 rounded-sm shadow-subtle hover:shadow-card hover:border-legal-gold/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-full bg-legal-ivory flex items-center justify-center text-xs font-serif font-bold text-legal-gold border border-legal-border">
                      §
                    </span>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-legal-muted">
                      Active Practice
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-legal-charcoal group-hover:text-legal-gold transition-colors">
                    {pa.name}
                  </h3>

                  <p className="text-sm text-legal-body leading-relaxed line-clamp-3">
                    {pa.shortDescription}
                  </p>

                  <div className="pt-2 border-t border-legal-border/60">
                    <p className="text-xs font-semibold text-legal-charcoal mb-2">Key Coverage:</p>
                    <ul className="space-y-1 text-xs text-legal-muted">
                      {pa.mattersCovered.slice(0, 3).map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-legal-gold" />
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-legal-border flex items-center justify-between">
                  <Link
                    href={`/practice-areas/${pa.slug}`}
                    className="text-xs font-semibold tracking-wider uppercase text-legal-charcoal group-hover:text-legal-gold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>Consult Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE FIRM'S STRATEGIC APPROACH */}
      <section className="py-20 bg-legal-charcoal text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mb-16 space-y-3">
            <span className="text-xs uppercase tracking-widest text-legal-gold font-semibold">
              The Guardian Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white">
              How We Approach Every Matter
            </h2>
            <p className="text-sm sm:text-base text-[#B0B0B0] leading-relaxed">
              We reject formulaic legal filings. Every brief undergoes systematic evidentiary scrutiny,
              jurisprudential research, and risk profiling before entering the court or tribunal docket.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1E1E1E] p-6 rounded-sm border border-[#2E2E2E] space-y-4">
              <div className="w-10 h-10 rounded-sm bg-legal-gold/20 flex items-center justify-center text-legal-gold">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-white">1. Documentary Rigour</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed">
                Cases are won in the documentary foundation. We audit contracts, communication records, and
                regulatory registries to build an incontrovertible factual record.
              </p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-sm border border-[#2E2E2E] space-y-4">
              <div className="w-10 h-10 rounded-sm bg-legal-gold/20 flex items-center justify-center text-legal-gold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-white">2. Strategic Roadmapping</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed">
                We formulate pre-litigation alternatives, evaluate ADR and mediation avenues, and establish
                clear milestone roadmaps before advising formal adjudication.
              </p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-sm border border-[#2E2E2E] space-y-4">
              <div className="w-10 h-10 rounded-sm bg-legal-gold/20 flex items-center justify-center text-legal-gold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-white">3. Decisive Court Advocacy</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed">
                Our advocates present structured oral arguments anchored in binding precedent, robust
                evidentiary cross-examination, and respectful judicial deference.
              </p>
            </div>

            <div className="bg-[#1E1E1E] p-6 rounded-sm border border-[#2E2E2E] space-y-4">
              <div className="w-10 h-10 rounded-sm bg-legal-gold/20 flex items-center justify-center text-legal-gold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif text-white">4. Absolute Discretion</h3>
              <p className="text-xs text-[#A0A0A0] leading-relaxed">
                Confidentiality is sacrosanct. We maintain rigorous data safeguards, clear conflict-checking
                protocols, and discreet handling of sensitive commercial affairs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED LAWYERS & COUNSEL */}
      <section className="py-20 bg-white border-b border-legal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-semibold tracking-widest text-legal-gold">
                Chambers Advocacy
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-legal-charcoal">
                Our Counsel & Practice Leads
              </h2>
            </div>
            <Link
              href="/our-lawyers"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-legal-charcoal hover:text-legal-gold group"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lawyers.map((lawyer) => (
              <div
                key={lawyer.slug}
                className="bg-[#FCFBF9] border border-legal-border rounded-sm overflow-hidden shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-serif text-legal-charcoal">{lawyer.name}</h3>
                      <p className="text-xs text-legal-gold font-medium mt-0.5">{lawyer.designation}</p>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-green-50 text-green-700 border border-green-200 rounded">
                      Verified Bar
                    </span>
                  </div>

                  <p className="text-xs text-legal-body leading-relaxed line-clamp-3">
                    {lawyer.bio}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-legal-border text-xs text-legal-muted">
                    <p className="font-semibold text-legal-charcoal">Qualifications:</p>
                    <p>{lawyer.qualifications.join(' • ')}</p>
                    <p className="font-semibold text-legal-charcoal pt-1">Bar Registrations:</p>
                    <p className="font-mono text-[11px] text-legal-charcoal">{lawyer.barRegistrations[0]}</p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/our-lawyers/${lawyer.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-legal-charcoal bg-white border border-legal-border hover:border-legal-gold hover:text-legal-gold transition-colors rounded-sm"
                  >
                    <span>Read Professional Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONSULTATION PROCEDURE */}
      <section className="py-20 bg-[#F8F6F1] border-b border-legal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-semibold tracking-widest text-legal-gold">
              Client Engagement
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-legal-charcoal">
              {FIRM_CONFIG.consultation.title}
            </h2>
            <p className="text-sm text-legal-body leading-relaxed font-light">
              We follow a transparent, phased protocol to ensure strict conflict verification and meaningful
              legal preparation before our initial conference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FIRM_CONFIG.consultation.steps.map((st) => (
              <div
                key={st.number}
                className="bg-white border border-legal-border p-6 rounded-sm relative space-y-3 shadow-subtle"
              >
                <span className="text-3xl font-serif text-legal-gold/60 font-bold block">
                  {st.number}
                </span>
                <h3 className="text-base font-serif font-bold text-legal-charcoal">{st.title}</h3>
                <p className="text-xs text-legal-body leading-relaxed">{st.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover transition-colors rounded-sm shadow-sm"
            >
              <span>Schedule Initial Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. SELECTED LEGAL INSIGHTS */}
      <section className="py-20 bg-white border-b border-legal-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-semibold tracking-widest text-legal-gold">
                Analysis & Precedents
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-legal-charcoal">
                Legal Insights & Commentary
              </h2>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-legal-charcoal hover:text-legal-gold group"
            >
              <span>View All Publications</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.slug}
                className="bg-[#FCFBF9] border border-legal-border rounded-sm overflow-hidden flex flex-col justify-between group hover:shadow-card transition-all duration-300"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-legal-muted">
                    <span className="text-legal-gold font-medium">{art.category}</span>
                    <span>{art.readingTime}</span>
                  </div>

                  <h3 className="text-lg font-serif text-legal-charcoal group-hover:text-legal-gold transition-colors leading-snug">
                    <Link href={`/insights/${art.slug}`}>{art.title}</Link>
                  </h3>

                  <p className="text-xs text-legal-body leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>

                <div className="p-6 pt-0 border-t border-legal-border/60 flex items-center justify-between text-xs text-legal-muted">
                  <span>By {art.authorName}</span>
                  <Link
                    href={`/insights/${art.slug}`}
                    className="font-semibold text-legal-charcoal hover:text-legal-gold inline-flex items-center gap-1"
                  >
                    Read Article <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 bg-[#F8F6F1] border-b border-legal-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs uppercase font-semibold tracking-widest text-legal-gold">
              Questions & Procedures
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-legal-charcoal">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-legal-body leading-relaxed font-light">
              Clear administrative and procedural answers regarding our engagement and consultation processes.
            </p>
          </div>

          <HomeFaqSection faqs={faqs} />

          <div className="mt-8 text-center">
            <Link
              href="/faqs"
              className="text-xs font-semibold uppercase tracking-wider text-legal-charcoal hover:text-legal-gold underline"
            >
              Browse Complete Knowledge & FAQ Repository →
            </Link>
          </div>
        </div>
      </section>

      {/* 9. STRONG CONSULTATION CTA BANNER */}
      <section className="py-20 bg-legal-charcoal text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="w-12 h-[2px] bg-legal-gold mx-auto block" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
            Require Clarifying Legal Advice on a Complex Matter?
          </h2>
          <p className="text-base text-[#C2BCB2] max-w-2xl mx-auto leading-relaxed font-light">
            Contact our chambers today to schedule a confidential preliminary assessment. We review your
            documentation, conduct conflict checks, and outline definitive legal options.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/consultation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-semibold tracking-wider uppercase text-legal-black bg-legal-gold hover:bg-legal-gold-hover transition-colors rounded-sm shadow-md"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold tracking-wider uppercase text-white hover:text-legal-gold border border-[#3E3E3E] hover:border-legal-gold transition-colors rounded-sm"
            >
              <span>Contact Chambers</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
