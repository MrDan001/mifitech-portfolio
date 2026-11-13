import type { MetadataRoute } from 'next';
import { getSeo } from '@/lib/backend';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSeo();
  const root = String(seo.canonicalUrl).replace(/\/$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api/', '/proposal/', '/proposals/'],
    },
    sitemap: root + '/sitemap.xml',
    host: root,
  };
}
