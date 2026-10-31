import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '../../components/SiteNav';
import { defaultSiteContent, getSiteContent } from '@/lib/site-content';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export function generateStaticParams() {
  return defaultSiteContent.projects.map((project) => ({ slug: project.slug }));
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = await getSiteContent();
  const project = content.projects.find((item) => item.slug === slug && item.visible !== false);
  if (!project) notFound();

  const email = content.sections.contact.email;
  const websiteUrl = project.websiteUrl?.trim();
  const repoUrl = project.repoUrl?.trim();

  return (
    <>
      <SiteNav items={content.navigation} />
      <main className="case wrap">
        <Link href="/#work" className="back-link">Back to selected work</Link>
        <div className="case-hero">
          <div>
            <p className="section-label">CASE STUDY / {project.type.toUpperCase()}</p>
            <h1>{project.name}</h1>
            <p className="case-intro">{project.text}</p>
            <div className="hero-actions">
              {websiteUrl && <a className="button button-dark" href={websiteUrl} target="_blank" rel="noreferrer">Visit live website ↗</a>}
              {repoUrl && <a className="button button-light" href={repoUrl} target="_blank" rel="noreferrer">View GitHub ↗</a>}
              <a className="button button-light" href={'mailto:' + email + '?subject=Project%20enquiry%20for%20MifiTech'}>Discuss a project</a>
            </div>
          </div>
          <div className="case-preview" role="img" aria-label={project.name + ' project preview'} style={{ backgroundImage: "url(" + project.image + ")" }} />
        </div>
        <section className="case-section"><p className="section-label">THE STACK</p><h2>Technology</h2><div className="tag-row-new">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></section>
        <section className="case-section"><p className="section-label">PROJECT SCOPE</p><h2>What&apos;s included</h2><div className="facts">{project.features.map((item, index) => <div className="fact" key={item}><small>{String(index + 1).padStart(2, '0')}</small><strong>{item}</strong></div>)}</div></section>
        <section className="case-section case-cta"><div><p className="section-label">YOUR NEXT BUILD</p><h2>Have a project in mind?</h2></div><div className="hero-actions"><a className="button button-dark" href="/#contact">Start a conversation</a></div></section>
      </main>
      <footer className="footer"><div className="wrap footer-main"><Link href="/" className="footer-brand"><span className="brand-mark">M</span><span>MifiTech<span className="brand-period">.</span></span></Link><p>{content.footer.tagline}</p><div className="footer-links"><Link href="/">Back home</Link><Link href="/#demos">Website demos</Link><a href={'mailto:' + email}>Email</a></div></div><div className="wrap footer-bottom"><span>© {new Date().getFullYear()} MifiTech. All rights reserved.</span><span>DESIGNED WITH INTENTION. BUILT FOR BUSINESS.</span></div></footer>
    </>
  );
}
