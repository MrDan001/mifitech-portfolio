// Path: app/admin/ui.tsx
import type { ReactNode } from 'react';

const ICONS: Record<string, string> = {
  home: 'M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10',
  inbox: 'M4 13l2-8h12l2 8M4 13v6h16v-6M4 13h5l1 2h4l1-2h5',
  doc: 'M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6',
  edit: 'M4 20h4L19 9l-4-4L4 16zM13 7l4 4',
  image: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M9 9h.01',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-4-4',
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  out: 'M10 4H5v16h5M15 8l4 4-4 4M19 12H9',
  ext: 'M14 4h6v6M20 4l-9 9M18 14v6H4V6h6',
  plus: 'M12 5v14M5 12h14',
  trash: 'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6',
  copy: 'M8 8h12v12H8zM16 8V4H4v12h4',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  check: 'M5 12l5 5 9-10',
  menu: 'M4 7h16M4 12h16M4 17h16',
  up: 'M12 19V5M6 11l6-6 6 6',
  down: 'M12 5v14M6 13l6 6 6-6',
  chev: 'M6 9l6 6 6-6',
  upload: 'M12 16V4M7 9l5-5 5 5M4 20h16',
  file: 'M7 3h7l5 5v13H7zM14 3v5h5',
  spark: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z',
  x: 'M6 6l12 12M18 6L6 18',
};
export const Icon = ({ n }: { n: string }) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[n] || ICONS.spark} /></svg>;

export function TextField({ label, value, onChange, area, hint, placeholder, type = 'text', rows }: { label: string; value: unknown; onChange: (v: string) => void; area?: boolean; hint?: string; placeholder?: string; type?: string; rows?: number }) {
  return (
    <label className="ad-field"><span>{label}</span>
      {area ? <textarea rows={rows || 4} value={String(value ?? '')} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /> : <input type={type} value={String(value ?? '')} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />}
      {hint && <span className="ad-hint">{hint}</span>}
    </label>
  );
}
export function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: Array<[string, string]> }) {
  return <label className="ad-field"><span>{label}</span><select value={value} onChange={(e) => onChange(e.target.value)}>{options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>;
}

export const leadStatuses = ['new', 'interested', 'consultation', 'proposal_sent', 'awaiting_payment', 'converted', 'lost'];
export const proposalStatuses = ['draft', 'sent', 'accepted', 'declined', 'awaiting_payment', 'paid', 'in_progress', 'completed'];
export const pretty = (s: string) => String(s || '').replace(/_/g, ' ').replace(/^./, (m) => m.toUpperCase());
export const Badge = ({ s }: { s: string }) => <span className={'ad-badge ' + s}>{pretty(s)}</span>;
export const STATUS_COLORS: Record<string, string> = { new: '#14a89b', interested: '#4c7cf0', consultation: '#8b5cf6', proposal_sent: '#f0b429', awaiting_payment: '#f08a3c', converted: '#3fb950', lost: '#a3aaa0' };

export function timeAgo(iso: string) {
  const t = new Date(iso).getTime();
  if (!t) return '';
  const m = Math.round((Date.now() - t) / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return m + ' min ago';
  const h = Math.round(m / 60);
  if (h < 24) return h + ' hr ago';
  const d = Math.round(h / 24);
  if (d < 30) return d + (d === 1 ? ' day ago' : ' days ago');
  return new Date(iso).toLocaleDateString();
}
export function money(amount: unknown, currency = 'NGN') {
  const n = Number(amount) || 0;
  try { return new Intl.NumberFormat('en-NG', { style: 'currency', currency: currency || 'NGN', maximumFractionDigits: 0 }).format(n); } catch { return (currency || '') + ' ' + n.toLocaleString(); }
}
export const initials = (name: string) => String(name || '?').trim().split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

export function Empty({ title, text, children }: { title: string; text: string; children?: ReactNode }) {
  return <div className="ad-empty"><b>{title}</b><p>{text}</p>{children}</div>;
}