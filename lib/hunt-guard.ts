// Path: lib/hunt-guard.ts
// Safety rules for HUNT outreach: never email the same address twice, never email addresses
// that already bounced, and send slowly. The slot reservation is atomic in the database, so
// many requests arriving together cannot all slip through (this is what let a burst of 16
// emails go out in 35 seconds before).
import { createHash } from 'node:crypto';
import { db } from './backend';

/** Lower-case, strip "Name <...>" wrappers, and fold Gmail dots / +tags so duplicates match. */
export function normalizeEmail(raw: string): string {
  let value = String(raw || '').trim().toLowerCase();
  const angle = value.match(/<([^>]+)>/);
  if (angle) value = angle[1].trim();
  const at = value.lastIndexOf('@');
  if (at < 1) return value;
  let local = value.slice(0, at);
  let domain = value.slice(at + 1);
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    local = local.split('+')[0].replace(/\./g, '');
    domain = 'gmail.com';
  }
  return local + '@' + domain;
}

const hash = (email: string) => createHash('sha256').update(normalizeEmail(email)).digest('hex');

// SHA-256 of addresses that were already emailed by hand from Gmail, or that bounced.
// Hashed on purpose: this repository is public and these are other people's addresses.
const DO_NOT_EMAIL = new Set([
  '77b972a913ad48c038cb236e9251b85c0c2072b810da6719157e6a817027cb6a',
  'edd98ea91863cfd17ae439822c6af476b7d3f4fed3c6cc52e2f960802b81e2d9',
  '803f7c39edb13fe3cbf57317e399a0f7c39f95a039e872343cf183e26dcaf0ae',
  '402ef7307a614f9a81874b14b995068825307b3d8effe320d7e6480bb564a219',
  'b6f18abb2ac81de7d32f8ecc5ecc2e633aa6c1b95304ca1e284a770f91dc3ee2',
  '25af25219eb6352420b639a76452b6c2a8ba29b612e974e3a81f125fd3b161a6',
  '7afe4a119b0975e24268d9605d339e22bdc30f8e50fd58346ff5e4dafaf3f858',
  'c2d3642ad5a5db28efb18538a56b3d95407e65a06bdd97e89b82c60964543b06',
  '20c4e973c2f86fbe1c082d2dff1c28a05c98f529f08e8b2238a1a6631183c69a',
  'eddab04c75dc15a42908ae508498945bc8ca060a7265f7809940480c6e89a28e',
  'ad3e5c831b4b242b71c14646cc06b6aa04d72412ee22fd288b362abe038c673b',
  '675d29da5c2520dec2f80a2f47302759e95d32218bb194c1ac4678abd50aedc3',
  '68e4e2f619a2555bd039cf9637472d212dbc416dd6c292df5e2b27ba211f9466',
  '8ad2e28310ce9ad964fa62c6bb75f3eff3fb529620e9a9650cb747bbddb7b106',
  '70c3ff8dd982941bb014b16d53e249a96bd450e674fd581719760542f2e1e3ef',
  '8142bf4a0bc137fc824320c4e59f1e1ffa53c9635b529ecc6d9639774f087857',
  '4d6f0dafa851f59f68c11b15c460b79ccd62648ec2398d8ded4ffaabae8b2a84',
  '5acef26c4df069cea3b75a718bbc4a544d71a0f9393f341958b4c16ca225a9dd',
  '893c172a6a2b4c070be1baced7c03b0452ccbf7ae006172b0ac38ee10f8f4b0f',
  '99b8c326ae761da25463ead3484954927689e965e91603eec86b546b9617d3a2',
  'f24e7c30e77067a13a2574fabee1c0d930a3f2628f49f63679b1e6ab1a19dcc2',
]);

export const isDoNotEmail = (email: string) => DO_NOT_EMAIL.has(hash(email));

/**
 * True when Resend's own send history already shows an email to this address (from any tool).
 * Best effort: if Resend cannot be reached, this returns false and the other checks still apply.
 */
