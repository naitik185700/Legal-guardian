'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function AdminSignoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="w-full flex items-center justify-between px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded transition-colors text-xs"
    >
      <span>Sign Out Session</span>
      <LogOut className="w-3.5 h-3.5" />
    </button>
  );
}
