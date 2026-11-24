'use client';

import { useMemo, useState } from 'react';
import { Badge, Empty, timeAgo } from './ui';

type Item = Record<string, any>;
type Props = { items: Item[]; loading: boolean; onUpdate: (id: string, patch: Record<string, any>) => Promise<void>; onDelete: (id: string) => Promise<void> };

export default function Testimonials({ items, loading, onUpdate, onDelete }: Props) {
  const [filter, setFilter] = useState('all');
  const visible = useMemo(() => filter === 'all' ? items : items.filter((item) => item.status === filter), [items, filter]);
  const pending = items.filter((item) => item.status === 'pending').length;
  const approved = items.filter((item) => item.status === 'approved').length;
  const displayed = items.filter((item) => item.status === 'approved' && item.displayed).length;

  return (
    <div className="ad-stack">
      <div className="ad-kpis">
        <div className="ad-kpi hot"><b>{pending}</b><span>Awaiting review</span></div>
        <div className="ad-kpi"><b>{approved}</b><span>Approved</span></div>
        <div className="ad-kpi"><b>{displayed}</b><span>Showing publicly</span></div>
        <div className="ad-kpi"><b>{items.length}</b><span>Total submissions</span></div>
      </div>
      <section className="ad-card">
        <div className="ad-card-head ad-testimonial-toolbar">
          <div><h2>Client feedback</h2><p className="ad-sub">Review every submission before it appears on the website.</p></div>
          <select value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter testimonials">
            <option value="all">All submissions</option><option value="pending">Pending</option><option value="approved">Approved</option><option value="archived">Archived</option>
          </select>
        </div>
        {loading ? <div className="ad-skel" /> : visible.length ? <div className="ad-testimonial-list">
          {visible.map((item) => (
            <article className="ad-testimonial" key={item.id}>
              <div className="ad-testimonial-top">
                <div><b>{item.name}</b><small>{[item.role, item.company].filter(Boolean).join(' · ') || 'Client'} · {timeAgo(item.createdAt)}</small></div>
                <Badge s={item.status} />
              </div>
              <div className="ad-testimonial-stars" aria-label={item.rating + ' out of 5 stars'}>{'★'.repeat(Number(item.rating) || 0)}<span>{'★'.repeat(5 - (Number(item.rating) || 0))}</span><small>{item.rating}/5</small></div>
              <blockquote>{item.quote}</blockquote>
              {item.email && <p className="ad-testimonial-email">Private contact: {item.email}</p>}
              <div className="ad-testimonial-actions">
                {item.status !== 'approved' && <button className="ad-btn sm" onClick={() => void onUpdate(item.id, { status: 'approved' })}>Approve</button>}
                {item.status === 'approved' && <button className="ad-btn sm" onClick={() => void onUpdate(item.id, { displayed: !item.displayed })}>{item.displayed ? 'Hide from website' : 'Display on website'}</button>}
                {item.status === 'pending' && <button className="ad-btn ghost sm" onClick={() => void onUpdate(item.id, { status: 'archived' })}>Archive</button>}
                {item.status === 'approved' && <button className="ad-btn ghost sm" onClick={() => void onUpdate(item.id, { status: 'archived', displayed: false })}>Archive</button>}
                {item.status === 'archived' && <button className="ad-btn ghost sm" onClick={() => void onUpdate(item.id, { status: 'pending', displayed: false })}>Restore to pending</button>}
                <button className="ad-btn danger sm" onClick={() => void onDelete(item.id)}>Delete</button>
              </div>
            </article>
          ))}
        </div> : <Empty title="No testimonials here yet" text="New client submissions will appear here for review." />}
      </section>
    </div>
  );
}
