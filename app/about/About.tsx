'use client';

import { useEffect } from 'react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary:      var(--panel);
      --secondary:    var(--bg);
      --accent-dim:   color-mix(in srgb, var(--accent) 12%, transparent);
      --accent-glow:  transparent;
      --accent-light: var(--accent);
      --muted-2:      var(--muted);
      --border-hover: var(--accent);
      --card-bg:      var(--panel);
    }

    html { scroll-behavior: smooth; }
    body {
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
      line-height: 1.6;
    }

    @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }

    .fade-up-1 { animation: fadeUp 0.75s 0.05s ease both; }
    .fade-up-2 { animation: fadeUp 0.75s 0.20s ease both; }
    .fade-up-3 { animation: fadeUp 0.75s 0.35s ease both; }
    .fade-up-4 { animation: fadeUp 0.75s 0.50s ease both; }

    .reveal {
      opacity: 0; transform: translateY(24px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal.visible { opacity:1; transform:translateY(0); }

    section { position: relative; z-index: 1; }

    /* HERO */
    .about-hero {
      padding-top: 120px; padding-bottom: 80px;
    }
    .about-intro {
      margin-top: 24px; font-size: 1.05rem; line-height: 1.8;
      color: var(--muted); max-width: 640px; font-weight: 300;
    }
    .about-intro strong { color: var(--text); font-weight: 500; }
    .about-avail {
      display: inline-flex; align-items: center; gap: 10px;
      margin-top: 32px; padding: 8px 16px; border-radius: 8px;
      border: 1px solid var(--border); background: var(--card-bg);
      font-size: 0.78rem; color: var(--muted);
    }
    .avail-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: var(--ok); flex-shrink: 0;
    }
    .about-avail strong { color: var(--text); font-weight: 500; }

    /* HELP ITEMS */
    .help-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 48px; margin-top: 40px; align-items: start;
    }
    .help-left p {
      font-size: 0.95rem; line-height: 1.85;
      color: var(--muted); margin-bottom: 16px;
    }
    .help-left p strong { color: var(--text); font-weight: 500; }
    .help-items { display: flex; flex-direction: column; gap: 10px; }
    .help-item {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 18px 20px; border-radius: 10px;
      border: 1px solid var(--border); background: var(--card-bg);
      transition: border-color 0.2s;
    }
    .help-item:hover { border-color: var(--border-hover); }
    .help-num {
      font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.68rem;
      font-weight: 700; color: var(--accent);
      letter-spacing: 0.06em; flex-shrink: 0; padding-top: 2px;
    }
    .help-item-text h4 {
      font-family: 'Space Grotesk', sans-serif; font-weight: 700;
      font-size: 0.90rem; color: var(--text); margin-bottom: 4px;
    }
    .help-item-text p { font-size: 0.78rem; color: var(--muted); line-height: 1.5; }

    /* PHILOSOPHY */
    .philosophy-inner {
      border-radius: 12px; border: 1px solid var(--border);
      background: var(--card-bg);
      padding: 48px;
    }
    .philosophy-header {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 48px; align-items: start; margin-bottom: 48px;
    }
    .philosophy-header-left p {
      margin-top: 16px; font-size: 0.95rem; line-height: 1.8; color: var(--muted);
    }
    .philosophy-header-left p strong { color: var(--text); font-weight: 500; }
    .philosophy-header-left p + p { margin-top: 14px; }
    .philosophy-quote {
      padding: 24px 28px; border-radius: 10px;
      border: 1px solid var(--border); background: var(--card-bg);
      position: relative;
    }
    .philosophy-quote::before {
      content: '"'; position: absolute; top: -14px; left: 20px;
      font-family: 'Space Grotesk', sans-serif; font-size: 3.5rem; font-weight: 800;
      color: var(--accent); line-height: 1; opacity: 0.35;
    }
    .philosophy-quote p {
      font-size: 0.95rem; line-height: 1.75; color: var(--text);
      font-weight: 400; font-style: italic;
    }
    .philosophy-quote cite {
      display: block; margin-top: 14px; font-size: 0.72rem;
      color: var(--accent); font-style: normal;
      font-weight: 600; letter-spacing: 0.06em;
    }
    .principles-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 14px; padding-top: 40px; border-top: 1px solid var(--border);
    }
    .principle {
      padding: 20px 18px; border-radius: 10px;
      border: 1px solid var(--border); background: var(--panel);
      transition: border-color 0.2s;
    }
    .principle:hover { border-color: var(--border-hover); }
    .principle-icon { font-size: 1.2rem; margin-bottom: 12px; display: block; }
    .principle h4 {
      font-family: 'Space Grotesk', sans-serif; font-weight: 700;
      font-size: 0.86rem; color: var(--text); margin-bottom: 6px;
    }
    .principle p { font-size: 0.76rem; line-height: 1.6; color: var(--muted); }

    /* JOURNEY */
    .journey-grid {
      display: grid; grid-template-columns: 1.1fr 1fr;
      gap: 64px; margin-top: 40px; align-items: start;
    }
    .journey-text p {
      font-size: 0.95rem; line-height: 1.85;
      color: var(--muted); margin-bottom: 16px;
    }
    .journey-text p strong { color: var(--text); font-weight: 500; }
    .journey-milestones { display: flex; flex-direction: column; gap: 0; }
    .milestone { display: flex; gap: 18px; padding-bottom: 28px; position: relative; }
    .milestone:last-child { padding-bottom: 0; }
    .milestone-left { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
    .milestone-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--accent);
      flex-shrink: 0; margin-top: 4px;
    }
    .milestone-line {
      width: 1px; flex: 1;
      background: var(--border);
      margin-top: 6px; min-height: 28px;
    }
    .milestone:last-child .milestone-line { display: none; }
    .milestone-year {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.66rem; font-weight: 700; letter-spacing: 0.08em;
      color: var(--accent); margin-bottom: 5px;
    }
    .milestone-content h4 {
      font-family: 'Space Grotesk', sans-serif; font-weight: 700;
      font-size: 0.88rem; color: var(--text); margin-bottom: 4px;
    }
    .milestone-content p { font-size: 0.76rem; color: var(--muted); line-height: 1.55; }

    /* CURRENT FOCUS */
    .focus-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 16px; margin-top: 40px;
    }
    .focus-card {
      padding: 28px; border-radius: 10px;
      border: 1px solid var(--border); background: var(--card-bg);
      transition: border-color 0.2s;
    }
    .focus-card:hover { border-color: var(--border-hover); }
    .focus-card-label {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.66rem; letter-spacing: 0.06em;
      color: var(--muted); margin-bottom: 12px; display: block;
    }
    .focus-card h3 {
      font-family: 'Space Grotesk', sans-serif; font-size: 1.05rem;
      font-weight: 700; color: var(--text); margin-bottom: 10px;
    }
    .focus-card p { font-size: 0.83rem; line-height: 1.75; color: var(--muted); }
    .focus-note {
      margin-top: 20px; padding: 14px 16px; border-radius: 8px;
      border: 1px solid var(--border); background: var(--panel);
      font-size: 0.80rem; color: var(--muted); line-height: 1.65; font-style: italic;
    }
    .focus-note strong { color: var(--accent); font-style: normal; font-weight: 500; }

    /* SELECTED WORK TEASER */
    .work-teaser-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 14px; margin-top: 40px;
    }
    .work-teaser-card {
      padding: 24px 20px; border-radius: 10px;
      border: 1px solid var(--border); background: var(--card-bg);
      text-decoration: none;
      transition: border-color 0.2s; display: flex; flex-direction: column; gap: 8px;
    }
    .work-teaser-card:hover { border-color: var(--border-hover); }
    .work-teaser-tag {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.64rem; letter-spacing: 0.08em;
      color: var(--muted);
    }
    .work-teaser-card h3 {
      font-family: 'Space Grotesk', sans-serif; font-size: 0.92rem;
      font-weight: 700; color: var(--text); line-height: 1.3;
    }
    .work-teaser-card p { font-size: 0.76rem; color: var(--muted); line-height: 1.55; flex: 1; }
    .work-teaser-footer {
      display: flex; align-items: center; justify-content: space-between;
      padding-top: 12px; border-top: 1px solid var(--border); margin-top: 4px;
    }
    .work-teaser-pills { display: flex; gap: 6px; flex-wrap: wrap; }
    .work-teaser-pill {
      padding: 2px 8px; border-radius: 4px;
      background: var(--accent-dim); border: 1px solid var(--accent-glow);
      font-size: 0.62rem; color: var(--accent); font-weight: 500;
    }
    .work-teaser-arrow {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.72rem; color: var(--accent); font-weight: 600; flex-shrink: 0;
    }

    /* CORE STACK */
    .stack-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 14px; margin-top: 40px;
    }
    .stack-group {
      padding: 24px 20px; border-radius: 10px;
      border: 1px solid var(--border); background: var(--card-bg);
      transition: border-color 0.2s;
    }
    .stack-group:hover { border-color: var(--border-hover); }
    .stack-group-label {
      font-family: 'JetBrains Mono', ui-monospace, monospace;
      font-size: 0.64rem; letter-spacing: 0.06em;
      color: var(--muted); margin-bottom: 14px; display: block;
    }
    .stack-items { display: flex; flex-wrap: wrap; gap: 8px; }
    .stack-pill {
      padding: 4px 12px; border-radius: 6px;
      border: 1px solid var(--border); background: var(--panel);
      font-size: 0.76rem; color: var(--muted); font-weight: 500; transition: border-color 0.2s;
    }
    .stack-pill:hover { border-color: var(--accent); color: var(--accent); }

    /* CLOSING CTA */
    .about-cta-inner {
      border-radius: 12px; border: 1px solid var(--border);
      background: var(--panel);
      padding: 64px 56px;
      display: grid; grid-template-columns: 1fr auto;
      gap: 48px; align-items: center;
    }
    .about-cta-text h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.4rem, 2.5vw, 2rem);
      font-weight: 700; letter-spacing: -0.02em;
      line-height: 1.2; margin-bottom: 14px; color: var(--text);
    }
    .about-cta-text p {
      font-size: 0.92rem; color: var(--muted);
      line-height: 1.75; max-width: 480px; font-weight: 300;
    }
    .about-cta-actions { display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }

    /* FOOTER */
    footer {
      position: relative; z-index: 1;
      border-top: 1px solid var(--border);
      padding: 28px 0; max-width: 1100px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
    }
    .footer-left p { font-size: 0.76rem; color: var(--muted); }
    .footer-left p span { color: var(--accent); }
    .footer-links { display: flex; gap: 24px; }
    .footer-links a {
      font-size: 0.76rem; color: var(--muted);
      text-decoration: none; transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--text); }

    /* RESPONSIVE */
    @media (max-width: 1024px) {
      .help-grid { grid-template-columns: 1fr; gap: 36px; }
      .philosophy-header { grid-template-columns: 1fr; gap: 32px; }
      .principles-grid { grid-template-columns: 1fr 1fr; }
      .journey-grid { grid-template-columns: 1fr; gap: 40px; }
      .focus-grid { grid-template-columns: 1fr; }
      .stack-grid { grid-template-columns: 1fr 1fr; }
      .work-teaser-grid { grid-template-columns: 1fr 1fr; }
      .about-cta-inner { grid-template-columns: 1fr; gap: 32px; padding: 48px 32px; }
      .philosophy-inner { padding: 32px 24px; }
      footer { padding: 24px 1.25rem; flex-direction: column; gap: 14px; text-align: center; }
    }
    @media (max-width: 640px) {
      .about-hero { padding-top: 100px; }
      .principles-grid { grid-template-columns: 1fr; }
      .stack-grid { grid-template-columns: 1fr; }
      .work-teaser-grid { grid-template-columns: 1fr; }
      .about-cta-inner { padding: 40px 20px; }
    }
  `}</style>
);

function useReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.10 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const helpItems = [
  { title: 'MVPs from 0 to production', desc: 'Full product builds — architecture decisions to deployed, real-user-facing software.' },
  { title: 'Backend systems & API design', desc: 'REST APIs, database schemas, auth flows, and real-time systems built to scale.' },
  { title: 'Payment & escrow integrations', desc: 'Secure transaction flows, escrow logic, webhook handling, and reconciliation systems.' },
  { title: 'AI-assisted development workflows', desc: 'Faster iteration cycles without sacrificing engineering rigour or code quality.' },
  { title: 'Performance optimisation & deployment', desc: 'Edge deployment, CI/CD pipelines, and zero-downtime release strategies on Vercel.' },
];

const principles = [
  { icon: '🏗️', title: 'Scalable from day one', desc: 'Good architecture is the difference between a product that grows and one that collapses under its own weight.' },
  { icon: '🔐', title: 'Security is not optional', desc: 'Trust and data integrity are foundational — especially in products handling payments, identity, or sensitive user data.' },
  { icon: '🤖', title: 'AI as a multiplier', desc: "AI tools accelerate development cycles. They don't replace engineering discipline — they amplify it." },
  { icon: '🚢', title: 'Ship responsibly', desc: 'Shipping fast is good. Shipping something secure that can be maintained long-term — that is better.' },
];

const milestones = [
  { year: 'Foundation', title: 'Learned by building real things', desc: 'Started with curiosity, no bootcamp. Built broken things. Fixed them. Repeated until the mental models were solid.' },
  { year: 'First Production Apps', title: 'Shipped beyond tutorials', desc: 'Moved from learning exercises to real software — auth systems, REST APIs, mobile apps people actually used.' },
  { year: 'Zolarux', title: 'Founded a product from scratch', desc: 'Designed, built, and launched Zolarux — a trust infrastructure layer for Nigerian social commerce — entirely solo.' },
  { year: 'Now', title: 'Full-stack engineer + founder', desc: 'Helping founders ship production-grade software while continuing to grow Zolarux into a real platform.' },
];

const stackGroups = [
  { label: 'Frontend & Mobile', items: ['Next.js', 'React', 'Flutter', 'TypeScript'] },
  { label: 'Backend & Database', items: ['Supabase', 'Firebase', 'PostgreSQL', 'REST APIs'] },
  { label: 'Infra, Auth & Deploy', items: ['Vercel', 'GitHub Actions', 'CI/CD', 'Supabase Auth', 'JWT / RLS'] },
  { label: 'Design & CMS', items: ['Figma', 'WordPress'] },
];

export default function About() {
  useReveal();

  return (
    <>
      <GlobalStyles />

      {/* OPENING */}
      <section className="os-section">
        <div className="os-container about-hero">
          <span className="os-label fade-up-1">// about</span>
          <h1 className="os-h2 fade-up-2" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800 }}>
            I build reliable,<br />
            <span style={{ color: 'var(--accent)' }}>production-ready software</span>
            <br />
            for founders who move fast.
          </h1>
          <p className="about-intro fade-up-3">
            I am Rex — a <strong>full-stack engineer</strong> focused on shipping scalable, trust-driven products.
            I work with early-stage founders and growing teams to turn ideas into production systems that are fast,
            secure, and built to last. Currently building <strong>Zolarux</strong>, a trust infrastructure layer
            for Nigerian social commerce.
          </p>
          <div className="about-avail fade-up-4">
            <span className="avail-dot" />
            <span><strong>Available for new projects</strong> — Q2–Q4 2026 · Limited spots</span>
          </div>
        </div>
      </section>

      {/* WHAT I HELP WITH */}
      <section className="os-section">
        <div className="os-container">
          <div className="reveal">
            <span className="os-label">// what i do</span>
            <h2 className="os-h2">The work I do<br />for clients.</h2>
          </div>
          <div className="help-grid">
            <div className="help-left reveal">
              <p>
                I do not just write code to spec. I <strong>think through the whole problem</strong> — the
                architecture, the edge cases, the deployment strategy — before writing a single line.
              </p>
              <p>
                Most developers build features. I build systems. There is a difference, and you feel it the
                moment you need to scale, add a team member, or change a core assumption.
              </p>
              <p>
                Here is what I help clients ship, from the first commit to production:
              </p>
            </div>
            <div className="help-items reveal" style={{ transitionDelay: '0.1s' }}>
              {helpItems.map((item, i) => (
                <div key={item.title} className="help-item">
                  <span className="help-num">{String(i + 1).padStart(2, '0')}</span>
                  <div className="help-item-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ENGINEERING PHILOSOPHY */}
      <section className="os-section">
        <div className="os-container">
          <div className="philosophy-inner reveal">
            <div className="philosophy-header">
              <div className="philosophy-header-left">
                <span className="os-label">// how i build</span>
                <h2 className="os-h2">I do not just code features.<br />I think in systems.</h2>
                <p>
                  Every technical decision I make is shaped by one question: <strong>will this hold up under
                  real conditions?</strong> Not demo conditions. Not tutorial conditions. Real users, real load,
                  real edge cases.
                </p>
                <p>
                  That mindset comes from building Zolarux — a product where a bad architectural decision means
                  a user&apos;s money gets stuck, a vendor cannot be verified, or a dispute cannot be resolved. The
                  stakes taught me to think before I type.
                </p>
              </div>
              <div className="philosophy-quote reveal" style={{ transitionDelay: '0.15s' }}>
                <p>
                  The best code solves a real problem, handles its edge cases gracefully, and does not surprise
                  the next engineer who reads it.
                </p>
                <cite>— Rex Orokumue</cite>
              </div>
            </div>
            <div className="principles-grid">
              {principles.map((p, i) => (
                <div key={p.title} className="principle reveal" style={{ transitionDelay: `${i * 0.09}s` }}>
                  <span className="principle-icon">{p.icon}</span>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BACKGROUND */}
      <section className="os-section">
        <div className="os-container">
          <div className="reveal">
            <span className="os-label">// experience</span>
            <h2 className="os-h2">Built by doing,<br />not by watching.</h2>
          </div>
          <div className="journey-grid">
            <div className="journey-text reveal">
              <p>
                I am a <strong>self-taught engineer</strong> who learned by shipping real systems — not just
                completing courses. My education happened in the gap between &ldquo;this does not work&rdquo; and &ldquo;now it
                does,&rdquo; repeated enough times to build genuine intuition.
              </p>
              <p>
                Over the past few years I have shipped multiple production apps across web and mobile —
                designing everything from <strong>authentication flows</strong> to backend logic, real-time
                systems, and deployment pipelines.
              </p>
              <p>
                Being self-taught did not give me shortcuts. It gave me <strong>problem-solving depth</strong>.
                When something breaks in production, I do not reach for a tutorial. I read the error, trace the
                system, and fix it.
              </p>
              <p>
                That is the kind of engineering mindset I bring to every project.
              </p>
            </div>
            <div className="journey-milestones reveal" style={{ transitionDelay: '0.1s' }}>
              {milestones.map((m) => (
                <div key={m.title} className="milestone">
                  <div className="milestone-left">
                    <div className="milestone-dot" />
                    <div className="milestone-line" />
                  </div>
                  <div className="milestone-content">
                    <div className="milestone-year">{m.year}</div>
                    <h4>{m.title}</h4>
                    <p>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT FOCUS */}
      <section className="os-section">
        <div className="os-container">
          <div className="reveal">
            <span className="os-label">// current focus</span>
            <h2 className="os-h2">What I bring<br />to a team or project.</h2>
          </div>
          <div className="focus-grid">
            <div className="focus-card reveal">
              <span className="focus-card-label">// product engineering</span>
              <h3>Building end-to-end systems</h3>
              <p>
                I design and ship full-stack products — mobile, web, and backend — with a focus on
                <strong> trust, security, and scalability</strong>. From authentication flows to payment
                integrations, I handle the full engineering lifecycle without handing off the hard parts.
              </p>
              <div className="focus-note">
                <strong>Currently available</strong> for full-time roles, contracts, and serious freelance engagements — Q2 2026.
              </div>
            </div>
            <div className="focus-card reveal" style={{ transitionDelay: '0.1s' }}>
              <span className="focus-card-label">// what i bring</span>
              <h3>Founder-grade ownership</h3>
              <p>
                I have shipped production software solo — architecture, implementation, deployment, and
                iteration. That means I do not need to be managed through every decision. I take
                <strong> ownership of outcomes</strong>, not just tasks.
              </p>
              <div className="focus-note">
                <strong>Limited availability.</strong> I take on a small number of commitments at once to ensure every project gets genuine attention and care.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE STACK */}
      <section className="os-section">
        <div className="os-container">
          <div className="reveal">
            <span className="os-label">// core stack</span>
            <h2 className="os-h2">The tools I reach<br />for in production.</h2>
          </div>
          <div className="stack-grid">
            {stackGroups.map((group, i) => (
              <div key={group.label} className="stack-group reveal" style={{ transitionDelay: `${i * 0.09}s` }}>
                <span className="stack-group-label">{group.label.toLowerCase()}</span>
                <div className="stack-items">
                  {group.items.map(item => (
                    <span key={item} className="stack-pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK TEASER */}
      <section className="os-section">
        <div className="os-container">
          <div className="reveal">
            <span className="os-label">// selected work</span>
            <h2 className="os-h2">Some of what<br />I have shipped.</h2>
          </div>
          <div className="work-teaser-grid">
            <a href="/projects/zolarux" className="work-teaser-card reveal">
              <span className="work-teaser-tag">Flutter · Supabase</span>
              <h3>Zolarux — Trust Layer for Social Commerce</h3>
              <p>
                End-to-end marketplace with escrow payments, vendor verification, risk scoring, and
                dispute mediation. Built and launched solo.
              </p>
              <div className="work-teaser-footer">
                <div className="work-teaser-pills">
                  <span className="work-teaser-pill">Live</span>
                  <span className="work-teaser-pill">Payments</span>
                  <span className="work-teaser-pill">RLS</span>
                </div>
                <span className="work-teaser-arrow">View →</span>
              </div>
            </a>
            <a href="/projects" className="work-teaser-card reveal" style={{ transitionDelay: '0.08s' }}>
              <span className="work-teaser-tag">Flutter · Dart</span>
              <h3>EduPanion — Phonics &amp; Literacy Assessment Tool</h3>
              <p>
                Interactive reading assessment app for primary school students. Offline-first,
                optimised for low-bandwidth environments.
              </p>
              <div className="work-teaser-footer">
                <div className="work-teaser-pills">
                  <span className="work-teaser-pill">Flutter</span>
                  <span className="work-teaser-pill">Offline-first</span>
                </div>
                <span className="work-teaser-arrow">View →</span>
              </div>
            </a>
            <a href="/projects" className="work-teaser-card reveal" style={{ transitionDelay: '0.16s' }}>
              <span className="work-teaser-tag">Flutter · Firebase</span>
              <h3>Admin Command Center — Real-Time Ops Dashboard</h3>
              <p>
                Role-based operations dashboard for monitoring vendor risk scores, processing orders,
                and managing flagged accounts in real-time.
              </p>
              <div className="work-teaser-footer">
                <div className="work-teaser-pills">
                  <span className="work-teaser-pill">Real-time</span>
                  <span className="work-teaser-pill">RBAC</span>
                </div>
                <span className="work-teaser-arrow">View →</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="os-section">
        <div className="os-container">
          <div className="about-cta-inner reveal">
            <div className="about-cta-text">
              <span className="os-label">// contact</span>
              <h2>If you are building something ambitious and need an engineer who thinks in systems — let us talk.</h2>
              <p>
                Open to freelance projects, product consulting, and technical co-founding. Tell me what you are
                building and let us figure out if we are a good fit.
              </p>
            </div>
            <div className="about-cta-actions">
              <a href="mailto:gorokumue@gmail.com" className="os-btn os-btn-primary">Work With Me</a>
              <a href="/projects" className="os-btn">See My Work →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
