// Path: app/api/admin/[...action]/route.ts
import { NextResponse } from 'next/server';
import { randomBytes, randomUUID } from 'node:crypto';
import { db, deletePublicImage, isAdmin, listPublicImages, passwordOK, sessionValue, seoDefaults, uploadPublicImage } from '@/lib/backend';
import { defaultSiteContent, getSiteContent, type SiteContent } from '@/lib/site-content';
import { clear, clientIp, isLimited, record } from '@/lib/rate-limit';

type Ctx = { params: Promise<{ action: string[] }> };
const leadStatuses = ['new', 'interested', 'consultation', 'proposal_sent', 'awaiting_payment', 'converted', 'lost'];
const proposalStatuses = ['draft', 'sent', 'accepted', 'declined', 'awaiting_payment', 'paid', 'in_progress', 'completed'];

const HUNT_PREFIX = 'hunt_prospect_';
type HuntRow = { key: string; value: Record<string, any> };
async function huntRows(): Promise<HuntRow[]> {
  const rows = await db<HuntRow[]>('site_settings?select=key,value&limit=1000');
  return rows.filter((row) => row.key.startsWith(HUNT_PREFIX));
}
async function saveHuntRow(id: string, value: Record<string, any>) {
  await db('site_settings?on_conflict=key', {
    method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({ key: HUNT_PREFIX + id, value, updated_at: new Date().toISOString() }),
  });
}
async function findPublicEmail(name: string, address: string) {
  const apiKey = process.env.GOOGLE_CSE_API_KEY;
  const cx = process.env.GOOGLE_CSE_CX;
  if (!apiKey || !cx) return { email: '', emailSourceUrl: '' };
  const params = new URLSearchParams({ key: apiKey, cx, q: '"' + name + '" "' + address + '" email contact', num: '5' });
  const response = await fetch('https://www.googleapis.com/customsearch/v1?' + params.toString(), { cache: 'no-store' });
  if (!response.ok) return { email: '', emailSourceUrl: '' };
  const data = await response.json().catch(() => ({}));
  for (const item of data.items || []) {
    const text = [item.title, item.snippet, ...(item.pagemap?.metatags || []).map((tag: any) => Object.values(tag).join(' '))].join(' ');
    const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    if (match && !/example\.(com|org)|wixsite\.com/i.test(match[0])) return { email: match[0], emailSourceUrl: String(item.link || '') };
  }
  return { email: '', emailSourceUrl: '' };
}

function huntDraft(name: string, industry: string, city: string, country: string) {
  const first = name.split(/\s+/)[0] || 'there';
  const subject = 'A website idea for ' + name;
  const draft = [
    'Hello ' + first + ' team,',
    '',
    'I came across ' + name + ' while researching ' + industry.toLowerCase() + ' businesses' + (city ? ' in ' + city : '') + (country ? ', ' + country : '') + '. I noticed your public business listing does not show a dedicated website link. I may have missed one, but I thought it was worth reaching out.',
    '',
    'A clear, professional website could help people understand what you offer, see useful information about your business and contact you more easily. At MifiTech, we build websites and digital tools around how each business actually works.',
    '',
    'If this is something you have considered, I would be happy to share a few practical ideas for your business. There is no obligation.',
    '',
    'Best regards,',
    'Okechukwu Daniel Ernest',
    'MifiTech',
    'https://www.mifitech.top',
    'WhatsApp: https://wa.me/2349067859200',
    '',
    'If this is not relevant, just let me know and I will not follow up.'
  ].join('\n');
  return { subject, draft };
}


