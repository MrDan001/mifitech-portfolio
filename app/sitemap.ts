import type { MetadataRoute } from 'next';
import { getSeo } from '@/lib/backend';
import { getSiteContent } from '@/lib/site-content';
import { projectPath } from '@/lib/project-slug';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [seo, content] = await Promise.all([getSeo(), getSiteContent()]);
  const root = String(seo.canonicalUrl).replace(/\/$/, '');
  const projectPaths = content.projects
    .filter((project) => project.visible !== false)
    .map((project) => projectPath(project.slug));
  const paths = Array.from(new Set([
    '', '/about', '/privacy', '/how-to-build-a-website-in-nigeria',
    '/website-design-nigeria', '/ecommerce-website-development-nigeria',
    '/custom-web-application-development-nigeria', '/business-management-software-nigeria',
    ...projectPaths,
  ]));
  return paths.map((path) => ({
    url: root + path,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path === '/about' ? 0.85 : path === '/how-to-build-a-website-in-nigeria' ? 0.9 : 0.7,
  }));
}
