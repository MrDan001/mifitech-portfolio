// Path: app/admin/Leads.tsx
'use client';

import { useMemo, useState } from 'react';
import { Badge, Empty, Icon, initials, leadStatuses, pretty, timeAgo } from './ui';

type Row = Record<string, any>;
type Props = {
  leads: Row[]; loading: boolean;
  onStatus: (id: string, status: string) => void; onDelete: (id: string) => void; onProposal: (lead: Row) => void; notify: (msg: string, tone?: 'ok' | 'err') => void;
};

export default function Leads({ leads, loading, onStatus, onDelete, onProposal, notify }: Props) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('newest');
  const [open, setOpen] = useState<string | null>(null);

  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    const rows = leads.filter((l) => (status === 'all' || l.status === status) && (!query || [l.name, l.email, l.business, l.project_type, l.details, l.demo].some((v) => String(v || '').toLowerCase().includes(query))));
    return [...rows].sort((a, b) => (sort === 'newest' ? -1 : 1) * (new Date(a.created_at).getTime() - new Date(b.created_at).getTime()));
  }, [leads, q, status, sort]);

  function exportCsv() {
    const cols = ['name', 'email', 'business', 'project_type', 'demo', 'details', 'status', 'created_at'];
    const quote = (v: unknown) => '"' + String(v ?? '').replace(/"/g, '""') + '"';
    const csv = [cols.join(','), ...list.map((l) => cols.map((c) => quote(l[c])).join(','))].join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const a = document.createElement('a'); a.href = url; a.download = 'mifitech-enquiries.csv'; a.click(); URL.revokeObjectURL(url);
  }
  const copy = (text: string) => navigator.clipboard.writeText(text).then(() => notify('Copied to clipboard.')).catch(() => notify('Could not copy. Select the text and copy it manually.', 'err'));

  if (loading) return <div className="ad-stack"><div className="ad-skel" /><div className="ad-skel" /></div>;
  return (
    <div className="ad-stack">
      <div className="ad-row ad-between">
        <input className="ad-in" style={{ flex: '1 1 260px', maxWidth: 420 }} aria-label="Search enquiries" placeholder="Search name, email, business or message" value={q} onChange={(e) => setQ(e.target.value)} />
        <div className="ad-row">
          <select className="ad-in" style={{ width: 'auto' }} aria-label="Sort enquiries" value={sort} onChange={(e) => setSort(e.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select>
          <button className="ad-btn ghost" onClick={exportCsv} disabled={!list.length}><Icon n="file" />Export CSV</button>
        </div>
      </div>
      <div className="ad-chips" role="group" aria-label="Filter by status">
        {[['all', 'All'], ...leadStatuses.map((s) => [s, pretty(s)])].map(([s, label]) => (
          <button key={s} className="ad-chip" aria-pressed={status === s} onClick={() => setStatus(s)}>{label}<b>{s === 'all' ? leads.length : leads.filter((l) => l.status === s).length}</b></button>
        ))}
      </div>
      {list.length ? <div>{list.map((l) => {
        const isOpen = open === l.id;
        return (
          <article key={l.id} className={'ad-item' + (isOpen ? ' ad-open' : '')}>
            <button className="ad-item-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : l.id)}>
              <i className="ad-av">{initials(l.name)}</i>
              <span className="grow"><b>{l.name}{l.business ? ' · ' + l.business : ''}</b><small title={new Date(l.created_at).toLocaleString()}>{l.project_type} · {timeAgo(l.created_at)}{l.demo ? ' · asked about the ' + l.demo + ' demo' : ''}</small></span>
              <Badge s={l.status} /><span className="ad-chev"><Icon n="chev" /></span>
            </button>
            {isOpen && <div className="ad-item-body">
              <p className="ad-details">{l.details}</p>
              {l.source_url && <p className="ad-sub">Came from: {l.source_url}</p>}
              <div className="ad-row">
                <label className="ad-row" style={{ gap: 8, fontWeight: 700 }}>Status
                  <select className="ad-in" style={{ width: 'auto' }} value={l.status} onChange={(e) => onStatus(l.id, e.target.value)}>{leadStatuses.map((s) => <option key={s} value={s}>{pretty(s)}</option>)}</select>
                </label>
              </div>
              <div className="ad-row">
                <a className="ad-btn sm" href={'mailto:' + l.email + '?subject=' + encodeURIComponent('Your MifiTech enquiry') + '&body=' + encodeURIComponent('Hello ' + String(l.name).split(' ')[0] + ',\n\nThank you for contacting MifiTech about ' + (l.project_type || 'your project') + '.\n\n')}><Icon n="mail" />Reply by email</a>
                <button className="ad-btn ghost sm" onClick={() => copy(l.email)}><Icon n="copy" />Copy email</button>
                <button className="ad-btn lime sm" onClick={() => onProposal(l)}><Icon n="doc" />Create proposal</button>
                <button className="ad-btn danger sm" onClick={() => onDelete(l.id)}><Icon n="trash" />Delete</button>
              </div>
            </div>}
          </article>
        );
      })}</div> : <Empty title={leads.length ? 'No enquiries match these filters' : 'No enquiries yet'} text={leads.length ? 'Try a different search or status.' : 'New enquiries from your contact form will appear here.'} />}
    </div>
  );
}