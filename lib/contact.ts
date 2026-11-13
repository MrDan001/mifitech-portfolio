// Path: lib/contact.ts

// Owner & Site Configuration
export const CONTACT_EMAIL = "officialsafebase@gmail.com";
// Vercel redirects the apex domain to www; keep every canonical URL on that final host.
export const SITE_URL = 'https://www.mifitech.top';

// WhatsApp Configuration
export const WHATSAPP_NUMBER = '2349067859200';
export const WHATSAPP_DISPLAY = '+234 906 785 9200';
export const whatsappLink = (text: string) => 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);