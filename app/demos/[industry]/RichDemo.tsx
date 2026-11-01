// Path: app/demos/[industry]/RichDemo.tsx
import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Fraunces, Hanken_Grotesk } from 'next/font/google';
import DemoForm from './DemoForm';
import type { RichDemo as Demo, Section } from '@/lib/demo-sites';
import './rich-demo.css';

const serif = Fraunces({ subsets: ['latin'], weight: ['500', '700'], variable: '--rd-serif', display: 'swap' });
const sans = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700', '800'], variable: '--rd-sans', display: 'swap' });

const photo = (src: string): CSSProperties => ({ backgroundImage: 'url(' + src + ')' });

function Block({ s }: { s: Section }) {
  switch (s.k) {
    case 'list':
      return (<section className="rd-sec"><div className="rd-wrap"><h2>{s.title}</h2>{s.intro && <p className="rd-intro">{s.intro}</p>}<div className="rd-list">{s.items.map((i) => <div className="rd-row" key={i.t}><div><b>{i.t}</b>{i.d && <span>{i.d}</span>}</div>{i.p && <strong>{i.p}</strong>}</div>)}</div></div></section>);
    case 'cards':
      return (<section className="rd-sec rd-soft"><div className="rd-wrap"><h2>{s.title}</h2>{s.intro && <p className="rd-intro">{s.intro}</p>}<div className="rd-cards">{s.items.map((i) => <article className="rd-card" key={i.t}>{i.img && <div className="rd-img" style={photo(i.img)} role="img" aria-label={i.t} />}<div className="rd-card-body"><b>{i.t}</b>{i.d && <span>{i.d}</span>}{i.p && <strong>{i.p}</strong>}</div></article>)}</div></div></section>);
    case 'steps':
      return (<section className="rd-sec rd-soft"><div className="rd-wrap"><h2>{s.title}</h2><ol className="rd-steps">{s.items.map((i, n) => <li key={i.t}><em>{n + 1}</em><b>{i.t}</b><span>{i.d}</span></li>)}</ol></div></section>);
    case 'people':
      return (<section className="rd-sec"><div className="rd-wrap"><h2>{s.title}</h2><div className="rd-people">{s.items.map((i) => <div className="rd-person" key={i.t}><i>{i.t.replace(/^Dr\.\s*/, '').split(' ').map((w) => w[0]).slice(0, 2).join('')}</i><div><b>{i.t}</b><span>{i.d}</span></div></div>)}</div></div></section>);
    case 'gallery':
      return (<section className="rd-sec"><div className="rd-wrap"><h2>{s.title}</h2><div className="rd-gallery">{s.imgs.map((src, n) => <div className="rd-img" key={n} style={photo(src)} role="img" aria-label={s.title + ' ' + (n + 1)} />)}</div></div></section>);
    case 'quote':
      return (<section className="rd-quote"><div className="rd-wrap"><span aria-hidden="true">★★★★★</span><p>“{s.q}”</p><small>{s.by}</small></div></section>);
    case 'faq':
      return (<section className="rd-sec"><div className="rd-wrap rd-narrow"><h2>{s.title}</h2>{s.items.map((i) => <details key={i.q}><summary>{i.q}</summary><p>{i.a}</p></details>)}</div></section>);
  }
}

export default function RichDemo({ demo, slug }: { demo: Demo; slug: string }) {
  const theme = { '--a': demo.accent, '--ink': demo.ink, '--bg': demo.bg, '--soft': demo.soft } as CSSProperties;
  return (
    <main className={'rd ' + sans.variable + ' ' + serif.variable + (demo.serif ? ' rd-serif' : '')} style={theme}>
      <div className="rd-bar"><span>Concept preview. Fictional brand, illustrative content.</span><Link href="/#demos">All demos</Link></div>
      <header className="rd-head"><div className="rd-wrap"><div className="rd-brand"><b>{demo.name}</b><span>{demo.tag}</span></div><nav aria-label="Demo navigation">{demo.nav.map((n, i) => <a key={n} href={i === demo.nav.length - 1 ? '#enquire' : '#s' + i}>{n}</a>)}</nav><a className="rd-btn" href="#enquire">{demo.hero.cta}</a></div></header>
      <section className="rd-hero"><div className="rd-hero-img" style={photo(demo.hero.img)} /><div className="rd-wrap"><div className="rd-hero-copy"><small>{demo.hero.kicker}</small><h1>{demo.hero.title}</h1><p>{demo.hero.intro}</p><a className="rd-btn" href="#enquire">{demo.hero.cta}</a><a className="rd-btn rd-ghost" href="#s0">{demo.hero.cta2}</a></div></div></section>
      <div className="rd-facts"><div className="rd-wrap">{demo.facts.map(([a, b]) => <div key={a}><b>{a}</b><span>{b}</span></div>)}</div></div>
      {demo.sections.map((s, i) => <div id={'s' + i} key={i}><Block s={s} /></div>)}
      <section className="rd-sec rd-contact" id="enquire"><div className="rd-wrap rd-two"><div><h2>{demo.form.title}</h2><p className="rd-intro">{demo.form.intro}</p><p className="rd-addr"><b>{demo.name}</b><br />{demo.footer.address}<br />{demo.footer.hours}<br />{demo.footer.phone}</p></div><DemoForm fields={demo.form.fields} button={demo.form.button} /></div></section>
      <section className="rd-cta"><div className="rd-wrap"><h2>Want a website like this for your business?</h2><p>This is an illustrative concept. MifiTech can tailor the pages, content and customer journey to your business.</p><Link className="rd-btn" href={'/?demo=' + encodeURIComponent(slug) + '#contact'}>Build a website like this</Link></div></section>
      <footer className="rd-foot"><div className="rd-wrap"><span>A concept by <strong>MifiTech.</strong> Not a live business.</span><Link href="/#demos">Explore other demos</Link></div></footer>
    </main>
  );
}