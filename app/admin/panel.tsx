'use client';

import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { defaultSiteContent } from '@/lib/site-content-defaults';

type Row = Record<string, any>;
const box: CSSProperties = { background: '#fff', border: '1px solid #e5e1d9', borderRadius: 12, padding: 18 };
const cmsGrid: CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 16, alignItems: 'start' };
const cmsCard: CSSProperties = { ...box, display: 'grid', gap: 12 };
const actionRow: CSSProperties = { display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' };
const secondaryButton: CSSProperties = { border: '1px solid #ded8cd', background: '#faf9f6', borderRadius: 8, padding: '8px 11px', cursor: 'pointer' };
const dangerButton: CSSProperties = { ...secondaryButton, color: '#a12c2c', borderColor: '#e5c5c5', background: '#fff8f8' };

export default function AdminPanel() {
  const [tab, setTab] = useState('leads');
  const [leads, setLeads] = useState<Row[]>([]);
  const [proposals, setProposals] = useState<Row[]>([]);
  const [seo, setSeo] = useState<any>({ title: '', description: '', keywords: [], canonicalUrl: 'https://mifitech-portfolio.vercel.app', ogTitle: '', ogDescription: '' });
  const [content, setContent] = useState<any>(defaultSiteContent);
  const [msg, setMsg] = useState('');
  const [link, setLink] = useState('');
  const [savingContent, setSavingContent] = useState(false);

  async function load() {
    const [a, b, c, d] = await Promise.all(['leads', 'proposals', 'seo', 'content'].map((x) => fetch('/api/admin/' + x)));
    const [x, y, z, w] = await Promise.all([a.json(), b.json(), c.json(), d.json()]);
    if (a.ok) setLeads(x.leads || []);
    if (b.ok) setProposals(y.proposals || []);
    if (c.ok) setSeo(z.settings);
    if (d.ok) setContent(w.content || defaultSiteContent);
    if (!a.ok || !b.ok || !c.ok || !d.ok) setMsg(x.error || y.error || z.error || w.error || 'Could not load admin records. Check the portfolio database setup.');
  }

  useEffect(() => { load().catch(() => setMsg('The admin database could not be reached.')); }, []);

  async function update(type: string, id: string, status: string) {
    const r = await fetch('/api/admin/' + type, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) });
    if (r.ok) load();
    else setMsg((await r.json()).error || 'Update failed');
  }

  async function submitProposal(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const r = await fetch('/api/admin/proposals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(f))) });
    const d = await r.json();
    if (!r.ok) { setMsg(d.error); return; }
    setLink(location.origin + '/proposal/' + d.token);
    f.reset();
    load();
  }

  async function saveSeo(e: FormEvent) {
    e.preventDefault();
    const r = await fetch('/api/admin/seo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...seo, keywords: typeof seo.keywords === 'string' ? seo.keywords.split(',').map((x: string) => x.trim()) : seo.keywords }) });
    const d = await r.json();
    setMsg(r.ok ? 'SEO settings saved.' : d.error || 'Could not save.');
  }

  function updateGroup(group: string, field: string, value: any) {
    setContent((old: any) => ({ ...old, [group]: { ...old[group], [field]: value } }));
  }

  function updateSection(section: string, field: string, value: any) {
    setContent((old: any) => ({ ...old, sections: { ...old.sections, [section]: { ...old.sections[section], [field]: value } } }));
  }

  function updateItem(collection: string, index: number, field: string, value: any) {
    setContent((old: any) => ({ ...old, [collection]: old[collection].map((item: any, i: number) => i === index ? { ...item, [field]: value } : item) }));
  }


  async function uploadImage(collection: string, index: number, field: string, file: File) {
    const form = new FormData();
    form.append('file', file);
    setMsg('Uploading image…');
    try {
      const response = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const result = await response.json();
      if (!response.ok || !result.url) throw new Error(result.error || 'Image upload failed.');
      if (collection === 'hero') updateGroup('hero', field, result.url);
      else updateItem(collection, index, field, result.url);
      setMsg('Image uploaded. Save all website changes to publish it.');
    } catch (error) {
      setMsg(error instanceof Error ? error.message : 'Image upload failed.');
    }
  }

  function addItem(collection: string) {
    const templates: Record<string, any> = {
      navigation: { label: 'New link', href: '/#contact' },
      services: { icon: 'website', name: 'New service', body: 'Describe this service.' },
      demos: { slug: 'new-demo', n: String(content.demos.length + 1).padStart(2, '0'), title: 'New industry demo', brand: 'NEW BRAND', text: 'Describe the website concept.', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85', tags: ['Services', 'Enquiries'], visible: true, href: '' },
      projects: { slug: 'new-project', image: '/previews/garrison-market.svg', name: 'New project', type: 'PORTFOLIO PROJECT', text: 'Describe the project.', websiteUrl: '', repoUrl: '', visible: true, stack: [], features: [] },
      stages: { n: String(content.stages.length + 1).padStart(2, '0'), title: 'New step', body: 'Describe this step.' },
    };
    setContent((old: any) => ({ ...old, [collection]: [...old[collection], templates[collection]] }));
  }

  function removeItem(collection: string, index: number) {
    setContent((old: any) => ({ ...old, [collection]: old[collection].filter((_: any, i: number) => i !== index) }));
  }

  async function saveContent() {
    setSavingContent(true);
    setMsg('');
    try {
      const r = await fetch('/api/admin/content', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content }) });
      const d = await r.json();
      setMsg(r.ok ? 'Website content and links saved. Refresh the public website to review the changes.' : d.error || 'Could not save website content.');
    } catch {
      setMsg('Could not reach the website content service.');
    } finally {
      setSavingContent(false);
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    location.reload();
  }

  const input = (name: string, value: any, onChange: (v: string) => void, area = false, placeholder = '') => (
    <label className="admin-field">{name}
      {area
        ? <textarea rows={4} value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        : <input value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />}
    </label>
  );

  const itemEditor = (collection: string, title: string, fields: Array<{ key: string; label: string; area?: boolean; list?: boolean }>, templateLabel: string) => (
    <div style={cmsCard}>
      <div style={actionRow}><h3 style={{ margin: 0 }}>{title}</h3><button type="button" style={secondaryButton} onClick={() => addItem(collection)}>+ Add {templateLabel}</button></div>
      {(content[collection] || []).map((item: any, index: number) => (
        <div key={collection + index} style={{ borderTop: '1px solid #eee8df', paddingTop: 12, display: 'grid', gap: 8 }}>
          <div style={actionRow}><strong>{item.name || item.title || item.label || item.brand || item.slug || ('Item ' + (index + 1))}</strong><button type="button" style={dangerButton} onClick={() => removeItem(collection, index)}>Delete</button></div>
          {fields.map((field) => <div key={field.key} style={{ display: 'grid', gap: 6 }}>
            {input(field.label, field.list ? (Array.isArray(item[field.key]) ? item[field.key].join(', ') : item[field.key] || '') : item[field.key], (v) => updateItem(collection, index, field.key, field.list ? v.split(',').map((s: string) => s.trim()).filter(Boolean) : v), field.area)}
            {field.key === 'image' && <label className="admin-field">Upload image (max 5 MB)<input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadImage(collection, index, field.key, file); e.currentTarget.value = ''; }} /></label>}
          </div>)}
          {collection === 'demos' && <label className="admin-field">Show on homepage<select value={item.visible === false ? 'no' : 'yes'} onChange={(e) => updateItem(collection, index, 'visible', e.target.value === 'yes')}><option value="yes">Visible</option><option value="no">Hidden</option></select></label>}
          {collection === 'projects' && <>
            <label className="admin-field">Show on homepage<select value={item.visible === false ? 'no' : 'yes'} onChange={(e) => updateItem(collection, index, 'visible', e.target.value === 'yes')}><option value="yes">Visible</option><option value="no">Hidden</option></select></label>
            <button type="button" style={dangerButton} onClick={() => updateItem(collection, index, 'websiteUrl', '')}>Remove website link</button>
            <p style={{ margin: 0, color: '#777', fontSize: 12 }}>Leave Website URL empty to hide the live-site button. Garrison Market is pre-filled with https://gmstock.co.</p>
          </>}
        </div>
      ))}
      {(!content[collection] || content[collection].length === 0) && <p style={{ margin: 0, color: '#777' }}>No items. Use the add button to create one.</p>}
    </div>
  );

  async function saveSeoForm(e: FormEvent) { await saveSeo(e); }

  return (
    <main className="admin-shell">
      <header><a className="admin-brand" href="/">MifiTech<span>.</span> <small>ADMIN</small></a><button onClick={logout}>Sign out</button></header>
      <div className="admin-content">
        <p className="admin-kicker">STUDIO CONTROL CENTRE</p>
        <h1>Manage your website.</h1>
        <p>Update homepage content, project links, enquiries, proposals and search settings without editing code.</p>
        <nav>{[['leads', 'Leads'], ['proposals', 'Proposals & payments'], ['content', 'Website content'], ['seo', 'SEO settings']].map(([k, v]) => <button className={tab === k ? 'active' : ''} onClick={() => setTab(k)} key={k}>{v}</button>)}</nav>
        {msg && <p className="admin-notice" role="status">{msg}</p>}

        {tab === 'leads' && <section><h2>Enquiries ({leads.length})</h2>{leads.length ? leads.map((l) => <article style={box} key={l.id}><div className="admin-row"><div><h3>{l.name} · {l.business || 'Business'}</h3><a href={'mailto:' + l.email}>{l.email}</a><p>{l.project_type} · {new Date(l.created_at).toLocaleString()}</p></div><select value={l.status} onChange={(e) => update('leads', l.id, e.target.value)}>{['new', 'interested', 'consultation', 'proposal_sent', 'awaiting_payment', 'converted', 'lost'].map((s) => <option key={s}>{s}</option>)}</select></div><p>{l.details}</p></article>) : <p style={box}>No enquiries yet. New enquiries will appear here once the portfolio database is connected.</p>}</section>}

        {tab === 'proposals' && <section className="admin-columns"><form style={box} onSubmit={submitProposal}><h2>Create proposal</h2>{['client_name', 'client_email', 'business_name', 'scope', 'timeline', 'amount', 'currency', 'payment_terms', 'payment_instructions'].map((k) => <label className="admin-field" key={k}>{k.replaceAll('_', ' ')}{k === 'scope' || k === 'payment_instructions' ? <textarea name={k} rows={4} required={k === 'scope'} /> : <input name={k} type={k === 'client_email' ? 'email' : k === 'amount' ? 'number' : 'text'} required={['client_name', 'client_email', 'business_name', 'timeline', 'amount'].includes(k)} defaultValue={k === 'currency' ? 'NGN' : k === 'payment_terms' ? '60% commencement; 40% before launch.' : ''} />}</label>)}<button>Create proposal link →</button>{link && <p>Share with client: <a href={link}>{link}</a></p>}</form><div><h2>Proposal pipeline ({proposals.length})</h2>{proposals.map((p) => <article style={box} key={p.id}><h3>{p.business_name}</h3><p>{p.client_name} · {p.currency} {Number(p.amount).toLocaleString()}</p><select value={p.status} onChange={(e) => update('proposals', p.id, e.target.value)}>{['draft', 'sent', 'accepted', 'declined', 'awaiting_payment', 'paid', 'in_progress', 'completed'].map((s) => <option key={s}>{s}</option>)}</select><p><a href={'/proposal/' + p.token} target="_blank" rel="noreferrer">View proposal ↗</a></p></article>)}</div></section>}

        {tab === 'content' && <section>
          <div style={{ ...actionRow, justifyContent: 'space-between', marginBottom: 16 }}><div><h2 style={{ marginBottom: 4 }}>Website content manager</h2><p style={{ margin: 0, color: '#68645d' }}>Edit the homepage, organise cards and manage external links. Changes only go live after saving.</p></div><button type="button" disabled={savingContent} onClick={saveContent}>{savingContent ? 'Saving…' : 'Save all website changes →'}</button></div>
          <div style={cmsGrid}>
            <div style={cmsCard}>
              <h3 style={{ margin: 0 }}>Hero / first impression</h3>
              {(['eyebrow', 'kicker', 'title', 'emphasis', 'lead', 'primaryLabel', 'primaryHref', 'secondaryLabel', 'secondaryHref', 'visualNote', 'visualIndex', 'ribbonLead'] as string[]).map((key) => input(key.replace(/[A-Z]/g, (m) => ' ' + m).replace(/^./, (m) => m.toUpperCase()), content.hero[key], (v) => updateGroup('hero', key, v), ['lead', 'visualNote'].includes(key)))}
              {input('Ribbon items (comma separated)', content.hero.ribbonItems.join(', '), (v) => updateGroup('hero', 'ribbonItems', v.split(',').map((x: string) => x.trim()).filter(Boolean))}
              <label className="admin-field">Upload hero image (JPG, PNG, WebP, AVIF or GIF · max 5 MB)<input type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={(e) => { const file = e.target.files?.[0]; if (file) uploadImage('hero', 0, 'visualImage', file); e.currentTarget.value = ''; }} /></label>
            </div>
            <div style={cmsCard}>
              <h3 style={{ margin: 0 }}>Section headings and contact details</h3>
              {(['services', 'demos', 'work', 'about', 'process', 'guide', 'contact'] as string[]).map((name) => <div key={name} style={{ borderTop: '1px solid #eee8df', paddingTop: 8 }}>
                <strong style={{ textTransform: 'capitalize' }}>{name} section</strong>
                {Object.keys(content.sections[name] || {}).map((field) => {
                  const value = content.sections[name][field];
                  if (Array.isArray(value)) return input(field + ' (one per line)', value.join('\n'), (v) => updateSection(name, field, v.split('\n').filter(Boolean)), true);
                  return input(field, value, (v) => updateSection(name, field, v), typeof value === 'string' && (value.length > 100 || field === 'intro' || field === 'note'));
                })}
              </div>)}
            </div>
            {itemEditor('navigation', 'Navigation links', [{ key: 'label', label: 'Label' }, { key: 'href', label: 'Destination (path, #anchor or https:// URL)' }], 'link')}
            {itemEditor('services', 'Services', [{ key: 'icon', label: 'Icon (website, store, apps, search, maintenance, support)' }, { key: 'name', label: 'Service name' }, { key: 'body', label: 'Description', area: true }], 'service')}
            {itemEditor('demos', 'Industry demo cards', [{ key: 'n', label: 'Number' }, { key: 'slug', label: 'Demo page slug (for example private-clinic)' }, { key: 'title', label: 'Industry title' }, { key: 'brand', label: 'Sample brand name' }, { key: 'text', label: 'Card description', area: true }, { key: 'image', label: 'Image URL' }, { key: 'tags', label: 'Tags (comma separated)', list: true }, { key: 'href', label: 'Custom destination (leave blank to use /demos/slug)' }], 'demo')}
            {itemEditor('projects', 'Portfolio projects & website links', [{ key: 'slug', label: 'Project slug (URL path)' }, { key: 'name', label: 'Project name' }, { key: 'type', label: 'Project category' }, { key: 'text', label: 'Description', area: true }, { key: 'image', label: 'Preview image path or URL' }, { key: 'websiteUrl', label: 'Live website URL (blank hides the link)' }, { key: 'repoUrl', label: 'GitHub repository URL (optional)' }, { key: 'stack', label: 'Technology tags (comma separated)', list: true }, { key: 'features', label: 'Project features (comma separated)', list: true }], 'project')}
            {itemEditor('stages', 'Project process steps', [{ key: 'n', label: 'Number' }, { key: 'title', label: 'Step title' }, { key: 'body', label: 'Step description', area: true }], 'step')}
            <div style={cmsCard}>
              <h3 style={{ margin: 0 }}>Footer content</h3>
              {(['tagline', 'exploreLabel', 'projectLabel', 'projectCta'] as string[]).map((key) => input(key, content.footer[key], (v) => updateGroup('footer', key, v), key === 'tagline'))}
            </div>
          </div>
          <div style={{ ...box, marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div><strong>Website link rule</strong><p style={{ margin: '4px 0 0', color: '#777' }}>Only Garrison Market has a live website link by default: https://gmstock.co. Add or remove other links here at any time.</p></div>
            <button type="button" disabled={savingContent} onClick={saveContent}>{savingContent ? 'Saving…' : 'Save all website changes →'}</button>
          </div>
        </section>}

        {tab === 'seo' && <section style={{ ...box, maxWidth: 820 }}><h2>SEO settings</h2><p>Update search titles, descriptions and target phrases. Search rankings depend on relevance, content quality, competition and time; no setting can guarantee a position.</p><form onSubmit={saveSeoForm}>{input('Page title', seo.title, (v) => setSeo({ ...seo, title: v }))}{input('Meta description', seo.description, (v) => setSeo({ ...seo, description: v }), true)}{input('Target phrases (comma separated)', Array.isArray(seo.keywords) ? seo.keywords.join(', ') : seo.keywords, (v) => setSeo({ ...seo, keywords: v }), true)}{input('Canonical URL', seo.canonicalUrl, (v) => setSeo({ ...seo, canonicalUrl: v }))}{input('Social share title', seo.ogTitle, (v) => setSeo({ ...seo, ogTitle: v }))}{input('Social share description', seo.ogDescription, (v) => setSeo({ ...seo, ogDescription: v }), true)}<button>Save SEO settings →</button></form><p><a href="/how-to-build-a-website-in-nigeria" target="_blank" rel="noreferrer">Preview SEO guide ↗</a></p><ul><li>XML sitemap and robots.txt</li><li>Business structured data</li><li>Mobile-first technical metadata</li><li>Search-focused website building guide</li></ul></section>}
      </div>
    </main>
  );
}
