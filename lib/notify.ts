// Path: lib/notify.ts
// Sends an alert to the studio owner. Every channel is optional and only used when its settings exist.
import { CONTACT_EMAIL, SITE_URL } from './contact';

export type Alert = { title: string; lines: string[]; path?: string };
const env = (key: string) => (process.env[key] || '').trim();

async function send(url: string, init: RequestInit) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    if (!response.ok) throw new Error('status ' + response.status);
  } finally { clearTimeout(timer); }
}

export function alertChannels() {
  return { email: !!env('RESEND_API_KEY'), telegram: !!(env('TELEGRAM_BOT_TOKEN') && env('TELEGRAM_CHAT_ID')), whatsapp: !!(env('CALLMEBOT_PHONE') && env('CALLMEBOT_APIKEY')) };
}

/** Returns true when at least one channel delivered the alert. Never throws. */
export async function notifyOwner(alert: Alert): Promise<boolean> {
  const text = [alert.title, '', ...alert.lines, '', 'Open: ' + SITE_URL + (alert.path || '/admin')].join('\n');
  const jobs: Array<{ name: string; run: Promise<void> }> = [];
  const json = { 'Content-Type': 'application/json' };
  if (env('RESEND_API_KEY')) jobs.push({ name: 'email', run: send('https://api.resend.com/emails', { method: 'POST', headers: { ...json, Authorization: 'Bearer ' + env('RESEND_API_KEY') }, body: JSON.stringify({ from: env('ALERT_EMAIL_FROM') || 'MifiTech Alerts <onboarding@resend.dev>', to: [env('ALERT_EMAIL_TO') || CONTACT_EMAIL], subject: alert.title, text }) }) });
  if (env('TELEGRAM_BOT_TOKEN') && env('TELEGRAM_CHAT_ID')) jobs.push({ name: 'telegram', run: send('https://api.telegram.org/bot' + env('TELEGRAM_BOT_TOKEN') + '/sendMessage', { method: 'POST', headers: json, body: JSON.stringify({ chat_id: env('TELEGRAM_CHAT_ID'), text, disable_web_page_preview: true }) }) });
  if (env('CALLMEBOT_PHONE') && env('CALLMEBOT_APIKEY')) jobs.push({ name: 'whatsapp', run: send('https://api.callmebot.com/whatsapp.php?phone=' + encodeURIComponent(env('CALLMEBOT_PHONE')) + '&text=' + encodeURIComponent(text.slice(0, 900)) + '&apikey=' + encodeURIComponent(env('CALLMEBOT_APIKEY')), { method: 'GET' }) });
  if (!jobs.length) return false;
  const results = await Promise.allSettled(jobs.map((j) => j.run));
  results.forEach((r, i) => { if (r.status === 'rejected') console.error('Owner alert failed on ' + jobs[i].name + ':', r.reason instanceof Error ? r.reason.message : 'unknown error'); });
  return results.some((r) => r.status === 'fulfilled');
}