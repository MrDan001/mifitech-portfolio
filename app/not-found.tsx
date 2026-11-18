import Link from 'next/link';
import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/site-content';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for could not be found. Return to the MifiTech homepage.',
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const content = await getSiteContent();

  return (
    <div className="mf-not-found-page">
    <main className="mf-not-found">
      <div className="mf-not-found-inner">
        <Link href="/" className="mf-not-found-brand" aria-label="MifiTech home">
          <span className="mf-not-found-mark">M</span><span>MifiTech<span className="mf-not-found-dot">.</span></span>
        </Link>
        <div className="mf-not-found-number" aria-hidden="true">404</div>
        <p className="mf-not-found-kicker">PAGE NOT FOUND</p>
        <h1>This page took a wrong turn.</h1>
        <p className="mf-not-found-copy">The address may be incorrect, or the page may have moved. Let’s get you back to the right place.</p>
        <Link href="/" className="mf-not-found-home">Back to MifiTech home <span aria-hidden="true">→</span></Link>
        <p className="mf-not-found-foot">Need something specific? Start again from the homepage.</p>
      </div>
      <style>{`
        .mf-not-found{min-height:100svh;display:grid;place-items:center;padding:32px 22px;background:#111b1d;color:#f4f3ed;font-family:Arial,Helvetica,sans-serif}
        .mf-not-found-inner{width:min(100%,760px);padding:clamp(30px,7vw,76px);border:1px solid #344345;border-radius:18px;background:radial-gradient(ellipse at 50% 0%,#26383a 0,transparent 54%),#172326;display:flex;flex-direction:column;align-items:center;text-align:center}
        .mf-not-found-brand{display:inline-flex;align-items:center;justify-content:center;gap:11px;color:#f4f3ed;text-decoration:none;font-size:22px;font-weight:800;letter-spacing:-1px}
        .mf-not-found-mark{display:grid;place-items:center;width:38px;height:38px;border-radius:10px;background:#c7f36b;color:#15201c;font-size:22px}
        .mf-not-found-dot{color:#c7f36b}
        .mf-not-found-number{margin:clamp(38px,7vw,64px) 0 12px;color:#c7f36b;font-size:clamp(88px,17vw,156px);font-weight:800;line-height:.82;letter-spacing:-.09em}
        .mf-not-found-kicker{margin:18px 0 14px;color:#c7f36b;font-size:11px;font-weight:800;letter-spacing:2px}
        .mf-not-found h1{max-width:620px;margin:0 auto;color:#f4f3ed;font-size:clamp(38px,7vw,70px);line-height:1;letter-spacing:-3.5px}
        .mf-not-found-copy{max-width:500px;margin:22px auto 30px;color:#b6c3c0;font-size:16px;line-height:1.8}
        .mf-not-found-home{display:inline-flex;align-items:center;justify-content:center;gap:24px;padding:15px 19px;border-radius:7px;background:#c7f36b;color:#15201c;text-decoration:none;font-size:14px;font-weight:800;transition:transform .2s ease,background .2s ease}
        .mf-not-found-home:hover{background:#d7ff8b;transform:translateY(-2px)}
        .mf-not-found-foot{margin:42px 0 0;color:#82918d;font-size:12px;line-height:1.6}
        @media(max-width:520px){.mf-not-found-inner{padding:34px 22px}.mf-not-found h1{letter-spacing:-2px}.mf-not-found-copy{font-size:14px}.mf-not-found-foot{margin-top:34px}}
        @media(prefers-reduced-motion:reduce){.mf-not-found-home{transition:none}}
      `}</style>
    </main>
    <footer className="mf-site-footer">
      <div className="mf-site-footer-inner">
        <span className="mf-site-footer-brand">
          <img src="/brand/logo-b-mark.svg" alt="" width={24} height={24} />
          © {new Date().getFullYear()} MifiTech. {content.footer.tagline}
        </span>
        <nav aria-label="Footer navigation">
          {content.navigation.slice(0, 3).map((item, index) => (
            <Link key={item.label + index} href={item.href}>{item.label}</Link>
          ))}
          <Link href="/about">About MifiTech</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
    <style>{`
      .mf-not-found-page{min-height:100svh;display:flex;flex-direction:column;background:#111b1d}
      .mf-not-found{flex:1;min-height:calc(100svh - 92px)}
      .mf-site-footer{padding:28px 22px;border-top:1px solid #344345;background:#111b1d;color:#82918d;font-family:Arial,Helvetica,sans-serif;font-size:13px}
      .mf-site-footer-inner{width:min(100%,1120px);margin:0 auto;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px}
      .mf-site-footer-brand{display:inline-flex;align-items:center;gap:10px;line-height:1.6}
      .mf-site-footer-brand img{display:block;flex:0 0 24px}
      .mf-site-footer nav{display:flex;align-items:center;flex-wrap:wrap;gap:18px}
      .mf-site-footer a{color:#b6c3c0;text-decoration:none;transition:color .2s ease}
      .mf-site-footer a:hover{color:#c7f36b}
      @media(max-width:600px){.mf-site-footer-inner{align-items:flex-start;flex-direction:column}.mf-site-footer nav{gap:14px}}
      @media(prefers-reduced-motion:reduce){.mf-site-footer a{transition:none}}
    `}</style>
    </div>
  );
}
