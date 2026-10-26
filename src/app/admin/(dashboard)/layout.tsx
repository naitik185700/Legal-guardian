import React from 'react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getAdminSession } from '@/lib/auth/jwt';
import {
  LayoutDashboard,
  Inbox,
  CalendarCheck,
  ShieldAlert,
  LogOut,
  ExternalLink,
  Scale,
  Users,
} from 'lucide-react';
import { AdminSignoutButton } from '@/components/admin/AdminSignoutButton';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#F3EFEA] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-legal-black text-[#D6D0C5] border-r border-[#242424] flex flex-col justify-between shrink-0">
        <div>
          {/* Brand Emblem */}
          <div className="p-6 border-b border-[#242424]">
            <Link href="/admin" className="flex items-center gap-2.5">
              <img
                src="/brand/guardian-emblem.png"
                alt="Guardian Emblem"
                className="w-7 h-7 object-contain"
              />
              <div>
                <span className="font-serif font-bold text-white text-sm tracking-wide block">
                  Guardian Legal
                </span>
                <span className="text-[10px] text-legal-gold uppercase tracking-wider block">
                  Chambers Admin
                </span>
              </div>
            </Link>
          </div>

          {/* User Session Bar */}
          <div className="px-6 py-4 bg-[#141414] border-b border-[#222222]">
            <p className="text-xs font-semibold text-white truncate">{session.name}</p>
            <p className="text-[11px] text-legal-gold uppercase tracking-wider mt-0.5">
              {session.role.replace('_', ' ')}
            </p>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1 text-xs">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded hover:bg-[#1C1C1C] hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-legal-gold" />
              <span>Dashboard Overview</span>
            </Link>

            <Link
              href="/admin/enquiries"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded hover:bg-[#1C1C1C] hover:text-white transition-colors"
            >
              <Inbox className="w-4 h-4 text-legal-gold" />
              <span>Incoming Enquiries</span>
            </Link>

            <Link
              href="/admin/consultations"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded hover:bg-[#1C1C1C] hover:text-white transition-colors"
            >
              <CalendarCheck className="w-4 h-4 text-legal-gold" />
              <span>Consultation Requests</span>
            </Link>

            <Link
              href="/admin/audit-logs"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded hover:bg-[#1C1C1C] hover:text-white transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-legal-gold" />
              <span>Security Audit Logs</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#242424] space-y-2 text-xs">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 text-[#9E9E9E] hover:text-white hover:bg-[#171717] rounded transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-legal-gold" />
          </Link>

          <AdminSignoutButton />
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
