import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-posts';
import { SITE_URL } from '@/lib/contact';

export const metadata: Metadata = {
  title: 'Wonders | Ideas for a Smarter Digital World',
  description: 'Practical guides on web design, e-commerce, software and digital growth for businesses building online.',
  alternates: { canonical: '/blog', types: { 'application/rss+xml': '/blog/feed.xml' } },
  openGraph: {
    title: 'Wonders by MifiTech — Ideas for a Smarter Digital World',
    description: 'A journal for people building what comes next. Explore web, commerce, software and digital growth.',
    type: 'website',
    url: SITE_URL + '/blog',
  },
  twitter: { card: 'summary_large_image', title: 'Wonders by MifiTech', description: 'Ideas for a smarter digital world.' },
};

const stories = [
  { slug: 'what-your-business-website-needs-to-win-customers', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=88', alt: 'A bright, thoughtfully designed modern workspace', number: '01', eyebrow: 'THE DIGITAL BUSINESS', tone: 'warm' },
  { slug: 'how-to-prepare-for-an-ecommerce-website-in-nigeria', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=88', alt: 'A customer completing an online purchase', number: '02', eyebrow: 'COMMERCE, REIMAGINED', tone: 'cool' },
];

const dateLabel = (value: string) => new Date(value + 'T12:00:00Z').toLocaleDateString('en', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

export default function BlogPage() {
  const featured = blogPosts[0];
  const featuredArt = stories.find((story) => story.slug === featured?.slug);
  const remaining = blogPosts.slice(1);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Wonders by MifiTech',
    description: 'Ideas for a smarter digital world: web design, e-commerce, software and digital business.',
    url: SITE_URL + '/blog',
    isPartOf: { '@type': 'WebSite', name: 'MifiTech', url: SITE_URL },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: blogPosts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: SITE_URL + '/blog/' + post.slug,
        name: post.title,
      })),
    },
  };

  return (
    <div className="studio-shell wonders-shell">
      <main className="wonders-page">
        <section className="wonders-masthead">
          <div className="wonders-overline"><span>THE MIFITECH JOURNAL</span><span>EST. 2026&nbsp; · &nbsp;READ, THINK, BUILD</span></div>
          <div className="wonders-title-row">
            <div><p className="wonders-kicker">A LITTLE CURIOSITY GOES A LONG WAY</p><h1>Wonders<span>.</span></h1></div>
            <p className="wonders-deck">Ideas for a smarter digital world.<br/>Perspectives for people building what comes next.</p>
          </div>
          <div className="wonders-rule"><span>TECHNOLOGY</span><i>✳</i><span>BUSINESS</span><i>✳</i><span>CREATIVITY</span><i>✳</i><span>THE FUTURE</span></div>
        </section>

        {featured && featuredArt && (
          <section className="wonders-lead" aria-labelledby="wonders-featured-title">
            <Link className="wonders-lead-image" href={'/blog/' + featured.slug} style={{ backgroundImage: 'linear-gradient(180deg, transparent 48%, rgba(18,24,23,.38)), url(' + featuredArt.image + ')' }} aria-label={'Read ' + featured.title}>
              <span className="wonders-image-stamp">W / 001</span><span className="wonders-image-caption">THE ART OF BUILDING BETTER</span>
            </Link>
            <div className="wonders-lead-copy">
              <p className="wonders-kicker">✳ &nbsp; EDITOR'S PICK &nbsp; / &nbsp; {featured.category.toUpperCase()}</p>
              <h2 id="wonders-featured-title"><Link href={'/blog/' + featured.slug}>{featured.title}</Link></h2>
              <p className="wonders-summary">{featured.description}</p>
              <div className="wonders-byline"><span>MIFITECH EDITORIAL</span><i>·</i><time dateTime={featured.publishedAt}>{dateLabel(featured.publishedAt)}</time><i>·</i><span>{featured.readTime}</span></div>
              <Link className="wonders-read-link" href={'/blog/' + featured.slug}>Explore the story <span>↗</span></Link>
            </div>
          </section>
        )}

        <section className="wonders-latest" aria-labelledby="wonders-latest-title">
          <div className="wonders-section-heading"><div><p className="wonders-kicker">FRESH THINKING</p><h2 id="wonders-latest-title">The latest <em>ideas.</em></h2></div><span>{String(blogPosts.length).padStart(2, '0')} STORIES & COUNTING</span></div>
          <div className="wonders-story-grid">
            {remaining.map((post) => {
              const art = stories.find((story) => story.slug === post.slug);
              return (
                <article className="wonders-story-card" key={post.slug}>
                  <Link className="wonders-card-art" href={'/blog/' + post.slug} style={art ? { backgroundImage: 'url(' + art.image + ')' } : undefined} aria-label={'Read ' + post.title}>
                    <span>{post.category}</span><b>↗</b>
                  </Link>
                  <div className="wonders-card-meta"><time dateTime={post.publishedAt}>{dateLabel(post.publishedAt)}</time><span>{post.readTime}</span></div>
                  <h3><Link href={'/blog/' + post.slug}>{post.title}</Link></h3>
                  <p>{post.description}</p>
                  <Link className="wonders-card-link" href={'/blog/' + post.slug}>Read the story <span>→</span></Link>
                </article>
              );
            })}
            {blogPosts.length === 1 && <p className="wonders-coming">More considered reads are on the way.</p>}
          </div>
        </section>

        <section className="wonders-manifesto">
          <span className="wonders-manifesto-mark">✳</span>
          <p className="wonders-kicker">A NOTE FROM MIFITECH</p>
          <h2>Good technology starts with <em>better questions.</em></h2>
          <p>We explore the ideas, tools and decisions shaping the digital world — making the complex clearer, and the possible feel closer.</p>
          <Link href="/#contact">Have something worth building? <span>↗</span></Link>
        </section>
        <section className="wonders-topics" aria-label="Journal topics"><span>EXPLORE THE JOURNAL</span><div><b>Web & Digital Experiences</b><i>✳</i><b>Commerce & Growth</b><i>✳</i><b>Software & Systems</b><i>✳</i><b>Ideas & Innovation</b></div></section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
