import React from 'react';
import { dbStore } from '@/lib/db/store';
import { EnquiryManagementView } from '@/components/admin/EnquiryManagementView';

export default async function AdminEnquiriesPage() {
  const enquiries = dbStore.getEnquiries();

  return (
    <div className="space-y-6">
      <div className="border-b border-legal-border pb-4">
        <h1 className="text-2xl font-serif text-legal-charcoal">
          Incoming Enquiries & Lead Management
        </h1>
        <p className="text-xs text-legal-muted mt-1">
          Review, filter, assign status, and maintain private counsel notes on incoming client briefs.
        </p>
      </div>

      <EnquiryManagementView initialEnquiries={enquiries} />
    </div>
  );
}
