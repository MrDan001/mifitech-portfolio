import { NextResponse } from 'next/server';
import { randomBytes, randomUUID } from 'node:crypto';
import { db, isAdmin, passwordOK, sessionValue, seoDefaults } from '@/lib/backend';
import { defaultBusinessSettings, getHomepageContent } from '@/lib/site-content';

type Ctx = { params: Promise<{ action: string[] }> };
type MediaAsset = { id: string; file_name: string; storage_path: string; public_url: string; content_type: string; size_bytes: number; created_at: string };
type Payment = { proposal_id: string | null; amount: number; status: string };
const leadStatuses = ['new','interested','consultation','proposal_sent','awaiting_payment','converted','lost'];
const proposalStatuses = ['draft','sent','accepted','declined','awaiting_payment','paid','in_progress','completed'];
const paymentStatuses = ['pending','paid','refunded'];
const paymentMethods = ['bank_transfer','cash','card','paystack','flutterwave','other'];
const mediaBucket = 'mifitech-media';

function supabaseConfig() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Configure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before using the admin.');
  return { url, key };
}
function publicMediaUrl(url: string, path: string) {
  return url + '/storage/v1/object/public/' + mediaBucket + '/' + path.split('/').map(encodeURIComponent).join('/');
}
async function recalculateProposal(proposalId: string) {
  const paid = await db<Array<{ amount: number }>>('payments?proposal_id=eq.' + encodeURIComponent(proposalId) + '&status=eq.paid&select=amount');
  const totalPaid = paid.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const rows = await db<Array<{ amount: number }>>('proposals?id=eq.' + encodeURIComponent(proposalId) + '&select=amount&limit=1');
  if (!rows[0]) return;
  const amount = Number(rows[0].amount || 0);
  const paymentStatus = totalPaid <= 0 ? 'unpaid' : totalPaid >= amount ? 'paid' : 'partial';
  await db('proposals?id=eq.' + encodeURIComponent(proposalId), {
    method: 'PATCH', headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ amount_paid: totalPaid, payment_status: paymentStatus, updated_at: new Date().toISOString() }),
  });
}

