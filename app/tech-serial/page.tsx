// app/tech-serial/page.tsx

export default function TechSerialPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --secondary: #0F172A; --accent: #3B82F6; --accent-dim: rgba(59,130,246,0.10);
          --accent-glow: rgba(59,130,246,0.30); --accent-light: #93C5FD;
          --text: #F1F5F9; --muted: #94A3B8; --muted-2: #64748B;
          --border: rgba(255,255,255,0.07); --border-hover: rgba(59,130,246,0.25);
          --card-bg: rgba(30,41,59,0.55); --green: #34D399;
        }
        body { background: var(--secondary); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; line-height: 1.6; }
        body::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"); pointer-events: none; z-index: 9999; opacity: 0.5; }
        .bg-mesh { position: fixed; inset: 0; z-index: 0; background: radial-gradient(ellipse 70% 50% at 5% 0%, rgba(59,130,246,0.11) 0%, transparent 60%), radial-gradient(ellipse 50% 55% at 95% 90%, rgba(59,130,246,0.06) 0%, transparent 55%), var(--secondary); }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        section { position: relative; z-index: 1; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 64px; }

        /* HERO */
        .ts-hero { padding-top: 160px; padding-bottom: 80px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        .ts-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px 5px 8px; border-radius: 100px; border: 1px solid var(--accent-glow); background: var(--accent-dim); font-size: .70rem; font-weight: 600; letter-spacing: .10em; text-transform: uppercase; color: var(--accent); margin-top: -60px; margin-bottom: 28px; width: fit-content; animation: fadeUp .7s .05s ease both; }
        .ts-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; flex-shrink: 0; }
        .ts-headline { font-family: 'Syne', sans-serif; font-size: clamp(2.2rem, 4.5vw, 3.6rem); font-weight: 800; line-height: 1.0; letter-spacing: -.03em; animation: fadeUp .7s .18s ease both; }
        .ts-headline .accent { color: var(--accent); }
        .ts-sub { margin-top: 18px; font-size: 1rem; color: var(--muted); line-height: 1.75; font-weight: 300; max-width: 480px; animation: fadeUp .7s .30s ease both; }
        .ts-sub strong { color: var(--text); font-weight: 500; }

        /* Platform links */
        .ts-platforms { display: flex; flex-direction: column; gap: 10px; margin-top: 32px; animation: fadeUp .7s .40s ease both; }
        .platform-link {
          display: flex; align-items: center; gap: 14px; padding: 14px 18px;
          border-radius: 12px; border: 1px solid var(--border); background: var(--card-bg);
          text-decoration: none; transition: all .25s; backdrop-filter: blur(12px);
        }
        .platform-link:hover { border-color: var(--border-hover); transform: translateX(5px); }
        .platform-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0; }
        .platform-icon.yt { background: rgba(255,0,0,0.12); border: 1px solid rgba(255,0,0,0.25); }
        .platform-icon.tt { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); }
        .platform-icon.ig { background: rgba(225,48,108,0.12); border: 1px solid rgba(225,48,108,0.25); }
        .platform-icon.wa { background: rgba(37,211,102,0.12); border: 1px solid rgba(37,211,102,0.25); }
        .platform-info { flex: 1; min-width: 0; }
        .platform-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: .88rem; color: var(--text); }
        .platform-handle { font-size: .75rem; color: var(--muted); margin-top: 2px; }
        .platform-arrow { font-size: .78rem; color: var(--accent); flex-shrink: 0; }

        /* Hero right — featured card */
        .ts-featured-card {
          border-radius: 20px; border: 1px solid var(--border); background: var(--card-bg);
          backdrop-filter: blur(16px); overflow: hidden; animation: fadeUp .7s .25s ease both;
        }
        .ts-featured-thumb {
          width: 100%; aspect-ratio: 16/9; background: linear-gradient(135deg, rgba(59,130,246,0.15), rgba(15,23,42,0.8));
          display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;
        }
        .ts-featured-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .ts-play-btn {
          position: absolute; width: 56px; height: 56px; border-radius: 50%;
          background: rgba(59,130,246,0.9); border: 2px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(8px); cursor: pointer; transition: transform .2s;
        }
        .ts-play-btn:hover { transform: scale(1.1); }
        .ts-play-btn svg { margin-left: 3px; }
        .ts-featured-body { padding: 20px 22px; }
        .ts-featured-label { font-size: .65rem; font-weight: 700; letter-spacing: .10em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
        .ts-featured-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: .95rem; color: var(--text); line-height: 1.3; }
        .ts-featured-desc { font-size: .78rem; color: var(--muted); margin-top: 6px; line-height: 1.55; }

        /* WHAT IS section */
        .ts-about { padding: 0 0 80px; }
        .ts-about-inner {
          border-radius: 20px; border: 1px solid var(--border); background: var(--card-bg);
          backdrop-filter: blur(16px); padding: 56px 60px; display: grid;
          grid-template-columns: 1fr 1fr; gap: 64px; align-items: start;
        }
        .ts-about-left h2 { font-family: 'Syne', sans-serif; font-size: clamp(1.6rem, 2.8vw, 2.2rem); font-weight: 800; letter-spacing: -.025em; line-height: 1.1; margin-bottom: 20px; }
        .ts-about-left p { font-size: .9rem; color: var(--muted); line-height: 1.8; margin-bottom: 16px; }
        .ts-about-left p strong { color: var(--text); font-weight: 500; }
        .section-tag { display: inline-block; font-size: .70rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; }
        .ts-topics { display: flex; flex-direction: column; gap: 12px; }
        .ts-topic { display: flex; gap: 14px; padding: 16px 18px; border-radius: 10px; border: 1px solid var(--border); background: rgba(15,23,42,0.4); transition: all .2s; }
        .ts-topic:hover { border-color: var(--border-hover); transform: translateX(4px); }
        .ts-topic-icon { font-size: 1.2rem; flex-shrink: 0; width: 32px; text-align: center; }
        .ts-topic-text h4 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: .85rem; color: var(--text); margin-bottom: 3px; }
        .ts-topic-text p { font-size: .75rem; color: var(--muted); line-height: 1.5; }

        /* CTA */
        .ts-cta { padding: 0 0 120px; }
        .ts-cta-inner { border-radius: 20px; border: 1px solid var(--border); background: linear-gradient(135deg, rgba(30,41,59,.9), rgba(15,23,42,.95)); backdrop-filter: blur(20px); padding: 72px 80px; text-align: center; position: relative; overflow: hidden; }
        .ts-cta-inner::before { content: ''; position: absolute; top: -50%; left: 50%; transform: translateX(-50%); width: 60%; height: 250px; background: radial-gradient(ellipse, rgba(59,130,246,.12), transparent 70%); pointer-events: none; }
        .ts-cta-inner h2 { font-family: 'Syne', sans-serif; font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 800; letter-spacing: -.025em; margin-bottom: 14px; }
        .ts-cta-inner p { font-size: .9rem; color: var(--muted); max-width: 440px; margin: 0 auto 36px; line-height: 1.75; }
        .platform-btn-row { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
        .platform-btn { display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; border-radius: 8px; border: 1px solid var(--border); background: var(--card-bg); color: var(--text); text-decoration: none; font-size: .83rem; font-weight: 500; transition: all .2s; }
        .platform-btn:hover { border-color: var(--border-hover); transform: translateY(-2px); }

        footer { position: relative; z-index: 1; border-top: 1px solid var(--border); padding: 36px 64px; max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .footer-left p { font-size: .78rem; color: var(--muted-2); }
        .footer-left p span { color: var(--accent); }
        .footer-links { display: flex; gap: 28px; }
        .footer-links a { font-size: .78rem; color: var(--muted-2); text-decoration: none; }
        .footer-links a:hover { color: var(--text); }

        @media (max-width: 1024px) {
          .container { padding: 0 28px; }
          .ts-hero { grid-template-columns: 1fr; gap: 48px; }
          .ts-about-inner { grid-template-columns: 1fr; padding: 40px 32px; }
          .ts-cta-inner { padding: 52px 32px; }
          footer { padding: 28px; flex-direction: column; gap: 14px; text-align: center; }
        }
        @media (max-width: 640px) {
          .container { padding: 0 20px; }
          .ts-hero { padding-top: 130px; }
          .ts-headline { font-size: 2rem; }
          .ts-cta-inner { padding: 40px 20px; }
          footer { padding: 24px 20px; }
        }
      `}</style>

      <div className="bg-mesh" aria-hidden="true" />

      {/* HERO */}
      <section>
        <div className="container">
          <div className="ts-hero">
            <div>
              <div className="ts-eyebrow"><span className="dot" /> The Tech Serial</div>
              <h1 className="ts-headline">Tech explained.<br /><span className="accent">Simply.</span> Weekly.</h1>
              <p className="ts-sub">
                Short weekly videos breaking down <strong>tech concepts, tools, and trends</strong> in plain language — no jargon, no gatekeeping. If you can watch a 60-second clip, you can understand it.
              </p>

              <div className="ts-platforms">
                {[
                  { icon: '▶', cls: 'yt', name: 'YouTube',          handle: '@RexOrokumue', url: 'https://youtube.com' },
                  { icon: '♪', cls: 'tt', name: 'TikTok',            handle: '@RexOrokumue', url: 'https://tiktok.com' },
                  { icon: '◈', cls: 'ig', name: 'Instagram',         handle: '@RexOrokumue', url: 'https://instagram.com' },
                  { icon: '✆', cls: 'wa', name: 'WhatsApp Channel',  handle: 'The Tech Serial', url: 'https://whatsapp.com/channel' },
                ].map(p => (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="platform-link">
                    <div className={`platform-icon ${p.cls}`}>{p.icon}</div>
                    <div className="platform-info">
                      <div className="platform-name">{p.name}</div>
                      <div className="platform-handle">{p.handle}</div>
                    </div>
                    <span className="platform-arrow">Follow →</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Featured episode card */}
            <div className="ts-featured-card">
              <div className="ts-featured-thumb">
                <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&q=80" alt="Tech Serial episode" />
                <div className="ts-play-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
              <div className="ts-featured-body">
                <div className="ts-featured-label">Latest Episode</div>
                <div className="ts-featured-title">What is an API — and why does every app need one?</div>
                <div className="ts-featured-desc">Explained in under 60 seconds. No coding required to understand it.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS THE TECH SERIAL */}
      <section className="ts-about">
        <div className="container">
          <div className="ts-about-inner">
            <div className="ts-about-left">
              <span className="section-tag">What is The Tech Serial?</span>
              <h2>Tech literacy for everyone who uses tech.</h2>
              <p>
                Most people use technology every day without understanding how any of it works. That is not a failure — it is a gap that has never been properly filled.
              </p>
              <p>
                The Tech Serial is a <strong>weekly short-form video series</strong> that explains one tech concept per episode, clearly and briefly. No prior knowledge required. No condescension. Just the thing explained well.
              </p>
              <p>
                Topics range from "what is the cloud" to "how does end-to-end encryption work" — anything a curious person might wonder about but never had properly explained.
              </p>
            </div>
            <div>
              <span className="section-tag">Topics Covered</span>
              <div className="ts-topics">
                {[
                  { icon: '☁️', title: 'Cloud & Infrastructure', desc: 'What servers really are, what "the cloud" means, and why it matters.' },
                  { icon: '🔐', title: 'Security & Privacy', desc: 'Encryption, passwords, data breaches — explained without the fear tactics.' },
                  { icon: '🤖', title: 'AI & Machine Learning', desc: 'How AI actually works, what LLMs are, and what they can and cannot do.' },
                  { icon: '📱', title: 'Apps & Software', desc: 'How apps are built, what APIs are, and why your app keeps asking to update.' },
                  { icon: '🌐', title: 'The Internet', desc: 'DNS, HTTP, browsers, and why websites sometimes just go down.' },
                ].map(t => (
                  <div key={t.title} className="ts-topic">
                    <div className="ts-topic-icon">{t.icon}</div>
                    <div className="ts-topic-text">
                      <h4>{t.title}</h4>
                      <p>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ts-cta">
        <div className="container">
          <div className="ts-cta-inner">
            <h2>New episode every week.<br />Pick your platform.</h2>
            <p>Follow on whichever platform you are already on. The content is the same everywhere — short, clear, and actually useful.</p>
            <div className="platform-btn-row">
              <a href="https://youtube.com"      target="_blank" rel="noopener noreferrer" className="platform-btn">▶ YouTube</a>
              <a href="https://tiktok.com"       target="_blank" rel="noopener noreferrer" className="platform-btn">♪ TikTok</a>
              <a href="https://instagram.com"    target="_blank" rel="noopener noreferrer" className="platform-btn">◈ Instagram</a>
              <a href="https://whatsapp.com/channel" target="_blank" rel="noopener noreferrer" className="platform-btn">✆ WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left"><p>© 2026 <span>Rex Orokumue</span> · Built with Next.js & intention.</p></div>
        <div className="footer-links">
          <a href="#">Twitter</a><a href="#">LinkedIn</a>
          <a href="#">GitHub</a><a href="mailto:hello@zolarux.com">Email</a>
        </div>
      </footer>
    </>
  );
}