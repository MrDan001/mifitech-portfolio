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
  if (env('RESEND_API_KEY')) jobs.push({ name: 'email', run: send('https://api.resend.com/emails', { method: 'POST', headers: { ...json, Authorization: 'Bearer ' + env('RESEND_API_KEY') }, body: JSON.stringify({ from: env('EMAIL_FROM') || env('ALERT_EMAIL_FROM') || 'MifiTech <hello@mifitech.top>', to: [env('ALERT_EMAIL_TO') || CONTACT_EMAIL], reply_to: env('CONTACT_REPLY_TO') || CONTACT_EMAIL, subject: alert.title, text }) }) });
  if (env('TELEGRAM_BOT_TOKEN') && env('TELEGRAM_CHAT_ID')) jobs.push({ name: 'telegram', run: send('https://api.telegram.org/bot' + env('TELEGRAM_BOT_TOKEN') + '/sendMessage', { method: 'POST', headers: json, body: JSON.stringify({ chat_id: env('TELEGRAM_CHAT_ID'), text, disable_web_page_preview: true }) }) });
  if (env('CALLMEBOT_PHONE') && env('CALLMEBOT_APIKEY')) jobs.push({ name: 'whatsapp', run: send('https://api.callmebot.com/whatsapp.php?phone=' + encodeURIComponent(env('CALLMEBOT_PHONE')) + '&text=' + encodeURIComponent(text.slice(0, 900)) + '&apikey=' + encodeURIComponent(env('CALLMEBOT_APIKEY')), { method: 'GET' }) });
  if (!jobs.length) return false;
  const results = await Promise.allSettled(jobs.map((j) => j.run));
  results.forEach((r, i) => { if (r.status === 'rejected') console.error('Owner alert failed on ' + jobs[i].name + ':', r.reason instanceof Error ? r.reason.message : 'unknown error'); });
  return results.some((r) => r.status === 'fulfilled');
}

/** Send a receipt to the person who submitted a project enquiry. */
export async function sendEnquiryAcknowledgement(input: {
  name: string;
  email: string;
  projectType: string;
  details: string;
}): Promise<boolean> {
  const apiKey = env('RESEND_API_KEY');
  if (!apiKey) {
    console.error('Customer acknowledgement not sent: RESEND_API_KEY is not configured.');
    return false;
  }

  const from = env('EMAIL_FROM') || env('ALERT_EMAIL_FROM') || 'MifiTech <hello@mifitech.top>';
  const replyTo = env('CONTACT_REPLY_TO') || CONTACT_EMAIL;
  const safe = (value: string) => value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char] || char);
  const name = safe(input.name);
  const projectType = safe(input.projectType);
  const details = safe(input.details);
  const text = [
    'Hello ' + input.name + ',',
    '',
    'Thank you for contacting MifiTech. We have received your project enquiry and our team will review the details.',
    'We aim to reply within one working day.',
    '',
    'Enquiry type: ' + input.projectType,
    'Your message:',
    input.details,
    '',
    'If you need to add anything, simply reply to this email.',
    '',
    'MifiTech',
    SITE_URL,
  ].join('\n');
  const html = '<div style="margin:0;padding:32px 16px;background:#f5f5f3;font-family:Arial,sans-serif;color:#20211f">' +
    '<div style="max-width:600px;margin:0 auto;padding:32px;background:#fff;border-radius:16px">' +
    '<p style="font-size:13px;font-weight:700;letter-spacing:2px;color:#68715d">MIFITECH</p>' +
    '<h1 style="font-size:25px;margin:24px 0 12px">We have received your enquiry.</h1>' +
    '<p>Hello ' + name + ',</p>' +
    '<p>Thank you for contacting MifiTech. We have received your project enquiry and our team will review the details.</p>' +
    '<p>We aim to reply within one working day.</p>' +
    '<div style="margin:24px 0;padding:18px;background:#f6f7f3;border-radius:10px">' +
    '<p style="margin:0 0 8px"><strong>Enquiry type:</strong> ' + projectType + '</p>' +
    '<p style="margin:0 0 8px"><strong>Your message:</strong></p><p style="white-space:pre-wrap;margin:0">' + details + '</p></div>' +
    '<p>If you need to add anything, simply reply to this email.</p>' +
    '<p style="margin-top:28px">MifiTech<br/><a href="' + SITE_URL + '" style="color:#536443">' + SITE_URL + '</a></p>' +
    '</div></div>';

  try {
    await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey },
      body: JSON.stringify({
        from,
        to: [input.email],
        reply_to: replyTo,
        subject: 'We have received your MifiTech enquiry',
        text,
        html,
      }),
    });
    return true;
  } catch (error) {
    console.error('Customer acknowledgement failed:', error instanceof Error ? error.message : 'unknown error');
    return false;
  }
}
