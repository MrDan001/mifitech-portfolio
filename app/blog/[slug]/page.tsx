import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '../../components/SiteNav';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';
import { SITE_URL } from '@/lib/contact';

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article not found | MifiTech', robots: { index: false, follow: false } };
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: '/blog/' + post.slug },
    openGraph: { title: post.title, description: post.description, type: 'article', publishedTime: post.publishedAt, modifiedTime: post.updatedAt },
    twitter: { card: 'summary', title: post.title, description: post.description },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = SITE_URL + '/blog/' + post.slug;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'MifiTech', url: SITE_URL + '/about' },
    publisher: { '@type': 'Organization', name: 'MifiTech', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <div className="studio-shell">
      <SiteNav />
      <main className="case wrap service-landing">
        <Link href="/blog" className="back-link">← All articles</Link>
        <article>
          <header className="case-hero">
            <div>
              <p className="section-label">{post.category.toUpperCase()} / {post.readTime.toUpperCase()}</p>
              <h1>{post.title}</h1>
              <p className="case-intro">{post.intro}</p>
              <p className="case-meta">Published {new Date(post.publishedAt + 'T12:00:00Z').toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</p>
            </div>
          </header>
          {post.sections.map((section) => (
            <section className="case-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
          <section className="case-section">
            <p className="section-label">RELATED READING</p>
            <div className="service-related">
              {post.related.map((item) => <Link href={item.href} key={item.href}><strong>{item.label}</strong><span>{item.description}</span></Link>)}
            </div>
          </section>
          <section className="case-section case-cta">
            <div><p className="section-label">TALK TO MIFITECH</p><h2>Have a project in mind?</h2><p>Tell us what you are trying to build and we can help you work out the next step.</p></div>
            <div className="hero-actions"><Link className="button button-dark" href="/#contact">Discuss your project</Link></div>
          </section>
        </article>
      </main>
      <footer className="footer"><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span><span><Link href="/blog">Blog</Link> · <Link href="/">Home</Link></span></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
