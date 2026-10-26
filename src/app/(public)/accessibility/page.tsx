import React from 'react';
import { Metadata } from 'next';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';

export const metadata: Metadata = {
  title: 'Accessibility Statement | WCAG 2.2 Standards',
  description:
    'Accessibility policy and digital inclusion statement of Guardian Legal Solutions. Conformance to WCAG 2.2 Level AA guidelines.',
};

export default function AccessibilityPage() {
  return (
    <div className="bg-[#F8F6F1] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-legal-border p-8 sm:p-12 rounded-sm shadow-subtle space-y-8">
        <div className="border-b border-legal-border pb-6">
          <span className="text-xs uppercase tracking-widest text-legal-gold font-semibold">
            Digital Inclusion
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif text-legal-charcoal mt-1">
            Accessibility Statement
          </h1>
          <p className="text-xs text-legal-muted mt-2">
            Target Standard: Web Content Accessibility Guidelines (WCAG) 2.2 Level AA
          </p>
        </div>

        <div className="prose prose-legal text-sm text-legal-body leading-relaxed space-y-6">
          <p>
            Guardian Legal Solutions is committed to ensuring digital accessibility for people of all
            abilities. We continually improve the user experience for everyone and apply relevant
            accessibility standards across our digital channels.
          </p>

          <h2 className="text-xl font-serif text-legal-charcoal font-semibold">
            Measures Taken to Support Accessibility
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2.5 p-3.5 bg-[#FCFBF9] border border-legal-border rounded-sm">
              <CheckCircle2 className="w-4 h-4 text-legal-gold shrink-0 mt-0.5" />
              <span>
                <strong>Semantic HTML Architecture:</strong> Proper heading hierarchy (H1–H6), landmark
                regions, and ARIA labels.
              </span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 bg-[#FCFBF9] border border-legal-border rounded-sm">
              <CheckCircle2 className="w-4 h-4 text-legal-gold shrink-0 mt-0.5" />
              <span>
                <strong>Accessible Contrast Ratios:</strong> Meeting and exceeding minimum 4.5:1 contrast
                standards for body text.
              </span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 bg-[#FCFBF9] border border-legal-border rounded-sm">
              <CheckCircle2 className="w-4 h-4 text-legal-gold shrink-0 mt-0.5" />
              <span>
                <strong>Keyboard Operability:</strong> Visible gold focus indicators and interactive elements
                navigable via Tab and Enter keys.
              </span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 bg-[#FCFBF9] border border-legal-border rounded-sm">
              <CheckCircle2 className="w-4 h-4 text-legal-gold shrink-0 mt-0.5" />
              <span>
                <strong>Screen Reader Compatibility:</strong> Form inputs with explicit labels and error
                messages.
              </span>
            </div>
          </div>

          <h2 className="text-xl font-serif text-legal-charcoal font-semibold">
            Feedback & Accessibility Assistance
          </h2>
          <p>
            We welcome your feedback on the accessibility of our website. If you encounter accessibility
            barriers, please notify our administrative team at{' '}
            <a href={`mailto:${FIRM_CONFIG.contact.email}`} className="text-legal-gold underline font-mono">
              {FIRM_CONFIG.contact.email}
            </a>{' '}
            or call{' '}
            <span className="font-mono text-legal-charcoal">{FIRM_CONFIG.contact.phoneFormatted}</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
