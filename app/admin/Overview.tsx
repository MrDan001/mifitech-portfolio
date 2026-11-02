// Path: app/admin/Overview.tsx
'use client';

import { Badge, Icon, Empty, STATUS_COLORS, initials, leadStatuses, money, pretty, timeAgo } from './ui';

type Row = Record<string, any>;
type Props = { leads: Row[]; proposals: Row[]; content: any; seo: any; loading: boolean; go: (tab: string) => void };

export default function Overview({ leads, proposals, content, seo, loading, go }: Props) {
  if (loading) return <div className="ad-stack"><div className="ad-skel" /><div className="ad-skel" /><div className="ad-skel" /></div>;
  const fresh = leads.filter((l) => l.status === 'new');
  const stale = fresh.filter((l) => Date.now() - new Date(l.created_at).getTime() > 48 * 3600 * 1000).length;
  const open = proposals.filter((p) => ['sent', 'accepted', 'awaiting_payment', 'in_progress'].includes(p.status));
  const openValue = open.filter((p) => (p.currency || 'NGN') === 'NGN').reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const won = leads.filter((l) => l.status === 'converted').length;
  const rate = leads.length ? Math.round((won / leads.length) * 100) : 0;
  const counts = leadStatuses.map((s) => [s, leads.filter((l) => l.status === s).length] as const);
  const desc = String(seo?.description || '').length;
  const projects = content?.projects || [];
  const checklist = [
    { done: (content?.testimonials || []).length > 0, t: 'Add a client testimonial', d: 'Reviews are the strongest trust signal for new visitors.', tab: 'content' },
    { done: Boolean(content?.studioProfile?.name || content?.studioProfile?.bio), t: 'Fill in your founder profile', d: 'People hire people. A short story and photo helps.', tab: 'content' },
    { done: desc >= 70 && desc <= 160, t: 'Write a 70 to 160 character search description', d: desc ? 'Yours is ' + desc + ' characters.' : 'It is empty right now.', tab: 'seo' },
    { done: !/vercel\.app/.test(String(seo?.canonicalUrl || '')), t: 'Move to your own domain', d: 'A custom domain looks more professional and ranks better. Then update the canonical URL.', tab: 'seo' },
    { done: projects.length > 0 && projects.every((p: Row) => p.caseStudy?.challenge), t: 'Write a case study for every project', d: 'Explain the problem, your approach and the result.', tab: 'content' },
  ];
  const left = checklist.filter((c) => !c.done).length;

  return (
    <div className="ad-stack">
      <div className="ad-kpis">
        <div className="ad-kpi hot"><b>{fresh.length}</b><span>New enquiries{stale ? ' · ' + stale + ' waiting over 2 days' : ''}</span></div>
        <div className="ad-kpi"><b>{leads.length}</b><span>Total enquiries</span></div>
        <div className="ad-kpi"><b>{open.length}</b><span>Open proposals{openValue ? ' · ' + money(openValue) : ''}</span></div>
        <div className="ad-kpi"><b>{rate}%</b><span>Enquiries won ({won} of {leads.length})</span></div>
      </div>
      <div className="ad-cols">
        <div className="ad-stack">
          <section className="ad-card">
            <div className="ad-card-head"><h2>Enquiry pipeline</h2><button className="ad-btn ghost sm" onClick={() => go('leads')}>Open leads</button></div>
            {leads.length ? <>
              <div className="ad-bar" role="img" aria-label="Enquiries by status">{counts.filter(([, n]) => n).map(([s, n]) => <i key={s} style={{ width: (n / leads.length) * 100 + '%', background: STATUS_COLORS[s] }} />)}</div>
              <div className="ad-legend">{counts.map(([s, n]) => <span key={s}><i style={{ background: STATUS_COLORS[s] }} />{pretty(s)} {n}</span>)}</div>
            </> : <Empty title="No enquiries yet" text="When a visitor fills in your contact form or messages you from a demo, it will show up here." />}
          </section>
          <section className="ad-card">
            <div className="ad-card-head"><h2>Latest enquiries</h2></div>
            {leads.length ? <div className="ad-list">{leads.slice(0, 5).map((l) => (
              <button key={l.id} className="ad-li" onClick={() => go('leads')}><i className="ad-av">{initials(l.name)}</i><span className="grow"><b>{l.name}{l.business ? ' · ' + l.business : ''}</b><small>{l.project_type} · {timeAgo(l.created_at)}</small></span><Badge s={l.status} /></button>
            ))}</div> : <p className="ad-sub">Nothing to show yet.</p>}
          </section>
        </div>
        <div className="ad-stack">
          <section className="ad-card">
            <div className="ad-card-head"><h2>Quick actions</h2></div>
            <div className="ad-actions">
              <button className="ad-btn" onClick={() => go('proposals')}><Icon n="plus" />New proposal</button>
              <button className="ad-btn ghost" onClick={() => go('content')}><Icon n="edit" />Edit content</button>
              <button className="ad-btn ghost" onClick={() => go('media')}><Icon n="upload" />Upload images</button>
              <a className="ad-btn ghost" href="/" target="_blank" rel="noreferrer"><Icon n="ext" />View website</a>
            </div>
          </section>
          <section className="ad-card">
            <div className="ad-card-head"><h2>Get the most from your site</h2><span className="ad-badge">{left ? left + ' to do' : 'All done'}</span></div>
            {checklist.map((c) => (
              <div key={c.t} className={'ad-check' + (c.done ? ' done' : '')}>
                <span className="t">{c.done && <Icon n="check" />}</span>
                <div><b>{c.t}</b><small>{c.d}</small>{!c.done && <div style={{ marginTop: 6 }}><button className="ad-btn ghost sm" onClick={() => go(c.tab)}>Fix this</button></div>}</div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}