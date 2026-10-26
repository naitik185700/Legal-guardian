'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '@/types';

interface HomeFaqSectionProps {
  faqs: FAQItem[];
}

export function HomeFaqSection({ faqs }: HomeFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.id}
            className="border border-legal-border bg-white rounded-sm overflow-hidden transition-all duration-200"
          >
            <button
              type="button"
              onClick={() => toggle(index)}
              className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-legal-gold"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-base sm:text-lg text-legal-charcoal font-medium">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-legal-gold shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-sm text-legal-body leading-relaxed border-t border-legal-border/50">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
