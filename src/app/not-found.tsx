import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center p-6 text-center">
      <div className="max-w-md bg-white border border-legal-border p-10 rounded-sm shadow-card space-y-6">
        <div className="w-16 h-16 rounded-full bg-legal-ivory mx-auto flex items-center justify-center text-legal-gold border border-legal-border">
          <Scale className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-legal-gold font-semibold">
            Status Code 404
          </span>
          <h1 className="text-2xl font-serif text-legal-charcoal">
            Legal Record or Page Not Found
          </h1>
          <p className="text-xs text-legal-muted leading-relaxed">
            The brief, document, or page you are seeking does not exist or may have been relocated within our
            chambers directory.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black hover:bg-legal-gold-hover transition-colors rounded-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home Chambers</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