export async function POST(req: Request, ctx: Ctx) {
  const { action } = await ctx.params;
  const route = action.join('/');

  if (route === 'login') {
    const body = await req.json().catch(() => ({}));
    if (!process.env.ADMIN_PASSWORD || !process.env.ADMIN_SESSION_SECRET) return NextResponse.json({ error: 'Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET.' }, { status: 503 });
    if (!passwordOK(String(body.password || ''))) return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    const response = NextResponse.json({ ok: true });
    response.cookies.set('mifi_admin', sessionValue(), { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 604800 });
    return response;
  }

  if (route === 'logout') {
    const response = NextResponse.json({ ok: true });
    response.cookies.set('mifi_admin', '', { httpOnly: true, path: '/', maxAge: 0 });
    return response;
  }

  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  try {
    if (route === 'media') {
      const form = await req.formData();
      const file = form.get('file');
      if (!(file instanceof File) || file.size <= 0) return NextResponse.json({ error: 'Choose an image to upload.' }, { status: 400 });
      const allowed = new Map([['image/jpeg','jpg'],['image/png','png'],['image/webp','webp'],['image/avif','avif']]);
      const extension = allowed.get(file.type);
      if (!extension) return NextResponse.json({ error: 'Use a JPEG, PNG, WebP or AVIF image.' }, { status: 415 });
      if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: 'The image must be 8 MB or smaller.' }, { status: 413 });
      const { url, key } = supabaseConfig();
      const path = new Date().toISOString().slice(0, 7) + '/' + randomUUID() + '.' + extension;
      const upload = await fetch(url + '/storage/v1/object/' + mediaBucket + '/' + path, {
        method: 'POST',
        headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': file.type, 'x-upsert': 'false' },
        body: await file.arrayBuffer(),
        cache: 'no-store',
      });
      if (!upload.ok) {
        const detail = await upload.text();
        throw new Error(detail || 'Supabase Storage upload failed. Check the media bucket setup.');
      }
      const asset = {
        file_name: file.name.slice(0, 240), storage_path: path,
        public_url: publicMediaUrl(url, path), content_type: file.type, size_bytes: file.size,
      };
      const saved = await db<Array<{ id: string }>>('media_assets', {
        method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(asset),
      });
      return NextResponse.json({ ok: true, asset: { ...asset, id: saved[0]?.id } });
    }

    const body = await req.json().catch(() => ({}));

    if (route === 'proposals') {
      if (!body.client_name || !body.client_email || !body.business_name || !body.scope || !body.timeline || Number(body.amount) <= 0) {
        return NextResponse.json({ error: 'Complete all proposal fields and enter a valid amount.' }, { status: 400 });
      }
      const token = randomBytes(32).toString('hex');
      await db('proposals', {
        method: 'POST', headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({
          token, client_name: String(body.client_name).slice(0, 120), client_email: String(body.client_email).slice(0, 200),
          business_name: String(body.business_name).slice(0, 180), scope: String(body.scope).slice(0, 12000),
          timeline: String(body.timeline).slice(0, 200), amount: Number(body.amount),
          currency: String(body.currency || 'NGN').slice(0, 3),
          payment_terms: String(body.payment_terms || '60% commencement; 40% before launch.').slice(0, 1000),
          payment_instructions: String(body.payment_instructions || '').slice(0, 3000), status: 'sent',
        }),
      });
      return NextResponse.json({ ok: true, token });
    }

    if (route === 'payments') {
      const amount = Number(body.amount);
      if (!Number.isFinite(amount) || amount <= 0) return NextResponse.json({ error: 'Enter a valid payment amount.' }, { status: 400 });
      if (body.status && !paymentStatuses.includes(body.status)) return NextResponse.json({ error: 'Invalid payment status.' }, { status: 400 });
      if (body.method && !paymentMethods.includes(body.method)) return NextResponse.json({ error: 'Invalid payment method.' }, { status: 400 });
      const proposalId = body.proposal_id ? String(body.proposal_id) : null;
      const saved = await db<Array<{ id: string }>>('payments', {
        method: 'POST', headers: { Prefer: 'return=representation' },
        body: JSON.stringify({
          proposal_id: proposalId, amount, currency: String(body.currency || 'NGN').slice(0, 3),
          method: body.method || 'other', reference: String(body.reference || '').slice(0, 200),
          note: String(body.note || '').slice(0, 2000), status: body.status || 'paid',
          paid_at: body.paid_at || (body.status === 'paid' || !body.status ? new Date().toISOString() : null),
        }),
      });
      if (proposalId) await recalculateProposal(proposalId);
      return NextResponse.json({ ok: true, id: saved[0]?.id });
    }

    if (route === 'website') {
      const serialized = JSON.stringify(body);
      if (serialized.length > 150000) return NextResponse.json({ error: 'The website content is too large to save.' }, { status: 413 });
      if (!body.hero || !Array.isArray(body.services) || !Array.isArray(body.projects) || !Array.isArray(body.demos)) {
        return NextResponse.json({ error: 'The homepage content is incomplete.' }, { status: 400 });
      }
      const allowedIcons = ['website','store','apps','search','maintenance','support'];
      for (const service of body.services) {
        if (!service.name || !service.body || !allowedIcons.includes(service.icon)) return NextResponse.json({ error: 'Each service needs a name, description and a supported icon style.' }, { status: 400 });
      }
      for (const item of [...body.projects, ...body.demos]) {
        if (!item.slug || !/^[a-z0-9-]{2,80}$/.test(item.slug)) return NextResponse.json({ error: 'Use a URL-safe lowercase slug for every portfolio and demo item.' }, { status: 400 });
      }
      await db('site_settings?on_conflict=key', {
        method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ key: 'homepage', value: body, updated_at: new Date().toISOString() }),
      });
      return NextResponse.json({ ok: true, message: 'Homepage content saved and published.' });
    }

    if (route === 'seo') {
      const value = {
        title: String(body.title || '').slice(0, 100), description: String(body.description || '').slice(0, 300),
        keywords: Array.isArray(body.keywords) ? body.keywords.map(String).slice(0, 30) : [],
        canonicalUrl: String(body.canonicalUrl || ''), ogTitle: String(body.ogTitle || body.title || '').slice(0, 100),
        ogDescription: String(body.ogDescription || body.description || '').slice(0, 300),
      };
      if (!value.title || !value.description || !value.canonicalUrl.startsWith('https://')) return NextResponse.json({ error: 'Enter a title, description and HTTPS canonical URL.' }, { status: 400 });
      await db('site_settings?on_conflict=key', {
        method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ key: 'seo', value, updated_at: new Date().toISOString() }),
      });
      return NextResponse.json({ ok: true, message: 'SEO settings saved.' });
    }

    if (route === 'settings') {
      const value = {
        businessName: String(body.businessName || 'MifiTech').slice(0, 120),
        contactEmail: String(body.contactEmail || '').slice(0, 200),
        phone: String(body.phone || '').slice(0, 50),
        location: String(body.location || 'Nigeria').slice(0, 120),
        tagline: String(body.tagline || '').slice(0, 240),
      };
      if (value.contactEmail && !/^\S+@\S+\.\S+$/.test(value.contactEmail)) return NextResponse.json({ error: 'Enter a valid contact email address.' }, { status: 400 });
      await db('site_settings?on_conflict=key', {
        method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ key: 'business', value, updated_at: new Date().toISOString() }),
      });
      const homepage = await getHomepageContent();
      await db('site_settings?on_conflict=key', {
        method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ key: 'homepage', value: { ...homepage, contact: { email: value.contactEmail || homepage.contact.email } }, updated_at: new Date().toISOString() }),
      });
      return NextResponse.json({ ok: true, message: 'Business settings saved.' });
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Database request failed.' }, { status: 503 });
  }

  return NextResponse.json({ error: 'Unknown action.' }, { status: 404 });
}

