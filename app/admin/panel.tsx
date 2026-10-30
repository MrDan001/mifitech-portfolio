'use client';

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { defaultHomepageContent, defaultBusinessSettings, type HomepageContent, type BusinessSettings } from '@/lib/site-content-defaults';

type Row = Record<string, any>;
type Tab = 'dashboard' | 'leads' | 'proposals' | 'homepage' | 'services' | 'portfolio' | 'demos' | 'media' | 'seo' | 'settings';
type MediaItem = { id: string; file_name: string; public_url: string; content_type: string; size_bytes: number; created_at: string };
type SeoSettings = { title: string; description: string; keywords: string[]; canonicalUrl: string; ogTitle: string; ogDescription: string };

const navigation: Array<{ group: string; items: Array<{ id: Tab; label: string; short: string }> }> = [
  { group: 'STUDIO', items: [{ id: 'dashboard', label: 'Dashboard', short: '01' }, { id: 'leads', label: 'Enquiries', short: '02' }, { id: 'proposals', label: 'Proposals & Payments', short: '03' }] },
  { group: 'WEBSITE CONTROL', items: [{ id: 'homepage', label: 'Homepage', short: '04' }, { id: 'services', label: 'Services', short: '05' }, { id: 'portfolio', label: 'Portfolio', short: '06' }, { id: 'demos', label: 'Demo Studio', short: '07' }, { id: 'media', label: 'Media Library', short: '08' }] },
  { group: 'GROWTH', items: [{ id: 'seo', label: 'SEO', short: '09' }, { id: 'settings', label: 'Settings', short: '10' }] },
];

const initialSeo: SeoSettings = {
  title: 'MifiTech | Website Design & Development in Nigeria',
  description: 'MifiTech designs and builds professional business websites, online stores and custom web applications in Nigeria.',
  keywords: ['website design Nigeria', 'website development Nigeria', 'how to build a website', 'web designer Nigeria'],
  canonicalUrl: 'https://mifitech-portfolio.vercel.app',
  ogTitle: 'MifiTech — Websites & Digital Products',
  ogDescription: 'Thoughtful websites and useful digital products, built around your business.',
};

