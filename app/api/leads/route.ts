// Path: app/api/leads/route.ts
import { NextResponse, after } from 'next/server';
import { db } from '@/lib/backend';
import { notifyOwner } from '@/lib/notify';
import { clientIp, isLimited, record } from '@/lib/rate-limit';

const HOUR = 3600_000;
const EMAIL = /^\S+@\S+\.\S+$/;
const clean = (value: unknown, max: number) => String(value ?? '').trim().slice(0, max);
const linkCount = (text: string) => (text.match(/https?:\/\/|www\./gi) || []).length;
const ok = () => NextResponse.json({ ok: true });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid enquiry.' }, { status: 400 });
  if (body.website) return ok(); // hidden trap field: only bots fill it in

  const ip = clientIp(req);
  if (isLimited('lead:' + ip, 5, HOUR)) return NextResponse.json({ error: 'Too many enquiries from this connection. Please try again later or message us on WhatsApp.' }, { status: 429 });

  const name = clean(body.name, 120), email = clean(body.email, 200), details = clean(body.project_details, 5000);
  if (name.length < 2 || !EMAIL.test(email) || details.length < 10) return NextResponse.json({ error: 'Please add your name, a valid email and a short description of your project.' }, { status: 400 });
  record('lead:' + ip, HOUR);

  // Quietly drop what looks like automated or link-stuffed spam, without telling the sender.
  const elapsed = Number(body.elapsed) || 0;
  if ((elapsed > 0 && elapsed < 1500) || linkCount(details) > 2) return ok();
  const dup = 'dup:' + email.toLowerCase() + ':' + details.slice(0, 60);
  if (isLimited(dup, 1, 10 * 60_000)) return ok();
  record(dup, 10 * 60_000);

  const business = clean(body.business, 160), type = clean(body.project_type || 'Not sure yet', 100), demo = clean(body.demo, 100);
  let saved = false;
  try {
    await db('leads', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ name, email, business, project_type: type, details, source_url: clean(body.source_url, 1000), demo, status: 'new' }) });
    saved = true;
  } catch (error) { console.error('Could not save enquiry:', error instanceof Error ? error.message : 'unknown error'); }

  const alert = { title: 'New enquiry: ' + name + (business ? ' (' + business + ')' : ''), lines: ['Email: ' + email, 'Project: ' + type, ...(demo ? ['Asked about the ' + demo + ' demo'] : []), '', details.slice(0, 600)] };
  if (saved) { after(() => notifyOwner(alert)); return ok(); }
  // The database is unavailable: only report success if an alert actually reached you, so no enquiry is lost silently.
  if (await notifyOwner(alert)) return ok();
  return NextResponse.json({ error: 'We could not send your enquiry right now. Please message us on WhatsApp instead.' }, { status: 503 });
}