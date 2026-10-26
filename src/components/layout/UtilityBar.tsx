import Link from 'next/link';
import { Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';

export function UtilityBar() {
  return (
    <div className="bg-legal-black text-[#D1CCC4] border-b border-[#2A2A2A] text-xs py-2 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6">
          <a
            href={`tel:${FIRM_CONFIG.contact.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-legal-gold transition-colors text-[11px] sm:text-xs"
            aria-label="Direct legal telephone line"
          >
            <Phone className="w-3 h-3 text-legal-gold shrink-0" />
            <span>{FIRM_CONFIG.contact.phoneFormatted}</span>
          </a>

          <a
            href={`mailto:${FIRM_CONFIG.contact.email}`}
            className="hidden xs:flex items-center gap-1.5 hover:text-legal-gold transition-colors text-[11px] sm:text-xs truncate max-w-[210px] sm:max-w-none"
            aria-label="Official firm email address"
          >
            <Mail className="w-3 h-3 text-legal-gold shrink-0" />
            <span className="truncate">{FIRM_CONFIG.contact.email}</span>
          </a>

          <div className="hidden lg:flex items-center gap-1.5 text-[#9E9E9E]">
            <Clock className="w-3 h-3 text-legal-gold/80 shrink-0" />
            <span>
              {FIRM_CONFIG.contact.hours.days}: {FIRM_CONFIG.contact.hours.time}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#A8A8A8]">
            <ShieldCheck className="w-3.5 h-3.5 text-legal-gold shrink-0" />
            <span>Confidential & Ethics Compliant</span>
          </div>
          <span className="hidden sm:inline text-[#3E3E3E]">|</span>
          <Link
            href="/admin/login"
            className="text-[11px] text-[#8E8E8E] hover:text-legal-gold transition-colors"
            aria-label="Chambers Counsel Portal Login"
          >
            Counsel Portal
          </Link>
        </div>
      </div>
    </div>
  );
}
