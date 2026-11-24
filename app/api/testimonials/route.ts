import { NextResponse, after } from 'next/server';
import { randomUUID } from 'node:crypto';
import { clientIp, isLimited, record } from '@/lib/rate-limit';
import { notifyOwner } from '@/lib/notify';
import { SITE_URL } from '@/lib/contact';
import { getTestimonials, saveTestimonials, type TestimonialRecord } from '@/lib/testimonials';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const ip = clientIp(req);
  const limitKey = 'testimonial-submit:' + ip;
  if (isLimited(limitKey, 3, 60 * 60_000)) {
    return NextResponse.json({ error: 'You have reached the submission limit. Please try again later.' }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  // Quiet honeypot for basic automated spam.
  if (String(body.website || '').trim()) return NextResponse.json({ ok: true });
  const name = String(body.name || '').trim().replace(/\s+/g, ' ').slice(0, 100);
  const company = String(body.company || '').trim().replace(/\s+/g, ' ').slice(0, 120);
  const role = String(body.role || '').trim().replace(/\s+/g, ' ').slice(0, 100);
  const email = String(body.email || '').trim().slice(0, 254);
  const quote = String(body.quote || '').trim().slice(0, 1200);
  const rating = Number(body.rating);
  const consent = body.consent === true;

  if (name.length < 2 || quote.length < 20 || !Number.isInteger(rating) || rating < 1 || rating > 5 || !consent) {
    return NextResponse.json({ error: 'Add your name, a testimony of at least 20 characters, a 1–5 star rating and your permission to publish it after review.' }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address or leave it blank.' }, { status: 400 });
  }

  try {
    const items = await getTestimonials();
    const item: TestimonialRecord = {
      id: randomUUID(), name, company, role, email, quote, rating,
      status: 'pending', displayed: false, consent: true, createdAt: new Date().toISOString(),
    };
    await saveTestimonials([item, ...items].slice(0, 500));
    record(limitKey, 60 * 60_000);
    after(async () => {
      await notifyOwner({
        title: 'New client testimony from ' + name,
        ...(email ? { replyTo: email } : {}),
        lines: ['Rating: ' + rating + '/5', ...(company ? ['Business: ' + company] : []), ...(role ? ['Role: ' + role] : []), '', quote, '', 'Review and manage it in the MifiTech admin: ' + SITE_URL + '/admin'],
      });
    });
    return NextResponse.json({ ok: true, message: 'Thank you. Your testimony has been sent for review.' });
  } catch {
    return NextResponse.json({ error: 'We could not save your testimony right now. Please try again shortly.' }, { status: 503 });
  }
}
