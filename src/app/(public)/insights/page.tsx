import React from 'react';
import { Metadata } from 'next';
import { dbStore } from '@/lib/db/store';
import { InsightsFilterList } from '@/components/insights/InsightsFilterList';

export const metadata: Metadata = {
  title: 'Legal Insights, Case Law Commentary & Precedents',
  description:
    'Thought leadership, statutory analysis, arbitration updates, and commercial contract jurisprudence published by the advocates of Guardian Legal Solutions.',
};

export default function InsightsPage() {
  const articles = dbStore.getArticles();

  return (
    <div className="bg-[#F8F6F1]">
      {/* Header Banner */}
      <section className="bg-legal-charcoal text-white py-16 sm:py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-legal-gold">
            <span>Jurisprudential Knowledge & Commentary</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
            Legal Insights & Thought Leadership
          </h1>
          <p className="text-base sm:text-lg text-[#C8C2B8] max-w-3xl leading-relaxed font-light">
            In-depth analysis of evolving High Court rulings, statutory amendments, commercial drafting
            techniques, and arbitral practice authored by our counsel.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InsightsFilterList initialArticles={articles} />
        </div>
      </section>
    </div>
  );
}
