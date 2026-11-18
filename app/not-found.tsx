import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for could not be found. Return to the MifiTech homepage.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
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
  );
}
