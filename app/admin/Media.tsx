// Path: app/admin/Media.tsx
'use client';

import { useMemo, useRef, useState, type DragEvent } from 'react';
import { Empty, Icon } from './ui';

type Row = Record<string, any>;
type Props = { media: Row[]; loading: boolean; uploading: boolean; content: any; onRefresh: () => void; onUpload: (files: File[]) => void; onDelete: (path: string) => void; notify: (msg: string, tone?: 'ok' | 'err') => void };

function usesOf(content: any, url: string): string[] {
  const out: string[] = [];
  for (const key of ['projects', 'demos', 'services', 'testimonials']) for (const item of content?.[key] || []) if (JSON.stringify(item).includes(url)) out.push(key.replace(/s$/, '') + ': ' + (item.name || item.title || item.slug || ''));
  if (JSON.stringify(content?.hero || {}).includes(url)) out.push('Hero');
  if (JSON.stringify(content?.studioProfile || {}).includes(url)) out.push('Founder profile');
  return out;
}

export default function Media({ media, loading, uploading, content, onRefresh, onUpload, onDelete, notify }: Props) {
  const [q, setQ] = useState('');
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const list = useMemo(() => media.filter((m) => !q.trim() || String(m.name).toLowerCase().includes(q.trim().toLowerCase())), [media, q]);
  const drop = (e: DragEvent) => { e.preventDefault(); setOver(false); const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/')); if (files.length) onUpload(files); };
  const copy = (url: string) => navigator.clipboard.writeText(url).then(() => notify('Image URL copied.')).catch(() => notify('Could not copy. Open the image and copy its address.', 'err'));

  return (
    <div className="ad-stack">
      <div className={'ad-drop' + (over ? ' over' : '')} onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={drop}>
        <Icon n="upload" /><b>{uploading ? 'Uploading…' : 'Drag images here to upload'}</b><span className="ad-sub">JPG, PNG, WebP, AVIF or GIF, up to 5 MB each</span>
        <button className="ad-btn" onClick={() => input.current?.click()} disabled={uploading}>Choose images</button>
        <input ref={input} className="sr" type="file" multiple accept="image/jpeg,image/png,image/webp,image/avif,image/gif" aria-label="Choose images to upload" onChange={(e) => { const f = Array.from(e.target.files || []); if (f.length) onUpload(f); e.currentTarget.value = ''; }} />
      </div>
      <div className="ad-row ad-between">
        <input className="ad-in" style={{ flex: '1 1 240px', maxWidth: 360 }} aria-label="Search images" placeholder="Search by file name" value={q} onChange={(e) => setQ(e.target.value)} />
        <button className="ad-btn ghost" onClick={onRefresh} disabled={loading}>{loading ? 'Refreshing…' : 'Refresh'}</button>
      </div>
      {list.length ? <div className="ad-media">{list.map((m) => {
        const uses = usesOf(content, m.url);
        return (
          <article className="ad-tile" key={m.path}>
            <a href={m.url} target="_blank" rel="noreferrer"><img src={m.url} alt={m.name} loading="lazy" /></a>
            <div>
              <b>{m.name}</b>
              <span className="ad-sub">{m.size ? Math.round(m.size / 1024) + ' KB' : 'Size unavailable'}{uses.length ? ' · in use' : ''}</span>
              {uses.length > 0 && <span className="ad-badge converted" title={uses.join(', ')}>Used in {uses.length} place{uses.length > 1 ? 's' : ''}</span>}
              <div className="ad-row"><button className="ad-btn ghost sm" onClick={() => copy(m.url)}><Icon n="copy" />Copy URL</button><button className="ad-btn danger sm" onClick={() => onDelete(m.path)} aria-label={'Delete ' + m.name}><Icon n="trash" /></button></div>
            </div>
          </article>
        );
      })}</div> : <Empty title={loading ? 'Loading images…' : media.length ? 'No images match your search' : 'No uploaded images yet'} text="Images you upload here, or from any content field, will be listed so you can reuse them." />}
      <p className="ad-sub">Images marked “Used in” are referenced by your content. Deleting one removes it from your site, so replace it first.</p>
    </div>
  );
}