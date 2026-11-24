import Link from 'next/link';

export type GuideArticle = {
  path: string;
  eyebrow: string;
  title: string;
  intro: string;
  sections: Array<{ heading: string; paragraphs: string[]; bullets?: string[] }>;
  related: Array<{ label: string; href: string; description: string }>;
};

export default function SEOGuideArticle({ article }: { article: GuideArticle }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.intro,
    author: { '@type': 'Organization', name: 'MifiTech', url: 'https://www.mifitech.top/about' },
    publisher: { '@type': 'Organization', name: 'MifiTech', url: 'https://www.mifitech.top' },
    mainEntityOfPage: 'https://www.mifitech.top' + article.path,
  };
  return (
    <div className="studio-shell">
      <main className="case wrap service-landing">
        <Link href="/how-to-build-a-website-in-nigeria" className="back-link">Website planning guide</Link>
        <article>
          <header className="case-hero">
            <div>
              <p className="section-label">{article.eyebrow}</p>
              <h1>{article.title}</h1>
              <p className="case-intro">{article.intro}</p>
            </div>
          </header>
          {article.sections.map((section) => (
            <section className="case-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
            </section>
          ))}
          <section className="case-section">
            <p className="section-label">EXPLORE YOUR OPTIONS</p>
            <h2>Useful next steps.</h2>
            <div className="service-related">
              {article.related.map((item) => <Link href={item.href} key={item.href}><strong>{item.label}</strong><span>{item.description}</span></Link>)}
            </div>
          </section>
          <section className="case-section case-cta">
            <div><p className="section-label">TALK TO MIFITECH</p><h2>Planning a website for your business?</h2><p>Tell us what you need and we can discuss a practical scope for your project.</p></div>
            <div className="hero-actions"><Link className="button button-dark" href="/#contact">Discuss your project</Link></div>
          </section>
        </article>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
