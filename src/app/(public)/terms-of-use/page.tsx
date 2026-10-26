import React from 'react';
import { Metadata } from 'next';
import { FIRM_CONFIG } from '@/lib/config/firm';

export const metadata: Metadata = {
  title: 'Terms of Use | Website Terms & Disclaimers',
  description:
    'Terms of Use governing access to the website of Guardian Legal Solutions. User obligations, intellectual property, and jurisdictional limitations.',
};

export default function TermsOfUsePage() {
  return (
    <div className="bg-[#F8F6F1] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-legal-border p-8 sm:p-12 rounded-sm shadow-subtle space-y-8">
        <div className="border-b border-legal-border pb-6">
          <span className="text-xs uppercase tracking-widest text-legal-gold font-semibold">
            Institutional Terms
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-legal-charcoal mt-1">
            Terms of Use
          </h1>
          <p className="text-xs text-legal-muted mt-2">
            Last Updated: October 2026 • Guardian Legal Solutions
          </p>
        </div>

        <div className="prose prose-legal text-sm text-legal-body leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-legal-charcoal font-semibold">1. Acceptance of Terms</h2>
            <p>
              By accessing and navigating this website, you agree to be bound by these Terms of Use, our Privacy
              Policy, and the Bar Council Regulatory Disclaimer. If you do not agree with any part of these terms,
              you should immediately discontinue use of this website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-legal-charcoal font-semibold">
              2. No Legal Advice & No Advocate-Client Relationship
            </h2>
            <p>
              The material presented on this website is for general informational and educational purposes only.
              It does not constitute legal advice and must not be relied upon as a substitute for professional
              counsel tailored to your specific circumstances.
            </p>
            <p>
              Transmission of information through contact forms, emails, or consultation requests does not
              create or establish an advocate-client relationship between you and Guardian Legal Solutions or
              any of its advocates. An advocate-client relationship is formed only upon formal execution of a
              written engagement letter and clearance of conflict checks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-legal-charcoal font-semibold">
              3. Intellectual Property Rights
            </h2>
            <p>
              All trademarks, emblems, scales of justice brand artwork, original publications, editorial copy,
              and design elements appearing on this website are the proprietary intellectual property of
              Guardian Legal Solutions and are protected under copyright and trademark law. Unauthorized
              reproduction, commercial distribution, or automated crawling is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-legal-charcoal font-semibold">
              4. Governing Law & Territorial Jurisdiction
            </h2>
            <p>
              These Terms of Use and any claims arising out of the use of this website shall be governed by and
              construed in accordance with the laws of India. Any disputes shall be subject to the exclusive
              jurisdiction of the courts of competent jurisdiction at New Delhi, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
