import type { Metadata } from 'next';
import Link from 'next/link';
import ThemeToggle from '../components/ThemeToggle';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how MifiTech handles information submitted through the website enquiry form.',
  openGraph: { title: 'MifiTech Privacy Policy', description: 'How MifiTech handles information submitted through the website enquiry form.', type: 'website' },
};

export default function PrivacyPage() {
  return (
    <main className="guide-page">
      <header>
        <Link href="/" className="admin-brand">MifiTech<span>.</span></Link>
        <div className="guide-header-actions"><ThemeToggle /><Link href="/#contact">Contact the studio</Link></div>
      </header>
      <article>
        <p className="admin-kicker">WEBSITE INFORMATION</p>
        <h1>Privacy policy</h1>
        <p className="guide-lead">This page explains what information the MifiTech website collects when you submit a project enquiry and how that information is used.</p>

        <h2>Information you provide</h2>
        <p>The project enquiry form may collect your name, email address, business name, project type and project description. The form also records the page address and, where applicable, the demo page that led to your enquiry.</p>

        <h2>How the information is used</h2>
        <p>Information is used to respond to enquiries, understand project requirements, prepare proposals and manage follow-up conversations. Please do not submit passwords, payment card details or sensitive personal or medical information through the enquiry form.</p>

        <h2>Services that process the enquiry</h2>
        <p>Enquiry records are stored in the portfolio database hosted by Supabase. The form also uses FormSubmit to deliver an email notification. The website is hosted through Vercel. These services process information as needed to provide their respective hosting, database and email functions.</p>

        <h2>Retention and deletion requests</h2>
        <p>Enquiry information is kept for as long as it is reasonably needed to respond to the enquiry, manage the business relationship and maintain appropriate records. To ask about or request deletion of an enquiry record, email <a href="mailto:officialsafebase@gmail.com">officialsafebase@gmail.com</a> and include enough context to identify the submission.</p>

        <h2>Security</h2>
        <p>Reasonable technical and organisational measures are used to protect the website and its enquiry records. No internet transmission or storage system can be guaranteed to be completely secure.</p>

        <h2>Admin access</h2>
        <p>The private administration area uses a protected, HTTP-only session cookie to keep an authorised administrator signed in. This cookie is separate from the public project enquiry form.</p>

        <h2>Changes to this policy</h2>
        <p>This policy may be updated when the website or its service providers change. The latest version will be published on this page.</p>

        <h2>Contact</h2>
        <p>Questions about this policy can be sent to <a href="mailto:officialsafebase@gmail.com">officialsafebase@gmail.com</a>.</p>
        <p><Link href="/">← Back to MifiTech</Link></p>
      </article>
      <footer>© {new Date().getFullYear()} MifiTech · <Link href="/">Home</Link></footer>
    </main>
  );
}
