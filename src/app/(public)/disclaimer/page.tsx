import React from 'react';
import { Metadata } from 'next';
import { Scale, ShieldAlert } from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';

export const metadata: Metadata = {
  title: 'Bar Council Disclaimer & Regulatory Notice',
  description:
    'Official Bar Council of India regulatory disclaimer and ethics compliance notice for Guardian Legal Solutions.',
};

export default function DisclaimerPage() {
  return (
    <div className="bg-[#F8F6F1] py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border border-legal-border p-8 sm:p-12 rounded-sm shadow-subtle space-y-8">
        <div className="border-b border-legal-border pb-6 flex items-start justify-between">
          <div>
            <span className="text-xs uppercase tracking-widest text-legal-gold font-semibold">
              Statutory Compliance
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-legal-charcoal mt-1">
              Legal Disclaimer & Bar Council Notice
            </h1>
          </div>
          <Scale className="w-8 h-8 text-legal-gold shrink-0 mt-1" />
        </div>

        <div className="p-6 bg-[#FCFBF9] border border-legal-border rounded-sm text-xs text-legal-charcoal space-y-3">
          <div className="flex items-center gap-2 font-semibold uppercase tracking-wider text-legal-gold">
            <ShieldAlert className="w-4 h-4" />
            <span>Rule 36, Bar Council of India Rules Compliance</span>
          </div>
          <p className="leading-relaxed">
            As per the rules of the Bar Council of India, advocates and law firms in India are strictly
            prohibited from soliciting work or advertising in any form or manner.
          </p>
        </div>

        <div className="prose prose-legal text-sm text-legal-body leading-relaxed space-y-6 font-light">
          <p>
            By proceeding to access and browse this website, the user expressly acknowledges and confirms the
            following declarations:
          </p>

          <ol className="list-decimal pl-5 space-y-3 text-xs leading-relaxed">
            <li>
              <strong>Voluntary Access:</strong> The user is accessing this website of their own volition and
              free will for their own information and general educational knowledge regarding the legal
              landscape.
            </li>
            <li>
              <strong>No Solicitation or Advertisement:</strong> There has been no advertisement, personal
              communication, solicitation, invitation, or inducement of any sort whatsoever from Guardian
              Legal Solutions or any of its partners, associates, or members to solicit work through this
              website.
            </li>
            <li>
              <strong>Informational Character:</strong> The information provided under this website is made
              available strictly at the user&apos;s request for informational purposes only and should not be
              construed or interpreted as legal advice, soliciting, or personal promotion.
            </li>
            <li>
              <strong>No Privileged Relationship:</strong> The receipt or transmission of any materials or
              preliminary form data does not create an advocate-client relationship. Guardian Legal Solutions
              is not liable for any consequence of any action taken by the user relying on material or
              information provided under this website.
            </li>
            <li>
              <strong>Independent Counsel Recommendation:</strong> In all cases where the user has any legal
              issues, they must seek independent legal counsel tailored to their specific jurisdiction and
              evidentiary record.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
