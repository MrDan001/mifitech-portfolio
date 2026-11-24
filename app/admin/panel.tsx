// Path: app/admin/panel.tsx
'use client';

import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { defaultSiteContent } from '@/lib/site-content-defaults';
import Content from './Content';
import Leads from './Leads';
import Hunt from './Hunt';
import Media from './Media';
import Overview from './Overview';
import Proposals from './Proposals';
import Seo from './Seo';
import Testimonials from './Testimonials';
import { Icon } from './ui';

type Row = Record<string, any>;
type Toast = { id: number; text: string; tone: 'ok' | 'err' };
type NavItem = { key: string; label: string; icon: string; detail: string; count?: number };
const TITLES: Record<string, [string, string]> = {
  overview: ['Overview', 'How your studio and website are doing today.'],
  hunt: ['HUNT', 'Find and contact businesses that could benefit from a website.'],
  leads: ['Enquiries', 'Everyone who has contacted you through the website.'],
  proposals: ['Proposals', 'Create private proposal links and track payments.'],
  content: ['Website content', 'Edit your pages. Nothing goes live until you save.'],
  media: ['Media library', 'Upload and reuse the images on your website.'],
  seo: ['Search & sharing', 'Control how your site looks on Google and WhatsApp.'],
  testimonials: ['Client testimonials', 'Review, approve and manage the ratings clients send to MifiTech.'],
};