export async function GET(_req: Request, ctx: Ctx) {
  const { action } = await ctx.params;
  const route = action.join('/');
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });

  try {
    if (route === 'leads') return NextResponse.json({ leads: await db<Array<Record<string, any>>>('leads?select=*&order=created_at.desc') });
    if (route === 'proposals') return NextResponse.json({ proposals: await db<Array<Record<string, any>>>('proposals?select=*&order=created_at.desc') });
    if (route === 'payments') {
      const [payments, proposals] = await Promise.all([
        db<Array<Record<string, any>>>('payments?select=*&order=created_at.desc'),
        db<Array<{ id: string; business_name: string }>>('proposals?select=id,business_name'),
      ]);
      const names = new Map<string, string>(proposals.map(p => [p.id, p.business_name] as const));
      return NextResponse.json({ payments: payments.map(p => ({ ...p, business_name: p.proposal_id ? names.get(p.proposal_id) || 'Proposal' : 'Unlinked payment' })) });
    }
    if (route === 'dashboard') {
      const [leads, proposals, payments] = await Promise.all([
        db<Array<Record<string, any>>>('leads?select=id,name,business,status,created_at&order=created_at.desc&limit=8'),
        db<Array<Record<string, any>>>('proposals?select=id,status,amount&order=created_at.desc'),
        db<Array<Record<string, any>>>('payments?select=id,status,amount&order=created_at.desc'),
      ]);
      return NextResponse.json({
        leads: leads.length, proposals: proposals.length, payments: payments.length,
        newLeads: leads.filter(l => l.status === 'new').length,
        openProposals: proposals.filter(p => !['completed','declined'].includes(p.status)).length,
        received: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + Number(p.amount || 0), 0),
      });
    }
    if (route === 'website') return NextResponse.json({ content: await getHomepageContent() });
    if (route === 'media') return NextResponse.json({ assets: await db<Array<MediaAsset>>('media_assets?select=*&order=created_at.desc') });
    if (route === 'seo') {
      const rows = await db<Array<{ value: object }>>('site_settings?key=eq.seo&select=value&limit=1');
      return NextResponse.json({ settings: { ...seoDefaults, ...(rows[0]?.value || {}) } });
    }
    if (route === 'settings') {
      const rows = await db<Array<{ value: object }>>('site_settings?key=eq.business&select=value&limit=1');
      return NextResponse.json({ settings: { ...defaultBusinessSettings, ...(rows[0]?.value || {}) } });
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Database unavailable.' }, { status: 503 });
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
      await db('leads?id=eq.' + encodeURIComponent(body.id), { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ status: body.status, updated_at: new Date().toISOString() }) });
      return NextResponse.json({ ok: true, message: 'Enquiry status updated.' });
    }
    if (route === 'proposals' && body.id && proposalStatuses.includes(body.status)) {
      await db('proposals?id=eq.' + encodeURIComponent(body.id), { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ status: body.status, updated_at: new Date().toISOString() }) });
      return NextResponse.json({ ok: true, message: 'Proposal status updated.' });
    }
    if (route === 'payments' && body.id && paymentStatuses.includes(body.status)) {
      const found = await db<Array<{ proposal_id: string | null }>>('payments?id=eq.' + encodeURIComponent(body.id) + '&select=proposal_id&limit=1');
      await db('payments?id=eq.' + encodeURIComponent(body.id), { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ status: body.status, updated_at: new Date().toISOString() }) });
      if (found[0]?.proposal_id) await recalculateProposal(found[0].proposal_id);
      return NextResponse.json({ ok: true, message: 'Payment status updated.' });
    }
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Update failed.' }, { status: 503 });
  }
  return NextResponse.json({ error: 'Invalid update.' }, { status: 400 });
}

export async function DELETE(req: Request, ctx: Ctx) {
  const { action } = await ctx.params;
  if (action.join('/') !== 'media') return NextResponse.json({ error: 'Unknown action.' }, { status: 404 });
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  try {
    const id = new URL(req.url).searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Media ID is required.' }, { status: 400 });
    const rows = await db<Array<{ storage_path: string }>>('media_assets?id=eq.' + encodeURIComponent(id) + '&select=storage_path&limit=1');
    if (!rows[0]) return NextResponse.json({ error: 'Media item was not found.' }, { status: 404 });
    const { url, key } = supabaseConfig();
    const removed = await fetch(url + '/storage/v1/object/' + mediaBucket, {
      method: 'DELETE',
      headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json' },
      body: JSON.stringify({ prefixes: [rows[0].storage_path] }),
      cache: 'no-store',
    });
    if (!removed.ok) throw new Error((await removed.text()) || 'Could not remove the storage file.');
    await db('media_assets?id=eq.' + encodeURIComponent(id), { method: 'DELETE', headers: { Prefer: 'return=minimal' } });
    return NextResponse.json({ ok: true, message: 'Media file deleted.' });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Media delete failed.' }, { status: 503 });
  }
}
