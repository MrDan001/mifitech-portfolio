import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';
import { db, isAdmin, passwordOK, sessionValue, seoDefaults } from '@/lib/backend';
import { defaultSiteContent, getSiteContent, type SiteContent } from '@/lib/site-content';

type Ctx = { params: Promise<{ action: string[] }> };
const leadStatuses = ['new', 'interested', 'consultation', 'proposal_sent', 'awaiting_payment', 'converted', 'lost'];
const proposalStatuses = ['draft', 'sent', 'accepted', 'declined', 'awaiting_payment', 'paid', 'in_progress', 'completed'];

function safeUrl(value: unknown, allowRelative = false) {
  const url = String(value || '').trim();
  if (!url) return true;
  if (allowRelative && (url.startsWith('/') || url.startsWith('#'))) return true;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export async function POST(req: Request, ctx: Ctx) {
  const { action } = await ctx.params;
  const route = action.join('/');

  if (route === 'login') {
    const body = await req.json().catch(() => ({}));
    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json({ error: 'Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.' }, { status: 503 });
    }
    if (!passwordOK(String(body.password || ''))) {
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set('mifi_admin', sessionValue(), {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', path: '/', maxAge: 604800,
    });
    return res;
  }

  if (route === 'logout') {
    const res = NextResponse.json({ ok: true });
    res.cookies.set('mifi_admin', '', { httpOnly: true, path: '/', maxAge: 0 });
    return res;
  }

  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  const body = await req.json().catch(() => ({}));

  try {
    if (route === 'proposals') {
      if (!body.client_name || !body.client_email || !body.business_name || !body.scope || !body.timeline || Number(body.amount) <= 0) {
        return NextResponse.json({ error: 'Complete all proposal fields and enter a valid amount.' }, { status: 400 });
      }
      const token = randomBytes(32).toString('hex');
      await db('proposals', {
        method: 'POST',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          token, client_name: body.client_name, client_email: body.client_email,
          business_name: body.business_name, scope: body.scope, timeline: body.timeline,
          amount: Number(body.amount), currency: body.currency || 'NGN',
          payment_terms: body.payment_terms || '60% commencement; 40% before launch.',
          payment_instructions: body.payment_instructions || '', status: 'sent',
        }),
      });
      return NextResponse.json({ ok: true, token });
    }

    if (route === 'seo') {
      const value = {
        title: String(body.title || '').slice(0, 100),
        description: String(body.description || '').slice(0, 300),
        keywords: Array.isArray(body.keywords) ? body.keywords.slice(0, 30) : [],
        canonicalUrl: String(body.canonicalUrl || ''),
        ogTitle: String(body.ogTitle || body.title || ''),
        ogDescription: String(body.ogDescription || body.description || ''),
      };
      if (!value.title || !value.description || !value.canonicalUrl.startsWith('https://')) {
        return NextResponse.json({ error: 'Enter a title, description and HTTPS canonical URL.' }, { status: 400 });
      }
      await db('site_settings?on_conflict=key', {
        method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ key: 'seo', value, updated_at: new Date().toISOString() }),
      });
      return NextResponse.json({ ok: true });
    }

    if (route === 'content') {
      const raw = body.content;
      if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        return NextResponse.json({ error: 'Website content must be a valid content object.' }, { status: 400 });
      }
      const serialized = JSON.stringify(raw);
      if (serialized.length > 180000) {
        return NextResponse.json({ error: 'The content is too large. Reduce the amount of text or the number of items.' }, { status: 413 });
      }

      const content = { ...defaultSiteContent, ...raw } as SiteContent;
      if (!Array.isArray(content.navigation) || !Array.isArray(content.services) || !Array.isArray(content.demos) || !Array.isArray(content.projects) || !Array.isArray(content.stages)) {
        return NextResponse.json({ error: 'One of the website content lists is invalid.' }, { status: 400 });
      }
      if (content.projects.some((item) => !safeUrl(item.websiteUrl) || !safeUrl(item.repoUrl))) {
        return NextResponse.json({ error: 'Project website and repository links must use http:// or https://.' }, { status: 400 });
      }
      if (content.navigation.some((item) => !safeUrl(item.href, true))) {
        return NextResponse.json({ error: 'Navigation links must be a local path, section anchor or http(s) URL.' }, { status: 400 });
      }
      if (content.demos.some((item) => item.href && !safeUrl(item.href, true))) {
        return NextResponse.json({ error: 'Demo links must be a local path, section anchor or http(s) URL.' }, { status: 400 });
      }
      await db('site_settings?on_conflict=key', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ key: 'content', value: content, updated_at: new Date().toISOString() }),
      });
      return NextResponse.json({ ok: true });
    }
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Database request failed.' }, { status: 503 });
  }

  return NextResponse.json({ error: 'Unknown action.' }, { status: 404 });
}

export async function GET(_req: Request, ctx: Ctx) {
  const { action } = await ctx.params;
  const route = action.join('/');
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  try {
    if (route === 'leads') return NextResponse.json({ leads: await db('leads?select=*&order=created_at.desc') });
    if (route === 'proposals') return NextResponse.json({ proposals: await db('proposals?select=*&order=created_at.desc') });
    if (route === 'seo') {
      const rows = await db<Array<{ value: object }>>('site_settings?key=eq.seo&select=value&limit=1');
      return NextResponse.json({ settings: { ...seoDefaults, ...(rows[0]?.value || {}) } });
    }
    if (route === 'content') return NextResponse.json({ content: await getSiteContent() });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Database unavailable.' }, { status: 503 });
  }

  return NextResponse.json({ error: 'Unknown action.' }, { status: 404 });
}

export async function PATCH(req: Request, ctx: Ctx) {
  const { action } = await ctx.params;
  const route = action.join('/');
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  const body = await req.json().catch(() => ({}));

  try {
    if (route === 'leads' && body.id && leadStatuses.includes(body.status)) {
      await db('leads?id=eq.' + encodeURIComponent(body.id), {
        method: 'PATCH', headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ status: body.status, updated_at: new Date().toISOString() }),
      });
      return NextResponse.json({ ok: true });
    }
    if (route === 'proposals' && body.id && proposalStatuses.includes(body.status)) {
      await db('proposals?id=eq.' + encodeURIComponent(body.id), {
        method: 'PATCH', headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ status: body.status, updated_at: new Date().toISOString() }),
      });
      return NextResponse.json({ ok: true });
    }
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Update failed.' }, { status: 503 });
  }
  return NextResponse.json({ error: 'Invalid update.' }, { status: 400 });
}
