// Path: app/admin/Seo.tsx
'use client';

import { FormEvent } from 'react';
import { TextField } from './ui';

type Props = { seo: any; setSeo: (s: any) => void; saving: boolean; onSave: (e: FormEvent) => void };

const Count = ({ n, min, max }: { n: number; min: number; max: number }) => <span className={'ad-count ' + (n === 0 ? '' : n > max ? 'bad' : n >= min ? 'good' : '')}>{n} characters · aim for {min} to {max}</span>;

export default function Seo({ seo, setSeo, saving, onSave }: Props) {
  const kw = Array.isArray(seo.keywords) ? seo.keywords.join(', ') : seo.keywords || '';
  let host = 'yoursite.com';
  try { host = new URL(seo.canonicalUrl).host; } catch { /* keep placeholder */ }
  const title = String(seo.title || 'Page title');
  const desc = String(seo.description || 'Your search description will appear here.');
  return (
    <form className="ad-cols" onSubmit={onSave}>
      <div className="ad-card ad-stack">
        <div><h2>Search and sharing</h2><p className="ad-sub">No setting can guarantee a ranking. Clear titles and honest descriptions help the right people click.</p></div>
        <div className="ad-stack"><TextField label="Page title" value={seo.title} onChange={(v) => setSeo({ ...seo, title: v })} /><Count n={String(seo.title || '').length} min={30} max={60} /></div>
        <div className="ad-stack"><TextField label="Search description" area rows={3} value={seo.description} onChange={(v) => setSeo({ ...seo, description: v })} /><Count n={String(seo.description || '').length} min={70} max={160} /></div>
        <TextField label="Target phrases" area rows={2} value={kw} onChange={(v) => setSeo({ ...seo, keywords: v })} hint="Separate phrases with commas." />
        <TextField label="Canonical URL" value={seo.canonicalUrl} onChange={(v) => setSeo({ ...seo, canonicalUrl: v })} hint="Your main web address. Update it when you move to your own domain." />
        <div className="ad-stack"><TextField label="Social share title" value={seo.ogTitle} onChange={(v) => setSeo({ ...seo, ogTitle: v })} /></div>
        <TextField label="Social share description" area rows={3} value={seo.ogDescription} onChange={(v) => setSeo({ ...seo, ogDescription: v })} />
        <div className="ad-row"><button className="ad-btn lime" disabled={saving}>{saving ? 'Saving…' : 'Save SEO settings'}</button><a className="ad-btn ghost" href="/how-to-build-a-website-in-nigeria" target="_blank" rel="noreferrer">Preview SEO guide</a></div>
      </div>
      <div className="ad-stack">
        <section className="ad-card ad-stack"><h2>Google preview</h2><div className="ad-serp"><div className="u">{host}</div><div className="t">{title}</div><div className="d">{desc.slice(0, 160)}</div></div></section>
        <section className="ad-card ad-stack"><h2>WhatsApp and social preview</h2><div className="ad-og"><img src="/og-image.jpg" alt="Current link preview image" /><div><small>{host}</small><b>{seo.ogTitle || title}</b><span>{String(seo.ogDescription || desc).slice(0, 110)}</span></div></div></section>
      </div>
    </form>
  );
}