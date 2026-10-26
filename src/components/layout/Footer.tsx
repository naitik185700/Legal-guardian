import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowUpRight, ShieldCheck, Scale } from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-legal-charcoal text-[#CCCCCC] border-t border-[#2A2A2A] relative overflow-hidden">
      {/* Decorative subtle gold line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-legal-gold to-transparent opacity-80" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block" aria-label="Guardian Legal Solutions">
              <div className="flex items-center gap-3">
                <img
                  src="/brand/guardian-legal-logo-white.png"
                  alt="Guardian Legal Solutions"
                  className="h-11 sm:h-12 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-sm leading-relaxed text-[#A3A3A3] max-w-md">
              Guardian Legal Solutions is a dedicated legal practice providing strategic litigation,
              corporate governance advisory, and structured dispute resolution with uncompromising
              standards of integrity, discretion, and legal acumen.
            </p>

            <div className="pt-2 border-t border-[#2A2A2A] space-y-2 text-xs text-[#8A8A8A]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-legal-gold shrink-0" />
                <span>Strict Professional Confidentiality & Conflict Protections</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-legal-gold shrink-0" />
                <span>Dedicated Bar Practice across High Courts & Central Tribunals</span>
              </div>
            </div>
          </div>

          {/* Col 3: Practice Areas */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-sans">
              Core Practice Areas
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A8A8A8]">
              {FIRM_CONFIG.practiceAreas.slice(0, 6).map((pa) => (
                <li key={pa.slug}>
                  <Link
                    href={`/practice-areas/${pa.slug}`}
                    className="hover:text-legal-gold transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{pa.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/practice-areas"
                  className="text-legal-gold hover:underline inline-flex items-center gap-1 text-xs"
                >
                  View All Practice Areas <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-sans">
              The Firm
            </h3>
            <ul className="space-y-2.5 text-xs text-[#A8A8A8]">
              <li>
                <Link href="/about" className="hover:text-legal-gold transition-colors">
                  About the Firm & Ethics
                </Link>
              </li>
              <li>
                <Link href="/our-lawyers" className="hover:text-legal-gold transition-colors">
                  Advocates & Counsel
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-legal-gold transition-colors">
                  Legal Insights & Articles
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-legal-gold transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-legal-gold transition-colors">
                  Consultation Protocol
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-legal-gold transition-colors">
                  Chambers Location & Contact
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-[#6E6E6E] hover:text-legal-gold transition-colors">
                  Counsel Portal (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Chambers & Direct Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-sans">
              Chambers & Contact
            </h3>
            <div className="space-y-3 text-xs text-[#A8A8A8]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-legal-gold shrink-0 mt-0.5" />
                <span>
                  {FIRM_CONFIG.contact.address.line1}, {FIRM_CONFIG.contact.address.city},{' '}
                  {FIRM_CONFIG.contact.address.state} — {FIRM_CONFIG.contact.address.postalCode}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-legal-gold shrink-0" />
                <a
                  href={`tel:${FIRM_CONFIG.contact.phone.replace(/\s+/g, '')}`}
                  className="hover:text-legal-gold transition-colors"
                >
                  {FIRM_CONFIG.contact.phoneFormatted}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-legal-gold shrink-0" />
                <a
                  href={`mailto:${FIRM_CONFIG.contact.email}`}
                  className="hover:text-legal-gold transition-colors break-all"
                >
                  {FIRM_CONFIG.contact.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-[#8A8A8A]">
                <Clock className="w-4 h-4 text-legal-gold shrink-0 mt-0.5" />
                <div>
                  <p>{FIRM_CONFIG.contact.hours.days}</p>
                  <p>{FIRM_CONFIG.contact.hours.time}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Bar Council Disclaimer (Crucial for Legal Practice Accuracy) */}
        <div className="mt-12 pt-8 border-t border-[#242424] text-[11px] leading-relaxed text-[#787878] space-y-3">
          <p className="font-semibold text-[#9E9E9E] uppercase tracking-wide">
            Bar Council Regulatory Disclaimer:
          </p>
          <p>
            As per the rules and regulations of the Bar Council of India, law firms and advocates are not
            permitted to solicit work or advertise in any manner. By accessing this website (
            <span className="text-[#A0A0A0] font-mono">{FIRM_CONFIG.domain}</span>), you acknowledge and
            confirm that you are seeking information relating to Guardian Legal Solutions of your own accord
            and that there has been no form of solicitation, advertisement, or inducement by Guardian Legal
            Solutions or its members. The content of this website is for informational purposes only and
            should not be interpreted as soliciting or legal advice.
          </p>
        </div>

        {/* Sub-footer Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[#202020] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#707070]">
          <p>© {currentYear} Guardian Legal Solutions. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <Link href="/privacy-policy" className="hover:text-legal-gold transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#3A3A3A]">•</span>
            <Link href="/terms-of-use" className="hover:text-legal-gold transition-colors">
              Terms of Use
            </Link>
            <span className="text-[#3A3A3A]">•</span>
            <Link href="/disclaimer" className="hover:text-legal-gold transition-colors">
              Disclaimer
            </Link>
            <span className="text-[#3A3A3A]">•</span>
            <Link href="/accessibility" className="hover:text-legal-gold transition-colors">
              Accessibility Statement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
