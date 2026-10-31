import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';
import { cookies } from 'next/headers';

const base = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/$/, '');
const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

export async function db<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!base || !key) throw new Error('Configure SUPABASE_URL and a server-only SUPABASE_SECRET_KEY (or legacy SUPABASE_SERVICE_ROLE_KEY).');
  const r = await fetch(`${base}/rest/v1/${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  });
  const body = await r.text();
  if (!r.ok) throw new Error(body || `Database error ${r.status}`);
  return (body ? JSON.parse(body) : null) as T;
}

const secret = () => process.env.ADMIN_SESSION_SECRET || '';
const sign = (v: string) => createHmac('sha256', secret()).update(v).digest('hex');

export function passwordOK(v: string) {
  const p = process.env.ADMIN_PASSWORD || '';
  const a = Buffer.from(v), b = Buffer.from(p);
  return !!p && a.length === b.length && timingSafeEqual(a, b);
}

export function sessionValue() {
  const exp = String(Math.floor(Date.now() / 1000) + 604800);
  return exp + '.' + sign(exp);
}

export async function isAdmin() {
  if (!secret()) return false;
  const value = (await cookies()).get('mifi_admin')?.value || '';
  const [exp, sig] = value.split('.');
  if (!exp || Number(exp) < Math.floor(Date.now() / 1000)) return false;
  const a = Buffer.from(sig || ''), b = Buffer.from(sign(exp));
  return a.length === b.length && timingSafeEqual(a, b);
}

export const seoDefaults = {
  title: 'MifiTech | Website Design & Development in Nigeria',
  description: 'MifiTech designs and builds professional business websites, online stores and custom web applications in Nigeria.',
  keywords: ['website design Nigeria', 'website development Nigeria', 'how to build a website', 'web designer Nigeria'],
  canonicalUrl: 'https://mifitech-portfolio.vercel.app',
  ogTitle: 'MifiTech — Websites & Digital Products',
  ogDescription: 'Thoughtful websites and useful digital products, built around your business.',
};

export async function getSeo() {
  try {
    const rows = await db<Array<{ value: Record<string, unknown> }>>('site_settings?key=eq.seo&select=value&limit=1');
    return { ...seoDefaults, ...(rows[0]?.value || {}) };
  } catch {
    return seoDefaults;
  }
}

export async function uploadPublicImage(file: File): Promise<string> {
  if (!base || !key) throw new Error('Configure the portfolio Supabase URL and server-only secret key first.');
  const mimeToExtension: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/avif': 'avif',
    'image/gif': 'gif',
  };
  const extension = mimeToExtension[file.type];
  if (!extension) throw new Error('Use a JPG, PNG, WebP, AVIF or GIF image.');
  if (file.size <= 0 || file.size > 5 * 1024 * 1024) throw new Error('Image must be 5 MB or smaller.');
  const objectPath = 'website/' + randomUUID() + '.' + extension;
  const response = await fetch(`${base}/storage/v1/object/mifitech-media/${objectPath}`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': file.type,
      'x-upsert': 'false',
    },
    body: await file.arrayBuffer(),
    cache: 'no-store',
  });
  const body = await response.text();
  if (!response.ok) throw new Error(body || 'Image upload failed.');
  return `${base}/storage/v1/object/public/mifitech-media/${objectPath}`;
}
