// Path: lib/rate-limit.ts
// Simple in-memory limiter. It works per running server instance, so treat it as a first line of defence.
// For a hard limit across all instances, add a rate-limit rule in the Vercel Firewall as well.
const hits = new Map<string, number[]>();

function fresh(key: string, windowMs: number) {
  const now = Date.now();
  const list = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (list.length) hits.set(key, list); else hits.delete(key);
  return list;
}
export function clientIp(req: Request) {
  return (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown';
}
export function isLimited(key: string, max: number, windowMs: number) { return fresh(key, windowMs).length >= max; }
export function record(key: string, windowMs: number) {
  if (hits.size > 5000) hits.clear();
  const list = fresh(key, windowMs); list.push(Date.now()); hits.set(key, list);
}
export function clear(key: string) { hits.delete(key); }