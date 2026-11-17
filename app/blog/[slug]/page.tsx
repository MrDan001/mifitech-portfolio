import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '../../components/SiteNav';
import { blogPosts, getBlogPost } from '@/lib/blog-posts';
import { SITE_URL } from '@/lib/contact';

export const dynamicParams = false;

const articleImages: Record<string, string> = {
  'what-your-business-website-needs-to-win-customers': 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=88',
  'how-to-prepare-for-an-ecommerce-website-in-nigeria': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1800&q=88',
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article not found | MifiTech', robots: { index: false, follow: false } };
  const image = articleImages[post.slug];
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: '/blog/' + post.slug },
    openGraph: {
      title: post.title, description: post.description, type: 'article',
      publishedTime: post.publishedAt, modifiedTime: post.updatedAt,
      url: SITE_URL + '/blog/' + post.slug,
      ...(image ? { images: [{ url: image, width: 1800, height: 1200, alt: post.title }] } : {}),
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.description, ...(image ? { images: [image] } : {}) },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = SITE_URL + '/blog/' + post.slug;
  const image = articleImages[post.slug];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: image ? [image] : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: 'MifiTech', url: SITE_URL + '/about' },
    publisher: { '@type': 'Organization', name: 'MifiTech', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <div className="studio-shell wonders-shell">
      <SiteNav />
      <main className="wonders-article">
        <div className="wonders-article-top"><Link href="/blog">← BACK TO WONDERS</Link><span>{post.category.toUpperCase()} &nbsp; / &nbsp; {post.readTime.toUpperCase()}</span></div>
        <header className="wonders-article-head">
          <p className="wonders-kicker">THE MIFITECH JOURNAL &nbsp; · &nbsp; {post.category.toUpperCase()}</p>
          <h1>{post.title}</h1>
          <p className="wonders-article-intro">{post.intro}</p>
          <div className="wonders-byline"><span>MIFITECH EDITORIAL</span><i>·</i><time dateTime={post.publishedAt}>{new Date(post.publishedAt + 'T12:00:00Z').toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time><i>·</i><span>{post.readTime}</span></div>
        </header>
        {image && <div className="wonders-article-cover" role="img" aria-label={post.title} style={{ backgroundImage: 'url(' + image + ')' }} />}
        <article className="wonders-article-body">
          <p className="wonders-article-dropcap">{post.intro}</p>
          {post.sections.map((section, index) => (
            <section key={section.heading}>
              <span className="wonders-article-number">{String(index + 1).padStart(2, '0')}</span>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
        </article>
        <section className="wonders-article-related">
          <p className="wonders-kicker">KEEP EXPLORING</p><h2>One idea leads to <em>another.</em></h2>
          <div className="wonders-related-grid">
            {post.related.map((item) => <Link href={item.href} key={item.href}><strong>{item.label}</strong><span>{item.description}</span><b>↗</b></Link>)}
          </div>
          <Link className="wonders-read-link" href="/blog">Discover more from Wonders <span>↗</span></Link>
        </section>
      </main>
      <footer className="footer"><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span><span><Link href="/blog">Wonders</Link> · <Link href="/">Home</Link></span></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
