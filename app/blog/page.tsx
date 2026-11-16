import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '../components/SiteNav';
import { blogPosts } from '@/lib/blog-posts';

export const metadata: Metadata = {
  title: 'Business, Website & E-commerce Insights',
  description: 'Practical website, e-commerce and digital business guides from MifiTech for businesses in Nigeria.',
  alternates: { canonical: '/blog' },
  openGraph: { title: 'MifiTech Blog | Practical Digital Business Guides', description: 'Website, e-commerce and digital business insights for Nigerian businesses.', type: 'website' },
};

export default function BlogPage() {
  return (
    <div className="studio-shell">
      <SiteNav />
      <main className="case wrap service-landing">
        <header className="case-hero">
          <div>
            <p className="section-label">MIFITECH / THE BLOG</p>
            <h1>Practical ideas for building your business online.</h1>
            <p className="case-intro">Straightforward guidance on websites, e-commerce and digital tools for businesses in Nigeria.</p>
          </div>
        </header>
        <section className="case-section" aria-labelledby="latest-articles">
          <p className="section-label">LATEST ARTICLES</p>
          <h2 id="latest-articles">Ideas you can put to work.</h2>
          <div className="service-related">
            {blogPosts.map((post) => (
              <Link href={'/blog/' + post.slug} key={post.slug}>
                <span>{post.category} · {post.readTime}</span>
                <strong>{post.title}</strong>
                <span>{post.description}</span>
                <span>Read article ↗</span>
              </Link>
            ))}
          </div>
        </section>
        <section className="case-section case-cta">
          <div><p className="section-label">BUILD WITH MIFITECH</p><h2>Planning a website or online store?</h2><p>Tell us what your business needs and we can help you plan a practical next step.</p></div>
          <div className="hero-actions"><Link className="button button-dark" href="/#contact">Discuss your project</Link></div>
        </section>
      </main>
      <footer className="footer"><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span><span><Link href="/">Home</Link> · <Link href="/privacy">Privacy</Link></span></div></footer>
    </div>
  );
}
