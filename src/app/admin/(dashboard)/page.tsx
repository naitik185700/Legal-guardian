import React from 'react';
import Link from 'next/link';
import { dbStore } from '@/lib/db/store';
import {
  Inbox,
  CalendarCheck,
  Clock,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
  Scale,
} from 'lucide-react';

export default async function AdminDashboardOverview() {
  const enquiries = dbStore.getEnquiries();
  const consultations = dbStore.getConsultations();
  const auditLogs = dbStore.getAuditLogs();

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'NEW').length;
  const pendingConsultationsCount = consultations.filter((c) => c.status === 'REQUESTED').length;

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="border-b border-legal-border pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif text-legal-charcoal">
            Chambers Overview & Registry
          </h1>
          <p className="text-xs text-legal-muted mt-1">
            Real-time intake tracking, consultation bookings, and ethical records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/enquiries"
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover transition-colors rounded-sm shadow-sm"
          >
            Review Enquiries
          </Link>
          <Link
            href="/admin/consultations"
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-white border border-legal-border hover:border-legal-gold text-legal-charcoal transition-colors rounded-sm"
          >
            Review Appointments
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 border border-legal-border rounded-sm shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-legal-muted uppercase tracking-wider font-semibold">
            <span>Total Enquiries</span>
            <Inbox className="w-4 h-4 text-legal-gold" />
          </div>
          <p className="text-3xl font-serif text-legal-charcoal">{enquiries.length}</p>
          <p className="text-[11px] text-green-700 font-medium">
            {newEnquiriesCount} awaiting review
          </p>
        </div>

        <div className="bg-white p-6 border border-legal-border rounded-sm shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-legal-muted uppercase tracking-wider font-semibold">
            <span>Consultation Requests</span>
            <CalendarCheck className="w-4 h-4 text-legal-gold" />
          </div>
          <p className="text-3xl font-serif text-legal-charcoal">{consultations.length}</p>
          <p className="text-[11px] text-amber-700 font-medium">
            {pendingConsultationsCount} pending conflict check
          </p>
        </div>

        <div className="bg-white p-6 border border-legal-border rounded-sm shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-legal-muted uppercase tracking-wider font-semibold">
            <span>Audit Trail Entries</span>
            <ShieldCheck className="w-4 h-4 text-legal-gold" />
          </div>
          <p className="text-3xl font-serif text-legal-charcoal">{auditLogs.length}</p>
          <p className="text-[11px] text-legal-muted">All administrative actions recorded</p>
        </div>

        <div className="bg-white p-6 border border-legal-border rounded-sm shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-legal-muted uppercase tracking-wider font-semibold">
            <span>Active Practice Areas</span>
            <Scale className="w-4 h-4 text-legal-gold" />
          </div>
          <p className="text-3xl font-serif text-legal-charcoal">6</p>
          <p className="text-[11px] text-legal-muted">Verified substantive disciplines</p>
        </div>
      </div>

      {/* Recent Enquiries & Consultations Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Enquiries */}
        <div className="bg-white p-6 border border-legal-border rounded-sm shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-legal-border pb-3">
            <h2 className="font-serif font-bold text-legal-charcoal text-base">
              Latest Incoming Enquiries
            </h2>
            <Link
              href="/admin/enquiries"
              className="text-xs text-legal-gold hover:underline font-semibold flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {enquiries.length === 0 ? (
            <p className="text-xs text-legal-muted py-6 text-center">No incoming enquiries recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {enquiries.slice(0, 4).map((enq) => (
                <div
                  key={enq.id}
                  className="p-3.5 bg-[#FCFBF9] border border-legal-border rounded-sm flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-0.5 truncate">
                    <p className="font-semibold text-legal-charcoal truncate">{enq.fullName}</p>
                    <p className="text-legal-muted truncate">
                      {enq.practiceAreaName || enq.practiceAreaSlug || 'General'} • {enq.email}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded shrink-0 ${
                      enq.status === 'NEW'
                        ? 'bg-amber-100 text-amber-800'
                        : enq.status === 'CONTACTED'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {enq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Consultations */}
        <div className="bg-white p-6 border border-legal-border rounded-sm shadow-subtle space-y-4">
          <div className="flex items-center justify-between border-b border-legal-border pb-3">
            <h2 className="font-serif font-bold text-legal-charcoal text-base">
              Latest Scheduled Bookings
            </h2>
            <Link
              href="/admin/consultations"
              className="text-xs text-legal-gold hover:underline font-semibold flex items-center gap-1"
            >
              View All <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {consultations.length === 0 ? (
            <p className="text-xs text-legal-muted py-6 text-center">No consultations booked yet.</p>
          ) : (
            <div className="space-y-3">
              {consultations.slice(0, 4).map((cns) => (
                <div
                  key={cns.id}
                  className="p-3.5 bg-[#FCFBF9] border border-legal-border rounded-sm flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-0.5 truncate">
                    <p className="font-semibold text-legal-charcoal truncate">{cns.fullName}</p>
                    <p className="text-legal-muted truncate">
                      {cns.preferredDate} • {cns.preferredTimeSlot}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-semibold rounded shrink-0 ${
                      cns.status === 'REQUESTED'
                        ? 'bg-amber-100 text-amber-800'
                        : cns.status === 'CONFIRMED'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {cns.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
