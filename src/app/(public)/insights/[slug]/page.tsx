import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { dbStore } from '@/lib/db/store';
import { FIRM_CONFIG } from '@/lib/config/firm';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = dbStore.getArticles();
  return articles.map((a) => ({
    slug: a.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = dbStore.getArticles().find((a) => a.slug === slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  return {
    title: `${article.title} | Legal Insights`,
    description: article.excerpt,
    alternates: {
      canonical: `/insights/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `${FIRM_CONFIG.domain}/insights/${article.slug}`,
      images: [
        {
          url: article.coverImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.authorName],
    },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const articles = dbStore.getArticles();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div className="bg-[#F8F6F1]">
      {/* Header Banner */}
      <section className="bg-legal-charcoal text-white py-14 sm:py-18 border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-[#A0A0A0]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-legal-gold">
              Home
            </Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-legal-gold">
              Insights
            </Link>
            <span>/</span>
            <span className="text-legal-gold truncate">{article.category}</span>
          </nav>

          <div className="inline-block px-3 py-1 bg-legal-gold/20 text-legal-gold text-xs font-semibold uppercase tracking-wider rounded-sm">
            {article.category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#B8B2A7] pt-2 border-t border-[#333333]">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-legal-gold" />
              <span>{article.authorName} ({article.authorDesignation})</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-legal-gold" />
              <span>{article.publishedAt}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-legal-gold" />
              <span>{article.readingTime}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Article Body */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Cover Image */}
          <div className="rounded-sm overflow-hidden border border-legal-border shadow-subtle bg-white">
            <img
              src={article.coverImageUrl}
              alt={article.title}
              className="w-full h-72 sm:h-96 object-cover object-center"
            />
          </div>

          {/* Article Text Content */}
          <article className="bg-white p-8 sm:p-12 border border-legal-border rounded-sm shadow-subtle space-y-6">
            <div className="text-base sm:text-lg text-legal-charcoal font-serif italic border-l-4 border-legal-gold pl-5 py-1 bg-legal-ivory">
              {article.excerpt}
            </div>

            <div className="prose prose-legal max-w-none text-sm sm:text-base leading-relaxed text-legal-body space-y-4 whitespace-pre-line font-light">
              {article.content}
            </div>

            {/* Author Profile Signoff */}
            <div className="mt-10 pt-6 border-t border-legal-border flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-legal-muted font-semibold">Author</p>
                <p className="font-serif font-bold text-legal-charcoal text-base mt-0.5">{article.authorName}</p>
                <p className="text-xs text-legal-gold">{article.authorDesignation}</p>
              </div>

              <Link
                href="/consultation"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover transition-colors rounded-sm"
              >
                <span>Consult Counsel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>

          {/* Educational Disclaimer Notice */}
          <div className="bg-[#FCFBF9] border border-legal-border p-6 rounded-sm text-xs text-legal-muted space-y-2">
            <div className="flex items-center gap-2 text-legal-charcoal font-semibold">
              <ShieldAlert className="w-4 h-4 text-legal-gold" />
              <span>Legal Educational Disclaimer</span>
            </div>
            <p className="leading-relaxed">
              This publication is provided solely for academic, general educational, and informational
              purposes and does not constitute formal legal advice. Judicial interpretations evolve; readers
              facing specific factual disputes should seek individualized counsel regarding their factual
              record.
            </p>
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-serif text-legal-charcoal">Related Legal Publications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <div
                    key={rel.slug}
                    className="bg-white p-6 border border-legal-border rounded-sm shadow-subtle space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-legal-gold">
                        {rel.category}
                      </span>
                      <h4 className="font-serif font-bold text-legal-charcoal text-base mt-1">
                        <Link href={`/insights/${rel.slug}`} className="hover:text-legal-gold transition-colors">
                          {rel.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-legal-muted line-clamp-2 mt-2">{rel.excerpt}</p>
                    </div>
                    <Link
                      href={`/insights/${rel.slug}`}
                      className="text-xs font-semibold uppercase tracking-wider text-legal-charcoal hover:text-legal-gold inline-flex items-center gap-1 pt-2"
                    >
                      Read Analysis <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
