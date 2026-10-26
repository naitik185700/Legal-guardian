'use client';

import React, { useState } from 'react';
import { EnquiryRecord, LeadStatus } from '@/types';
import { Search, Filter, Download, Check, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  initialEnquiries: EnquiryRecord[];
}

const STATUS_OPTIONS: LeadStatus[] = [
  'NEW',
  'CONTACTED',
  'CONSULTATION_REQUESTED',
  'IN_PROGRESS',
  'CLOSED',
];

export function EnquiryManagementView({ initialEnquiries }: Props) {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>(initialEnquiries);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [updating, setUpdating] = useState(false);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<LeadStatus>('NEW');

  const filtered = enquiries.filter((e) => {
    const matchStatus = statusFilter === 'ALL' || e.status === statusFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      e.fullName.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.phone.toLowerCase().includes(q) ||
      e.referenceNumber.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const openDrawer = (e: EnquiryRecord) => {
    setSelectedEnquiry(e);
    setNotes(e.staffNotes || '');
    setStatus(e.status);
  };

  const handleUpdate = async () => {
    if (!selectedEnquiry) return;
    setUpdating(true);
    try {
      const res = await fetch('/api/admin/enquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedEnquiry.id,
          status,
          staffNotes: notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setEnquiries((prev) =>
        prev.map((item) => (item.id === selectedEnquiry.id ? data.enquiry : item))
      );
      setSelectedEnquiry(data.enquiry);
      alert('Enquiry status and notes updated successfully.');
    } catch (err: any) {
      alert(err.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Ref', 'Name', 'Email', 'Phone', 'Practice Area', 'Status', 'Date'];
    const rows = filtered.map((e) => [
      e.referenceNumber,
      `"${e.fullName.replace(/"/g, '""')}"`,
      e.email,
      e.phone,
      `"${(e.practiceAreaName || '').replace(/"/g, '""')}"`,
      e.status,
      e.createdAt,
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guardian-legal-enquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white p-4 border border-legal-border rounded-sm shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="w-4 h-4 text-legal-gold absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client, ref, or email..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-[#FCFBF9] border border-legal-border rounded-sm focus:border-legal-gold focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#FCFBF9] border border-legal-border rounded-sm focus:border-legal-gold focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            {STATUS_OPTIONS.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={exportCSV}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-white border border-legal-border hover:border-legal-gold rounded-sm transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-legal-gold" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-legal-border rounded-sm shadow-subtle overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#FCFBF9] border-b border-legal-border uppercase tracking-wider font-semibold text-legal-muted">
            <tr>
              <th className="p-4">Ref Number</th>
              <th className="p-4">Client</th>
              <th className="p-4">Practice Area</th>
              <th className="p-4">Channel</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-legal-border/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-legal-muted">
                  No enquiries matching the selected filter.
                </td>
              </tr>
            ) : (
              filtered.map((enq) => (
                <tr key={enq.id} className="hover:bg-[#FCFBF9] transition-colors">
                  <td className="p-4 font-mono font-medium text-legal-charcoal">{enq.referenceNumber}</td>
                  <td className="p-4">
                    <p className="font-semibold text-legal-charcoal">{enq.fullName}</p>
                    <p className="text-[11px] text-legal-muted">{enq.email}</p>
                  </td>
                  <td className="p-4 text-legal-charcoal">
                    {enq.practiceAreaName || enq.practiceAreaSlug || 'General'}
                  </td>
                  <td className="p-4 uppercase text-[11px] text-legal-muted">
                    {enq.preferredContactMethod}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded ${
                        enq.status === 'NEW'
                          ? 'bg-amber-100 text-amber-800'
                          : enq.status === 'CONTACTED'
                          ? 'bg-blue-100 text-blue-800'
                          : enq.status === 'CLOSED'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {enq.status}
                    </span>
                  </td>
                  <td className="p-4 text-legal-muted">{enq.createdAt.split('T')[0]}</td>
                  <td className="p-4 text-right">
                    <button
                      type="button"
                      onClick={() => openDrawer(enq)}
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

      {/* Detail / Update Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-legal-border rounded-sm shadow-card max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-legal-border pb-4 flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-wider font-mono text-legal-gold">
                  {selectedEnquiry.referenceNumber}
                </span>
                <h3 className="text-xl font-serif text-legal-charcoal font-bold mt-0.5">
                  {selectedEnquiry.fullName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="text-gray-400 hover:text-gray-600 text-sm font-semibold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-legal-charcoal">Email Address:</p>
                  <p className="text-legal-muted mt-0.5">{selectedEnquiry.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-legal-charcoal">Phone Number:</p>
                  <p className="text-legal-muted mt-0.5">{selectedEnquiry.phone}</p>
                </div>
              </div>

              <div>
                <p className="font-semibold text-legal-charcoal">Matter Summary Submitted:</p>
                <div className="mt-1 p-3 bg-legal-ivory rounded border border-legal-border text-legal-charcoal leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.enquirySummary}
                </div>
              </div>

              <div className="pt-2 border-t border-legal-border space-y-3">
                <div>
                  <label className="block font-semibold text-legal-charcoal mb-1">
                    Update Lead Status:
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as LeadStatus)}
                    className="w-full px-3 py-2 text-xs bg-[#FCFBF9] border border-legal-border rounded-sm focus:border-legal-gold focus:outline-none"
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-legal-charcoal mb-1">
                    Internal Staff Notes (Restricted Access):
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter conflict check results, counsel notes, or next action items..."
                    className="w-full px-3 py-2 text-xs bg-[#FCFBF9] border border-legal-border rounded-sm focus:border-legal-gold focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-legal-border">
              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
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
                <span>Save Updates</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
