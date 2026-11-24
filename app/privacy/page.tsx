import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how MifiTech handles information submitted through project enquiries and client testimonials.',
  alternates: { canonical: '/privacy' },
  openGraph: { title: 'MifiTech Privacy Policy', description: 'How MifiTech handles information submitted through project enquiries and client testimonials.', type: 'website' },
};

export default function PrivacyPage() {
  return (
    <main className="guide-page">
      <article>
        <p className="admin-kicker">WEBSITE INFORMATION</p>
        <h1>Privacy policy</h1>
        <p className="guide-lead">This page explains what information MifiTech collects through project enquiries and client testimonial submissions, and how that information is used.</p>

        <h2>Information you provide</h2>
        <p>The project enquiry form may collect your name, email address, business name, project type and project description. The form also records the page address and, where applicable, the demo page that led to your enquiry.</p>

        <h2>Client testimonials and ratings</h2>
        <p>If you submit a testimonial, MifiTech may collect your name, rating, written feedback and any business name or role you choose to provide. An email address is optional and is kept for internal review; it is not shown with your public testimonial. Submissions remain private until an administrator approves them and chooses to display them. We only display submissions where you have confirmed permission for publication. You can request correction or removal by contacting us.</p>

        <h2>How the information is used</h2>
        <p>Project enquiry information is used to respond to you, understand project requirements, prepare proposals and manage follow-up conversations. Testimonial information is used to review, moderate and, with your permission, publish client feedback and ratings. Please do not submit passwords, payment card details or sensitive personal or medical information through either form.</p>

        <h2>Services that process the enquiry</h2>
        <p>Enquiry and testimonial records are stored in the MifiTech database hosted by Supabase. Email notifications are handled through Resend when configured. The website is hosted through Vercel. These providers process information as needed to provide their respective database, email and hosting functions.</p>

        <h2>Retention and deletion requests</h2>
        <p>Enquiry and testimonial information is kept for as long as it is reasonably needed to manage the enquiry, business relationship, published feedback and appropriate records. To ask about or request correction or deletion of an enquiry or testimonial, email <a href="mailto:officialsafebase@gmail.com">officialsafebase@gmail.com</a> and include enough context to identify the submission.</p>

        <h2>Security</h2>
        <p>Reasonable technical and organisational measures are used to protect the website and its enquiry records. No internet transmission or storage system can be guaranteed to be completely secure.</p>

        <h2>Changes to this policy</h2>
        <p>This policy may be updated when the website or its service providers change. The latest version will be published on this page.</p>

        <h2>Contact</h2>
        <p>Questions about this policy can be sent to <a href="mailto:officialsafebase@gmail.com">officialsafebase@gmail.com</a>.</p>
        <p><Link href="/">← Back to MifiTech</Link></p>
      </article>
    </main>
  );
}
