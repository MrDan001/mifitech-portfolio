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
  const footerLinks = content.navigation.filter((item) => !item.href.startsWith('/#')).slice(0, 4);
  const year = new Date().getFullYear();

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
      </main>

      <footer className="mf-site-footer">
        <div className="mf-site-footer-main">
          <div className="mf-site-footer-brand-column">
            <Link href="/" className="mf-site-footer-logo" aria-label="MifiTech homepage">
              <img src="/brand/logo-b-mark.svg" alt="" width={34} height={34} />
              <span>MifiTech<span>.</span></span>
            </Link>
            <p className="mf-site-footer-intro">A hands-on digital studio building thoughtful websites, online stores and business software for real-world work.</p>
            <a className="mf-site-footer-email" href="mailto:officialsafebase@gmail.com">officialsafebase@gmail.com <span aria-hidden="true">↗</span></a>
            <div className="mf-site-footer-socials" aria-label="Social media">
              <a href="https://www.instagram.com/mifi.tech/" target="_blank" rel="noreferrer">Instagram <span aria-hidden="true">↗</span></a>
              <a href="https://www.facebook.com/profile.php?id=61593251797989" target="_blank" rel="noreferrer">Facebook <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <nav className="mf-site-footer-links" aria-label="Explore MifiTech">
            <h2>Explore</h2>
            <Link href="/">Home</Link>
            {footerLinks.map((item, index) => (
              <Link key={item.label + index} href={item.href}>{item.label}</Link>
            ))}
            <Link href="/about">About MifiTech</Link>
            <Link href="/blog">Insights & articles</Link>
          </nav>

          <div className="mf-site-footer-contact">
            <p className="mf-site-footer-eyebrow">HAVE A PROJECT IN MIND?</p>
            <h2>Let’s make your next move count.</h2>
            <p>Tell us what you’re building. We’ll help you find a clear, practical way to bring it online.</p>
            <a className="mf-site-footer-cta" href="https://wa.me/2349067859200" target="_blank" rel="noreferrer">Start a conversation <span aria-hidden="true">↗</span></a>
            <span className="mf-site-footer-phone">WhatsApp · +234 906 785 9200</span>
          </div>
        </div>

        <div className="mf-site-footer-bottom">
          <p>© {year} MifiTech. {content.footer.tagline}</p>
          <div>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/#contact">Contact</Link>
            <a href="/">Back to top ↑</a>
          </div>
        </div>
      </footer>

      <style>{`
        .mf-not-found-page{min-height:100svh;display:flex;flex-direction:column;background:#111b1d}
        .mf-not-found{flex:1;min-height:calc(100svh - 92px);display:grid;place-items:center;padding:32px 22px;background:#111b1d;color:#f4f3ed;font-family:Arial,Helvetica,sans-serif}
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

        .mf-site-footer{padding:clamp(52px,7vw,84px) 24px 22px;border-top:1px solid #344345;background:#0c1517;color:#b6c3c0;font-family:Arial,Helvetica,sans-serif}
        .mf-site-footer-main{width:min(100%,1160px);margin:0 auto;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(150px,.65fr) minmax(280px,1fr);gap:clamp(36px,6vw,88px);padding-bottom:58px}
        .mf-site-footer-logo{display:inline-flex;align-items:center;gap:12px;color:#f4f3ed;text-decoration:none;font-size:25px;font-weight:800;letter-spacing:-1.2px}
        .mf-site-footer-logo img{display:block;object-fit:contain}
        .mf-site-footer-logo span span{color:#c7f36b}
        .mf-site-footer-intro{max-width:340px;margin:22px 0 20px;color:#98a9a5;font-size:14px;line-height:1.85}
        .mf-site-footer-email{display:inline-flex;align-items:center;gap:10px;color:#e8eee8;text-decoration:none;font-size:14px;font-weight:700}
        .mf-site-footer-email span,.mf-site-footer-socials span{color:#c7f36b}
        .mf-site-footer-socials{display:flex;flex-wrap:wrap;gap:18px;margin-top:24px}
        .mf-site-footer-socials a{color:#98a9a5;text-decoration:none;font-size:13px;transition:color .2s ease}
        .mf-site-footer-links{display:flex;flex-direction:column;align-items:flex-start;gap:15px}
        .mf-site-footer-links h2{margin:7px 0 8px;color:#f4f3ed;font-size:14px;font-weight:800}
        .mf-site-footer-links a,.mf-site-footer-bottom a{color:#98a9a5;text-decoration:none;font-size:13px;transition:color .2s ease}
        .mf-site-footer-contact{align-self:start;padding:28px;border:1px solid #344345;border-radius:14px;background:linear-gradient(145deg,#19282a,#121e20)}
        .mf-site-footer-eyebrow{margin:0 0 14px;color:#c7f36b;font-size:10px;font-weight:800;letter-spacing:1.8px}
        .mf-site-footer-contact h2{max-width:300px;margin:0;color:#f4f3ed;font-size:clamp(25px,3vw,34px);line-height:1.08;letter-spacing:-1.3px}
        .mf-site-footer-contact>p:not(.mf-site-footer-eyebrow){margin:15px 0 22px;color:#aab9b5;font-size:13px;line-height:1.75}
        .mf-site-footer-cta{display:inline-flex;align-items:center;justify-content:space-between;gap:28px;padding:13px 16px;border-radius:7px;background:#c7f36b;color:#15201c;text-decoration:none;font-size:13px;font-weight:800;transition:transform .2s ease,background .2s ease}
        .mf-site-footer-cta:hover{background:#d7ff8b;transform:translateY(-2px)}
        .mf-site-footer-phone{display:block;margin-top:15px;color:#82918d;font-size:11px}
        .mf-site-footer-bottom{width:min(100%,1160px);margin:0 auto;padding-top:20px;border-top:1px solid #29383a;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
        .mf-site-footer-bottom p{margin:0;color:#82918d;font-size:12px;line-height:1.7}
        .mf-site-footer-bottom>div{display:flex;flex-wrap:wrap;gap:22px}
        .mf-site-footer a:hover{color:#c7f36b}
        @media(max-width:820px){.mf-site-footer-main{grid-template-columns:1fr 1fr;gap:42px}.mf-site-footer-brand-column{grid-column:1/-1}.mf-site-footer-intro{max-width:460px}.mf-site-footer-contact{grid-column:1/-1;max-width:none}}
        @media(max-width:560px){.mf-not-found{min-height:calc(100svh - 400px);padding:28px 16px}.mf-not-found-inner{padding:34px 22px}.mf-not-found h1{letter-spacing:-2px}.mf-not-found-copy{font-size:14px}.mf-not-found-foot{margin-top:34px}.mf-site-footer{padding:48px 20px 20px}.mf-site-footer-main{grid-template-columns:1fr;gap:38px;padding-bottom:38px}.mf-site-footer-brand-column,.mf-site-footer-contact{grid-column:auto}.mf-site-footer-contact{padding:23px}.mf-site-footer-bottom{align-items:flex-start;flex-direction:column;gap:13px}.mf-site-footer-bottom>div{gap:16px}}
        @media(prefers-reduced-motion:reduce){.mf-not-found-home,.mf-site-footer a{transition:none}}
      `}</style>
    </div>
  );
}
