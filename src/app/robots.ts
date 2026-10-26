import { MetadataRoute } from 'next';
import { FIRM_CONFIG } from '@/lib/config/firm';

export default function robots(): MetadataRoute.Robots {
  const domain = FIRM_CONFIG.domain;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${domain}/sitemap.xml`,
  };
}