export async function alreadyEmailedViaResend(apiKey: string, email: string): Promise<boolean> {
  const want = normalizeEmail(email);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    let after = '';
    for (let page = 0; page < 5; page++) {
      const response = await fetch('https://api.resend.com/emails?limit=100' + (after ? '&after=' + encodeURIComponent(after) : ''), {
        headers: { Authorization: 'Bearer ' + apiKey }, cache: 'no-store', signal: controller.signal,
      });
      if (!response.ok) return false;
      const body = await response.json().catch(() => ({}));
      const items: any[] = Array.isArray(body?.data) ? body.data : [];
      for (const item of items) {
        if (String(item?.last_event || '') === 'canceled') continue;
        const recipients: unknown[] = Array.isArray(item?.to) ? item.to : [item?.to];
        if (recipients.some((address) => normalizeEmail(String(address || '')) === want)) return true;
      }
      if (!body?.has_more || !items.length) break;
      after = String(items[items.length - 1].id || '');
      if (!after) break;
    }
  } catch {
    // Fail open: the HUNT history and do-not-email checks above still protect each send.
  } finally {
    clearTimeout(timer);
  }
  return false;
}

const QUEUE_KEY = 'hunt_queue_state';
const MIN_GAP_MS = 5 * 60_000;
const MAX_GAP_MS = 9 * 60_000;
const MAX_AHEAD_MS = 12 * 60 * 60_000;
type QueueState = { nextAt?: string; day?: string; count?: number };

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Reserve the next send time. Each reservation is a compare-and-swap on one database row,
 * so concurrent requests each get a different slot 5-9 minutes apart, and the daily limit
 * is counted in the same atomic step.
 */
export async function reserveSendSlot(dailyLimit: number): Promise<{ at: Date } | { error: string; status: number }> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const rows = await db<Array<{ value: QueueState }>>('site_settings?key=eq.' + QUEUE_KEY + '&select=value&limit=1');
    const state: QueueState = rows[0]?.value || {};
    const now = Date.now();
    const slot = Math.max(now + 60_000, Date.parse(state.nextAt || '') || 0);
    if (slot - now > MAX_AHEAD_MS) {
      return { error: 'The HUNT send queue is full for now. Emails are spaced 5-9 minutes apart. Try again later.', status: 429 };
    }
    const day = new Date(slot).toISOString().slice(0, 10);
    const used = state.day === day ? Number(state.count) || 0 : 0;
    if (used >= dailyLimit) {
      return { error: 'Daily sending limit reached (' + dailyLimit + ' emails). Keep it low while the new domain builds a good name. Try again tomorrow.', status: 429 };
    }
    const next: QueueState = {
      nextAt: new Date(slot + MIN_GAP_MS + Math.random() * (MAX_GAP_MS - MIN_GAP_MS)).toISOString(),
      day,
      count: used + 1,
    };
    const stamp = new Date().toISOString();
    let won = false;
    if (!rows.length) {
      const created = await db<any[]>('site_settings?on_conflict=key', {
        method: 'POST', headers: { Prefer: 'resolution=ignore-duplicates,return=representation' },
        body: JSON.stringify({ key: QUEUE_KEY, value: next, updated_at: stamp }),
      });
      won = Array.isArray(created) && created.length > 0;
    } else {
      const guard = state.nextAt ? '&value->>nextAt=eq.' + encodeURIComponent(state.nextAt) : '';
      const updated = await db<any[]>('site_settings?key=eq.' + QUEUE_KEY + guard, {
        method: 'PATCH', headers: { Prefer: 'return=representation' },
        body: JSON.stringify({ value: next, updated_at: stamp }),
      });
      won = Array.isArray(updated) && updated.length > 0;
    }
    if (won) return { at: new Date(slot) };
    await sleep(100 + Math.random() * 250);
  }
  return { error: 'HUNT is busy. Please try again in a moment.', status: 503 };
}