function safeUrl(value: unknown, allowRelative = false) {
  const url = String(value || '').trim();
  if (!url) return true;
  if (allowRelative && (url.startsWith('#') || (url.startsWith('/') && !url.startsWith('//')))) return true;
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
    const attemptKey = 'login:' + clientIp(req);
    if (isLimited(attemptKey, 5, 15 * 60_000)) {
      return NextResponse.json({ error: 'Too many sign-in attempts. Please wait 15 minutes and try again.' }, { status: 429 });
    }
    if (!passwordOK(String(body.password || ''))) {
      record(attemptKey, 15 * 60_000);
      await new Promise((resolve) => setTimeout(resolve, 700));
      return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
    }
    clear(attemptKey);
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

  if (route === 'upload') {
    try {
      const form = await req.formData();
      const file = form.get('file');
      if (!(file instanceof File)) return NextResponse.json({ error: 'Choose an image file to upload.' }, { status: 400 });
      const url = await uploadPublicImage(file);
      return NextResponse.json({ ok: true, url });
    } catch (error) {
      return NextResponse.json({ error: error instanceof Error ? error.message : 'Image upload failed.' }, { status: 400 });
    }
  }

  const body = await req.json().catch(() => ({}));

  try {
    if (route === 'hunt/search') {
      const country = String(body.country || '').trim().slice(0, 100);
      const city = String(body.city || '').trim().slice(0, 100);
      const industry = String(body.industry || '').trim().slice(0, 100);
      if (!industry) return NextResponse.json({ error: 'Choose a business category.' }, { status: 400 });
      const apiKey = process.env.GOOGLE_PLACES_API_KEY;
      if (!apiKey) return NextResponse.json({ error: 'HUNT needs a Google Places API key. Add GOOGLE_PLACES_API_KEY to the MifiTech Vercel project environment variables, enable Places API (New), then redeploy.' }, { status: 503 });
      const query = industry + ' businesses' + (city ? ' in ' + city : '') + (country ? ', ' + country : '');
      const fieldMask = 'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.types,places.websiteUri,places.googleMapsUri,places.businessStatus,places.rating,places.editorialSummary,nextPageToken';
      const allPlaces: any[] = [];
      let pageToken = '';
      for (let page = 0; page < 3 && allPlaces.length < 60; page++) {
        const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': apiKey, 'X-Goog-FieldMask': fieldMask },
          body: JSON.stringify({ textQuery: query, pageSize: 20, ...(pageToken ? { pageToken } : {}) }),
          cache: 'no-store',
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) return NextResponse.json({ error: result.error?.message || 'Google Places could not complete this search. Check API billing and Places API access.' }, { status: 502 });
        allPlaces.push(...(result.places || []));
        pageToken = result.nextPageToken || '';
        if (!pageToken) break;
      }
      const existing = await huntRows();
      const known = new Set(existing.map((row) => String(row.value.googlePlaceId || '')));
      const places = allPlaces.filter((place: any) => place.id && !place.websiteUri && place.businessStatus !== 'CLOSED_PERMANENTLY' && !known.has(place.id)).slice(0, 15);
      if (!places.length) return NextResponse.json({ prospects: [], message: 'No new listings without a website link were found for this search. Try another city or category.' });
      const batchId = randomUUID();
      const prospects: any[] = [];
      for (let index = 0; index < places.length; index += 4) {
        const group = await Promise.all(places.slice(index, index + 4).map(async (place: any) => {
        const name = String(place.displayName?.text || 'Business').slice(0, 180);
        const address = String(place.formattedAddress || '').slice(0, 400);
        const description = String(place.editorialSummary?.text || (place.types || []).slice(0, 5).map((x: string) => x.replace(/_/g, ' ')).join(', ') || 'Public business listing').slice(0, 600);
        const phone = String(place.internationalPhoneNumber || place.nationalPhoneNumber || '').slice(0, 60);
        const actualCountry = country || address.split(',').map((x: string) => x.trim()).filter(Boolean).slice(-1)[0] || 'Unspecified';
        const draft = huntDraft(name, industry, city, actualCountry);
        const contact = await findPublicEmail(name, address);
        return { id: String(place.id), googlePlaceId: String(place.id), batchId, name, address, country: actualCountry, city, industry, phone, email: contact.email, emailSourceUrl: contact.emailSourceUrl, description, mapsUrl: String(place.googleMapsUri || ''), websiteStatus: 'not_found', subject: draft.subject, draft: draft.draft, status: 'new', createdAt: new Date().toISOString(), rating: place.rating || null };
        }));
        prospects.push(...group);
      }
      for (const prospect of prospects) await saveHuntRow(prospect.id, prospect);
      await db('site_settings?on_conflict=key', {
        method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify({ key: 'hunt_batch_' + batchId, value: { id: batchId, country, city, industry, count: prospects.length, createdAt: new Date().toISOString() }, updated_at: new Date().toISOString() }),
      });
      return NextResponse.json({ batchId, prospects });
    }

    if (route === 'hunt/send') {
      const id = String(body.id || '').trim();
      const email = String(body.email || '').trim();
      const subject = String(body.subject || '').trim().slice(0, 180);
      const draft = String(body.draft || '').trim().slice(0, 12000);
      if (!id || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !subject || !draft) return NextResponse.json({ error: 'Add a valid business email, subject and message before sending.' }, { status: 400 });
      const rows = await db<Array<{ value: Record<string, any> }>>('site_settings?key=eq.' + encodeURIComponent(HUNT_PREFIX + id) + '&select=value&limit=1');
      const prospect = rows[0]?.value;
      if (!prospect) return NextResponse.json({ error: 'This prospect is no longer in HUNT history.' }, { status: 404 });
      if (prospect.status === 'sent') return NextResponse.json({ error: 'An email has already been sent to this prospect.' }, { status: 409 });
      const apiKey = process.env.RESEND_API_KEY;
      if (!apiKey) return NextResponse.json({ error: 'RESEND_API_KEY is not configured on the MifiTech Vercel project.' }, { status: 503 });
      const sendLimitKey = 'hunt-send:' + clientIp(req);
      if (isLimited(sendLimitKey, 20, 60 * 60_000)) return NextResponse.json({ error: 'HUNT has reached its hourly sending limit. Please try again later.' }, { status: 429 });
      const mail = await fetch('https://api.resend.com/emails', {
        method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey },
        body: JSON.stringify({ from: process.env.EMAIL_FROM || 'MifiTech <hello@mifitech.top>', to: [email], reply_to: process.env.CONTACT_REPLY_TO || 'officialsafebase@gmail.com', subject, text: draft }),
        cache: 'no-store',
      });
      const mailResult = await mail.json().catch(() => ({}));
      if (!mail.ok) return NextResponse.json({ error: mailResult.message || mailResult.error?.message || 'Resend rejected this email.' }, { status: 502 });
      record(sendLimitKey, 60 * 60_000);
      await saveHuntRow(id, { ...prospect, email, subject, draft, status: 'sent', sentAt: new Date().toISOString(), resendId: mailResult.id || null });
      return NextResponse.json({ ok: true, resendId: mailResult.id || null });
    }

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
      if (!Array.isArray(content.navigation) || !Array.isArray(content.services) || !Array.isArray(content.demos) || !Array.isArray(content.projects) || !Array.isArray(content.stages) || !Array.isArray(content.trustPoints) || !Array.isArray(content.faqs) || !Array.isArray(content.testimonials) || !Array.isArray(content.guideSections)) {
        return NextResponse.json({ error: 'One of the website content lists is invalid.' }, { status: 400 });
      }
      const invalidProject = content.projects.find((item) =>
        !safeUrl(item.websiteUrl) ||
        !safeUrl(item.repoUrl) ||
        !safeUrl(item.flyer, true) ||
        !safeUrl(item.caseStudy?.flyer, true) ||
        (item.caseStudy?.gallery || []).some((url) => !safeUrl(url, true))
      );
      if (invalidProject) {
        return NextResponse.json({ error: 'Project website and repository links must use http:// or https://. Flyer and gallery images can use a local path (for example /flyers/image.svg) or a full http(s) URL.' }, { status: 400 });
      }
      const whatsappUrl = content.sections?.contact?.whatsappUrl || '';
      if (whatsappUrl && !/^https:\/\/wa\.me\/\d+$/.test(whatsappUrl)) {
        return NextResponse.json({ error: 'WhatsApp must be a wa.me link with the international phone number.' }, { status: 400 });
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
    if (route === 'hunt/prospects') {
      const rows = await huntRows();
      const prospects = rows.map((row) => row.value).sort((a,b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
      return NextResponse.json({ prospects });
    }
    if (route === 'leads') return NextResponse.json({ leads: await db('leads?select=*&order=created_at.desc') });
    if (route === 'proposals') return NextResponse.json({ proposals: await db('proposals?select=*&order=created_at.desc') });
    if (route === 'seo') {
      const rows = await db<Array<{ value: object }>>('site_settings?key=eq.seo&select=value&limit=1');
      return NextResponse.json({ settings: { ...seoDefaults, ...(rows[0]?.value || {}) } });
    }
    if (route === 'content') return NextResponse.json({ content: await getSiteContent() });
    if (route === 'media') return NextResponse.json({ media: await listPublicImages() });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Database unavailable.' }, { status: 503 });
  }

  return NextResponse.json({ error: 'Unknown action.' }, { status: 404 });
}

export async function DELETE(req: Request, ctx: Ctx) {
  const { action } = await ctx.params;
  const route = action.join('/');
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  const body = await req.json().catch(() => ({}));

  try {
    if (route === 'leads' && body.id) {
      await db('leads?id=eq.' + encodeURIComponent(String(body.id)), { method: 'DELETE', headers: { Prefer: 'return=minimal' } });
      return NextResponse.json({ ok: true });
    }
    if (route === 'media' && typeof body.path === 'string') {
      await deletePublicImage(body.path);
      return NextResponse.json({ ok: true });
    }
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Delete failed.' }, { status: 503 });
  }
  return NextResponse.json({ error: 'Invalid delete request.' }, { status: 400 });
}

export async function PATCH(req: Request, ctx: Ctx) {
  const { action } = await ctx.params;
  const route = action.join('/');
  if (!await isAdmin()) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 });
  const body = await req.json().catch(() => ({}));

  try {
    if (route === 'hunt/prospects' && body.id) {
      const id = String(body.id);
      const rows = await db<Array<{ value: Record<string, any> }>>('site_settings?key=eq.' + encodeURIComponent(HUNT_PREFIX + id) + '&select=value&limit=1');
      const current = rows[0]?.value;
      if (!current) return NextResponse.json({ error: 'Prospect not found.' }, { status: 404 });
      const next = { ...current };
      if (body.email !== undefined) {
        const email = String(body.email || '').trim();
        if (email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
        next.email = email;
      }
      if (body.subject !== undefined) next.subject = String(body.subject || '').slice(0, 180);
      if (body.draft !== undefined) next.draft = String(body.draft || '').slice(0, 12000);
      if (['whatsapp_sent','skipped'].includes(String(body.status || ''))) next.status = body.status;
      await saveHuntRow(id, next);
      return NextResponse.json({ ok: true });
    }
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
