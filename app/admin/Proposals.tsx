// Path: app/admin/Proposals.tsx
'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Badge, Empty, Icon, SelectField, TextField, money, pretty, proposalStatuses, timeAgo } from './ui';

type Row = Record<string, any>;
const blank = { client_name: '', client_email: '', business_name: '', scope: '', timeline: '', amount: '', currency: 'NGN', payment_terms: '60% commencement; 40% before launch.', payment_instructions: '' };
const TERMS: Array<[string, string]> = [['60% commencement; 40% before launch.', '60% to start, 40% before launch'], ['50% commencement; 50% on completion.', '50% to start, 50% on completion'], ['100% upfront before work begins.', '100% upfront'], ['', 'Custom (type below)']];

type Props = { proposals: Row[]; loading: boolean; draft: Row | null; onCreate: (data: Record<string, string>) => Promise<string | null>; onStatus: (id: string, status: string) => void; notify: (msg: string, tone?: 'ok' | 'err') => void };

export default function Proposals({ proposals, loading, draft, onCreate, onStatus, notify }: Props) {
  const [form, setForm] = useState<Record<string, string>>(blank);
  const [showForm, setShowForm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [made, setMade] = useState('');
  const [filter, setFilter] = useState('all');
  const set = (k: string) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  useEffect(() => {
    if (!draft) return;
    setForm({ ...blank, client_name: draft.name || '', client_email: draft.email || '', business_name: draft.business || '', scope: draft.details ? 'Project brief from the enquiry:\n' + draft.details : '' });
    setShowForm(true); setMade('');
  }, [draft]);

  const shown = useMemo(() => proposals.filter((p) => filter === 'all' || p.status === filter), [proposals, filter]);
  const link = (token: string) => location.origin + '/proposal/' + token;
  const copy = (text: string) => navigator.clipboard.writeText(text).then(() => notify('Link copied.')).catch(() => notify('Could not copy. Select the link and copy it manually.', 'err'));

  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true);
    const token = await onCreate(form);
    setBusy(false);
    if (token) { setMade(link(token)); setForm(blank); }
  }

  return (
    <div className="ad-stack">
      <section className="ad-card">
        <div className="ad-card-head"><div><h2>New proposal</h2><p className="ad-sub">Create a private link your client can open to review the scope and pay.</p></div><button className="ad-btn" onClick={() => setShowForm(!showForm)} aria-expanded={showForm}><Icon n={showForm ? 'x' : 'plus'} />{showForm ? 'Close' : 'Create proposal'}</button></div>
        {made && <div className="ad-callout"><Icon n="check" /><div><b>Proposal created.</b> Share this private link with your client:<br /><a href={made} target="_blank" rel="noreferrer">{made}</a><div className="ad-row" style={{ marginTop: 8 }}><button className="ad-btn ghost sm" onClick={() => copy(made)}><Icon n="copy" />Copy link</button></div></div></div>}
        {showForm && <form className="ad-stack" onSubmit={submit}>
          <div className="ad-grid2"><TextField label="Client name" value={form.client_name} onChange={set('client_name')} /><TextField label="Client email" type="email" value={form.client_email} onChange={set('client_email')} /></div>
          <TextField label="Business name" value={form.business_name} onChange={set('business_name')} />
          <TextField label="Scope of work" area rows={6} value={form.scope} onChange={set('scope')} hint="List what you will deliver, page by page or feature by feature." />
          <div className="ad-grid2"><TextField label="Timeline" value={form.timeline} onChange={set('timeline')} placeholder="For example: 3 weeks" /><div className="ad-grid2"><TextField label="Amount" type="number" value={form.amount} onChange={set('amount')} hint={Number(form.amount) > 0 ? money(form.amount, form.currency) : ''} /><SelectField label="Currency" value={form.currency} onChange={set('currency')} options={[['NGN', 'NGN'], ['USD', 'USD'], ['GBP', 'GBP'], ['EUR', 'EUR']]} /></div></div>
          <div className="ad-grid2">
            <SelectField label="Payment terms preset" value={TERMS.some(([v]) => v === form.payment_terms) ? form.payment_terms : ''} onChange={(v) => v && set('payment_terms')(v)} options={TERMS} />
            <TextField label="Payment terms" value={form.payment_terms} onChange={set('payment_terms')} />
          </div>
          <TextField label="Payment instructions" area value={form.payment_instructions} onChange={set('payment_instructions')} hint="Bank name, account name and number, or a payment link." />
          <div className="ad-row"><button className="ad-btn lime" disabled={busy}>{busy ? 'Creating…' : 'Create proposal link'}</button><button type="button" className="ad-btn ghost" onClick={() => setForm(blank)}>Clear form</button></div>
        </form>}
      </section>
      <div className="ad-chips" role="group" aria-label="Filter proposals">
        {[['all', 'All'], ...proposalStatuses.map((s) => [s, pretty(s)])].map(([s, label]) => <button key={s} className="ad-chip" aria-pressed={filter === s} onClick={() => setFilter(s)}>{label}<b>{s === 'all' ? proposals.length : proposals.filter((p) => p.status === s).length}</b></button>)}
      </div>
      {loading ? <div className="ad-skel" /> : shown.length ? <div>{shown.map((p) => (
        <article key={p.id} className="ad-item"><div className="ad-item-body" style={{ borderTop: 0, paddingTop: 18 }}>
          <div className="ad-row ad-between"><div><h3 style={{ fontSize: 19 }}>{p.business_name}</h3><p className="ad-sub">{p.client_name} · {p.client_email}{p.created_at ? ' · ' + timeAgo(p.created_at) : ''}</p></div><div style={{ textAlign: 'right' }}><b style={{ fontSize: 20 }}>{money(p.amount, p.currency)}</b><div><Badge s={p.status} /></div></div></div>
          <div className="ad-row">
            <select className="ad-in" style={{ width: 'auto' }} aria-label={'Status for ' + p.business_name} value={p.status} onChange={(e) => onStatus(p.id, e.target.value)}>{proposalStatuses.map((s) => <option key={s} value={s}>{pretty(s)}</option>)}</select>
            <a className="ad-btn ghost sm" href={'/proposal/' + p.token} target="_blank" rel="noreferrer"><Icon n="ext" />Open</a>
            <button className="ad-btn ghost sm" onClick={() => copy(link(p.token))}><Icon n="copy" />Copy link</button>
            <a className="ad-btn ghost sm" href={'mailto:' + p.client_email + '?subject=' + encodeURIComponent('Your MifiTech proposal') + '&body=' + encodeURIComponent('Hello ' + String(p.client_name).split(' ')[0] + ',\n\nHere is your proposal:\n' + link(p.token) + '\n')}><Icon n="mail" />Email link</a>
          </div>
        </div></article>
      ))}</div> : <Empty title={proposals.length ? 'No proposals with this status' : 'No proposals yet'} text={proposals.length ? 'Pick another status above.' : 'Create your first proposal to start tracking payments.'} />}
    </div>
  );
}