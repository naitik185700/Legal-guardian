import { MetadataRoute } from 'next';
import { FIRM_CONFIG } from '@/lib/config/firm';
import { dbStore } from '@/lib/db/store';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = FIRM_CONFIG.domain;
  const now = new Date().toISOString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${domain}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${domain}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${domain}/practice-areas`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${domain}/our-lawyers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${domain}/insights`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${domain}/faqs`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${domain}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${domain}/consultation`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${domain}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${domain}/terms-of-use`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${domain}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${domain}/accessibility`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const practiceAreaRoutes: MetadataRoute.Sitemap = FIRM_CONFIG.practiceAreas.map((pa) => ({
    url: `${domain}/practice-areas/${pa.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const lawyerRoutes: MetadataRoute.Sitemap = FIRM_CONFIG.lawyers.map((l) => ({
    url: `${domain}/our-lawyers/${l.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const articleRoutes: MetadataRoute.Sitemap = dbStore.getArticles().map((a) => ({
    url: `${domain}/insights/${a.slug}`,
    lastModified: a.publishedAt || now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...practiceAreaRoutes, ...lawyerRoutes, ...articleRoutes];
}
