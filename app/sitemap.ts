import type { MetadataRoute } from 'next';
import { getSeo } from '@/lib/backend';
import { getSiteContent } from '@/lib/site-content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [seo, content] = await Promise.all([getSeo(), getSiteContent()]);
  const root = String(seo.canonicalUrl).replace(/\/$/, '');
  const projectPaths = content.projects.filter((project) => project.visible !== false).map((project) => '/projects/' + project.slug);
  const demoPaths = content.demos.filter((demo) => demo.visible !== false).map((demo) => demo.href?.startsWith('/') ? demo.href : '/demos/' + demo.slug);
  const paths = Array.from(new Set(['', '/privacy', '/how-to-build-a-website-in-nigeria', ...projectPaths, ...demoPaths]));
  return paths.map((path) => ({
    url: root + path,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/how-to-build-a-website-in-nigeria' ? 0.9 : 0.7,
  }));
}
