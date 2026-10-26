import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, HelpCircle, ShieldCheck } from 'lucide-react';
import { dbStore } from '@/lib/db/store';
import { FaqsDirectory } from '@/components/ui/FaqsDirectory';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions & Practice Procedures',
  description:
    'Answers to common questions regarding litigation representation, consultation bookings, conflict checks, and chamber engagement with Guardian Legal Solutions.',
};

export default function FaqsPage() {
  const faqs = dbStore.getFAQs();

  return (
    <div className="bg-[#F8F6F1]">
      {/* Header Banner */}
      <section className="bg-legal-charcoal text-white py-16 sm:py-20 border-b border-[#2A2A2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-legal-gold">
            <span>Client Questions & Information</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-[#C8C2B8] max-w-3xl leading-relaxed font-light">
            Comprehensive answers addressing our intake procedures, conflict-of-interest checks, consultation
            protocols, and court advocacy standards.
          </p>
        </div>
      </section>

      {/* Main FAQs Grid */}
      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <FaqsDirectory allFaqs={faqs} />

          {/* Need More Assistance Banner */}
          <div className="bg-white border border-legal-border p-8 rounded-sm shadow-subtle text-center space-y-4">
            <h3 className="text-2xl font-serif text-legal-charcoal">
              Have a Specific Inquiry Not Listed Here?
            </h3>
            <p className="text-xs text-legal-muted max-w-lg mx-auto leading-relaxed">
              Our chambers intake team is available to assist you with specific procedural questions or to
              evaluate potential representation.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover transition-colors rounded-sm"
              >
                <span>Contact Chambers Directly</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
