import React from 'react';
import { Metadata } from 'next';
import { FIRM_CONFIG } from '@/lib/config/firm';

export const metadata: Metadata = {
  title: 'Privacy Policy | Professional Data Governance',
  description:
    'Privacy Policy of Guardian Legal Solutions. Learn how personal and preliminary enquiry data is collected, processed, and safeguarded.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F8F6F1] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-legal-border p-8 sm:p-12 rounded-sm shadow-subtle space-y-8">
        <div className="border-b border-legal-border pb-6">
          <span className="text-xs uppercase tracking-widest text-legal-gold font-semibold">
            Legal Compliance & Data Governance
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-legal-charcoal mt-1">
            Privacy Policy
          </h1>
          <p className="text-xs text-legal-muted mt-2">
            Effective Date: October 2026 • Applicable Jurisdiction: India
          </p>
        </div>

        <div className="prose prose-legal text-sm text-legal-body leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="text-xl font-serif text-legal-charcoal font-semibold">1. Introduction</h2>
            <p>
              Guardian Legal Solutions (&quot;the Firm&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to
              protecting the confidentiality and privacy of prospective clients, clients, and visitors to our
              website (<span className="font-mono text-legal-charcoal">{FIRM_CONFIG.domain}</span>). This
              Privacy Policy outlines our practices regarding data collection, processing, retention, and
              safeguards in alignment with applicable Indian information technology and data protection
              statutes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-legal-charcoal font-semibold">
              2. Nature of Information Collected
            </h2>
            <p>
              We collect information strictly when voluntarily submitted through our intake, contact, and
              consultation request forms. This information may include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Contact details: Name, email address, telephone number.</li>
              <li>Practice area interests and preliminary, high-level summaries of legal matters.</li>
              <li>Scheduling preferences and consultation delivery formats (video conference, in-person).</li>
              <li>Technical logs: IP address, timestamp, and basic user-agent data for security and spam mitigation.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-legal-charcoal font-semibold">
              3. Purpose of Processing & Use of Data
            </h2>
            <p>Collected information is utilized exclusively for:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Conducting mandatory ethical conflict-of-interest checks.</li>
              <li>Responding to specific user enquiries and scheduling requested legal conferences.</li>
              <li>Internal administrative coordination and maintaining secure audit trails.</li>
              <li>Defending our infrastructure against denial-of-service and fraudulent traffic.</li>
            </ul>
            <p className="font-medium text-legal-charcoal">
              We never sell, rent, commercialize, or disclose personal data to third-party marketing brokers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-legal-charcoal font-semibold">
              4. Advocate-Client Privilege & Security
            </h2>
            <p>
              While submitting preliminary website forms does not create an advocate-client relationship, our
              chambers treats all received data with professional discretion. Data is stored on secured,
              encrypted servers and accessible only to authorized legal and administrative staff bound by
              confidentiality undertakings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-serif text-legal-charcoal font-semibold">5. Data Retention & Deletion</h2>
            <p>
              Enquiry records that do not proceed to formal engagement are periodically archived and purged in
              accordance with our data retention schedule. Users may request review or deletion of their
              contact records by writing to{' '}
              <a href={`mailto:${FIRM_CONFIG.contact.email}`} className="text-legal-gold underline">
                {FIRM_CONFIG.contact.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