function currency(value: number, code = 'NGN') {
  try { return new Intl.NumberFormat('en-NG', { style: 'currency', currency: code, maximumFractionDigits: 0 }).format(value || 0); }
  catch { return code + ' ' + Number(value || 0).toLocaleString(); }
}
function Field({ label, value, onChange, area = false, hint, type = 'text' }: { label: string; value: string; onChange: (value: string) => void; area?: boolean; hint?: string; type?: string }) {
  return <label className="adm-field"><span>{label}</span>{area ? <textarea rows={3} value={value || ''} onChange={e => onChange(e.target.value)} /> : <input type={type} value={value || ''} onChange={e => onChange(e.target.value)} />}{hint && <small>{hint}</small>}</label>;
}
function StatusPill({ value }: { value: string }) {
  return <span className={'adm-status adm-status-' + String(value || 'new').toLowerCase().replace(/[^a-z0-9]+/g, '-')}>{String(value || 'new').replaceAll('_', ' ')}</span>;
}

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [content, setContent] = useState<HomepageContent>(defaultHomepageContent);
  const [leads, setLeads] = useState<Row[]>([]);
  const [proposals, setProposals] = useState<Row[]>([]);
  const [payments, setPayments] = useState<Row[]>([]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [seo, setSeo] = useState<SeoSettings>(initialSeo);
  const [business, setBusiness] = useState<BusinessSettings>(defaultBusinessSettings);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [search, setSearch] = useState('');
  const [proposalLink, setProposalLink] = useState('');
  

  async function getJson(url: string) {
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || 'The admin request could not be completed.');
    return data;
  }

  async function refresh() {
    setError('');
    try {
      const [dashboardData, leadData, proposalData, paymentData, websiteData, mediaData, seoData, settingsData] = await Promise.all([
        getJson('/api/admin/dashboard'),
        getJson('/api/admin/leads'),
        getJson('/api/admin/proposals'),
        getJson('/api/admin/payments'),
        getJson('/api/admin/website'),
        getJson('/api/admin/media'),
        getJson('/api/admin/seo'),
        getJson('/api/admin/settings'),
      ]);
      setLeads(leadData.leads || []);
      setProposals(proposalData.proposals || []);
      setPayments(paymentData.payments || []);
      setContent(websiteData.content || defaultHomepageContent);
      setMedia(mediaData.assets || []);
      setSeo(seoData.settings || initialSeo);
      setBusiness(settingsData.settings || defaultBusinessSettings);
      if (dashboardData.warning) setMessage(dashboardData.warning);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the studio workspace.');
    }
  }

  useEffect(() => { refresh(); }, []);

  const openProposals = proposals.filter(p => !['completed', 'declined'].includes(p.status));
  const newLeads = leads.filter(l => l.status === 'new').length;
  const paidAmount = payments.filter(p => p.status === 'paid' && p.currency === 'NGN').reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const filteredLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return leads;
    return leads.filter(l => [l.name, l.email, l.business, l.project_type, l.details].some(v => String(v || '').toLowerCase().includes(term)));
  }, [leads, search]);

  async function mutate(url: string, method: 'POST' | 'PATCH' | 'DELETE', body?: unknown) {
    setBusy(true); setError(''); setMessage('');
    try {
      const response = await fetch(url, { method, headers: body ? { 'Content-Type': 'application/json' } : undefined, body: body ? JSON.stringify(body) : undefined });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'The change could not be saved.');
      setMessage(data.message || 'Saved successfully.');
      await refresh();
      return data;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'The change could not be saved.');
      return null;
    } finally { setBusy(false); }
  }

  async function saveWebsite(event?: FormEvent) {
    event?.preventDefault();
    const result = await mutate('/api/admin/website', 'POST', content);
    if (result) setMessage('Homepage content saved. Public pages will use the new content.');
  }
  async function saveSeo(event: FormEvent) {
    event.preventDefault();
    await mutate('/api/admin/seo', 'POST', { ...seo, keywords: typeof seo.keywords === 'string' ? seo.keywords.split(',').map(x => x.trim()).filter(Boolean) : seo.keywords });
  }
  async function saveBusiness(event: FormEvent) {
    event.preventDefault();
    await mutate('/api/admin/settings', 'POST', business);
  }
  async function createProposal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const result = await mutate('/api/admin/proposals', 'POST', Object.fromEntries(new FormData(form)));
    if (result?.token) {
      setProposalLink(window.location.origin + '/proposal/' + result.token);
      form.reset();
    }
  }
  async function recordPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const result = await mutate('/api/admin/payments', 'POST', Object.fromEntries(new FormData(form)));
    if (result) form.reset();
  }
  async function uploadImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true); setError(''); setMessage('');
    try {
      const form = new FormData();
      form.append('file', file);
      const response = await fetch('/api/admin/media', { method: 'POST', body: form });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Image upload failed.');
      setMessage('Image uploaded. Copy its URL into the homepage, service, demo or project image field.');
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Image upload failed.');
    } finally {
      setBusy(false);
      event.target.value = '';
    }
  }

  function updateField(section: 'hero' | 'sections' | 'contact', key: string, value: string) {
    setContent(previous => ({ ...previous, [section]: { ...previous[section], [key]: value } } as HomepageContent));
  }
  function updateCard(list: 'services' | 'projects' | 'demos', id: string, key: string, value: string | boolean) {
    setContent(previous => ({ ...previous, [list]: (previous[list] as unknown as Array<Record<string, any>>).map(item => item.id === id ? { ...item, [key]: value } : item) } as HomepageContent));
  }
  function reorder(list: 'services' | 'projects' | 'demos', index: number, direction: -1 | 1) {
    setContent(previous => {
      const next = [...previous[list]] as unknown as Array<Record<string, any>>;
      const target = index + direction;
      if (target < 0 || target >= next.length) return previous;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...previous, [list]: next } as HomepageContent;
    });
  }
  function removeCard(list: 'services' | 'projects' | 'demos', id: string) {
    if (!window.confirm('Remove this item from the public website?')) return;
    setContent(previous => ({ ...previous, [list]: (previous[list] as unknown as Array<Record<string, any>>).filter(item => item.id !== id) } as HomepageContent));
  }
  function addCard(list: 'services' | 'projects' | 'demos') {
    const id = list.slice(0, -1) + '-' + Date.now();
    if (list === 'services') setContent(p => ({ ...p, services: [...p.services, { id, icon: 'website', name: 'New service', body: 'Describe this service.', active: true }] }));
    if (list === 'projects') setContent(p => ({ ...p, projects: [...p.projects, { id, slug: 'project-' + Date.now(), image: '', name: 'New project', type: 'PROJECT TYPE', text: 'Describe this project.', live: '', active: true }] }));
    if (list === 'demos') setContent(p => ({ ...p, demos: [...p.demos, { id, slug: 'new-demo-' + Date.now(), n: String(p.demos.length + 1).padStart(2, '0'), title: 'New industry demo', brand: 'YOUR BRAND', text: 'Describe this website concept.', image: '', tags: 'Services, Enquiries', active: true }] }));
  }

  async function copyUrl(value: string) {
    try { await navigator.clipboard.writeText(value); setMessage('Image URL copied. Paste it into an image field in the Website Manager.'); }
    catch { setMessage(value); }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin';
  }

  const titleByTab: Record<Tab, { title: string; description: string }> = {
    dashboard: { title: 'Studio overview', description: 'A clear picture of enquiries, client proposals and the work moving through the studio.' },
    leads: { title: 'Enquiries', description: 'Review incoming project requests and keep every conversation moving.' },
    proposals: { title: 'Proposals & payments', description: 'Prepare client proposals and keep a reliable record of money received.' },
    homepage: { title: 'Homepage editor', description: 'Update the words and images people see on the MifiTech website.' },
    services: { title: 'Services', description: 'Manage the services displayed on the homepage.' },
    portfolio: { title: 'Portfolio', description: 'Keep project previews, descriptions and destinations up to date.' },
    demos: { title: 'Demo Studio', description: 'Manage the industry concepts visitors can explore.' },
    media: { title: 'Media library', description: 'Upload and reuse website images without touching the code.' },
    seo: { title: 'SEO settings', description: 'Control the site-wide search and social-sharing information.' },
    settings: { title: 'Business settings', description: 'Keep the studio identity and customer contact details consistent.' },
  };

  const listEditor = (list: 'services' | 'projects' | 'demos') => {
    const items = content[list] as unknown as Array<Record<string, any>>;
    return <section className="adm-section">
      <div className="adm-section-head"><div><p className="adm-eyebrow">WEBSITE CONTENT</p><h2>{list === 'services' ? 'Service cards' : list === 'projects' ? 'Portfolio projects' : 'Industry demos'}</h2><p>Changes stay in the editor until you save the list.</p></div><button className="adm-button adm-button-primary" type="button" onClick={() => addCard(list)}>Add item</button></div>
      {items.length === 0 && <div className="adm-empty">No items yet. Add the first one to get started.</div>}
      <div className="adm-edit-list">{items.map((item, index) => <article className="adm-edit-card" key={item.id}>
        <div className="adm-edit-top"><div><span className="adm-number">{String(index + 1).padStart(2, '0')}</span><strong>{item.name || item.title || 'Untitled item'}</strong><StatusPill value={item.active ? 'published' : 'hidden'} /></div><div className="adm-order"><button type="button" onClick={() => reorder(list, index, -1)} disabled={index === 0} aria-label="Move item up">UP</button><button type="button" onClick={() => reorder(list, index, 1)} disabled={index === items.length - 1} aria-label="Move item down">DOWN</button><button className="adm-delete" type="button" onClick={() => removeCard(list, item.id)}>Remove</button></div></div>
        {list === 'services' ? <div className="adm-field-grid"><Field label="Service name" value={item.name} onChange={v => updateCard(list, item.id, 'name', v)} /><Field label="Icon style" value={item.icon} onChange={v => updateCard(list, item.id, 'icon', v)} hint="Use: website, store, apps, search, maintenance or support." /><div className="adm-field adm-field-wide"><Field label="Description" value={item.body} onChange={v => updateCard(list, item.id, 'body', v)} area /></div></div> :
        list === 'projects' ? <div className="adm-field-grid"><Field label="Project name" value={item.name} onChange={v => updateCard(list, item.id, 'name', v)} /><Field label="Project slug" value={item.slug} onChange={v => updateCard(list, item.id, 'slug', v)} hint="Used in the project detail URL." /><Field label="Category label" value={item.type} onChange={v => updateCard(list, item.id, 'type', v)} /><Field label="Project image URL" value={item.image} onChange={v => updateCard(list, item.id, 'image', v)} /><Field label="Live project URL" value={item.live} onChange={v => updateCard(list, item.id, 'live', v)} /><div className="adm-field adm-field-wide"><Field label="Short description" value={item.text} onChange={v => updateCard(list, item.id, 'text', v)} area /></div></div> :
        <div className="adm-field-grid"><Field label="Demo name" value={item.title} onChange={v => updateCard(list, item.id, 'title', v)} /><Field label="Sample brand" value={item.brand} onChange={v => updateCard(list, item.id, 'brand', v)} /><Field label="Demo route slug" value={item.slug} onChange={v => updateCard(list, item.id, 'slug', v)} hint="Existing routes: restaurant, beauty-salon, fashion-boutique, event-planner, printing." /><Field label="Image URL" value={item.image} onChange={v => updateCard(list, item.id, 'image', v)} /><Field label="Tags (comma separated)" value={item.tags} onChange={v => updateCard(list, item.id, 'tags', v)} /><div className="adm-field adm-field-wide"><Field label="Description" value={item.text} onChange={v => updateCard(list, item.id, 'text', v)} area /></div></div>}
        <label className="adm-check"><input type="checkbox" checked={!!item.active} onChange={e => updateCard(list, item.id, 'active', e.target.checked)} /> Show this item on the public website</label>
        {item.image && list !== 'services' && <div className="adm-image-preview"><img src={item.image} alt="" /><span>Current image preview</span></div>}
      </article>)}</div>
      <div className="adm-form-footer"><button type="submit" className="adm-button adm-button-primary">Save and publish changes</button><span>Changes are published to the live site after saving.</span></div>
    </section>;
  };

  function InputField({ label, value, onChange, area = false }: { label: string; value: string; onChange: (v: string) => void; area?: boolean }) {
    return <Field label={label} value={value} onChange={onChange} area={area} />;
  }

  return <main className="adm-shell">
    <aside className="adm-sidebar">
      <a href="/" className="adm-brand"><span className="adm-brand-mark">M</span><span><strong>MifiTech</strong><small>STUDIO CONTROL CENTRE</small></span></a>
      <div className="adm-side-scroll">{navigation.map(group => <div className="adm-nav-group" key={group.group}><p>{group.group}</p>{group.items.map(item => <button key={item.id} className={tab === item.id ? 'active' : ''} onClick={() => { setTab(item.id); setMessage(''); setError(''); }}><span className="adm-nav-number">{item.short}</span>{item.label}</button>)}</div>)}</div>
      <div className="adm-sidebar-bottom"><a href="/">View public website</a><button onClick={logout}>Sign out</button></div>
    </aside>

    <div className="adm-main">
      <header className="adm-topbar"><div className="adm-topbar-label"><span className="adm-live-dot" /> PRIVATE WORKSPACE <span>/</span> {titleByTab[tab].title.toUpperCase()}</div><div className="adm-top-actions"><a href="/" target="_blank" rel="noreferrer">View website</a><button type="button" onClick={refresh}>Refresh data</button><button type="button" className="adm-mobile-signout" onClick={logout}>Sign out</button></div></header>
      <div className="adm-content">
        <div className="adm-page-heading"><div><p className="adm-eyebrow">MIFITECH / ADMINISTRATION</p><h1>{titleByTab[tab].title}</h1><p>{titleByTab[tab].description}</p></div><div className="adm-heading-date"><span>YOUR WORKSPACE</span><strong>OWNER ACCESS</strong></div></div>
        {error && <div className="adm-alert adm-alert-error"><strong>Something needs attention</strong><span>{error}</span>{error.includes('SUPABASE') || error.includes('Database') ? <a href="/docs/ADMIN_AND_SEO_SETUP.md">Open setup instructions</a> : null}</div>}
        {message && <div className="adm-alert adm-alert-success">{message}</div>}

        {tab === 'dashboard' && <div className="adm-dashboard">
          <div className="adm-stat-grid">
            <article><span>NEW ENQUIRIES</span><strong>{newLeads}</strong><small>{leads.length} total enquiries</small></article>
            <article><span>OPEN PROPOSALS</span><strong>{openProposals.length}</strong><small>{proposals.length} proposals created</small></article>
            <article><span>PAYMENTS RECEIVED (NGN)</span><strong>{currency(paidAmount)}</strong><small>{payments.filter(p => p.status === 'paid').length} recorded payments across currencies</small></article>
            <article><span>PROJECTS IN PROGRESS</span><strong>{proposals.filter(p => p.status === 'in_progress').length}</strong><small>Based on proposal status</small></article>
          </div>
          <div className="adm-dashboard-grid">
            <section className="adm-card"><div className="adm-card-heading"><div><p className="adm-eyebrow">RECENT ACTIVITY</p><h2>Latest enquiries</h2></div><button onClick={() => setTab('leads')}>View all</button></div>
              {leads.slice(0, 5).map(lead => <div className="adm-activity-row" key={lead.id}><div><strong>{lead.name}</strong><span>{lead.business || lead.project_type || 'New project enquiry'}</span></div><StatusPill value={lead.status} /></div>)}
              {leads.length === 0 && <div className="adm-empty">Your new website enquiries will appear here.</div>}
            </section>
            <section className="adm-card adm-quick-card"><p className="adm-eyebrow">QUICK ACTIONS</p><h2>Move the studio forward.</h2><button onClick={() => setTab('proposals')}>Create a client proposal</button><button onClick={() => setTab('media')}>Upload a website image</button><button onClick={() => setTab('homepage')}>Edit homepage content</button><button onClick={() => setTab('leads')}>Review new enquiries</button></section>
          </div>
          <section className="adm-card adm-status-overview"><div><p className="adm-eyebrow">WEBSITE CONTENT</p><h2>Public website managers</h2><p>These controls update the public site without a code change. Save the relevant section after editing.</p></div><div className="adm-shortcuts"><button onClick={() => setTab('services')}>Services</button><button onClick={() => setTab('portfolio')}>Portfolio</button><button onClick={() => setTab('demos')}>Demo Studio</button><button onClick={() => setTab('seo')}>SEO</button></div></section>
        </div>}

        {tab === 'leads' && <section className="adm-card">
          <div className="adm-card-heading"><div><p className="adm-eyebrow">CUSTOMER PIPELINE</p><h2>All enquiries <span className="adm-count">{leads.length}</span></h2></div><input className="adm-search" placeholder="Search name, email or business" value={search} onChange={e => setSearch(e.target.value)} /></div>
          <div className="adm-table-wrap"><table className="adm-table"><thead><tr><th>CONTACT</th><th>PROJECT</th><th>RECEIVED</th><th>STATUS</th><th>DETAILS</th></tr></thead><tbody>{filteredLeads.map(lead => <tr key={lead.id}><td><strong>{lead.name}</strong><a href={'mailto:' + lead.email}>{lead.email}</a><small>{lead.business || 'Business not supplied'}</small></td><td>{lead.project_type || 'Not specified'}{lead.demo && <small>Demo: {lead.demo}</small>}</td><td>{lead.created_at ? new Date(lead.created_at).toLocaleDateString() : '—'}</td><td><select value={lead.status} onChange={e => mutate('/api/admin/leads', 'PATCH', { id: lead.id, status: e.target.value })}>{['new', 'interested', 'consultation', 'proposal_sent', 'awaiting_payment', 'converted', 'lost'].map(s => <option value={s} key={s}>{s.replaceAll('_', ' ')}</option>)}</select></td><td><details className="adm-details"><summary>Read enquiry</summary><p>{lead.details}</p><a href={'mailto:' + lead.email}>Reply by email</a></details></td></tr>)}</tbody></table></div>
          {filteredLeads.length === 0 && <div className="adm-empty">No matching enquiries found.</div>}
        </section>}

        {tab === 'proposals' && <div className="adm-proposal-layout">
          <section className="adm-card"><div className="adm-card-heading"><div><p className="adm-eyebrow">NEW CLIENT DOCUMENT</p><h2>Create a proposal</h2></div></div>
            <form className="adm-form" onSubmit={createProposal}>
              <label className="adm-field"><span>Client name</span><input name="client_name" required /></label>
              <label className="adm-field"><span>Client email</span><input name="client_email" type="email" required /></label>
              <label className="adm-field"><span>Business name</span><input name="business_name" required /></label>
              <label className="adm-field"><span>Project scope and deliverables</span><textarea name="scope" rows={5} required /></label>
              <div className="adm-form-row"><label className="adm-field"><span>Estimated timeline</span><input name="timeline" placeholder="e.g. 3–4 weeks" required /></label><label className="adm-field"><span>Project amount</span><input name="amount" type="number" min="1" step="0.01" required /></label></div>
              <div className="adm-form-row"><label className="adm-field"><span>Currency</span><select name="currency" defaultValue="NGN"><option>NGN</option><option>USD</option><option>GBP</option><option>EUR</option></select></label><label className="adm-field"><span>Payment terms</span><input name="payment_terms" defaultValue="60% commencement; 40% before launch." /></label></div>
              <label className="adm-field"><span>Payment instructions (optional)</span><textarea name="payment_instructions" rows={3} /></label>
              <button className="adm-button adm-button-primary" disabled={busy}>Create private proposal link</button>
              {proposalLink && <div className="adm-proposal-link"><strong>Proposal link created</strong><input readOnly value={proposalLink} onFocus={e => e.currentTarget.select()} /><button type="button" onClick={() => navigator.clipboard.writeText(proposalLink)}>Copy link</button><a href={proposalLink} target="_blank" rel="noreferrer">Preview proposal</a></div>}
            </form>
          </section>
          <section className="adm-card"><div className="adm-card-heading"><div><p className="adm-eyebrow">CLIENT DOCUMENTS</p><h2>Proposal pipeline <span className="adm-count">{proposals.length}</span></h2></div></div>
            {proposals.map(proposal => <article className="adm-record" key={proposal.id}><div><strong>{proposal.business_name}</strong><span>{proposal.client_name} · {proposal.currency} {Number(proposal.amount).toLocaleString()}</span><small>{proposal.client_email}</small><small>Paid so far: {proposal.currency} {Number(proposal.amount_paid || 0).toLocaleString()} · {proposal.payment_status || 'unpaid'}</small></div><div><StatusPill value={proposal.status}/><select value={proposal.status} onChange={e => mutate('/api/admin/proposals', 'PATCH', { id: proposal.id, status: e.target.value })}>{['draft','sent','accepted','declined','awaiting_payment','paid','in_progress','completed'].map(s => <option key={s} value={s}>{s.replaceAll('_',' ')}</option>)}</select><a href={'/proposal/' + proposal.token} target="_blank" rel="noreferrer">Open client link</a></div></article>)}
            {proposals.length === 0 && <div className="adm-empty">Your proposals will be listed here after you create the first one.</div>}
          </section>
          <section className="adm-card adm-payment-card"><div className="adm-card-heading"><div><p className="adm-eyebrow">MANUAL PAYMENT LEDGER</p><h2>Record a payment</h2><p>Payments entered here are recorded manually. No payment processor is connected.</p></div></div>
            <form className="adm-form" onSubmit={recordPayment}>
              <label className="adm-field"><span>Related proposal (optional)</span><select name="proposal_id" defaultValue=""><option value="">Not linked to a proposal</option>{proposals.map(p => <option key={p.id} value={p.id}>{p.business_name} — {p.client_name}</option>)}</select></label>
              <div className="adm-form-row"><label className="adm-field"><span>Amount received</span><input name="amount" type="number" min="1" step="0.01" required /></label><label className="adm-field"><span>Currency</span><select name="currency" defaultValue="NGN"><option>NGN</option><option>USD</option><option>GBP</option><option>EUR</option></select></label></div>
              <div className="adm-form-row"><label className="adm-field"><span>Payment method</span><select name="method" defaultValue="bank_transfer"><option value="bank_transfer">Bank transfer</option><option value="cash">Cash</option><option value="card">Card (manual confirmation)</option><option value="paystack">Paystack (manual confirmation)</option><option value="flutterwave">Flutterwave (manual confirmation)</option><option value="other">Other</option></select></label><label className="adm-field"><span>Date received</span><input name="paid_at" type="date" defaultValue={new Date().toISOString().slice(0,10)} /></label></div>
              <div className="adm-form-row"><label className="adm-field"><span>Reference (optional)</span><input name="reference" /></label><label className="adm-field"><span>Status</span><select name="status" defaultValue="paid"><option value="paid">Paid / received</option><option value="pending">Pending confirmation</option><option value="refunded">Refunded</option></select></label></div>
              <label className="adm-field"><span>Internal note (optional)</span><textarea name="note" rows={2}/></label>
              <button className="adm-button adm-button-primary" disabled={busy}>Save payment record</button>
            </form>
          </section>
          <section className="adm-card"><div className="adm-card-heading"><div><p className="adm-eyebrow">PAYMENT HISTORY</p><h2>Recorded payments <span className="adm-count">{payments.length}</span></h2></div></div>
            {payments.map(payment => <article className="adm-record" key={payment.id}><div><strong>{payment.business_name || 'Payment record'}</strong><span>{payment.method?.replaceAll('_',' ')} · {payment.reference || 'No reference'}</span><small>{payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : new Date(payment.created_at).toLocaleDateString()}</small></div><div><strong>{currency(Number(payment.amount), payment.currency)}</strong><StatusPill value={payment.status}/><select value={payment.status} onChange={e => mutate('/api/admin/payments','PATCH',{id:payment.id,status:e.target.value})}><option value="paid">Paid</option><option value="pending">Pending</option><option value="refunded">Refunded</option></select></div></article>)}
            {payments.length === 0 && <div className="adm-empty">Payment entries will appear here when recorded.</div>}
          </section>
        </div>}

        {tab === 'homepage' && <form className="adm-card adm-editor" onSubmit={saveWebsite}>
          <div className="adm-card-heading"><div><p className="adm-eyebrow">PUBLIC WEBSITE</p><h2>Homepage content</h2><p>Edit the first impression, section copy and contact details.</p></div><button className="adm-button adm-button-primary" disabled={busy}>Save homepage</button></div>
          <section className="adm-editor-section"><h3>Hero section</h3><div className="adm-field-grid">
            <InputField label="Small eyebrow" value={content.hero.eyebrow} onChange={v => updateField('hero','eyebrow',v)} />
            <InputField label="Service kicker" value={content.hero.kicker} onChange={v => updateField('hero','kicker',v)} />
            <InputField label="Main heading" value={content.hero.title} onChange={v => updateField('hero','title',v)} />
            <InputField label="Highlighted heading" value={content.hero.accent} onChange={v => updateField('hero','accent',v)} />
            <div className="adm-field-wide"><InputField label="Supporting description" area value={content.hero.description} onChange={v => updateField('hero','description',v)} /></div>
            <InputField label="Primary button label" value={content.hero.primaryLabel} onChange={v => updateField('hero','primaryLabel',v)} />
            <InputField label="Primary button destination" value={content.hero.primaryHref} onChange={v => updateField('hero','primaryHref',v)} />
            <InputField label="Secondary button label" value={content.hero.secondaryLabel} onChange={v => updateField('hero','secondaryLabel',v)} />
            <InputField label="Secondary button destination" value={content.hero.secondaryHref} onChange={v => updateField('hero','secondaryHref',v)} />
            <div className="adm-field-wide"><InputField label="Hero image URL" value={content.hero.image} onChange={v => updateField('hero','image',v)} /></div>
            <InputField label="Image description (alt text)" value={content.hero.imageAlt} onChange={v => updateField('hero','imageAlt',v)} />
            <InputField label="Image note" value={content.hero.note} onChange={v => updateField('hero','note',v)} />
          </div></section>
          <section className="adm-editor-section"><h3>Section headings and copy</h3><div className="adm-field-grid">
            {([
              ['servicesTitle','Services heading'],['servicesAccent','Services highlight'],['servicesDescription','Services introduction'],
              ['demosTitle','Demo heading'],['demosAccent','Demo highlight'],['demosDescription','Demo introduction'],
              ['workTitle','Portfolio heading'],['workAccent','Portfolio highlight'],['workDescription','Portfolio introduction'],
              ['aboutTitle','About heading'],['aboutAccent','About highlight'],['aboutParagraphOne','About paragraph one'],
              ['aboutParagraphTwo','About paragraph two'],['processTitle','Process heading'],['processAccent','Process highlight'],
              ['processDescription','Process introduction'],['guideTitle','Guide heading'],['guideDescription','Guide introduction'],
              ['guideLinkLabel','Guide link label'],['contactTitle','Contact heading'],['contactAccent','Contact highlight'],
              ['contactDescription','Contact introduction'],['contactNote','Contact note'],
            ] as Array<[keyof HomepageContent['sections'],string]>).map(([key,label]) => <div key={key} className={['servicesDescription','demosDescription','workDescription','aboutParagraphOne','aboutParagraphTwo','processDescription','guideDescription','contactDescription','contactNote'].includes(key) ? 'adm-field-wide' : ''}><InputField label={label} area={['servicesDescription','demosDescription','workDescription','aboutParagraphOne','aboutParagraphTwo','processDescription','guideDescription','contactDescription','contactNote'].includes(key)} value={content.sections[key]} onChange={v => updateField('sections',key,v)} /></div>)}
          </div></section>
          <section className="adm-editor-section"><h3>Public contact</h3><InputField label="Enquiry email displayed on the website" value={content.contact.email} onChange={v => updateField('contact','email',v)} /></section>
        </form>}

        {tab === 'services' && <form className="adm-card" onSubmit={saveWebsite}>{listEditor('services')}</form>}
        {tab === 'portfolio' && <form className="adm-card" onSubmit={saveWebsite}>{listEditor('projects')}</form>}
        {tab === 'demos' && <form className="adm-card" onSubmit={saveWebsite}>{listEditor('demos')}</form>}

        {tab === 'media' && <section className="adm-card">
          <div className="adm-card-heading"><div><p className="adm-eyebrow">YOUR WEBSITE FILES</p><h2>Media library</h2><p>Upload JPEG, PNG, WebP or AVIF images. Files are stored in the MifiTech media bucket.</p></div><label className="adm-button adm-button-primary adm-upload-label">{busy ? 'Uploading…' : 'Upload image'}<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={uploadImage} disabled={busy} /></label></div>
          <div className="adm-media-note">After uploading, use Copy URL and paste it into a hero, service, portfolio or demo image field. The uploaded image is public for display on the website.</div>
          <div className="adm-media-grid">{media.map(asset => <article className="adm-media-item" key={asset.id}><div className="adm-media-thumb"><img src={asset.public_url} alt={asset.file_name}/></div><div className="adm-media-meta"><strong>{asset.file_name}</strong><small>{(asset.size_bytes / 1024 / 1024).toFixed(2)} MB · {new Date(asset.created_at).toLocaleDateString()}</small><div><button type="button" onClick={() => copyUrl(asset.public_url)}>Copy URL</button><button type="button" className="adm-delete" onClick={() => { if (window.confirm('Delete this media file? If it is currently used on the website, that image will stop displaying.')) mutate('/api/admin/media?id=' + encodeURIComponent(asset.id), 'DELETE'); }}>Delete</button></div></div></article>)}</div>
          {media.length === 0 && <div className="adm-empty">No images uploaded yet. Your media library will appear here.</div>}
        </section>}

        {tab === 'seo' && <form className="adm-card adm-editor" onSubmit={saveSeo}>
          <div className="adm-card-heading"><div><p className="adm-eyebrow">SEARCH & SHARING</p><h2>SEO settings</h2><p>Set the main search description and social preview used by the website.</p></div><button className="adm-button adm-button-primary" disabled={busy}>Save SEO settings</button></div>
          <div className="adm-field-grid">
            <InputField label="Website title" value={seo.title} onChange={v => setSeo(p => ({...p,title:v}))}/>
            <div className="adm-field-wide"><InputField label="Meta description" area value={seo.description} onChange={v => setSeo(p => ({...p,description:v}))}/></div>
            <div className="adm-field-wide"><InputField label="Target phrases (comma separated)" area value={Array.isArray(seo.keywords) ? seo.keywords.join(', ') : String(seo.keywords)} onChange={v => setSeo(p => ({...p,keywords:v.split(',').map(x=>x.trim()).filter(Boolean)}))}/></div>
            <div className="adm-field-wide"><InputField label="Canonical website URL" value={seo.canonicalUrl} onChange={v => setSeo(p => ({...p,canonicalUrl:v}))}/></div>
            <InputField label="Social preview title" value={seo.ogTitle} onChange={v => setSeo(p => ({...p,ogTitle:v}))}/>
            <InputField label="Social preview description" area value={seo.ogDescription} onChange={v => setSeo(p => ({...p,ogDescription:v}))}/>
          </div>
          <div className="adm-seo-note"><strong>Search visibility takes time.</strong> These settings help search engines understand the site; they do not guarantee indexing or a particular ranking.</div>
        </form>}

        {tab === 'settings' && <form className="adm-card adm-editor" onSubmit={saveBusiness}>
          <div className="adm-card-heading"><div><p className="adm-eyebrow">STUDIO IDENTITY</p><h2>Business settings</h2><p>Keep the business identity and customer contact details in one place.</p></div><button className="adm-button adm-button-primary" disabled={busy}>Save settings</button></div>
          <div className="adm-field-grid">
            <InputField label="Business name" value={business.businessName} onChange={v => setBusiness(p => ({...p,businessName:v}))}/>
            <InputField label="Enquiry email" value={business.contactEmail} onChange={v => setBusiness(p => ({...p,contactEmail:v}))}/>
            <InputField label="Telephone (optional)" value={business.phone} onChange={v => setBusiness(p => ({...p,phone:v}))}/>
            <InputField label="Service location" value={business.location} onChange={v => setBusiness(p => ({...p,location:v}))}/>
            <div className="adm-field-wide"><InputField label="Public tagline" value={business.tagline} onChange={v => setBusiness(p => ({...p,tagline:v}))}/></div>
          </div>
          <div className="adm-settings-foot"><span>Admin access is currently controlled by the ADMIN_PASSWORD environment variable. Staff roles can be introduced in a later roadmap phase.</span><button type="button" className="adm-button adm-button-quiet" onClick={logout}>Sign out of admin</button></div>
        </form>}
      </div>
    </div>
  </main>;
}
