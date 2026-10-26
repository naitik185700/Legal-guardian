import React from 'react';
import { dbStore } from '@/lib/db/store';
import { ConsultationManagementView } from '@/components/admin/ConsultationManagementView';

export default async function AdminConsultationsPage() {
  const consultations = dbStore.getConsultations();

  return (
    <div className="space-y-6">
      <div className="border-b border-legal-border pb-4">
        <h1 className="text-2xl font-serif text-legal-charcoal">
          Consultation Requests & Scheduling
        </h1>
        <p className="text-xs text-legal-muted mt-1">
          Review prospective conference times, conduct conflict clearances, and assign calendar slots.
        </p>
      </div>

      <ConsultationManagementView initialConsultations={consultations} />
    </div>
  );
}
