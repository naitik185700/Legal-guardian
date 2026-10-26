import React from 'react';
import { dbStore } from '@/lib/db/store';
import { ShieldCheck, Clock, Terminal } from 'lucide-react';

export default async function AdminAuditLogsPage() {
  const logs = dbStore.getAuditLogs();

  return (
    <div className="space-y-6">
      <div className="border-b border-legal-border pb-4">
        <h1 className="text-2xl font-serif text-legal-charcoal">
          Security & Procedural Audit Logs
        </h1>
        <p className="text-xs text-legal-muted mt-1">
          Cryptographically recorded timestamps of enquiries, status modifications, and administrator access.
        </p>
      </div>

      <div className="bg-white border border-legal-border rounded-sm shadow-subtle overflow-hidden">
        <div className="p-4 bg-[#FCFBF9] border-b border-legal-border flex items-center justify-between text-xs text-legal-muted">
          <div className="flex items-center gap-2 font-semibold uppercase tracking-wider text-legal-charcoal">
            <Terminal className="w-4 h-4 text-legal-gold" />
            <span>Immutable Action Log ({logs.length} entries)</span>
          </div>
          <span className="text-[11px]">Retention: 500 records</span>
        </div>

        <div className="divide-y divide-legal-border/60">
          {logs.length === 0 ? (
            <p className="p-8 text-center text-xs text-legal-muted">No audit logs recorded yet.</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-[#FCFBF9] transition-colors flex items-start justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 font-mono text-[10px] uppercase font-bold bg-legal-ivory border border-legal-border rounded text-legal-charcoal">
                      {log.action}
                    </span>
                    <span className="font-semibold text-legal-charcoal">{log.entity}</span>
                  </div>
                  <p className="text-legal-body font-mono text-[11px]">{log.details}</p>
                </div>

                <div className="text-right shrink-0 text-legal-muted text-[11px] font-mono">
                  {new Date(log.timestamp).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
