// Path: app/admin/Content.tsx
'use client';

import { useState, type ReactNode } from 'react';
import { Icon, SelectField, TextField } from './ui';

type Field = { key: string; label: string; area?: boolean; list?: boolean; image?: boolean; hint?: string; options?: Array<[string, string]> };
type Props = { content: any; setContent: (fn: (old: any) => any) => void; notify: (msg: string, tone?: 'ok' | 'err') => void };

const TABS: Array<[string, string]> = [['home', 'Homepage'], ['headings', 'Contact & footer'], ['services', 'Services'], ['demos', 'Demos'], ['projects', 'Projects'], ['process', 'Process & FAQ'], ['people', 'Profile & reviews'], ['guide', 'Guide page']];
const VISIBLE: Array<[string, string]> = [['yes', 'Visible on the website'], ['no', 'Hidden']];
const nested = (item: any, key: string) => (key.startsWith('caseStudy.') ? item.caseStudy?.[key.slice(10)] : item[key]);
const UNSPLASH = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85';
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export default function Content({ content, setContent, notify }: Props) {
  const [tab, setTab] = useState('home');
  const [open, setOpen] = useState<string | null>(null);
  const [demoQuery, setDemoQuery] = useState('');

  const group = (g: string, f: string, v: any) => setContent((o: any) => ({ ...o, [g]: { ...o[g], [f]: v } }));
  const section = (s: string, f: string, v: any) => setContent((o: any) => ({ ...o, sections: { ...o.sections, [s]: { ...o.sections[s], [f]: v } } }));
  const update = (c: string, i: number, f: string, v: any) => setContent((o: any) => ({ ...o, [c]: o[c].map((it: any, n: number) => n !== i ? it : f.startsWith('caseStudy.') ? { ...it, caseStudy: { ...(it.caseStudy || {}), [f.slice(10)]: v } } : { ...it, [f]: v }) }));
  const move = (c: string, i: number, d: number) => setContent((o: any) => { const a = [...o[c]]; const j = i + d; if (j < 0 || j >= a.length) return o; [a[i], a[j]] = [a[j], a[i]]; return { ...o, [c]: a }; });
  const duplicate = (c: string, i: number) => { setContent((o: any) => { const a = [...o[c]]; a.splice(i + 1, 0, JSON.parse(JSON.stringify(o[c][i]))); return { ...o, [c]: a }; }); setOpen(c + ':' + (i + 1)); notify('Copy created. Change its slug or title so it is unique.'); };
  const remove = (c: string, i: number, label: string) => { if (!window.confirm('Delete "' + label + '"? You can still discard unsaved changes before saving.')) return; setContent((o: any) => ({ ...o, [c]: o[c].filter((_: any, n: number) => n !== i) })); };
  const add = (c: string) => {
    const t: Record<string, any> = {
      navigation: { label: 'New link', href: '/#contact' }, services: { icon: 'website', name: 'New service', body: 'Describe this service.' },
      demos: { slug: 'new-demo', n: String(content.demos.length + 1).padStart(2, '0'), title: 'New industry demo', brand: 'NEW BRAND', text: 'Describe the website concept.', image: UNSPLASH, tags: ['Services', 'Enquiries'], visible: true, href: '', pageTitle: '', pageIntro: '', pageSectionTitle: '', pageSectionIntro: '', pageClosingTitle: '', pageClosingText: '' },
      projects: { slug: 'new-project', image: '/previews/garrison-market.svg', name: 'New project', type: 'PORTFOLIO PROJECT', text: 'Describe the project.', websiteUrl: '', repoUrl: '', visible: false, stack: [], features: [], caseStudy: { challenge: '', approach: '', delivery: '', role: '', outcome: '', gallery: [] } },
      stages: { n: String(content.stages.length + 1).padStart(2, '0'), title: 'New step', body: 'Describe this step.' }, trustPoints: { title: 'New principle', body: 'Describe this studio principle.' },
      faqs: { question: 'New question', answer: 'Write a clear answer.' }, testimonials: { quote: '', name: '', role: '', company: '' }, guideSections: { heading: 'New guide section', body: 'Write the section content.' },
    };
    setContent((o: any) => ({ ...o, [c]: [...o[c], t[c]] }));
    setOpen(c + ':' + content[c].length);
  };

  async function upload(file: File): Promise<string | null> {
    const form = new FormData(); form.append('file', file); notify('Uploading image…');
    try {
      const r = await fetch('/api/admin/upload', { method: 'POST', body: form }); const d = await r.json();
      if (!r.ok || !d.url) throw new Error(d.error || 'Image upload failed.');
      notify('Image uploaded. Remember to save your changes.'); return d.url;
    } catch (e) { notify(e instanceof Error ? e.message : 'Image upload failed.', 'err'); return null; }
  }

  const imageField = (label: string, value: string, onChange: (v: string) => void) => (
    <div className="ad-img-field" key={label}>
      <div className="ad-thumb" style={{ backgroundImage: value ? 'url(' + value + ')' : undefined }} role="img" aria-label={value ? 'Current image preview' : 'No image yet'} />
      <div className="ad-stack" style={{ gap: 10 }}>
        <TextField label={label} value={value} onChange={onChange} placeholder="https://… or /path/to/image" />
        <label className="ad-btn ghost sm" style={{ justifySelf: 'start', cursor: 'pointer' }}><Icon n="upload" />Upload new image<input className="sr" type="file" accept="image/jpeg,image/png,image/webp,image/avif,image/gif" onChange={async (e) => { const f = e.target.files?.[0]; e.currentTarget.value = ''; if (f) { const url = await upload(f); if (url) onChange(url); } }} /></label>
      </div>
    </div>
  );

  const fieldEl = (f: Field, item: any, onChange: (v: any) => void) => {
    const raw = nested(item, f.key);
    if (f.options) return <SelectField key={f.key} label={f.label} value={String(raw ?? '')} onChange={onChange} options={f.options} />;
    if (f.image) return imageField(f.label, String(raw ?? ''), onChange);
    if (f.list) return <TextField key={f.key} label={f.label} value={Array.isArray(raw) ? raw.join(', ') : raw || ''} hint={f.hint || 'Separate items with commas.'} area={f.area} onChange={(v) => onChange(v.split(',').map((s: string) => s.trim()).filter(Boolean))} />;
    return <TextField key={f.key} label={f.label} value={raw} area={f.area} hint={f.hint} onChange={onChange} />;
  };

  const card = (title: string, children: ReactNode, sub?: string) => <section className="ad-card ad-stack" key={title}><div><h2>{title}</h2>{sub && <p className="ad-sub">{sub}</p>}</div>{children}</section>;
  const callout = (text: ReactNode, warn = false) => <div className={'ad-callout' + (warn ? ' warn' : '')}><Icon n="spark" /><div>{text}</div></div>;

  function list(c: string, title: string, noun: string, fields: Field[], o: { sub?: string; legacy?: { label: string; fields: Field[] }; extra?: { label: string; fields: Field[] }; visible?: boolean; filter?: string; titleOf?: (it: any) => string; subOf?: (it: any) => string } = {}) {
    const items: any[] = content[c] || [];
    const q = (o.filter || '').trim().toLowerCase();
    const body = (it: any, i: number) => {
      const set = (k: string) => (v: any) => {
        if (c === 'projects' && k === 'name') {
          const currentSlug = String(it.slug || '');
          const oldAutoSlug = slugify(String(it.name || ''));
          update(c, i, 'name', v);
          if (!currentSlug || currentSlug === oldAutoSlug || currentSlug === 'new-project') update(c, i, 'slug', slugify(String(v)) || 'new-project');
          return;
        }
        update(c, i, k, v);
      };
      const half = fields.filter((f) => !f.area && !f.image && !f.list && !f.options);
      const rest = fields.filter((f) => !half.includes(f));
      return (
        <div className="ad-item-body">
          {o.visible && <SelectField label="Visibility" value={it.visible === false ? 'no' : 'yes'} onChange={(v) => update(c, i, 'visible', v === 'yes')} options={VISIBLE} />}
          {half.length > 0 && <div className="ad-grid2">{half.map((f) => fieldEl(f, it, set(f.key)))}</div>}
          {rest.map((f) => fieldEl(f, it, set(f.key)))}
          {c === 'projects' && <div className="ad-callout"><Icon n="spark" /><div><b>Project detail page</b><p className="ad-sub">This project has its own page at <code>/projects/{it.slug || 'your-project-slug'}</code>. Keep it hidden while drafting; make it visible when the details are ready.</p><button type="button" className="ad-btn ghost sm" style={{ marginTop: 10 }} onClick={() => {
            const stack = Array.isArray(it.stack) ? it.stack : [];
            const features = Array.isArray(it.features) ? it.features : [];
            const projectName = it.name || 'This project';
            const category = it.type || 'digital product';
            const summary = it.text || 'Add a short project description above.';
            update(c, i, 'caseStudy.challenge', 'Document the real problem this ' + category.toLowerCase() + ' was built to solve. Project brief: ' + summary + ' Replace this starter copy with the confirmed client or product context.');
            update(c, i, 'caseStudy.approach', 'Explain the decisions behind ' + projectName + ': the intended audience, core user journey, design direction and technical approach. Technologies currently listed: ' + (stack.join(', ') || 'add the actual stack') + '.');
            update(c, i, 'caseStudy.delivery', 'Summarise the implemented scope using only verified work: ' + (features.length ? features.join('; ') : 'add the delivered features') + '. Add any important workflows, integrations and launch details that are confirmed.');
            update(c, i, 'caseStudy.role', 'Describe MifiTech’s actual role, responsibilities and contribution on this project.');
            update(c, i, 'caseStudy.outcome', 'State the verified result and what the delivered product enables. Add measurable outcomes only when you have evidence; do not invent users, revenue, performance or business impact.');
            setOpen(c + ':' + i);
            notify('A structured case-study draft has been added. Review every section before publishing.');
          }}><Icon n="spark" />Prepare case-study draft</button></div></div>}
          {o.extra && <details className="ad-legacy" open><summary>{o.extra.label}</summary><div className="ad-stack">{o.extra.fields.map((f) => fieldEl(f, it, set(f.key)))}</div></details>}
          {o.legacy && <details className="ad-legacy"><summary>{o.legacy.label}</summary><div className="ad-stack">{o.legacy.fields.map((f) => fieldEl(f, it, set(f.key)))}</div></details>}
          <div className="ad-row">
            <button className="ad-btn ghost sm" onClick={() => move(c, i, -1)} disabled={i === 0}><Icon n="up" />Move up</button>
            <button className="ad-btn ghost sm" onClick={() => move(c, i, 1)} disabled={i === items.length - 1}><Icon n="down" />Move down</button>
            <button className="ad-btn ghost sm" onClick={() => duplicate(c, i)}><Icon n="copy" />Duplicate</button>
            <button className="ad-btn danger sm" onClick={() => remove(c, i, (o.titleOf ? o.titleOf(it) : it.name || it.title || it.label || it.question || it.heading || 'this item'))}><Icon n="trash" />Delete</button>
          </div>
        </div>
      );
    };
    return (
      <section key={c}>
        <div className="ad-row ad-between" style={{ marginBottom: 14 }}>
          <div><h2 style={{ fontSize: 20 }}>{title} <span className="ad-badge">{items.length}</span></h2>{o.sub && <p className="ad-sub">{o.sub}</p>}</div>
          <button className="ad-btn" onClick={() => add(c)}><Icon n="plus" />Add {noun}</button>
        </div>
        {items.length === 0 && <div className="ad-empty"><b>Nothing here yet</b><p>Use “Add {noun}” to create the first one.</p></div>}
        {items.map((it, i) => {
          const name = o.titleOf ? o.titleOf(it) : it.name || it.title || it.label || it.question || it.heading || it.brand || it.slug || noun + ' ' + (i + 1);
          if (q && !JSON.stringify(it).toLowerCase().includes(q)) return null;
          const key = c + ':' + i; const isOpen = open === key;
          return (
            <article key={key} className={'ad-item' + (isOpen ? ' ad-open' : '')}>
              <button className="ad-item-head" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : key)}>
                {'image' in it && <i className="ad-thumb" style={{ backgroundImage: it.image ? 'url(' + it.image + ')' : undefined }} />}
                <span className="grow"><b>{name}</b><small>{o.subOf ? o.subOf(it) : it.type || it.slug || it.href || ''}</small></span>
                {it.visible === false && <span className="ad-badge lost">Hidden</span>}
                <span className="ad-chev"><Icon n="chev" /></span>
              </button>
              {isOpen && body(it, i)}
            </article>
          );
        })}
      </section>
    );
  }

  const F = (key: string, label: string, extra: Partial<Field> = {}): Field => ({ key, label, ...extra });
  const sec = content.sections || {};
  const usedKeys: Record<string, string[]> = { contact: ['email', 'intro', 'note', 'whatsappUrl'], demos: ['note', 'noteLink'], guide: ['href'] };
  const legacyFor = (name: string) => Object.keys(sec[name] || {}).filter((k) => !(usedKeys[name] || []).includes(k) && !Array.isArray(sec[name][k]));
  const hero = content.hero || {};

  return (
    <div>
      <div className="ad-tabs" role="tablist" aria-label="Website content sections">
        {TABS.map(([k, label]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{label}{k === 'services' ? ' (' + content.services.length + ')' : k === 'demos' ? ' (' + content.demos.length + ')' : k === 'projects' ? ' (' + content.projects.length + ')' : ''}</button>)}
      </div>
      <div className="ad-stack">
        {tab === 'home' && <>
          {callout(<>The homepage headline, hero and section titles are designed in the site code, so they no longer come from here. You still control the menu links below, plus services, demos, projects, FAQs and contact details in the other tabs.</>)}
          {list('navigation', 'Menu links', 'link', [F('label', 'Label'), F('href', 'Destination', { hint: 'A path like /#demos, or a full https:// address.' })], { sub: 'The links shown in your header and footer.' })}
          <details className="ad-legacy"><summary>Older hero fields (not used by the current homepage)</summary><div className="ad-stack">
            {Object.keys(hero).filter((k) => typeof hero[k] === 'string' && k !== 'visualImage').map((k) => <TextField key={k} label={k.replace(/[A-Z]/g, (m) => ' ' + m).replace(/^./, (m) => m.toUpperCase())} value={hero[k]} onChange={(v) => group('hero', k, v)} />)}
            <TextField label="Ribbon items" value={(hero.ribbonItems || []).join(', ')} hint="Separate items with commas." onChange={(v) => group('hero', 'ribbonItems', v.split(',').map((s: string) => s.trim()).filter(Boolean))} />
            {imageField('Hero image', hero.visualImage || '', (v) => group('hero', 'visualImage', v))}
          </div></details>
        </>}

        {tab === 'headings' && <>
          {card('Contact details', <>
            <div className="ad-grid2"><TextField label="Email address" value={sec.contact?.email} onChange={(v) => section('contact', 'email', v)} hint="Enquiries are also sent here." /><TextField label="WhatsApp link (optional)" value={sec.contact?.whatsappUrl} onChange={(v) => section('contact', 'whatsappUrl', v)} hint="Leave empty to use +234 906 785 9200. Format: https://wa.me/2349067859200" /></div>
            <TextField label="Intro text above the form" area value={sec.contact?.intro} onChange={(v) => section('contact', 'intro', v)} />
            <TextField label="Small note under the details" area rows={2} value={sec.contact?.note} onChange={(v) => section('contact', 'note', v)} />
          </>, 'Shown in the contact section at the bottom of the homepage.')}
          {card('Demo note', <div className="ad-grid2"><TextField label="Note under the demos" area rows={3} value={sec.demos?.note} onChange={(v) => section('demos', 'note', v)} /><TextField label="Link text" value={sec.demos?.noteLink} onChange={(v) => section('demos', 'noteLink', v)} /></div>)}
          {card('Website guide link', <TextField label="Guide page address" value={sec.guide?.href} onChange={(v) => section('guide', 'href', v)} />)}
          {card('Footer', <TextField label="Footer tagline" value={content.footer?.tagline} area rows={2} onChange={(v) => group('footer', 'tagline', v)} />)}
          <details className="ad-legacy"><summary>Older section headings (not shown by the current homepage)</summary><div className="ad-stack">
            {['services', 'demos', 'work', 'about', 'process', 'guide', 'contact'].flatMap((name) => legacyFor(name).map((k) => <TextField key={name + k} label={name + ' · ' + k} value={sec[name][k]} area={String(sec[name][k]).length > 100} onChange={(v) => section(name, k, v)} />))}
          </div></details>
        </>}

        {tab === 'services' && list('services', 'Services', 'service', [F('icon', 'Icon', { options: [['website', 'Website'], ['store', 'Online store'], ['apps', 'Web app'], ['search', 'Search / SEO'], ['maintenance', 'Maintenance'], ['support', 'Support']] }), F('name', 'Service name'), F('body', 'Description', { area: true })], { sub: 'Shown in the “What we build” section.', subOf: (s) => String(s.body || '').slice(0, 70) })}

        {tab === 'demos' && <>
          {callout(<>This controls each demo <b>card</b> on the homepage. The full demo page for the 15 built-in demos is written in the site code (<code>lib/demo-sites.ts</code>). New demos you add here use the older, shorter page.</>, true)}
          <input className="ad-in" aria-label="Search demos" placeholder="Search demos by name or tag" value={demoQuery} onChange={(e) => setDemoQuery(e.target.value)} />
          {list('demos', 'Industry demos', 'demo', [F('n', 'Number'), F('slug', 'Page address', { hint: 'For example restaurant. The page is /demos/restaurant.' }), F('title', 'Industry title'), F('brand', 'Sample brand name'), F('text', 'Card description', { area: true }), F('image', 'Card image', { image: true }), F('tags', 'Tags', { list: true }), F('href', 'Custom destination', { hint: 'Leave blank to use /demos/your-slug.' })], { visible: true, filter: demoQuery, subOf: (d) => '/demos/' + d.slug,
            legacy: { label: 'Older detail page fields (only used by demos without a built-in page)', fields: [F('pageTitle', 'Headline', { area: true }), F('pageIntro', 'Introduction', { area: true }), F('pageSectionTitle', 'Section heading'), F('pageSectionIntro', 'Section description', { area: true }), F('pageClosingTitle', 'Closing heading'), F('pageClosingText', 'Closing text', { area: true })] } })}
        </>}

        {tab === 'projects' && list('projects', 'Portfolio projects', 'project', [F('slug', 'Page address', { hint: 'The project page is /projects/your-slug.' }), F('name', 'Project name'), F('type', 'Category'), F('text', 'Short description', { area: true }), F('image', 'Preview image', { image: true }), F('websiteUrl', 'Live website', { hint: 'Leave blank to hide the live-site button.' }), F('repoUrl', 'Code repository (optional)'), F('stack', 'Technologies', { list: true }), F('features', 'Key features', { list: true })], { visible: true,
          extra: { label: 'Case study', fields: [F('caseStudy.challenge', 'The challenge', { area: true }), F('caseStudy.approach', 'The approach', { area: true }), F('caseStudy.delivery', 'What was delivered', { area: true }), F('caseStudy.role', 'MifiTech role'), F('caseStudy.outcome', 'Outcome', { area: true }), F('caseStudy.flyer', 'Project flyer', { image: true }), F('caseStudy.gallery', 'Gallery image URLs', { list: true, area: true, hint: 'Paste addresses from the Media page, separated by commas. Use real screenshots when you have them.' })] } })}

        {tab === 'process' && <>
          {list('stages', 'How you work', 'step', [F('n', 'Number'), F('title', 'Step title'), F('body', 'Description', { area: true })], { sub: 'Shown as “From first chat to live site”.' })}
          {list('faqs', 'Frequently asked questions', 'question', [F('question', 'Question'), F('answer', 'Answer', { area: true })])}
          <details className="ad-legacy"><summary>Studio principles (not shown on the current homepage)</summary>{list('trustPoints', 'Studio principles', 'principle', [F('title', 'Principle'), F('body', 'Description', { area: true })])}</details>
        </>}

        {tab === 'people' && <>
          {card('Founder profile', <>
            <div className="ad-grid2"><TextField label="Name" value={content.studioProfile?.name} onChange={(v) => group('studioProfile', 'name', v)} /><TextField label="Role" value={content.studioProfile?.role} onChange={(v) => group('studioProfile', 'role', v)} /></div>
            <TextField label="Headline" value={content.studioProfile?.headline} onChange={(v) => group('studioProfile', 'headline', v)} />
            <TextField label="Short bio" area value={content.studioProfile?.bio} onChange={(v) => group('studioProfile', 'bio', v)} />
            <TextField label="Highlights" value={(content.studioProfile?.highlights || []).join(', ')} hint="Separate with commas." onChange={(v) => group('studioProfile', 'highlights', v.split(',').map((s: string) => s.trim()).filter(Boolean))} />
            {imageField('Profile photo', content.studioProfile?.image || '', (v) => group('studioProfile', 'image', v))}
          </>, 'Hidden on the website until you add a name, bio or photo. Share only accurate details.')}
          {list('testimonials', 'Client reviews', 'review', [F('quote', 'Approved quote', { area: true }), F('name', 'Client name'), F('role', 'Role'), F('company', 'Company')], { sub: 'Publish only quotes the client has approved.', titleOf: (t) => t.name || 'New review', subOf: (t) => String(t.quote || '').slice(0, 70) })}
        </>}

        {tab === 'guide' && <>
          {card('Guide page', <>
            <div className="ad-grid2"><TextField label="Small label" value={content.guideArticle?.eyebrow} onChange={(v) => group('guideArticle', 'eyebrow', v)} /><TextField label="Title" value={content.guideArticle?.title} onChange={(v) => group('guideArticle', 'title', v)} /></div>
            <TextField label="Introduction" area value={content.guideArticle?.intro} onChange={(v) => group('guideArticle', 'intro', v)} />
            <TextField label="Closing heading" value={content.guideArticle?.closingTitle} onChange={(v) => group('guideArticle', 'closingTitle', v)} />
            <TextField label="Closing text" area value={content.guideArticle?.closingText} onChange={(v) => group('guideArticle', 'closingText', v)} />
          </>, 'The “How to build a website in Nigeria” article.')}
          {list('guideSections', 'Guide sections', 'section', [F('heading', 'Section heading'), F('body', 'Content', { area: true })], { titleOf: (g) => g.heading || 'New section', subOf: (g) => String(g.body || '').slice(0, 70) })}
        </>}
      </div>
    </div>
  );
}