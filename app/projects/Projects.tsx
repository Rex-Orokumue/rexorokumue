'use client';

import { useState, useEffect } from 'react';

const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --green: #4ade80;
    }

    html { scroll-behavior: smooth; }

    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

    .fade-up-1 { animation: fadeUp 0.55s 0.05s ease both; }
    .fade-up-2 { animation: fadeUp 0.55s 0.12s ease both; }
    .fade-up-3 { animation: fadeUp 0.55s 0.20s ease both; }
    .fade-up-4 { animation: fadeUp 0.55s 0.28s ease both; }

    section { position: relative; z-index: 1; }

    /* ── HERO ── */
    .projects-hero {
      padding-top: 140px; padding-bottom: 56px;
    }
    .projects-headline {
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(2rem, 5vw, 3.6rem);
      font-weight: 700; line-height: 1.08; letter-spacing: -0.02em; color: var(--text);
    }
    .projects-headline .dim { color: var(--muted); }
    .projects-sub {
      margin-top: 18px; font-size: 0.95rem; line-height: 1.75;
      color: var(--muted); max-width: 520px;
    }
    .projects-sub strong { color: var(--text); font-weight: 500; }
    .filter-bar { display: flex; align-items: center; gap: 8px; margin-top: 32px; flex-wrap: wrap; }
    .filter-btn {
      padding: 5px 14px; border-radius: 6px; border: 1px solid var(--border);
      background: transparent; font-size: 0.72rem; color: var(--muted);
      cursor: pointer; transition: all 0.15s;
      font-family: 'JetBrains Mono', monospace; letter-spacing: 0.03em;
    }
    .filter-btn:hover { border-color: var(--accent); color: var(--text); }
    .filter-btn.active { background: var(--accent); border-color: var(--accent); color: var(--accent-ink); font-weight: 600; }

    /* ── FEATURED PROJECT ── */
    .featured-section { padding: 56px 0 0; }
    .featured-inner {
      border-radius: 10px; border: 1px solid var(--border);
      background: var(--panel); overflow: hidden;
    }
    .featured-top { display: grid; grid-template-columns: 1fr 1fr; gap: 0; align-items: stretch; }
    .featured-img { position: relative; overflow: hidden; min-height: 340px; }
    .featured-img img { width: 100%; height: 100%; object-fit: cover; }
    .featured-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to right, transparent 60%, rgba(10,10,10,0.55));
    }
    .featured-live-badge {
      position: absolute; top: 16px; left: 16px;
      display: flex; align-items: center; gap: 7px;
      padding: 4px 12px; border-radius: 6px;
      background: var(--panel); border: 1px solid var(--ok);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem; color: var(--ok); letter-spacing: 0.05em;
    }
    .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--ok); flex-shrink: 0; }
    .featured-content { padding: 44px 40px; display: flex; flex-direction: column; justify-content: center; }
    .featured-flag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.62rem; color: var(--muted); margin-bottom: 14px; display: block;
      letter-spacing: 0.04em;
    }
    .featured-content h2 {
      font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.35rem, 2vw, 1.75rem);
      font-weight: 700; color: var(--text); line-height: 1.18; margin-bottom: 12px;
    }
    .featured-tagline { font-size: 0.875rem; color: var(--muted); line-height: 1.7; margin-bottom: 24px; }

    /* PS blocks */
    .ps-blocks { display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; }
    .ps-block { padding: 14px 16px; border-radius: 8px; border: 1px solid var(--border); background: var(--panel-2); }
    .ps-block-label { font-family: 'JetBrains Mono', monospace; font-size: 0.60rem; letter-spacing: 0.08em; text-transform: lowercase; margin-bottom: 6px; display: block; }
    .ps-block-label.problem { color: #F87171; }
    .ps-block-label.solution { color: var(--ok); }
    .ps-block p { font-size: 0.82rem; line-height: 1.6; color: var(--muted); }

    /* Impact row */
    .impact-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin-bottom: 24px; }
    .impact-stat { padding: 12px 10px; border-radius: 8px; text-align: center; border: 1px solid var(--border); background: var(--panel-2); }
    .impact-val { font-family: 'JetBrains Mono', monospace; font-size: 1.15rem; font-weight: 700; color: var(--accent); line-height: 1; display: block; }
    .impact-label { font-size: 0.63rem; color: var(--muted); margin-top: 4px; display: block; }

    /* Stack row */
    .stack-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 24px; }
    .stack-chip {
      padding: 3px 10px; border-radius: 5px; background: transparent;
      border: 1px solid var(--border); font-family: 'JetBrains Mono', monospace;
      font-size: 0.63rem; color: var(--muted);
    }

    .featured-actions { display: flex; gap: 8px; flex-wrap: wrap; }

    .featured-why { border-top: 1px solid var(--border); padding: 22px 40px; display: flex; align-items: flex-start; gap: 16px; background: var(--panel-2); }
    .why-icon { width: 32px; height: 32px; flex-shrink: 0; border-radius: 8px; background: transparent; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 0.95rem; }
    .why-text p { font-size: 0.82rem; line-height: 1.7; color: var(--muted); }
    .why-text p strong { color: var(--text); font-weight: 500; }

    /* ── SUPPORTING PROJECTS ── */
    .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 28px; }
    .proj-card {
      border-radius: 10px; overflow: hidden;
      background: var(--panel); border: 1px solid var(--border);
      display: flex; flex-direction: column;
      transition: border-color 0.2s;
    }
    .proj-card:hover { border-color: var(--accent); }
    .proj-img { position: relative; height: 180px; overflow: hidden; }
    .proj-img img { width: 100%; height: 100%; object-fit: cover; }
    .proj-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%); }
    .proj-tech-badge {
      position: absolute; top: 12px; right: 12px; padding: 3px 10px;
      border-radius: 5px; background: var(--panel); border: 1px solid var(--border);
      font-family: 'JetBrains Mono', monospace; font-size: 0.60rem; color: var(--muted);
    }
    .proj-tech-badge--design { border-color: var(--accent); color: var(--accent); background: var(--panel); }
    .proj-outcome--design { color: var(--accent); }
    .proj-body { padding: 22px; flex: 1; display: flex; flex-direction: column; }
    .proj-category {
      font-family: 'JetBrains Mono', monospace; font-size: 0.60rem; color: var(--muted);
      margin-bottom: 8px; letter-spacing: 0.04em;
    }
    .proj-body h3 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.95rem; color: var(--text); margin-bottom: 6px; }
    .proj-problem { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: #F87171; margin-bottom: 8px; line-height: 1.5; }
    .proj-desc { font-size: 0.82rem; line-height: 1.65; color: var(--muted); flex: 1; }
    .proj-outcome { display: flex; align-items: center; gap: 7px; margin-top: 10px; font-size: 0.78rem; color: var(--ok); line-height: 1.4; }
    .proj-outcome-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--ok); flex-shrink: 0; }
    .proj-chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 14px; }
    .proj-chip {
      padding: 2px 8px; border-radius: 4px; background: transparent;
      border: 1px solid var(--border);
      font-family: 'JetBrains Mono', monospace; font-size: 0.60rem; color: var(--muted);
    }
    .proj-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border); gap: 8px; }
    .proj-links { display: flex; gap: 8px; flex-wrap: wrap; }

    /* ── OTHER WORK (WordPress) ── */
    .other-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 28px; }
    .other-card {
      padding: 22px 20px; border-radius: 10px;
      border: 1px solid var(--border); background: var(--panel);
      text-decoration: none; display: flex; flex-direction: column; gap: 8px;
      transition: border-color 0.2s;
    }
    .other-card:hover { border-color: var(--accent); }
    .other-card-top { display: flex; align-items: center; justify-content: space-between; }
    .other-tag { font-family: 'JetBrains Mono', monospace; font-size: 0.60rem; color: var(--muted); }
    .other-platform {
      font-family: 'JetBrains Mono', monospace; font-size: 0.60rem; color: var(--muted);
      padding: 2px 7px; border-radius: 4px;
      border: 1px solid var(--border); background: transparent;
    }
    .other-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: 0.9rem; font-weight: 700; color: var(--text); line-height: 1.3; }
    .other-card p { font-size: 0.78rem; color: var(--muted); line-height: 1.55; flex: 1; }
    .other-card-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 10px; border-top: 1px solid var(--border); margin-top: 4px; }
    .other-chips { display: flex; gap: 5px; flex-wrap: wrap; }
    .other-chip {
      padding: 2px 7px; border-radius: 4px; background: transparent;
      border: 1px solid var(--border);
      font-family: 'JetBrains Mono', monospace; font-size: 0.60rem; color: var(--muted);
    }
    .other-link { font-family: 'JetBrains Mono', monospace; font-size: 0.66rem; color: var(--accent); flex-shrink: 0; }

    /* ── HOW I BUILD ── */
    .approach-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-radius: 10px; overflow: hidden; border: 1px solid var(--border); background: var(--panel); }
    .approach-left { padding: 44px 40px; border-right: 1px solid var(--border); }
    .approach-left p { margin-top: 16px; font-size: 0.9rem; line-height: 1.8; color: var(--muted); }
    .approach-left p strong { color: var(--text); font-weight: 500; }
    .approach-right { padding: 44px 40px; }
    .approach-steps { display: flex; flex-direction: column; gap: 0; }
    .approach-step { display: flex; gap: 16px; padding-bottom: 24px; }
    .approach-step:last-child { padding-bottom: 0; }
    .step-left { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
    .step-num-box {
      width: 32px; height: 32px; border-radius: 7px; background: transparent;
      border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
      font-family: 'JetBrains Mono', monospace; font-size: 0.65rem; font-weight: 700;
      color: var(--accent); flex-shrink: 0;
    }
    .step-connector { width: 1px; flex: 1; min-height: 20px; margin-top: 6px; background: var(--border); }
    .approach-step:last-child .step-connector { display: none; }
    .step-content { padding-top: 4px; }
    .step-content h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.85rem; color: var(--text); margin-bottom: 4px; }
    .step-content p { font-size: 0.78rem; color: var(--muted); line-height: 1.55; }

    /* ── CTA ── */
    .projects-cta-inner { border-radius: 10px; border: 1px solid var(--border); background: var(--panel); padding: 72px 60px; text-align: center; }
    .projects-cta-inner h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.7rem, 3vw, 2.5rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 14px; }
    .projects-cta-inner > p { font-size: 0.9rem; color: var(--muted); max-width: 480px; margin: 0 auto 36px; line-height: 1.75; }
    .cta-buttons { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .cta-scarcity {
      display: inline-flex; align-items: center; gap: 8px;
      margin-bottom: 28px; padding: 7px 16px;
      border-radius: 6px; border: 1px solid var(--border);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.66rem; color: var(--muted);
    }
    .cta-scarcity-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--ok); flex-shrink: 0; }

    /* ── FOOTER ── */
    footer { position: relative; z-index: 1; border-top: 1px solid var(--border); padding: 28px 0; display: flex; align-items: center; justify-content: space-between; }
    .footer-left p { font-family: 'JetBrains Mono', monospace; font-size: 0.70rem; color: var(--muted); }
    .footer-left p span { color: var(--accent); }
    .footer-links { display: flex; gap: 24px; }
    .footer-links a { font-family: 'JetBrains Mono', monospace; font-size: 0.70rem; color: var(--muted); text-decoration: none; transition: color 0.15s; }
    .footer-links a:hover { color: var(--text); }

    /* ── RESPONSIVE ── */
    @media (max-width: 1024px) {
      footer { flex-direction: column; gap: 14px; text-align: center; }
      .featured-top { grid-template-columns: 1fr; }
      .featured-img { min-height: 240px; }
      .featured-img-overlay { background: linear-gradient(to top, var(--bg) 0%, transparent 60%); }
      .featured-content { padding: 32px 28px; }
      .featured-why { padding: 20px 28px; }
      .projects-grid { grid-template-columns: 1fr 1fr; }
      .other-grid { grid-template-columns: 1fr 1fr; }
      .approach-inner { grid-template-columns: 1fr; }
      .approach-left { border-right: none; border-bottom: 1px solid var(--border); padding: 36px 28px; }
      .approach-right { padding: 36px 28px; }
      .projects-cta-inner { padding: 52px 32px; }
    }
    @media (max-width: 640px) {
      html, body { overflow-x: hidden; max-width: 100vw; }
      .projects-hero { padding-top: 110px; padding-bottom: 40px; }
      .projects-headline { font-size: 2rem; }
      .projects-sub { font-size: 0.875rem; }
      .filter-bar { margin-top: 24px; }
      .featured-content { padding: 20px 16px; }
      .featured-why { padding: 16px; flex-direction: column; gap: 10px; }
      .featured-actions { flex-direction: column; }
      .impact-row { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 6px; }
      .projects-grid { grid-template-columns: 1fr; }
      .other-grid { grid-template-columns: 1fr; }
      .approach-left, .approach-right { padding: 22px 16px; }
      .projects-cta-inner { padding: 40px 18px; }
      .cta-buttons { flex-direction: column; align-items: center; }
      .cta-buttons .os-btn-primary,
      .cta-buttons .os-btn { width: 100%; justify-content: center; }
      footer { padding: 20px 0; }
    }
  `}</style>
);

function useReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const IconExternal = () => (
  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
    <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconGithub = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const filters = ['All', 'Mobile', 'Web', 'Full-Stack'];

const supportingProjects = [
  {
    id: 2,
    slug: 'edupanion',
    name: 'EduPanion — Phonics & Literacy Assessment Tool',
    category: 'Mobile · EdTech',
    tech: 'Flutter',
    problem: 'No structured phonics and literacy assessment tool built for Nigerian classroom teachers',
    desc: 'Smart literacy assessment and progress tracking for Nigerian classroom teachers. Run weekly phonics and English assessments, monitor student growth across six levels (Nursery to Senior Secondary), and get actionable insights — all offline-capable.',
    outcome: 'Built and ready for deployment — currently seeking school partnerships.',
    chips: ['Flutter', 'Dart', 'Offline-first', 'EdTech'],
    image: '/edupanion-screenshot.jpeg',
    liveUrl: '#',
    githubUrl: 'https://github.com/Rex-Orokumue/edupanion',
    tags: ['Mobile', 'Web'],
    status: 'live',
  },
  {
    id: 3,
    slug: 'zolarux-admin',
    name: 'Zolarux Admin Control Center',
    category: 'Mobile · Web · Desktop · Operations',
    tech: 'Flutter',
    problem: 'No centralised dashboard for managing vendors, orders and risk flags in real-time',
    desc: 'Role-based operations dashboard for monitoring vendor risk scores, managing order pipelines, reviewing stolen-device flags, and handling dispute escalations — available on mobile, web, and Windows desktop.',
    outcome: 'Cut average dispute response time from 48hrs to under 4hrs.',
    chips: ['Flutter', 'Firebase', 'Firestore', 'RBAC', 'Realtime', 'Windows'],
    image: '/zolarux-admin.png',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['Mobile', 'Full-Stack'],
    status: 'live',
  },
  {
    id: 4,
    slug: 'escrowpay-engine',
    name: 'Zolarux FinTech Engine',
    category: 'Mobile · FinTech · In Design',
    tech: 'Figma → Flutter',
    problem: 'Buyers need a secure, embedded wallet to transact directly inside the Zolarux app',
    desc: 'A comprehensive embedded finance layer for the Zolarux ecosystem — powering wallet infrastructure, transaction routing, and balance management. Currently in interface design; the engine will be built into the Zolarux buyer app as an integrated FinTech layer.',
    outcome: 'Interface design in progress on Figma — engineering phase starting soon.',
    chips: ['Figma', 'Flutter', 'Wallet', 'Payments', 'FinTech'],
    image: '/escrowpay-engine.jpeg',
    liveUrl: null,
    githubUrl: null,
    tags: ['Mobile', 'Full-Stack'],
    status: 'in-design',
  },
  {
    id: 5,
    slug: 'e-technix',
    name: 'E-Technix',
    category: 'Web · Education · Live',
    tech: 'Next.js · TypeScript',
    problem: 'People want to break into tech but most training programmes teach theory without practical, job-ready skills',
    desc: 'A digital training platform offering practical courses in web development, mobile app development, AI & agentic systems, data analytics, product design, and business development. Built for people who want to learn by doing — not just studying.',
    outcome: 'Platform live and accepting registrations for digital training programmes.',
    chips: ['Next.js', 'TypeScript', 'EdTech', 'Web'],
    image: '/e-technix.png',
    liveUrl: 'https://e-technix.com',
    githubUrl: 'https://github.com/Rex-Orokumue/e-technix',
    tags: ['Web', 'Full-Stack'],
    status: 'live',
  },
];

const wordpressProjects = [
  {
    name: 'GTech Mobiles',
    tag: 'E-commerce · Tech Retail',
    desc: 'Full e-commerce site for a mobile device repair and sales business — product listings, shop, cart, service pages, and WhatsApp-integrated contact flow.',
    chips: ['WooCommerce', 'Custom Theme', 'E-commerce'],
    url: 'https://www.gtechmobiles.com.ng/',
  },
  {
    name: 'First Queen Nigeria',
    tag: 'Events · Beauty Pageant',
    desc: "Website for Nigeria's prestigious women's beauty pageant — celebrating Nigerian women through empowerment, leadership development, and community impact. Built to handle registrations and brand storytelling.",
    chips: ['WordPress', 'Custom Design', 'Events'],
    url: 'https://www.firstqueennigeria.com.ng/',
  },
  {
    name: 'Oshare Mega',
    tag: 'Events · Ticketing',
    desc: 'Event platform and ticketing site for a Nigerian entertainment brand — home to events like Nigeria at 50, Christmas Fever, and the Oversabi Aunty Saga. Built for discovery, promotion, and ticket sales.',
    chips: ['WordPress', 'WooCommerce', 'Ticketing'],
    url: 'https://osharemega.com/',
  },
];

const approachSteps = [
  { n: '01', title: 'Architecture before UI', desc: 'Data models, API contracts, and auth strategy are defined before a single screen is designed.' },
  { n: '02', title: 'Secure authentication flows', desc: 'JWT, RLS policies, and role-based access — built in from day one, not bolted on later.' },
  { n: '03', title: 'Scalable database design', desc: 'Relational schemas with proper normalisation, indexing, and query performance in mind.' },
  { n: '04', title: 'Production-ready deployment', desc: 'CI/CD pipelines, edge deployment, environment separation — built to survive real traffic.' },
  { n: '05', title: 'Clean, maintainable code', desc: 'Written to be understood by the next developer, not just to work today.' },
];

export default function Projects() {
  useReveal();
  const [activeFilter, setActiveFilter] = useState('All');

  const visible = activeFilter === 'All'
    ? supportingProjects
    : supportingProjects.filter(p => p.tags.includes(activeFilter));

  return (
    <>
      <GlobalStyles />

      {/* HERO */}
      <section>
        <div className="os-container projects-hero">
          <span className="os-label fade-up-1">// selected work</span>
          <h1 className="projects-headline fade-up-2">
            Real Products.{' '}
            <span className="dim">Real Users.</span>{' '}
            <span className="dim">Real Architecture.</span>
          </h1>
          <p className="projects-sub fade-up-3">
            Not a gallery — a <strong>track record</strong>. Every project here was built to solve a
            specific problem, deployed to real users, and engineered to last beyond launch day.
          </p>
          <div className="filter-bar fade-up-4">
            {filters.map(f => (
              <button key={f} className={`filter-btn${activeFilter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED — ZOLARUX */}
      <section className="featured-section">
        <div className="os-container">
          <span className="os-label">// flagship project</span>
          <div className="featured-inner">
            <div className="featured-top">
              <div className="featured-img">
                <img src="/zolarux-marketplace.jpeg" alt="Zolarux Marketplace" loading="eager" />
                <div className="featured-img-overlay" />
                <div className="featured-live-badge"><span className="live-dot" /> live in production</div>
              </div>
              <div className="featured-content">
                <span className="featured-flag">full-stack · mobile + web</span>
                <h2>Zolarux — Trust Infrastructure<br />for Social Commerce</h2>
                <p className="featured-tagline">
                  A marketplace platform built to enable secure, verifiable transactions between vendors
                  and buyers in the Nigerian social commerce market.
                </p>
                <div className="ps-blocks">
                  <div className="ps-block">
                    <span className="ps-block-label problem">// the problem</span>
                    <p>Social commerce transactions in Nigeria lack structured trust systems — leading to fraud, unresolved disputes, and vendor impersonation with no recourse for buyers.</p>
                  </div>
                  <div className="ps-block">
                    <span className="ps-block-label solution">// the solution</span>
                    <p>A verification-based marketplace with escrow-style payments, multi-step vendor onboarding, risk scoring, real-time transaction tracking, and structured dispute mediation.</p>
                  </div>
                </div>
                <div className="impact-row">
                  <div className="impact-stat"><span className="impact-val">30+</span><span className="impact-label">Verified vendors</span></div>
                  <div className="impact-stat"><span className="impact-val">140+</span><span className="impact-label">Active products</span></div>
                  <div className="impact-stat"><span className="impact-val">100+</span><span className="impact-label">Transactions</span></div>
                  <div className="impact-stat"><span className="impact-val">₦2M+</span><span className="impact-label">Processed since 2021</span></div>
                </div>
                <div className="stack-row">
                  {['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'RLS', 'Supabase Auth', 'REST API', 'Vercel'].map(s => (
                    <span key={s} className="stack-chip">{s}</span>
                  ))}
                </div>
                <div className="featured-actions">
                  <a href="https://zolarux.com.ng" target="_blank" rel="noopener noreferrer" className="os-btn os-btn-primary">View Live <IconExternal /></a>
                  <a href="/projects/zolarux-marketplace" className="os-btn">Case Study →</a>
                  <a href="#" className="os-btn"><IconGithub /> GitHub</a>
                </div>
              </div>
            </div>
            <div className="featured-why">
              <div className="why-icon">💡</div>
              <div className="why-text">
                <p>
                  <strong>Why this matters for clients:</strong> Zolarux demonstrates the ability to design
                  and implement trust-based financial logic — escrow flows, risk scoring, role-based access,
                  and dispute resolution — not just front-end interfaces. If your product handles money,
                  identity, or sensitive user data, this is the kind of engineering it requires.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORTING PROJECTS */}
      <section className="os-section">
        <div className="os-container">
          <span className="os-label">// more work</span>
          <h2 className="os-h2">Other projects worth your time.</h2>
          <div className="projects-grid">
            {visible.map((proj) => (
              <div key={proj.id} className="proj-card">
                <div className="proj-img">
                  <img src={proj.image} alt={proj.name} loading="lazy" />
                  <div className="proj-img-overlay" />
                  <span className={`proj-tech-badge${proj.status === 'in-design' ? ' proj-tech-badge--design' : ''}`}>
                    {proj.status === 'in-design' ? 'in design' : proj.tech}
                  </span>
                </div>
                <div className="proj-body">
                  <div className="proj-category">{proj.category}</div>
                  <h3>{proj.name}</h3>
                  <div className="proj-problem">problem → {proj.problem}</div>
                  <p className="proj-desc">{proj.desc}</p>
                  <div className={`proj-outcome${proj.status === 'in-design' ? ' proj-outcome--design' : ''}`}>
                    <span className="proj-outcome-dot" style={proj.status === 'in-design' ? { background: 'var(--accent)' } : {}} />
                    {proj.outcome}
                  </div>
                  <div className="proj-chips">{proj.chips.map(c => <span key={c} className="proj-chip">{c}</span>)}</div>
                  <div className="proj-footer">
                    <div className="proj-links">
                      {proj.status === 'in-design' ? (
                        <>
                          <span className="os-btn" style={{ color: 'var(--accent)', borderColor: 'var(--accent)', cursor: 'default' }}>designing</span>
                          <a href={`/projects/${proj.slug}`} className="os-btn">Case Study →</a>
                        </>
                      ) : (
                        <>
                          <a href={proj.liveUrl ?? '#'} className="os-btn os-btn-primary">Live <IconExternal /></a>
                          <a href={`/projects/${proj.slug}`} className="os-btn">Case Study →</a>
                          <a href={proj.githubUrl ?? '#'} className="os-btn"><IconGithub /> GitHub</a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORDPRESS / OTHER WORK */}
      <section className="os-section" style={{ paddingTop: 0 }}>
        <div className="os-container">
          <span className="os-label">// other work</span>
          <h2 className="os-h2">WordPress builds for real businesses.</h2>
          <div className="other-grid">
            {wordpressProjects.map((proj) => (
              <a
                key={proj.name}
                href={proj.url}
                target="_blank"
                rel="noopener noreferrer"
                className="other-card"
              >
                <div className="other-card-top">
                  <span className="other-tag">{proj.tag}</span>
                  <span className="other-platform">WordPress</span>
                </div>
                <h3>{proj.name}</h3>
                <p>{proj.desc}</p>
                <div className="other-card-footer">
                  <div className="other-chips">{proj.chips.map(c => <span key={c} className="other-chip">{c}</span>)}</div>
                  <span className="other-link">Visit →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* HOW I BUILD */}
      <section className="os-section" style={{ paddingTop: 0 }}>
        <div className="os-container">
          <span className="os-label">// development approach</span>
          <h2 className="os-h2" style={{ marginBottom: '1.5rem' }}>Every project. Same standard.</h2>
          <div className="approach-inner">
            <div className="approach-left">
              <p>
                I do not build differently based on the size of the project. Whether it is an MVP or a
                scaling product, the <strong>architecture, security, and deployment discipline stay the same</strong>.
              </p>
              <p style={{ marginTop: '14px' }}>
                That is what makes software maintainable. That is what protects your users. And that is what
                keeps the codebase from becoming a liability six months later.
              </p>
            </div>
            <div className="approach-right">
              <div className="approach-steps">
                {approachSteps.map(step => (
                  <div key={step.n} className="approach-step">
                    <div className="step-left">
                      <div className="step-num-box">{step.n}</div>
                      <div className="step-connector" />
                    </div>
                    <div className="step-content">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="os-section">
        <div className="os-container">
          <div className="projects-cta-inner">
            <span className="os-label" style={{ textAlign: 'center' }}>// let's talk</span>
            <h2>Let's build something serious.</h2>
            <p>
              If you are building a product that needs structure, security, and long-term scalability —
              not just something that works today — let's talk.
            </p>
            <div className="cta-scarcity">
              <span className="cta-scarcity-dot" />
              I take on a limited number of projects each quarter. Currently accepting Q2 2026 work.
            </div>
            <div className="cta-buttons">
              <a href="mailto:hello@zolarux.com" className="os-btn os-btn-primary">Start a Project</a>
              <a href="/about" className="os-btn">Learn How I Work →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
