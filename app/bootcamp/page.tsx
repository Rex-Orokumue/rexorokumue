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
      colorDim: 'var(--accent-dim)',
      colorGlow: 'var(--accent-glow)',
      weeks: [
        { week: 'Week 1–2', title: 'Product Thinking First', desc: 'How to define what to build, who it is for, and what success looks like before touching any code.' },
        { week: 'Week 3–4', title: 'Building with Next.js & React', desc: 'Structure, routing, components, and deploying a fully functional website to Vercel.' },
        { week: 'Week 5–6', title: 'AI-Assisted Development', desc: 'Using Cursor, Claude, and AI tools as force multipliers — faster builds without losing engineering discipline.' },
        { week: 'Week 7–8', title: 'Ship: Your Live Website', desc: 'Students ship a complete, production-deployed website by end of month one.' },
      ],
    },
    {
      month: 'Month 2',
      title: 'Backend — APIs, Auth & Database',
      color: '#A78BFA',
      colorDim: 'rgba(167,139,250,0.10)',
      colorGlow: 'rgba(167,139,250,0.30)',
      weeks: [
        { week: 'Week 1–2', title: 'Supabase & PostgreSQL', desc: 'Database design, tables, relationships, and querying data. How to structure a backend that scales.' },
        { week: 'Week 3–4', title: 'Authentication & Security', desc: 'User login, JWT tokens, Row-Level Security, and keeping user data safe from day one.' },
        { week: 'Week 5–6', title: 'REST APIs & Real-Time', desc: 'Building and consuming APIs, real-time subscriptions, and webhooks.' },
        { week: 'Week 7–8', title: 'Ship: Your Live Web App', desc: 'A fully functional web app with auth, database, and real users by end of month two.' },
      ],
    },
    {
      month: 'Month 3',
      title: 'Mobile — Flutter & Shipping',
      color: '#34D399',
      colorDim: 'rgba(52,211,153,0.10)',
      colorGlow: 'rgba(52,211,153,0.30)',
      weeks: [
        { week: 'Week 1–2', title: 'Flutter Fundamentals', desc: 'Dart basics, widgets, state management, and building your first mobile screen.' },
        { week: 'Week 3–4', title: 'Connecting Mobile to Backend', desc: 'Integrating your Supabase backend into the Flutter app — auth, data, real-time updates.' },
        { week: 'Week 5–6', title: 'Polish, Test & Deploy', desc: 'UI refinement, error handling, and submitting to the Google Play Store.' },
        { week: 'Week 7–8', title: 'Ship: Your Mobile App', desc: 'A live mobile app in the Play Store by the end of the programme.' },
      ],
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
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
        .bg-mesh { position: fixed; inset: 0; z-index: 0; background: radial-gradient(ellipse 70% 50% at 5% 0%, rgba(59,130,246,0.13) 0%, transparent 60%), radial-gradient(ellipse 50% 55% at 95% 90%, rgba(59,130,246,0.06) 0%, transparent 55%), var(--secondary); }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        section { position: relative; z-index: 1; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 64px; }
        .section-tag { display: inline-block; font-size: .70rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--accent); margin-bottom: 14px; }
        .section-title { font-family: 'Syne', sans-serif; font-size: clamp(1.9rem, 3.5vw, 2.9rem); font-weight: 800; line-height: 1.1; letter-spacing: -.025em; color: var(--text); }

        /* HERO */
        .bc-hero { padding-top: 160px; padding-bottom: 80px; }
        .bc-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px 5px 8px; border-radius: 100px; border: 1px solid rgba(52,211,153,0.35); background: rgba(52,211,153,0.08); font-size: .70rem; font-weight: 600; letter-spacing: .10em; text-transform: uppercase; color: var(--green); margin-top: -60px; margin-bottom: 28px; width: fit-content; animation: fadeUp .7s .05s ease both; }
        .bc-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; flex-shrink: 0; }
        .bc-headline { font-family: 'Syne', sans-serif; font-size: clamp(2.4rem, 5.5vw, 4.6rem); font-weight: 800; line-height: .95; letter-spacing: -.04em; animation: fadeUp .7s .18s ease both; }
        .bc-headline .line2 { color: var(--accent); display: block; }
        .bc-sub { margin-top: 24px; font-size: 1.05rem; color: var(--muted); max-width: 580px; font-weight: 300; line-height: 1.75; animation: fadeUp .7s .30s ease both; }
        .bc-sub strong { color: var(--text); font-weight: 500; }

        /* Hero stats strip */
        .bc-stats { display: flex; gap: 0; margin-top: 40px; border: 1px solid var(--border); border-radius: 14px; background: var(--card-bg); backdrop-filter: blur(12px); overflow: hidden; animation: fadeUp .7s .40s ease both; width: fit-content; }
        .bc-stat { padding: 20px 32px; text-align: center; border-right: 1px solid var(--border); }
        .bc-stat:last-child { border-right: none; }
        .bc-stat-val { font-family: 'Syne', sans-serif; font-size: 1.6rem; font-weight: 800; color: var(--text); line-height: 1; }
        .bc-stat-val em { color: var(--accent); font-style: normal; }
        .bc-stat-label { font-size: .70rem; color: var(--muted); margin-top: 5px; letter-spacing: .04em; }

        /* Hero CTA */
        .bc-hero-actions { display: flex; gap: 14px; margin-top: 40px; flex-wrap: wrap; animation: fadeUp .7s .50s ease both; }
        .btn-enroll { padding: 15px 36px; background: var(--green); color: #0F172A; border-radius: 8px; font-weight: 700; font-size: .9rem; text-decoration: none; letter-spacing: .02em; transition: all .25s; box-shadow: 0 4px 28px rgba(52,211,153,.3); border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; }
        .btn-enroll:hover { transform: translateY(-2px); box-shadow: 0 8px 36px rgba(52,211,153,.4); }
        .btn-ghost { padding: 14px 28px; border: 1px solid var(--border); color: var(--text); border-radius: 8px; font-weight: 500; font-size: .9rem; text-decoration: none; transition: all .25s; background: transparent; }
        .btn-ghost:hover { border-color: rgba(255,255,255,.18); background: rgba(255,255,255,.04); }

        /* FOR WHO */
        .bc-for { padding: 0 0 80px; }
        .bc-for-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; margin-top: 48px; align-items: start; }
        .bc-for-text p { font-size: .95rem; color: var(--muted); line-height: 1.8; margin-bottom: 16px; }
        .bc-for-text p strong { color: var(--text); font-weight: 500; }
        .bc-for-cards { display: flex; flex-direction: column; gap: 10px; }
        .bc-who-card { display: flex; gap: 14px; padding: 16px 18px; border-radius: 12px; border: 1px solid var(--border); background: var(--card-bg); transition: all .2s; }
        .bc-who-card:hover { border-color: var(--border-hover); transform: translateX(4px); }
        .bc-who-icon { font-size: 1.3rem; flex-shrink: 0; width: 32px; }
        .bc-who-text h4 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: .88rem; color: var(--text); margin-bottom: 3px; }
        .bc-who-text p { font-size: .78rem; color: var(--muted); line-height: 1.5; }

        /* CURRICULUM */
        .bc-curriculum { padding: 0 0 80px; }
        .curriculum-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
        .month-card { border-radius: 18px; border: 1px solid var(--border); background: var(--card-bg); backdrop-filter: blur(12px); overflow: hidden; transition: all .25s; }
        .month-card:hover { transform: translateY(-4px); border-color: var(--border-hover); box-shadow: 0 16px 48px rgba(0,0,0,.35); }
        .month-header { padding: 24px 24px 20px; border-bottom: 1px solid var(--border); }
        .month-label { font-family: 'JetBrains Mono', monospace; font-size: .65rem; font-weight: 600; letter-spacing: .10em; text-transform: uppercase; margin-bottom: 8px; }
        .month-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 1.0rem; color: var(--text); line-height: 1.25; }
        .month-body { padding: 20px 24px; display: flex; flex-direction: column; gap: 14px; }
        .week-item { display: flex; gap: 12px; }
        .week-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
        .week-content {}
        .week-label { font-family: 'JetBrains Mono', monospace; font-size: .60rem; font-weight: 600; letter-spacing: .08em; margin-bottom: 3px; }
        .week-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: .83rem; color: var(--text); margin-bottom: 3px; }
        .week-desc { font-size: .75rem; color: var(--muted); line-height: 1.55; }

        /* WHAT YOU BUILD */
        .bc-outcomes { padding: 0 0 80px; }
        .outcomes-inner { border-radius: 20px; border: 1px solid var(--border); background: var(--card-bg); backdrop-filter: blur(16px); padding: 56px 60px; }
        .outcomes-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 40px; }
        .outcome-card { padding: 24px; border-radius: 14px; border: 1px solid var(--border); background: rgba(15,23,42,.5); text-align: center; }
        .outcome-icon { font-size: 2rem; margin-bottom: 12px; display: block; }
        .outcome-card h3 { font-family: 'Syne', sans-serif; font-weight: 700; font-size: .92rem; color: var(--text); margin-bottom: 6px; }
        .outcome-card p { font-size: .78rem; color: var(--muted); line-height: 1.55; }

        /* PRICING */
        .bc-pricing { padding: 0 0 80px; }
        .pricing-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 48px; }
        .pricing-card { border-radius: 20px; border: 1px solid var(--border); background: var(--card-bg); backdrop-filter: blur(12px); padding: 36px; position: relative; overflow: hidden; }
        .pricing-card.featured { border-color: var(--accent-glow); }
        .pricing-card.featured::before { content: ''; position: absolute; top: -30%; right: -10%; width: 300px; height: 300px; background: radial-gradient(ellipse, rgba(59,130,246,.08), transparent 70%); pointer-events: none; }
        .pricing-badge { display: inline-block; padding: 3px 12px; border-radius: 100px; font-size: .63rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; margin-bottom: 16px; }
        .pricing-badge.standard { background: var(--accent-dim); border: 1px solid var(--accent-glow); color: var(--accent-light); }
        .pricing-badge.best { background: rgba(52,211,153,.10); border: 1px solid rgba(52,211,153,.3); color: var(--green); }
        .pricing-name { font-family: 'Syne', sans-serif; font-size: 1.1rem; font-weight: 800; color: var(--text); margin-bottom: 8px; }
        .pricing-price { font-family: 'Syne', sans-serif; font-size: 2.4rem; font-weight: 800; color: var(--text); line-height: 1; }
        .pricing-price em { font-size: 1rem; font-style: normal; color: var(--muted); font-weight: 400; }
        .pricing-desc { font-size: .82rem; color: var(--muted); margin-top: 10px; line-height: 1.65; margin-bottom: 24px; }
        .pricing-features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .pricing-feature { display: flex; align-items: flex-start; gap: 10px; font-size: .82rem; color: var(--muted); }
        .pricing-feature-check { color: var(--green); flex-shrink: 0; font-weight: 700; }

        /* CTA */
        .bc-cta { padding: 0 0 120px; }
        .bc-cta-inner { border-radius: 24px; border: 1px solid var(--border); background: linear-gradient(135deg, rgba(30,41,59,.9), rgba(15,23,42,.95)); backdrop-filter: blur(24px); padding: 90px 80px; text-align: center; position: relative; overflow: hidden; }
        .bc-cta-inner::before { content: ''; position: absolute; top: -60%; left: 50%; transform: translateX(-50%); width: 70%; height: 300px; background: radial-gradient(ellipse, rgba(52,211,153,.10), transparent 70%); pointer-events: none; }
        .bc-cta-inner h2 { font-family: 'Syne', sans-serif; font-size: clamp(1.9rem, 3.5vw, 3rem); font-weight: 800; letter-spacing: -.025em; line-height: 1.1; margin-bottom: 16px; }
        .bc-cta-inner > p { font-size: 1rem; color: var(--muted); max-width: 480px; margin: 0 auto 44px; line-height: 1.75; font-weight: 300; }
        .cohort-note { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 32px; padding: 8px 16px; border-radius: 100px; border: 1px solid rgba(52,211,153,.3); background: rgba(52,211,153,.08); font-size: .75rem; color: var(--green); }
        .cta-actions { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        footer { position: relative; z-index: 1; border-top: 1px solid var(--border); padding: 36px 64px; max-width: 1100px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .footer-left p { font-size: .78rem; color: var(--muted-2); }
        .footer-left p span { color: var(--accent); }
        .footer-links { display: flex; gap: 28px; }
        .footer-links a { font-size: .78rem; color: var(--muted-2); text-decoration: none; }
        .footer-links a:hover { color: var(--text); }

        @media (max-width: 1024px) {
          .container { padding: 0 28px; }
          .curriculum-grid { grid-template-columns: 1fr; }
          .outcomes-grid { grid-template-columns: 1fr 1fr; }
          .pricing-inner { grid-template-columns: 1fr; }
          .bc-for-grid { grid-template-columns: 1fr; gap: 40px; }
          .outcomes-inner { padding: 40px 32px; }
          .bc-cta-inner { padding: 64px 40px; }
          footer { padding: 28px; flex-direction: column; gap: 14px; text-align: center; }
        }
        @media (max-width: 640px) {
          .container { padding: 0 20px; }
          .bc-hero { padding-top: 130px; }
          .bc-headline { font-size: 2.2rem; }
          .bc-stats { flex-direction: column; width: 100%; }
          .bc-stat { border-right: none; border-bottom: 1px solid var(--border); }
          .bc-stat:last-child { border-bottom: none; }
          .outcomes-grid { grid-template-columns: 1fr; }
          .pricing-inner { grid-template-columns: 1fr; }
          .bc-cta-inner { padding: 48px 20px; }
          .section-title { word-break: break-word; hyphens: auto; }
          footer { padding: 24px 20px; }
        }
      `}</style>

      <div className="bg-mesh" aria-hidden="true" />

      {/* HERO */}
      <section>
        <div className="container bc-hero">
          <div className="bc-eyebrow"><span className="dot" /> Coming Soon — Be the First to Know</div>
          <h1 className="bc-headline">
            AI Builder<br />
            <span className="line2">Bootcamp.</span>
          </h1>
          <p className="bc-sub">
            A <strong>3-month hands-on programme</strong> where you go from zero to shipping a real website, web app, and mobile app — using AI tools the way professionals actually use them.
          </p>

          <div className="bc-stats">
            <div className="bc-stat">
              <div className="bc-stat-val">3<em>mo</em></div>
              <div className="bc-stat-label">Programme length</div>
            </div>
            <div className="bc-stat">
              <div className="bc-stat-val">3</div>
              <div className="bc-stat-label">Products shipped</div>
            </div>
            <div className="bc-stat">
              <div className="bc-stat-val">0</div>
              <div className="bc-stat-label">Experience needed</div>
            </div>
          </div>

          <div className="bc-hero-actions">
            <a href="#enroll" className="btn-enroll">Join the Waitlist →</a>
            <a href="#curriculum" className="btn-ghost">View Curriculum</a>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section className="bc-for">
        <div className="container">
          <div className="bc-for-grid">
            <div>
              <span className="section-tag">Who Is This For</span>
              <h2 className="section-title">Anyone who wants to build with AI.<br />No experience required.</h2>
              <div style={{ marginTop: 24 }}>
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
      <section className="bc-curriculum" id="curriculum">
        <div className="container">
          <span className="section-tag">3-Month Curriculum</span>
          <h2 className="section-title">What you learn.<br />What you ship.</h2>
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
                      <div className="week-content">
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
      <section className="bc-outcomes">
        <div className="container">
          <div className="outcomes-inner">
            <span className="section-tag">What You Ship</span>
            <h2 className="section-title">Three real products.<br />All live by graduation.</h2>
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
      <section className="bc-pricing" id="enroll">
        <div className="container">
          <span className="section-tag">Pricing</span>
          <h2 className="section-title">Two ways to join.<br />Same full experience.</h2>
          <div className="pricing-inner">
            <div className="pricing-card">
              <span className="pricing-badge standard">Monthly</span>
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
              <a href="mailto:hello@zolarux.com?subject=AI Builder Bootcamp — Monthly Payment" className="btn-ghost" style={{ display: 'block', textAlign: 'center' }}>Join Waitlist</a>
            </div>
            <div className="pricing-card featured">
              <span className="pricing-badge best">Save ₦30k</span>
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
              <a href="mailto:hello@zolarux.com?subject=AI Builder Bootcamp — Upfront Payment" className="btn-enroll" style={{ display: 'block', textAlign: 'center' }}>Join Waitlist →</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bc-cta">
        <div className="container">
          <div className="bc-cta-inner">
            <div className="cohort-note">
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite', display: 'inline-block' }} />
              Coming soon — join the waitlist to be notified first
            </div>
            <h2>Three months from now,<br />you will have shipped real products.</h2>
            <p>Not certificates. Not tutorials you never finished. Real products, live on the internet, built by you. Drop your email and be the first to know when Cohort 1 opens.</p>
            <div className="cta-actions">
              <a href="mailto:hello@zolarux.com?subject=AI Builder Bootcamp — Waitlist" className="btn-enroll">Join the Waitlist →</a>
              <a href="mailto:hello@zolarux.com?subject=AI Builder Bootcamp Question" className="btn-ghost">Ask a Question</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left">
          <p>© 2026 <span>Rex Orokumue</span> · Built with Next.js &amp; intention.</p>
        </div>
        <div className="footer-links">
          <a href="https://x.com/iamrexorokumue">𝕏</a>
          <a href="https://www.linkedin.com/in/rexorokumue/">LinkedIn</a>
          <a href="https://github.com/Rex-Orokumue">GitHub</a>
          <a href="mailto:gorokumue@gmail.com">Email</a>
        </div>
      </footer>
    </>
  );
}