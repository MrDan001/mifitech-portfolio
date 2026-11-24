import type { Metadata } from 'next';
import Link from 'next/link';
import { getSiteContent } from '@/lib/site-content';
import { SITE_URL } from '@/lib/contact';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return {
    title: 'Website Planning Guide for Nigerian Businesses',
    description: content.guideArticle.intro,
    alternates: { canonical: '/how-to-build-a-website-in-nigeria' },
    openGraph: { title: 'Website Planning Guide for Nigerian Businesses', description: content.guideArticle.intro, type: 'article' },
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
    mainEntityOfPage: SITE_URL + '/how-to-build-a-website-in-nigeria',
  };

  return (
    <main className="guide-page">
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
    </main>
  );
}
