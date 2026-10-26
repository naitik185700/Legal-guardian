'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/types';

interface FaqsDirectoryProps {
  allFaqs: FAQItem[];
}

export function FaqsDirectory({ allFaqs }: FaqsDirectoryProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [openIds, setOpenIds] = useState<Set<string>>(new Set([allFaqs[0]?.id || '']));

  const categories = useMemo(() => {
    const set = new Set<string>();
    allFaqs.forEach((f) => set.add(f.category));
    return ['ALL', ...Array.from(set)];
  }, [allFaqs]);

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((f) => {
      const matchCat = selectedCategory === 'ALL' || f.category === selectedCategory;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q || f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [allFaqs, selectedCategory, search]);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-8">
      {/* Search & Category Filter */}
      <div className="bg-white p-6 border border-legal-border rounded-sm shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-legal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs by question or keyword..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs rounded-sm transition-colors uppercase tracking-wider font-semibold ${
                selectedCategory === cat
                  ? 'bg-legal-gold text-legal-black'
                  : 'bg-[#FCFBF9] text-legal-muted border border-legal-border hover:border-legal-gold hover:text-legal-charcoal'
              }`}
            >
              {cat === 'ALL' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Accordions */}
      {filteredFaqs.length === 0 ? (
        <div className="bg-white p-12 text-center border border-legal-border rounded-sm space-y-2">
          <p className="font-serif text-lg text-legal-charcoal">No questions match your query</p>
          <p className="text-xs text-legal-muted">Try using different search terms or contact chambers directly.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.has(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white border border-legal-border rounded-sm shadow-subtle overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full text-left px-6 py-4 sm:py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-legal-gold"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-legal-gold">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg text-legal-charcoal font-medium">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-legal-gold shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-legal-body leading-relaxed border-t border-legal-border/50 font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
