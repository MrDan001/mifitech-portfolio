// Path: lib/contact.ts
export const WHATSAPP_NUMBER = '2349067859200';
export const WHATSAPP_DISPLAY = '+234 906 785 9200';
export const whatsappLink = (text: string) => 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);