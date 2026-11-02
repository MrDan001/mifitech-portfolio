// Path: app/admin/panel.tsx
'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { defaultSiteContent } from '@/lib/site-content-defaults';
import Content from './Content';
import Leads from './Leads';
import Media from './Media';
import Overview from './Overview';
import Proposals from './Proposals';
import Seo from './Seo';
import { Icon } from './ui';

type Row = Record<string, any>;
type Toast = { id: number; text: string; tone: 'ok' | 'err' };
const TITLES: Record<string, [string, string]> = {
  overview: ['Overview', 'How your studio and website are doing today.'],
  leads: ['Enquiries', 'Everyone who has contacted you through the website.'],
  proposals: ['Proposals', 'Create private proposal links and track payments.'],
  content: ['Website content', 'Edit your pages. Nothing goes live until you save.'],
  media: ['Media library', 'Upload and reuse the images on your website.'],
  seo: ['Search & sharing', 'Control how your site looks on Google and WhatsApp.'],
};

export default function AdminPanel() {
  const [tab, setTab] = useState('overview');
  const [navOpen, setNavOpen] = useState(false);
  const [leads, setLeads] = useState<Row[]>([]);
  const [proposals, setProposals] = useState<Row[]>([]);
  const [seo, setSeo] = useState<Row>({});
  const [content, setContent] = useState<any>(defaultSiteContent);
  const [saved, setSaved] = useState(() => JSON.stringify(defaultSiteContent));
  const [media, setMedia] = useState<Row[]>([]);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [savingSeo, setSavingSeo] = useState(false);
  const [draft, setDraft] = useState<Row | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((text: string, tone: 'ok' | 'err' = 'ok') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, text, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), tone === 'err' ? 7000 : 4000);
  }, []);

  const dirty = useMemo(() => JSON.stringify(content) !== saved, [content, saved]);

  const load = useCallback(async () => {
    try {
      const rs = await Promise.all(['leads', 'proposals', 'seo', 'content'].map((x) => fetch('/api/admin/' + x)));
      const [a, b, c, d] = await Promise.all(rs.map((r) => r.json().catch(() => ({}))));
      if (rs[0].ok) setLeads(a.leads || []);
      if (rs[1].ok) setProposals(b.proposals || []);
      if (rs[2].ok) setSeo(c.settings || {});
      if (rs[3].ok) { const next = d.content || defaultSiteContent; setContent(next); setSaved(JSON.stringify(next)); }
      const bad = rs.findIndex((r) => !r.ok);
      if (bad >= 0) notify([a, b, c, d][bad].error || 'Could not load some admin records. Check the database setup.', 'err');
    } catch { notify('The admin database could not be reached.', 'err'); }
    finally { setLoading(false); }
  }, [notify]);

  useEffect(() => { load(); }, [load]);

  const loadMedia = useCallback(async () => {
    setLoadingMedia(true);
    try {
      const r = await fetch('/api/admin/media'); const d = await r.json();
      if (!r.ok) throw new Error(d.error || 'Could not load uploaded media.');
      setMedia(d.media || []); setMediaLoaded(true);
    } catch (e) { notify(e instanceof Error ? e.message : 'Could not load uploaded media.', 'err'); }
    finally { setLoadingMedia(false); }
  }, [notify]);

  useEffect(() => { if (tab === 'media' && !mediaLoaded) loadMedia(); }, [tab, mediaLoaded, loadMedia]);

  const saveContent = useCallback(async () => {
    setSavingContent(true);
    try {
      const r = await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) { notify(d.error || 'Could not save website content.', 'err'); return; }
      setSaved(JSON.stringify(content)); notify('Saved. Refresh your public website to see the changes.');
    } catch { notify('Could not reach the website content service.', 'err'); }
    finally { setSavingContent(false); }
  }, [content, notify]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's' && tab === 'content') { e.preventDefault(); if (dirty && !savingContent) saveContent(); } };
    const onLeave = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault(); e.returnValue = ''; } };
    window.addEventListener('keydown', onKey); window.addEventListener('beforeunload', onLeave);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('beforeunload', onLeave); };
  }, [tab, dirty, savingContent, saveContent]);

  async function saveSeo(e: FormEvent) {
    e.preventDefault(); setSavingSeo(true);
    try {
      const keywords = typeof seo.keywords === 'string' ? seo.keywords.split(',').map((x: string) => x.trim()).filter(Boolean) : seo.keywords;
      const r = await fetch('/api/admin/seo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...seo, keywords }) });
      const d = await r.json().catch(() => ({}));
      if (r.ok) notify('Search and sharing settings saved.'); else notify(d.error || 'Could not save.', 'err');
    } catch { notify('Could not reach the server.', 'err'); }
    finally { setSavingSeo(false); }
  }

  async function setStatus(type: 'leads' | 'proposals', id: string, status: string) {
    const apply = (rows: Row[]) => rows.map((x) => (x.id === id ? { ...x, status } : x));
    if (type === 'leads') setLeads(apply); else setProposals(apply);
    const r = await fetch('/api/admin/' + type, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) }).catch(() => null);
    if (r && r.ok) { notify('Status updated.'); return; }
    notify((r && (await r.json().catch(() => ({}))).error) || 'Update failed.', 'err'); load();
  }

  async function deleteLead(id: string) {
    if (!window.confirm('Delete this enquiry permanently? This cannot be undone.')) return;
    const r = await fetch('/api/admin/leads', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { notify(d.error || 'Could not delete enquiry.', 'err'); return; }
    setLeads((old) => old.filter((l) => l.id !== id)); notify('Enquiry deleted.');
  }

  async function createProposal(data: Record<string, string>) {
    const r = await fetch('/api/admin/proposals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { notify(d.error || 'Could not create the proposal.', 'err'); return null; }
    notify('Proposal created.'); load(); return d.token as string;
  }

  async function uploadFiles(files: File[]) {
    setUploading(true); let ok = 0;
    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) { notify(file.name + ' is larger than 5 MB.', 'err'); continue; }
      const form = new FormData(); form.append('file', file);
      const r = await fetch('/api/admin/upload', { method: 'POST', body: form }).catch(() => null);
      const d = r ? await r.json().catch(() => ({})) : {};
      if (r && r.ok) ok++; else notify((d.error || 'Upload failed') + ': ' + file.name, 'err');
    }
    setUploading(false);
    if (ok) { notify(ok + (ok === 1 ? ' image uploaded.' : ' images uploaded.')); loadMedia(); }
  }

  async function deleteMedia(path: string) {
    if (!window.confirm('Delete this file? Images marked “Used in” are shown on your website.')) return;
    const r = await fetch('/api/admin/media', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ path }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { notify(d.error || 'Could not delete the file.', 'err'); return; }
    setMedia((old) => old.filter((m) => m.path !== path)); notify('File deleted.');
  }

  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); location.reload(); }

  const go = (t: string) => { setTab(t); setNavOpen(false); window.scrollTo({ top: 0 }); };
  const newCount = leads.filter((l) => l.status === 'new').length;
  const openCount = proposals.filter((p) => ['sent', 'accepted', 'awaiting_payment', 'in_progress'].includes(p.status)).length;
  const NAV: Array<[string, string, string, number?]> = [['overview', 'Overview', 'home'], ['leads', 'Enquiries', 'inbox', newCount], ['proposals', 'Proposals', 'doc', openCount]];
  const SITE: Array<[string, string, string]> = [['content', 'Website content', 'edit'], ['media', 'Media library', 'image'], ['seo', 'Search & sharing', 'search']];
  const [title, sub] = TITLES[tab];

  return (
    <div className="ad-app">
      <aside className={'ad-side' + (navOpen ? ' open' : '')} aria-label="Admin navigation">
        <a className="ad-logo" href="/" aria-label="MifiTech website"><img src="/brand/logo-b-horizontal-dark.svg" alt="MifiTech" /></a>
        <nav className="ad-nav">
          <small>Workspace</small>
          {NAV.map(([k, label, icon, n]) => <button key={k} aria-current={tab === k ? 'page' : undefined} onClick={() => go(k)}><Icon n={icon} />{label}{n ? <span className="n">{n}</span> : null}</button>)}
          <small>Website</small>
          {SITE.map(([k, label, icon]) => <button key={k} aria-current={tab === k ? 'page' : undefined} onClick={() => go(k)}><Icon n={icon} />{label}{k === 'content' && dirty ? <span className="n" title="Unsaved changes">•</span> : null}</button>)}
        </nav>
        <div className="ad-side-foot">
          <a href="/" target="_blank" rel="noreferrer"><Icon n="globe" />View website</a>
          <button onClick={logout}><Icon n="out" />Sign out</button>
        </div>
      </aside>
      <div className="ad-main">
        <header className="ad-top">
          <button className="ad-btn ghost icon ad-menu" aria-label="Open menu" onClick={() => setNavOpen(!navOpen)}><Icon n="menu" /></button>
          <div className="grow"><h1>{title}</h1><p className="ad-hide">{sub}</p></div>
          {dirty && <button className="ad-pill warn" onClick={() => go('content')}><i />Unsaved changes</button>}
          <a className="ad-btn ghost sm ad-hide" href="/" target="_blank" rel="noreferrer"><Icon n="ext" />View site</a>
        </header>
        <main className="ad-page">
          {tab === 'overview' && <Overview leads={leads} proposals={proposals} content={content} seo={seo} loading={loading} go={go} />}
          {tab === 'leads' && <Leads leads={leads} loading={loading} onStatus={(id, s) => setStatus('leads', id, s)} onDelete={deleteLead} onProposal={(l) => { setDraft(l); go('proposals'); }} notify={notify} />}
          {tab === 'proposals' && <Proposals proposals={proposals} loading={loading} draft={draft} onCreate={createProposal} onStatus={(id, s) => setStatus('proposals', id, s)} notify={notify} />}
          {tab === 'content' && <Content content={content} setContent={setContent} notify={notify} />}
          {tab === 'media' && <Media media={media} loading={loadingMedia} uploading={uploading} content={content} onRefresh={loadMedia} onUpload={uploadFiles} onDelete={deleteMedia} notify={notify} />}
          {tab === 'seo' && <Seo seo={seo} setSeo={setSeo} saving={savingSeo} onSave={saveSeo} />}
        </main>
      </div>
      {tab === 'content' && dirty && (
        <div className="ad-save" role="region" aria-label="Unsaved changes"><div>
          <span>You have unsaved changes</span>
          <button className="ad-btn ghost sm" onClick={() => { setContent(JSON.parse(saved)); notify('Changes discarded.'); }}>Discard</button>
          <button className="ad-btn lime sm" onClick={saveContent} disabled={savingContent}>{savingContent ? 'Saving…' : 'Save changes'}</button>
        </div></div>
      )}
      <div className="ad-toasts" role="status" aria-live="polite">{toasts.map((t) => <div key={t.id} className={'ad-toast' + (t.tone === 'err' ? ' err' : '')}><Icon n={t.tone === 'err' ? 'x' : 'check'} />{t.text}</div>)}</div>
    </div>
  );
}