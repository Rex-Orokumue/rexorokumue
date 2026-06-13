// app/bootcamp/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Builder Bootcamp',
  description:
    'A 3-month hands-on programme where you go from zero to shipping a real website, web app, and mobile app using AI tools the way professionals use them. ₦150k upfront or ₦60k/month.',
  openGraph: {
    title: 'AI Builder Bootcamp — Rex Orokumue',
    description:
      '3 months. 3 real products shipped. Learn to build with Flutter, Next.js, Supabase, and AI tools.',
    url: 'https://rexorokumue.vercel.app/bootcamp',
    images: [{ url: '/portfolio_thumbnail.png', width: 1200, height: 627 }],
  },
  alternates: { canonical: 'https://rexorokumue.vercel.app/bootcamp' },
};

export default function BootcampPage() {
  const curriculum = [
    {
      month: 'Month 1',
      title: 'Foundation — Web Development',
      color: 'var(--accent)',
      weeks: [
        { week: 'Week 1', title: 'Product Thinking First', desc: 'How to define what to build, who it is for, and what success looks like before touching any code.' },
        { week: 'Week 2', title: 'Building with Next.js & React', desc: 'Structure, routing, components, and deploying a fully functional website to Vercel.' },
        { week: 'Week 3', title: 'AI-Assisted Development', desc: 'Using Cursor, Claude, and AI tools as force multipliers — faster builds without losing engineering discipline.' },
        { week: 'Week 4', title: 'Ship: Your Live Website', desc: 'Students ship a complete, production-deployed website by end of month one.' },
      ],
    },
    {
      month: 'Month 2',
      title: 'Backend — APIs, Auth & Database',
      color: '#A78BFA',
      weeks: [
        { week: 'Week 1', title: 'Supabase & PostgreSQL', desc: 'Database design, tables, relationships, and querying data. How to structure a backend that scales.' },
        { week: 'Week 2', title: 'Authentication & Security', desc: 'User login, JWT tokens, Row-Level Security, and keeping user data safe from day one.' },
        { week: 'Week 3', title: 'REST APIs & Real-Time', desc: 'Building and consuming APIs, real-time subscriptions, and webhooks.' },
        { week: 'Week 4', title: 'Ship: Your Live Web App', desc: 'A fully functional web app with auth, database, and real users by end of month two.' },
      ],
    },
    {
      month: 'Month 3',
      title: 'Mobile — Flutter & Shipping',
      color: '#34D399',
      weeks: [
        { week: 'Week 1', title: 'Flutter Fundamentals', desc: 'Dart basics, widgets, state management, and building your first mobile screen.' },
        { week: 'Week 2', title: 'Connecting Mobile to Backend', desc: 'Integrating your Supabase backend into the Flutter app — auth, data, real-time updates.' },
        { week: 'Week 3', title: 'Polish, Test & Deploy', desc: 'UI refinement, error handling, and submitting to the Google Play Store.' },
        { week: 'Week 4', title: 'Ship: Your Mobile App', desc: 'A live mobile app in the Play Store by the end of the programme.' },
      ],
    },
  ];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

        .bc-fade-1 { animation: fadeUp 0.55s 0.05s ease both; }
        .bc-fade-2 { animation: fadeUp 0.55s 0.12s ease both; }
        .bc-fade-3 { animation: fadeUp 0.55s 0.20s ease both; }
        .bc-fade-4 { animation: fadeUp 0.55s 0.28s ease both; }

        section { position: relative; z-index: 1; }

        /* HERO */
        .bc-hero { padding-top: 140px; padding-bottom: 56px; }
        .bc-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 4px 12px 4px 8px; border-radius: 6px;
          border: 1px solid var(--border); background: var(--panel);
          margin-bottom: 24px; width: fit-content;
        }
        .bc-hero-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--ok); flex-shrink: 0; }
        .bc-headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 5vw, 3.6rem);
          font-weight: 700; line-height: 1.08; letter-spacing: -0.02em; color: var(--text);
        }
        .bc-headline .accent { color: var(--accent); }
        .bc-sub {
          margin-top: 18px; font-size: 0.95rem; line-height: 1.75;
          color: var(--muted); max-width: 560px;
        }
        .bc-sub strong { color: var(--text); font-weight: 500; }

        /* Stats strip */
        .bc-stats { display: flex; gap: 0; margin-top: 32px; border: 1px solid var(--border); border-radius: 10px; background: var(--panel); overflow: hidden; width: fit-content; }
        .bc-stat { padding: 18px 28px; text-align: center; border-right: 1px solid var(--border); }
        .bc-stat:last-child { border-right: none; }
        .bc-stat-val { font-family: 'JetBrains Mono', monospace; font-size: 1.25rem; font-weight: 700; color: var(--text); line-height: 1; }
        .bc-stat-val em { color: var(--accent); font-style: normal; }
        .bc-stat-label { font-family: 'JetBrains Mono', monospace; font-size: 0.60rem; color: var(--muted); margin-top: 5px; letter-spacing: 0.04em; }

        /* Hero CTA */
        .bc-hero-actions { display: flex; gap: 10px; margin-top: 32px; flex-wrap: wrap; }

        /* FOR WHO */
        .bc-for-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; margin-top: 32px; align-items: start; }
        .bc-for-text p { font-size: 0.9rem; color: var(--muted); line-height: 1.8; margin-bottom: 14px; }
        .bc-for-text p strong { color: var(--text); font-weight: 500; }
        .bc-for-cards { display: flex; flex-direction: column; gap: 8px; }
        .bc-who-card { display: flex; gap: 14px; padding: 14px 16px; border-radius: 10px; border: 1px solid var(--border); background: var(--panel); transition: border-color 0.2s; }
        .bc-who-card:hover { border-color: var(--accent); }
        .bc-who-icon { font-size: 1.1rem; flex-shrink: 0; width: 28px; }
        .bc-who-text h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.85rem; color: var(--text); margin-bottom: 3px; }
        .bc-who-text p { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }

        /* CURRICULUM */
        .curriculum-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 28px; }
        .month-card { border-radius: 10px; border: 1px solid var(--border); background: var(--panel); overflow: hidden; transition: border-color 0.2s; }
        .month-card:hover { border-color: var(--accent); }
        .month-header { padding: 20px 20px 16px; border-bottom: 1px solid var(--border); }
        .month-label { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; font-weight: 600; letter-spacing: 0.08em; margin-bottom: 6px; text-transform: lowercase; }
        .month-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.9rem; color: var(--text); line-height: 1.25; }
        .month-body { padding: 18px 20px; display: flex; flex-direction: column; gap: 12px; }
        .week-item { display: flex; gap: 10px; }
        .week-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; margin-top: 7px; }
        .week-label { font-family: 'JetBrains Mono', monospace; font-size: 0.58rem; font-weight: 600; letter-spacing: 0.06em; margin-bottom: 2px; }
        .week-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.82rem; color: var(--text); margin-bottom: 2px; }
        .week-desc { font-size: 0.75rem; color: var(--muted); line-height: 1.5; }

        /* WHAT YOU BUILD */
        .outcomes-inner { border-radius: 10px; border: 1px solid var(--border); background: var(--panel); padding: 44px 48px; }
        .outcomes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 28px; }
        .outcome-card { padding: 20px; border-radius: 8px; border: 1px solid var(--border); background: var(--panel-2); text-align: center; }
        .outcome-icon { font-size: 1.5rem; margin-bottom: 10px; display: block; }
        .outcome-card h3 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.88rem; color: var(--text); margin-bottom: 6px; }
        .outcome-card p { font-size: 0.75rem; color: var(--muted); line-height: 1.55; }

        /* PRICING */
        .pricing-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 28px; }
        .pricing-card { border-radius: 10px; border: 1px solid var(--border); background: var(--panel); padding: 28px; }
        .pricing-card.featured { border-color: var(--accent); }
        .pricing-badge {
          display: inline-block; padding: 2px 10px; border-radius: 5px;
          font-family: 'JetBrains Mono', monospace; font-size: 0.60rem; font-weight: 600;
          letter-spacing: 0.06em; margin-bottom: 14px;
        }
        .pricing-badge.standard { border: 1px solid var(--border); color: var(--muted); background: transparent; }
        .pricing-badge.best { border: 1px solid var(--accent); color: var(--accent); background: transparent; }
        .pricing-name { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 8px; }
        .pricing-price { font-family: 'Space Grotesk', sans-serif; font-size: 2rem; font-weight: 700; color: var(--text); line-height: 1; }
        .pricing-price em { font-size: 0.9rem; font-style: normal; color: var(--muted); font-weight: 400; }
        .pricing-desc { font-size: 0.80rem; color: var(--muted); margin-top: 10px; line-height: 1.65; margin-bottom: 20px; }
        .pricing-features { display: flex; flex-direction: column; gap: 8px; margin-bottom: 24px; }
        .pricing-feature { display: flex; align-items: flex-start; gap: 8px; font-size: 0.80rem; color: var(--muted); }
        .pricing-feature-check { color: var(--ok); flex-shrink: 0; font-weight: 700; font-family: 'JetBrains Mono', monospace; font-size: 0.72rem; }

        /* CTA */
        .bc-cta-inner { border-radius: 10px; border: 1px solid var(--border); background: var(--panel); padding: 72px 60px; text-align: center; }
        .bc-cta-inner h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.6rem, 3vw, 2.4rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 14px; }
        .bc-cta-inner > p { font-size: 0.9rem; color: var(--muted); max-width: 480px; margin: 0 auto 32px; line-height: 1.75; }
        .bc-cta-note {
          display: inline-flex; align-items: center; gap: 8px;
          margin-bottom: 24px; padding: 7px 14px;
          border-radius: 6px; border: 1px solid var(--border);
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.64rem; color: var(--muted);
        }
        .bc-cta-note-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--ok); flex-shrink: 0; }
        .cta-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

        footer { position: relative; z-index: 1; border-top: 1px solid var(--border); padding: 28px 0; display: flex; align-items: center; justify-content: space-between; }
        .footer-left p { font-family: 'JetBrains Mono', monospace; font-size: 0.70rem; color: var(--muted); }
        .footer-left p span { color: var(--accent); }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-family: 'JetBrains Mono', monospace; font-size: 0.70rem; color: var(--muted); text-decoration: none; transition: color 0.15s; }
        .footer-links a:hover { color: var(--text); }

        @media (max-width: 1024px) {
          .curriculum-grid { grid-template-columns: 1fr; }
          .outcomes-grid { grid-template-columns: 1fr 1fr; }
          .pricing-inner { grid-template-columns: 1fr; }
          .bc-for-grid { grid-template-columns: 1fr; gap: 36px; }
          .outcomes-inner { padding: 36px 28px; }
          .bc-cta-inner { padding: 52px 32px; }
          footer { flex-direction: column; gap: 14px; text-align: center; }
        }
        @media (max-width: 640px) {
          .bc-hero { padding-top: 110px; }
          .bc-headline { font-size: 2rem; }
          .bc-stats { flex-direction: column; width: 100%; }
          .bc-stat { border-right: none; border-bottom: 1px solid var(--border); }
          .bc-stat:last-child { border-bottom: none; }
          .outcomes-grid { grid-template-columns: 1fr; }
          .bc-cta-inner { padding: 40px 18px; }
          .cta-actions { flex-direction: column; align-items: center; }
          footer { padding: 20px 0; }
        }
      `}</style>

      {/* HERO */}
      <section>
        <div className="os-container bc-hero">
          <div className="bc-hero-eyebrow bc-fade-1">
            <span className="bc-hero-dot" />
            <span className="os-mono" style={{ fontSize: '0.64rem', color: 'var(--ok)' }}>coming soon — be the first to know</span>
          </div>
          <h1 className="bc-headline bc-fade-2">
            AI Builder<br />
            <span className="accent">Bootcamp.</span>
          </h1>
          <p className="bc-sub bc-fade-3">
            A <strong>3-month hands-on programme</strong> where you go from zero to shipping a real website, web app, and mobile app — using AI tools the way professionals actually use them.
          </p>

          <div className="bc-stats bc-fade-4">
            <div className="bc-stat">
              <div className="bc-stat-val">3<em>mo</em></div>
              <div className="bc-stat-label">programme length</div>
            </div>
            <div className="bc-stat">
              <div className="bc-stat-val">3</div>
              <div className="bc-stat-label">products shipped</div>
            </div>
            <div className="bc-stat">
              <div className="bc-stat-val">0</div>
              <div className="bc-stat-label">experience needed</div>
            </div>
          </div>

          <div className="bc-hero-actions bc-fade-4">
            <a href="#enroll" className="os-btn os-btn-primary">Join the Waitlist →</a>
            <a href="#curriculum" className="os-btn">View Curriculum</a>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="os-section">
        <div className="os-container">
          <span className="os-label">// who is this for</span>
          <h2 className="os-h2">Anyone who wants to build with AI.<br />No experience required.</h2>
          <div className="bc-for-grid">
            <div className="bc-for-text">
              <p>
                You do not need to know how to code to join. You need <strong>curiosity, consistency, and a willingness to build things</strong> that actually work.
              </p>
              <p>
                By the end of three months, you will have shipped real products to real URLs — not tutorial exercises, not portfolio pieces. <strong>Live products that people can use.</strong>
              </p>
              <p>
                AI tools have made it possible to build production-grade software without a computer science degree. This bootcamp teaches you how to use those tools the right way — with engineering discipline, not just prompting.
              </p>
            </div>
            <div className="bc-for-cards">
              {[
                { icon: '🎨', title: 'Designers', desc: 'You can already see what good products look like. This teaches you how to build them yourself.' },
                { icon: '💼', title: 'Founders & Entrepreneurs', desc: 'Stop waiting for a technical co-founder. Learn to build your MVP yourself.' },
                { icon: '📱', title: 'Complete Beginners', desc: 'No coding background needed. We start from scratch and build up systematically.' },
                { icon: '🔄', title: 'Career Switchers', desc: 'Looking to move into tech? Leave with three shipped products and real skills.' },
              ].map(w => (
                <div key={w.title} className="bc-who-card">
                  <div className="bc-who-icon">{w.icon}</div>
                  <div className="bc-who-text">
                    <h4>{w.title}</h4>
                    <p>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="os-section" id="curriculum" style={{ paddingTop: 0 }}>
        <div className="os-container">
          <span className="os-label">// 3-month curriculum</span>
          <h2 className="os-h2">What you learn. What you ship.</h2>
          <div className="curriculum-grid">
            {curriculum.map(month => (
              <div key={month.month} className="month-card">
                <div className="month-header">
                  <div className="month-label" style={{ color: month.color }}>{month.month}</div>
                  <div className="month-title">{month.title}</div>
                </div>
                <div className="month-body">
                  {month.weeks.map(w => (
                    <div key={w.week} className="week-item">
                      <div className="week-dot" style={{ background: month.color }} />
                      <div>
                        <div className="week-label" style={{ color: month.color }}>{w.week}</div>
                        <div className="week-title">{w.title}</div>
                        <div className="week-desc">{w.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU BUILD */}
      <section className="os-section" style={{ paddingTop: 0 }}>
        <div className="os-container">
          <div className="outcomes-inner">
            <span className="os-label">// what you ship</span>
            <h2 className="os-h2">Three real products. All live by graduation.</h2>
            <div className="outcomes-grid">
              {[
                { icon: '🌐', title: 'A Live Website', desc: 'Deployed to a real domain. Built with Next.js. Your first production-grade web presence.' },
                { icon: '⚡', title: 'A Web Application', desc: 'With user authentication, a real database, and features that actually work for real users.' },
                { icon: '📱', title: 'A Mobile App', desc: 'Built in Flutter, deployed to the Google Play Store. A real app in the real app store.' },
              ].map(o => (
                <div key={o.title} className="outcome-card">
                  <span className="outcome-icon">{o.icon}</span>
                  <h3>{o.title}</h3>
                  <p>{o.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="os-section" id="enroll" style={{ paddingTop: 0 }}>
        <div className="os-container">
          <span className="os-label">// pricing</span>
          <h2 className="os-h2">Two ways to join. Same full experience.</h2>
          <div className="pricing-inner">
            <div className="pricing-card">
              <span className="pricing-badge standard">monthly</span>
              <div className="pricing-name">Pay Monthly</div>
              <div className="pricing-price">₦60k <em>/ month</em></div>
              <p className="pricing-desc">₦180k total across 3 months. Full access to everything — spread out to make it easier.</p>
              <div className="pricing-features">
                {[
                  'Full 3-month curriculum',
                  'Live weekly sessions with Rex',
                  'Pre-recorded video sessions',
                  'Direct 1-on-1 build reviews',
                  'Accountability partner system',
                  'Student community access',
                  'Certificate of completion',
                ].map(f => (
                  <div key={f} className="pricing-feature"><span className="pricing-feature-check">✓</span>{f}</div>
                ))}
              </div>
              <a href="mailto:hello@zolarux.com?subject=AI Builder Bootcamp — Monthly Payment" className="os-btn" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>Join Waitlist</a>
            </div>
            <div className="pricing-card featured">
              <span className="pricing-badge best">save ₦30k</span>
              <div className="pricing-name">Pay Upfront</div>
              <div className="pricing-price">₦150k <em>one-time</em></div>
              <p className="pricing-desc">Pay once and save ₦30k. Exactly the same experience as the monthly plan — just cheaper overall.</p>
              <div className="pricing-features">
                {[
                  'Full 3-month curriculum',
                  'Live weekly sessions with Rex',
                  'Pre-recorded video sessions',
                  'Direct 1-on-1 build reviews',
                  'Accountability partner system',
                  'Student community access',
                  'Certificate of completion',
                ].map(f => (
                  <div key={f} className="pricing-feature"><span className="pricing-feature-check">✓</span>{f}</div>
                ))}
              </div>
              <a href="mailto:hello@zolarux.com?subject=AI Builder Bootcamp — Upfront Payment" className="os-btn os-btn-primary" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>Join Waitlist →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="os-section">
        <div className="os-container">
          <div className="bc-cta-inner">
            <div className="bc-cta-note">
              <span className="bc-cta-note-dot" />
              coming soon — join the waitlist to be notified first
            </div>
            <h2>Three months from now,<br />you will have shipped real products.</h2>
            <p>Not certificates. Not tutorials you never finished. Real products, live on the internet, built by you. Drop your email and be the first to know when Cohort 1 opens.</p>
            <div className="cta-actions">
              <a href="mailto:hello@zolarux.com?subject=AI Builder Bootcamp — Waitlist" className="os-btn os-btn-primary">Join the Waitlist →</a>
              <a href="mailto:hello@zolarux.com?subject=AI Builder Bootcamp Question" className="os-btn">Ask a Question</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="os-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div className="footer-left">
            <p>© 2026 <span>Rex Orokumue</span> · Built with Next.js &amp; intention.</p>
          </div>
          <div className="footer-links">
            <a href="https://x.com/iamrexorokumue">𝕏</a>
            <a href="https://www.linkedin.com/in/rexorokumue/">LinkedIn</a>
            <a href="https://github.com/Rex-Orokumue">GitHub</a>
            <a href="mailto:gorokumue@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
}
