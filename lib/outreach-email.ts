// Path: lib/outreach-email.ts
// Turns a plain-text outreach draft into a simple, clean HTML email.
// Links show friendly text instead of raw URLs. No images, no tracking pixels.

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] || char);

function linkLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host === 'wa.me' || host.endsWith('whatsapp.com')) return 'Chat with us on WhatsApp';
    if (host === 'mifitech.top') return 'Visit mifitech.top';
    return host;
  } catch {
    return url;
  }
}

function linkify(line: string): string {
  // "WhatsApp: https://wa.me/..." becomes just the WhatsApp link.
  const cleaned = line.replace(/^\s*WhatsApp:\s*(?=https?:\/\/)/i, '');
  const parts = cleaned.split(/(https?:\/\/[^\s<>"']+)/g);
  return parts.map((part, index) => {
    if (index % 2 === 0) return escapeHtml(part);
    const url = part.replace(/[.,;:!?)]+$/, '');
    const trailing = part.slice(url.length);
    return '<a href="' + escapeHtml(url) + '" style="color:#0b5fff;text-decoration:underline">' + escapeHtml(linkLabel(url)) + '</a>' + escapeHtml(trailing);
  }).join('');
}

export function draftToHtml(draft: string): string {
  const blocks = draft.replace(/\r\n/g, '\n').split(/\n{2,}/);
  const body = blocks.map((block) => {
    const lines = block.split('\n').map(linkify).join('<br/>');
    return '<p style="margin:0 0 14px">' + lines + '</p>';
  }).join('');
  return '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#222">' + body + '</div>';
}
