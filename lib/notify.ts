// Path: lib/notify.ts
// Transactional email and optional owner-alert channels.
import { CONTACT_EMAIL, SITE_URL } from './contact';

export type Alert = { title: string; lines: string[]; path?: string };
const env = (key: string) => (process.env[key] || '').trim();
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] || char);

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
  const lines = [alert.title, '', ...alert.lines, '', SITE_URL];
  const text = lines.join('\n');
  const html = '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#222">' +
    '<p><strong>' + escapeHtml(alert.title) + '</strong></p>' +
    alert.lines.map((line) => line ? '<p>' + escapeHtml(line) + '</p>' : '<br/>').join('') +
    '<p>' + escapeHtml(SITE_URL) + '</p></div>';
  const jobs: Array<{ name: string; run: Promise<void> }> = [];
  const json = { 'Content-Type': 'application/json' };
  if (env('RESEND_API_KEY')) jobs.push({ name: 'email', run: send('https://api.resend.com/emails', {
    method: 'POST',
    headers: { ...json, Authorization: 'Bearer ' + env('RESEND_API_KEY') },
    body: JSON.stringify({
      from: env('EMAIL_FROM') || env('ALERT_EMAIL_FROM') || 'MifiTech <hello@mifitech.top>',
      to: [env('ALERT_EMAIL_TO') || CONTACT_EMAIL],
      reply_to: env('CONTACT_REPLY_TO') || CONTACT_EMAIL,
      subject: alert.title,
      text,
      html,
    }),
  }) });
  if (env('TELEGRAM_BOT_TOKEN') && env('TELEGRAM_CHAT_ID')) jobs.push({ name: 'telegram', run: send('https://api.telegram.org/bot' + env('TELEGRAM_BOT_TOKEN') + '/sendMessage', { method: 'POST', headers: json, body: JSON.stringify({ chat_id: env('TELEGRAM_CHAT_ID'), text, disable_web_page_preview: true }) }) });
  if (env('CALLMEBOT_PHONE') && env('CALLMEBOT_APIKEY')) jobs.push({ name: 'whatsapp', run: send('https://api.callmebot.com/whatsapp.php?phone=' + encodeURIComponent(env('CALLMEBOT_PHONE')) + '&text=' + encodeURIComponent(text.slice(0, 900)) + '&apikey=' + encodeURIComponent(env('CALLMEBOT_APIKEY')), { method: 'GET' }) });
  if (!jobs.length) return false;
  const results = await Promise.allSettled(jobs.map((job) => job.run));
  results.forEach((result, index) => { if (result.status === 'rejected') console.error('Owner alert failed on ' + jobs[index].name + ':', result.reason instanceof Error ? result.reason.message : 'unknown error'); });
  return results.some((result) => result.status === 'fulfilled');
}

/** Send a concise receipt to the person who submitted a project enquiry. */
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
  const name = escapeHtml(input.name);
  const projectType = escapeHtml(input.projectType);
  const details = escapeHtml(input.details);
  const text = [
    'Hello ' + input.name + ',',
    '',
    'Thank you for contacting MifiTech. We have received your project enquiry.',
    'We will review the details and get back to you.',
    '',
    'Enquiry type: ' + input.projectType,
    'Your message:',
    input.details,
    '',
    'To add information, simply reply to this email.',
    '',
    'MifiTech',
    SITE_URL,
  ].join('\n');
  const html = '<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#222">' +
    '<p>Hello ' + name + ',</p>' +
    '<p>Thank you for contacting MifiTech. We have received your project enquiry.</p>' +
    '<p>We will review the details and get back to you.</p>' +
    '<p><strong>Enquiry type:</strong> ' + projectType + '</p>' +
    '<p><strong>Your message:</strong></p><p style="white-space:pre-wrap">' + details + '</p>' +
    '<p>To add information, simply reply to this email.</p>' +
    '<p>MifiTech<br/>' + escapeHtml(SITE_URL) + '</p></div>';

  try {
    await send('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + apiKey },
      body: JSON.stringify({
        from,
        to: [input.email],
        reply_to: replyTo,
        subject: 'We received your MifiTech project enquiry',
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
