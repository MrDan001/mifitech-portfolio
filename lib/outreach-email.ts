// Path: lib/outreach-email.ts
// Turns a plain-text outreach draft into a simple, personal-looking HTML email.
// Link-only lines ("https://..." or "Label: https://...") become buttons.
// No images, no tracking pixels.

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char] || char);

function buttonFor(url: string): { label: string; color: string } {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    if (host === 'wa.me' || host.endsWith('whatsapp.com')) return { label: 'Chat with Us on WhatsApp', color: '#25D366' };
    if (host === 'mifitech.top') return { label: 'Visit MifiTech Website', color: '#0b5fff' };
    return { label: host, color: '#0b5fff' };
  } catch {
    return { label: url, color: '#0b5fff' };
  }
}

function button(url: string): string {
  const { label, color } = buttonFor(url);
  return '<a href="' + escapeHtml(url) + '" style="display:inline-block;background:' + color + ';color:#ffffff;text-decoration:none;font-weight:bold;padding:11px 20px;border-radius:6px;margin:0 8px 8px 0">' + escapeHtml(label) + '</a>';
}

// Matches a line that is only a URL, optionally prefixed with "Label:".
const LINK_LINE = /^\s*(?:[A-Za-z][A-Za-z ]{0,30}:\s*)?(https?:\/\/[^\s<>"']+)\s*$/;

function linkify(line: string): string {
  const parts = line.split(/(https?:\/\/[^\s<>"']+)/g);
  return parts.map((part, index) => {
    if (index % 2 === 0) return escapeHtml(part);
    const url = part.replace(/[.,;:!?)]+$/, '');
    const trailing = part.slice(url.length);
    return '<a href="' + escapeHtml(url) + '" style="color:#0b5fff">' + escapeHtml(buttonFor(url).label) + '</a>' + escapeHtml(trailing);
  }).join('');
}

export function draftToHtml(draft: string): string {
  const blocks = draft.replace(/\r\n/g, '\n').split(/\n{2,}/);
  const body = blocks.map((block) => {
    const lines = block.split('\n');
    const links = lines.map((line) => line.match(LINK_LINE)?.[1] || '');
    // A block made only of link lines becomes a row of buttons.
    if (lines.length && links.every(Boolean)) {
      return '<p style="margin:18px 0">' + links.map(button).join('') + '</p>';
    }
    return '<p style="margin:0 0 14px">' + lines.map(linkify).join('<br/>') + '</p>';
  }).join('');
  return '<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#222">' + body + '</div>';
}
