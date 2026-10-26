'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Unable to connect to authentication server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-legal-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(#B59A62_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center space-y-4">
        <div className="inline-block">
          <img
            src="/brand/guardian-legal-logo-white.png"
            alt="Guardian Legal Solutions"
            className="h-12 w-auto mx-auto object-contain"
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-xl font-serif text-white tracking-wide">
            Chambers Counsel & Registrar Portal
          </h1>
          <p className="text-xs text-[#8E8E8E]">
            Authorized Advocates & Administrative Personnel Access Only
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="bg-[#171717] py-8 px-6 sm:px-10 border border-[#2D2D2D] rounded-sm shadow-card space-y-6">
          {error && (
            <div className="p-3.5 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1CCC4]">
                Official Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-legal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@guardianlegalsolutions.com"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#0F0F0F] border border-[#333333] text-white rounded-sm focus:border-legal-gold focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1CCC4]">
                Master Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-legal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#0F0F0F] border border-[#333333] text-white rounded-sm focus:border-legal-gold focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover transition-colors rounded-sm shadow-sm disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Chambers Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#262626] text-center text-[11px] text-[#707070] space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-legal-gold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TLS Encrypted Session & Audit Tracked</span>
            </div>
            <p>Default Superadmin: admin@guardianlegalsolutions.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
