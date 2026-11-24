import type { MetadataRoute } from 'next';
import { getSiteContent } from '@/lib/site-content';
import { projectPath } from '@/lib/project-slug';
import { blogPosts } from '@/lib/blog-posts';
import { SITE_URL } from '@/lib/contact';

// Keep the sitemap on the final canonical host and include publication updates
// so search engines can reliably discover every published editorial URL.
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getSiteContent();
  const root = SITE_URL;
  const projectPaths = content.projects
    .filter((project) => project.visible !== false)
    .map((project) => projectPath(project.slug));
  const solutionPaths = [
    '/solutions/restaurant',
    '/solutions/salon',
    '/solutions/ecommerce',
    '/solutions/clinic',
    '/solutions/real-estate',
    '/solutions/school',
  ];
  const paths = Array.from(new Set([
    '', '/about', '/privacy', '/services/web-design', '/services/ecommerce-development', '/services/custom-web-applications', '/services/business-software', '/services/seo-growth', '/services/website-care', '/how-to-build-a-website-in-nigeria', '/website-design-cost-nigeria', '/choose-website-design-company-nigeria',
    '/website-design-nigeria', '/ecommerce-website-development-nigeria',
    '/custom-web-application-development-nigeria', '/business-management-software-nigeria',
    ...solutionPaths,
    '/blog',
    ...blogPosts.map((post) => '/blog/' + post.slug),
    ...projectPaths,
  ]));
  const blogByPath = new Map(blogPosts.map((post) => ['/blog/' + post.slug, post]));
  return paths.map((path) => {
    const post = blogByPath.get(path);
    return {
      url: root + path,
      ...(post ? { lastModified: new Date(post.updatedAt + 'T12:00:00Z') } : {}),
      changeFrequency: path === '' ? 'weekly' : 'monthly',
      priority: path === '' ? 1 : path === '/blog' ? 0.85 : post ? 0.75 : path === '/about' ? 0.85 : path === '/how-to-build-a-website-in-nigeria' ? 0.9 : solutionPaths.includes(path) ? 0.8 : 0.7,
    };
  });
}
