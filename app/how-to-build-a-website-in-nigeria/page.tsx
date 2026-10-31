import type { Metadata } from 'next';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';
import { getSiteContent } from '@/lib/site-content';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: content.guideArticle.title,
    description: content.guideArticle.intro,
    alternates: { canonical: '/how-to-build-a-website-in-nigeria' },
    openGraph: { title: content.guideArticle.title, description: content.guideArticle.intro, type: 'article' },
  };
}

export default async function Guide() {
  const content = await getSiteContent();
  const article = content.guideArticle;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.intro,
    author: { '@type': 'Organization', name: 'MifiTech' },
    publisher: { '@type': 'Organization', name: 'MifiTech' },
    mainEntityOfPage: (process.env.NEXT_PUBLIC_SITE_URL || 'https://mifitech-portfolio.vercel.app') + '/how-to-build-a-website-in-nigeria',
  };

  return (
    <main className="guide-page">
      <header>
        <Link href="/" className="admin-brand">MifiTech<span>.</span></Link>
        <div className="guide-header-actions"><ThemeToggle /><Link href="/#contact">Build my website</Link></div>
      </header>
      <article>
        <p className="admin-kicker">{article.eyebrow}</p>
        <h1>{article.title}</h1>
        <p className="guide-lead">{article.intro}</p>
        {content.guideSections.map((section, index) => (
          <section key={section.heading + index}>
            <h2>{section.heading}</h2>
            <p>{section.body}</p>
          </section>
        ))}
        <h2>{article.closingTitle}</h2>
        <p>{article.closingText} <Link href="/#demos">Explore our website demos</Link> or <Link href="/#contact">tell us about your project</Link>.</p>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <footer>© {new Date().getFullYear()} MifiTech · <Link href="/privacy">Privacy policy</Link></footer>
    </main>
  );
}
