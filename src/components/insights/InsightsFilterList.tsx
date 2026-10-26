'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { ArticleItem } from '@/types';

interface InsightsFilterListProps {
  initialArticles: ArticleItem[];
}

export function InsightsFilterList({ initialArticles }: InsightsFilterListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = useMemo(() => {
    const set = new Set<string>();
    initialArticles.forEach((a) => set.add(a.category));
    return ['ALL', ...Array.from(set)];
  }, [initialArticles]);

  const filteredArticles = useMemo(() => {
    return initialArticles.filter((art) => {
      const matchesCategory = selectedCategory === 'ALL' || art.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.authorName.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [initialArticles, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="bg-white p-6 border border-legal-border rounded-sm shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-legal-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, topics, or statutes..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-[#FCFBF9] border border-legal-border rounded-sm focus:bg-white focus:border-legal-gold focus:outline-none"
          />
        </div>

        {/* Category Pills */}
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
              {cat === 'ALL' ? 'All Disciplines' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Listing */}
      {filteredArticles.length === 0 ? (
        <div className="bg-white p-12 text-center border border-legal-border rounded-sm space-y-3">
          <p className="font-serif text-lg text-legal-charcoal">No articles match your search criteria</p>
          <p className="text-xs text-legal-muted">Try clearing the search query or selecting another discipline.</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
            }}
            className="text-xs text-legal-gold font-semibold underline pt-2"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((art) => (
            <article
              key={art.slug}
              className="bg-white border border-legal-border rounded-sm overflow-hidden shadow-subtle hover:shadow-card hover:border-legal-gold/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="h-48 overflow-hidden bg-legal-ivory relative">
                  <img
                    src={art.coverImageUrl}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-legal-black/80 text-legal-gold rounded-sm backdrop-blur-sm">
                    {art.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-legal-muted">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-legal-gold" />
                      {art.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-legal-gold" />
                      {art.readingTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif text-legal-charcoal group-hover:text-legal-gold transition-colors leading-snug">
                    <Link href={`/insights/${art.slug}`}>{art.title}</Link>
                  </h3>

                  <p className="text-xs text-legal-body leading-relaxed line-clamp-3">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-legal-border/60 flex items-center justify-between text-xs text-legal-muted">
                <span className="flex items-center gap-1.5 truncate max-w-[180px]">
                  <User className="w-3.5 h-3.5 text-legal-gold shrink-0" />
                  <span className="truncate">{art.authorName}</span>
                </span>
                <Link
                  href={`/insights/${art.slug}`}
                  className="font-semibold text-legal-charcoal group-hover:text-legal-gold inline-flex items-center gap-1 transition-colors shrink-0"
                >
                  <span>Read Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
