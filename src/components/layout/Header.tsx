'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { FIRM_CONFIG } from '@/lib/config/firm';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About the Firm' },
  { href: '/practice-areas', label: 'Practice Areas' },
  { href: '/our-lawyers', label: 'Our Lawyers' },
  { href: '/insights', label: 'Insights' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-subtle border-b border-legal-border'
          : 'bg-[#FCFBF9] border-b border-legal-border/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Official Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-legal-gold rounded-sm"
            aria-label="Guardian Legal Solutions Home"
          >
            <div className="relative h-12 sm:h-14 w-auto flex items-center">
              <img
                src="/brand/guardian-legal-logo-trimmed.png"
                alt="Guardian Legal Solutions Logo - Scales of Justice Emblem"
                className="h-10 sm:h-12 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3.5 py-2 text-sm font-medium transition-colors duration-150 rounded-sm relative ${
                    isActive
                      ? 'text-legal-charcoal font-semibold'
                      : 'text-legal-body hover:text-legal-charcoal hover:bg-black/[0.02]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-legal-gold" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-legal-black bg-legal-gold hover:bg-legal-gold-hover transition-all duration-200 rounded-sm shadow-sm hover:shadow active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-legal-gold"
            >
              <span>Request Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <Link
              href="/consultation"
              className="sm:hidden inline-flex items-center px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-legal-gold text-legal-black rounded-sm"
            >
              Consult
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-sm text-legal-charcoal hover:bg-legal-ivory-dark focus:outline-none focus:ring-2 focus:ring-legal-gold"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-legal-border px-4 pt-3 pb-6 shadow-elevated">
          <div className="space-y-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 text-base rounded-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-legal-ivory text-legal-charcoal font-semibold border-l-4 border-legal-gold'
                      : 'text-legal-body hover:bg-legal-ivory-light hover:text-legal-charcoal'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-legal-border space-y-3">
            <Link
              href="/consultation"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider uppercase text-legal-black bg-legal-gold hover:bg-legal-gold-hover transition-colors rounded-sm shadow-sm"
            >
              <span>Request a Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="p-3 bg-legal-ivory rounded-sm text-xs text-legal-muted space-y-1">
              <p className="font-semibold text-legal-charcoal">Chambers Reception:</p>
              <p>{FIRM_CONFIG.contact.phoneFormatted}</p>
              <p>{FIRM_CONFIG.contact.email}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
