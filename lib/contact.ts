// Path: lib/contact.ts

// Owner & Site Configuration
export const CONTACT_EMAIL = "owner@mifitech.com"; // Replace with your actual email address
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://mifitech.top').replace(/\/$/, '');

// WhatsApp Configuration
export const WHATSAPP_NUMBER = '2349067859200';
export const WHATSAPP_DISPLAY = '+234 906 785 9200';
export const whatsappLink = (text: string) => 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);