export default function AdminPanel() {
  const [tab, setTab] = useState('overview');
  const [navOpen, setNavOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [leads, setLeads] = useState<Row[]>([]);
  const [testimonials, setTestimonials] = useState<Row[]>([]);
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
  const [noticeOpen, setNoticeOpen] = useState(false);

  const notify = useCallback((text: string, tone: 'ok' | 'err' = 'ok') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, text, tone }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), tone === 'err' ? 7000 : 4000);
  }, []);
  const dirty = useMemo(() => JSON.stringify(content) !== saved, [content, saved]);

  const load = useCallback(async () => {
    try {
      const rs = await Promise.all(['leads', 'proposals', 'seo', 'content', 'testimonials'].map((x) => fetch('/api/admin/' + x)));
      const [a, b, c, d, e] = await Promise.all(rs.map((r) => r.json().catch(() => ({}))));
      if (rs[0].ok) setLeads(a.leads || []);
      if (rs[1].ok) setProposals(b.proposals || []);
      if (rs[2].ok) setSeo(c.settings || {});
      if (rs[3].ok) { const next = d.content || defaultSiteContent; setContent(next); setSaved(JSON.stringify(next)); }
      if (rs[4].ok) setTestimonials(e.testimonials || []);
      const bad = rs.findIndex((r) => !r.ok);
      if (bad >= 0) notify([a, b, c, d, e][bad].error || 'Could not load some admin records. Check the database setup.', 'err');
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
  async function updateTestimonial(id: string, patch: Record<string, any>) {
    const response = await fetch('/api/admin/testimonials', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...patch }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { notify(result.error || 'Could not update testimonial.', 'err'); return; }
    setTestimonials((items) => items.map((item) => item.id === id ? { ...item, ...patch, ...(patch.status && patch.status !== 'approved' ? { displayed: false } : {}) } : item));
    notify(patch.status === 'approved' ? 'Testimonial approved.' : patch.status === 'archived' ? 'Testimonial archived.' : patch.displayed === true ? 'Testimonial is now displayed.' : patch.displayed === false ? 'Testimonial hidden from the website.' : 'Testimonial updated.');
  }
  async function deleteTestimonial(id: string) {
    if (!window.confirm('Delete this client testimony permanently? This cannot be undone.')) return;
    const response = await fetch('/api/admin/testimonials', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) { notify(result.error || 'Could not delete testimonial.', 'err'); return; }
    setTestimonials((items) => items.filter((item) => item.id !== id)); notify('Testimonial deleted.');
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

  const go = (t: string) => { setTab(t); setNavOpen(false); setMoreOpen(false); setSearch(''); setNoticeOpen(false); setUserOpen(false); window.scrollTo({ top: 0 }); };
  const newCount = leads.filter((l) => l.status === 'new').length;
  const openCount = proposals.filter((p) => ['sent', 'accepted', 'awaiting_payment', 'in_progress'].includes(p.status)).length;
  const navGroups: Array<{ label: string; items: NavItem[] }> = [
    { label: 'WORKSPACE', items: [
      { key: 'overview', label: 'Dashboard', icon: 'home', detail: 'Your studio at a glance' },
      { key: 'hunt', label: 'HUNT', icon: 'search', detail: 'Find businesses to reach' },
      { key: 'leads', label: 'Enquiries', icon: 'inbox', detail: 'Messages from potential clients', count: newCount },
      { key: 'testimonials', label: 'Testimonials', icon: 'star', detail: 'Client ratings and published feedback', count: testimonials.filter((item) => item.status === 'pending').length },
      { key: 'proposals', label: 'Proposals & Payments', icon: 'doc', detail: 'Quotes, proposals and payment progress', count: openCount },
    ]},
    { label: 'WEBSITE CONTROL', items: [
      { key: 'content', label: 'Website content', icon: 'edit', detail: 'Edit your pages and sections' },
      { key: 'media', label: 'Media library', icon: 'image', detail: 'Images and uploaded files' },
      { key: 'seo', label: 'Search & sharing', icon: 'globe', detail: 'Google, metadata and social previews' },
    ]},
  ];
  const allItems = navGroups.flatMap((g) => g.items);
  const results = search.trim() ? allItems.filter((item) => (item.label + ' ' + item.detail).toLowerCase().includes(search.trim().toLowerCase())) : [];
  const [title, sub] = TITLES[tab];
  const pendingTestimonials = testimonials.filter((item) => item.status === 'pending').length;
  const attention = newCount + pendingTestimonials + proposals.filter((p) => ['draft', 'sent', 'awaiting_payment'].includes(p.status)).length;

  useEffect(() => {
    document.body.style.overflow = moreOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [moreOpen]);

  return (
    <div className="apd">
      <aside className={'apd-sidebar' + (navOpen ? ' is-open' : '')} aria-label="Admin navigation">
        <a className="apd-brand" href="/" aria-label="MifiTech homepage"><img src="/brand/logo-b-horizontal-dark.svg" alt="MifiTech" /></a>
        <nav className="apd-nav">
          {navGroups.map((group) => <section className="apd-nav-group" key={group.label}>
            <p className="apd-nav-label">{group.label}</p>
            {group.items.map((item) => <button type="button" key={item.key} className={'apd-nav-link' + (tab === item.key ? ' is-active' : '')} aria-current={tab === item.key ? 'page' : undefined} onClick={() => go(item.key)}>
              <Icon n={item.icon} /><span>{item.label}</span>{item.count ? <em className="apd-badge">{item.count > 99 ? '99+' : item.count}</em> : null}
            </button>)}
          </section>)}
        </nav>
        <div className="apd-side-foot">
          <a href="/" target="_blank" rel="noreferrer"><Icon n="globe" />View website</a>
          <button type="button" onClick={() => void logout()}><Icon n="out" />Sign out</button>
        </div>
      </aside>

      <div className="apd-main">
        <header className="apd-topbar">
          <button type="button" className="apd-menu-btn" aria-label="Open all modules" onClick={() => setMoreOpen(true)}><Icon n="menu" /></button>
          <a href="/" className="apd-top-brand" aria-label="MifiTech homepage"><img src="/brand/logo-b-horizontal-dark.svg" alt="MifiTech" /></a>
          <div className="apd-search">
            <Icon n="search" />
            <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search admin modules…" aria-label="Search admin modules" />
            {search.trim() && <ul className="apd-search-results">{results.length ? results.map((item) => <li key={item.key}><button type="button" onClick={() => go(item.key)}><span>{item.label}</span><small>Module</small></button></li>) : <li className="apd-search-empty">No matching modules</li>}</ul>}
          </div>
          <div className="apd-top-actions">
            <div className="apd-pop-wrap">
              <button type="button" className="apd-bell" aria-label="Notifications" aria-expanded={noticeOpen} onClick={() => { setNoticeOpen((v) => !v); setUserOpen(false); }}>
                <Icon n="bell" />{attention > 0 ? <em className="apd-dot">{attention > 99 ? '99+' : attention}</em> : null}
              </button>
              {noticeOpen && <div className="apd-pop"><p className="apd-pop-title">Needs your attention</p>
                <button type="button" onClick={() => go('leads')}><span>New enquiries</span><b>{newCount}</b></button>
                <button type="button" onClick={() => go('proposals')}><span>Open proposals</span><b>{openCount}</b></button>
                <button type="button" onClick={() => go('testimonials')}><span>Testimonials to review</span><b>{pendingTestimonials}</b></button>
                <button type="button" onClick={() => go('hunt')}><span>Prospecting workspace</span><b>HUNT</b></button>
              </div>}
            </div>
            <div className="apd-pop-wrap">
              <button type="button" className="apd-user" aria-expanded={userOpen} onClick={() => { setUserOpen((v) => !v); setNoticeOpen(false); }}>
                <span className="apd-avatar">MT</span><span className="apd-user-name">MifiTech Admin</span><Icon n="chev" />
              </button>
              {userOpen && <div className="apd-pop apd-pop-narrow"><a href="/" target="_blank" rel="noreferrer">View website ↗</a><button type="button" onClick={() => void logout()}>Sign out</button></div>}
            </div>
          </div>
        </header>

        <div className="apd-page-head"><div><span className="apd-eyebrow">MIFITECH STUDIO</span><h1>{title}</h1><p>{sub}</p></div>{dirty && <button type="button" className="apd-unsaved" onClick={() => go('content')}><i />Unsaved changes</button>}</div>
        <main className="apd-content">
          <div className="ad-page">
            {tab === 'hunt' && <Hunt />}
            {tab === 'overview' && <Overview leads={leads} proposals={proposals} testimonials={testimonials} content={content} seo={seo} loading={loading} go={go} />}
            {tab === 'leads' && <Leads leads={leads} loading={loading} onStatus={(id, s) => setStatus('leads', id, s)} onDelete={deleteLead} onProposal={(l) => { setDraft(l); go('proposals'); }} notify={notify} />}
            {tab === 'testimonials' && <Testimonials items={testimonials} loading={loading} onUpdate={updateTestimonial} onDelete={deleteTestimonial} />}
            {tab === 'proposals' && <Proposals proposals={proposals} loading={loading} draft={draft} onCreate={createProposal} onStatus={(id, s) => setStatus('proposals', id, s)} notify={notify} />}
            {tab === 'content' && <Content content={content} setContent={setContent} notify={notify} />}
            {tab === 'media' && <Media media={media} loading={loadingMedia} uploading={uploading} content={content} onRefresh={loadMedia} onUpload={uploadFiles} onDelete={deleteMedia} notify={notify} />}
            {tab === 'seo' && <Seo seo={seo} setSeo={setSeo} saving={savingSeo} onSave={saveSeo} />}
          </div>
        </main>
      </div>

      <nav className="apd-bottom" aria-label="Primary navigation">
        <button type="button" className={tab === 'overview' ? 'is-active' : ''} onClick={() => go('overview')}><Icon n="home" /><span>Home</span></button>
        <button type="button" className={tab === 'hunt' ? 'is-active' : ''} onClick={() => go('hunt')}><Icon n="search" /><span>HUNT</span></button>
        <button type="button" className={tab === 'leads' ? 'is-active' : ''} onClick={() => go('leads')}><Icon n="inbox" /><span>Enquiries</span></button>
        <button type="button" className={tab === 'proposals' ? 'is-active' : ''} onClick={() => go('proposals')}><Icon n="doc" /><span>Proposals</span></button>
        <button type="button" onClick={() => setMoreOpen(true)}><Icon n="more" /><span>More</span></button>
      </nav>

      {moreOpen && <div className="apd-sheet-wrap" role="dialog" aria-modal="true" aria-label="All admin modules">
        <button type="button" className="apd-sheet-scrim" aria-label="Close menu" onClick={() => setMoreOpen(false)} />
        <section className="apd-sheet">
          <div className="apd-sheet-head"><div><b>All modules</b><small>Everything in your MifiTech workspace</small></div><button type="button" onClick={() => setMoreOpen(false)} aria-label="Close">×</button></div>
          <div className="apd-sheet-body">{navGroups.map((group) => <section key={group.label}><p className="apd-nav-label">{group.label}</p><div className="apd-sheet-grid">{group.items.map((item) => <button type="button" key={item.key} className="apd-sheet-item" onClick={() => go(item.key)}><span className="apd-sheet-icon"><Icon n={item.icon} /></span><b>{item.label}</b></button>)}</div></section>)}
            <div className="apd-sheet-foot"><a href="/" target="_blank" rel="noreferrer">View website ↗</a><button type="button" onClick={() => void logout()}>Sign out</button></div>
          </div>
        </section>
      </div>}

      {tab === 'content' && dirty && <div className="ad-save" role="region" aria-label="Unsaved changes"><div>
        <span>You have unsaved changes</span>
        <button className="ad-btn ghost sm" onClick={() => { setContent(JSON.parse(saved)); notify('Changes discarded.'); }}>Discard</button>
        <button className="ad-btn lime sm" onClick={saveContent} disabled={savingContent}>{savingContent ? 'Saving…' : 'Save changes'}</button>
      </div></div>}
      <div className="ad-toasts" role="status" aria-live="polite">{toasts.map((t) => <div key={t.id} className={'ad-toast' + (t.tone === 'err' ? ' err' : '')}><Icon n={t.tone === 'err' ? 'x' : 'check'} />{t.text}</div>)}</div>
    </div>
  );
}
