// Path: app/components/WhatsAppButton.tsx
import { whatsappLink } from '@/lib/contact';
import './whatsapp.css';

export default function WhatsAppButton({ message }: { message: string }) {
  return (
    <a className="wa-float" href={whatsappLink(message)} target="_blank" rel="noreferrer" aria-label="Chat with MifiTech on WhatsApp">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#06301a" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z" /><path fill="#25d366" d="M8.4 7.4c.3-.5.7-.5 1-.5l.6 1.300c0 .3-.2.6-.5.9.6 1.200 1.700 2.200 3 2.900.3-.2.600-.5.900-.4l1.300.6c0 .4-.1.8-.6 1.100-1.600 1-4.400-.2-5.900-2.100-1.300-1.600-1.400-3.300-.8-3.800z" /></svg>
      <span>Chat on WhatsApp</span>
    </a>
  );
}