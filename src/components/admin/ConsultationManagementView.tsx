'use client';

import React, { useState } from 'react';
import { ConsultationRecord, ConsultationStatus } from '@/types';
import { Search, CalendarCheck, Download, Check, Loader2 } from 'lucide-react';

interface Props {
  initialConsultations: ConsultationRecord[];
}

const STATUSES: ConsultationStatus[] = [
  'REQUESTED',
  'CONFIRMED',
  'RESCHEDULED',
  'COMPLETED',
  'CANCELLED',
];

export function ConsultationManagementView({ initialConsultations }: Props) {
  const [consultations, setConsultations] = useState<ConsultationRecord[]>(initialConsultations);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selected, setSelected] = useState<ConsultationRecord | null>(null);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState<ConsultationStatus>('REQUESTED');
  const [notes, setNotes] = useState('');

  const filtered = consultations.filter((c) => {
    const matchStatus = statusFilter === 'ALL' || c.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      c.fullName.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.referenceNumber.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const openModal = (c: ConsultationRecord) => {
    setSelected(c);
    setStatus(c.status);
    setNotes(c.staffNotes || '');
  };

  const handleUpdate = async () => {
    if (!selected) return;
    setUpdating(true);
    try {
      const res = await fetch('/api/admin/consultations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selected.id,
          status,
          staffNotes: notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setConsultations((prev) =>
        prev.map((item) => (item.id === selected.id ? data.consultation : item))
      );
      setSelected(data.consultation);
      alert('Consultation updated successfully.');
    } catch (err: any) {
      alert(err.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 border border-legal-border rounded-sm shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-legal-gold absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client or reference..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FCFBF9] border border-legal-border rounded-sm focus:border-legal-gold focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#FCFBF9] border border-legal-border rounded-sm focus:border-legal-gold focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            {STATUSES.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border border-legal-border rounded-sm shadow-subtle overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FCFBF9] border-b border-legal-border uppercase tracking-wider font-semibold text-legal-muted">
            <tr>
              <th className="p-4">Ref Number</th>
              <th className="p-4">Client</th>
              <th className="p-4">Format</th>
              <th className="p-4">Requested Slot</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-legal-border/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-legal-muted">
                  No consultation requests recorded yet.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr key={c.id} className="hover:bg-[#FCFBF9] transition-colors">
                  <td className="p-4 font-mono font-medium text-legal-charcoal">{c.referenceNumber}</td>
                  <td className="p-4">
                    <p className="font-semibold text-legal-charcoal">{c.fullName}</p>
                    <p className="text-[11px] text-legal-muted">{c.email}</p>
                  </td>
                  <td className="p-4 uppercase text-[11px] text-legal-muted">
                    {c.consultationFormat.replace(/_/g, ' ')}
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-legal-charcoal">{c.preferredDate}</p>
                    <p className="text-[11px] text-legal-muted">{c.preferredTimeSlot}</p>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded ${
                        c.status === 'REQUESTED'
                          ? 'bg-amber-100 text-amber-800'
                          : c.status === 'CONFIRMED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => openModal(c)}
                      className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-legal-ivory hover:bg-legal-gold hover:text-legal-black border border-legal-border rounded transition-colors"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-legal-border rounded-sm shadow-card max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-legal-border pb-4 flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-legal-gold">
                  {selected.referenceNumber}
                </span>
                <h3 className="text-xl font-serif text-legal-charcoal font-bold mt-0.5">
                  {selected.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-legal-charcoal">Requested Slot:</p>
                  <p className="text-legal-muted mt-0.5">
                    {selected.preferredDate} ({selected.preferredTimeSlot})
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-legal-charcoal">Format:</p>
                  <p className="text-legal-muted mt-0.5">{selected.consultationFormat}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-legal-charcoal">Case Background Summary:</p>
                <div className="mt-1 p-3 bg-legal-ivory rounded border border-legal-border text-legal-charcoal leading-relaxed whitespace-pre-wrap">
                  {selected.caseSummary}
                </div>
              </div>

              <div className="pt-2 border-t border-legal-border space-y-3">
                <div>
                  <label className="block font-semibold text-legal-charcoal mb-1">
                    Update Appointment Status:
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ConsultationStatus)}
                    className="w-full px-3 py-2 text-xs bg-[#FCFBF9] border border-legal-border rounded-sm focus:border-legal-gold focus:outline-none"
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-legal-charcoal mb-1">
                    Registrar Calendar & Conflict Notes:
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter calendar invite link, assigned advocate, or conflict check result..."
                    className="w-full px-3 py-2 text-xs bg-[#FCFBF9] border border-legal-border rounded-sm focus:border-legal-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-legal-border">
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-legal-charcoal hover:bg-gray-100 rounded transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={updating}
                onClick={handleUpdate}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover rounded transition-colors"
              >
                {updating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                <span>Save Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
