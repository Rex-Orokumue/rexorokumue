'use client';

import { useState, useEffect } from 'react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --primary:      #1E293B;
      --secondary:    #0F172A;
      --accent:       #3B82F6;
      --accent-dim:   rgba(59,130,246,0.10);
      --accent-glow:  rgba(59,130,246,0.30);
      --accent-light: #93C5FD;
      --text:         #F1F5F9;
      --muted:        #94A3B8;
      --muted-2:      #64748B;
      --border:       rgba(255,255,255,0.07);
      --border-hover: rgba(59,130,246,0.25);
      --card-bg:      rgba(30,41,59,0.55);
      --green:        #34D399;
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--secondary);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
      line-height: 1.6;
    }
    body::after {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 9999; opacity: 0.5;
    }
    .bg-mesh {
      position: fixed; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse 70% 50% at 10% 0%, rgba(59,130,246,0.13) 0%, transparent 60%),
        radial-gradient(ellipse 50% 60% at 90% 90%, rgba(59,130,246,0.07) 0%, transparent 55%),
        var(--secondary);
    }

    @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse  { 0%,100% { opacity:1; } 50% { opacity:0.45; } }

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
    .container { max-width: 1180px; margin: 0 auto; padding: 0 64px; }

    .section-tag {
      display: inline-block; font-size: 0.70rem; font-weight: 700;
      letter-spacing: 0.14em; text-transform: uppercase;
      color: var(--accent); margin-bottom: 14px;
    }
    .section-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.9rem, 3.5vw, 2.9rem);
      font-weight: 800; line-height: 1.1;
      letter-spacing: -0.025em; color: var(--text);
    }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 28px; background: var(--accent); color: #fff;
      border-radius: 8px; font-weight: 600; font-size: 0.875rem;
      text-decoration: none; letter-spacing: 0.02em;
      transition: all 0.25s; box-shadow: 0 4px 28px var(--accent-glow);
      border: 1px solid transparent; white-space: nowrap;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 36px var(--accent-glow); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; border: 1px solid var(--border);
      color: var(--text); border-radius: 8px; font-weight: 500; font-size: 0.875rem;
      text-decoration: none; transition: all 0.25s; background: transparent; white-space: nowrap;
    }
    .btn-ghost:hover { border-color: rgba(255,255,255,0.18); background: rgba(255,255,255,0.04); }
    .btn-outline {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 24px; border: 1px solid var(--accent-glow);
      color: var(--accent); border-radius: 8px; font-weight: 600; font-size: 0.875rem;
      text-decoration: none; transition: all 0.25s; background: var(--accent-dim); white-space: nowrap;
    }
    .btn-outline:hover { background: rgba(59,130,246,0.18); border-color: var(--accent); }

    /* ── HERO ── */
    .projects-hero {
      min-height: 52vh; display: flex; flex-direction: column;
      justify-content: flex-end; padding-top: 160px; padding-bottom: 80px;
    }
    .hero-label {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 6px 16px 6px 10px; border-radius: 100px;
      border: 1px solid var(--accent-glow); background: var(--accent-dim);
      font-size: 0.72rem; font-weight: 600; letter-spacing: 0.10em;
      text-transform: uppercase; color: var(--accent);
      margin-top: -60px;
      margin-bottom: 32px; width: fit-content;
    }
    .projects-headline {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 5vw, 4.2rem);
      font-weight: 800; line-height: 1.05;
      letter-spacing: -0.025em; color: var(--text);
      max-width: 100%;
    }
    .projects-headline .dim { color: var(--muted); display: block; }
    .projects-sub {
      margin-top: 24px; font-size: 1.05rem; line-height: 1.75;
      color: var(--muted); max-width: 520px; font-weight: 300;
    }
    .projects-sub strong { color: var(--text); font-weight: 500; }

    /* ── FILTER TABS ── */
    .filter-bar {
      display: flex; align-items: center; gap: 8px;
      margin-top: 48px; flex-wrap: wrap;
    }
    .filter-btn {
      padding: 7px 18px; border-radius: 100px;
      border: 1px solid var(--border); background: transparent;
      font-size: 0.78rem; font-weight: 500; color: var(--muted);
      cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif;
    }
    .filter-btn:hover { border-color: var(--accent-glow); color: var(--text); }
    .filter-btn.active {
      background: var(--accent-dim); border-color: var(--accent-glow);
      color: var(--accent); font-weight: 600;
    }

    /* ── FEATURED PROJECT ── */
    .featured-section { padding: 80px 0 0; }
    .featured-inner {
      border-radius: 24px; border: 1px solid var(--border);
      background: var(--card-bg); backdrop-filter: blur(16px);
      overflow: hidden; position: relative; min-width: 0;
    }
    .featured-inner::before {
      content: ''; position: absolute; top: -30%; right: -8%;
      width: 500px; height: 500px;
      background: radial-gradient(ellipse, rgba(59,130,246,0.08), transparent 70%);
      pointer-events: none;
    }
    .featured-top {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 0; align-items: stretch;
    }
    .featured-img {
      position: relative; overflow: hidden; min-height: 380px;
    }
    .featured-img img {
      width: 100%; height: 100%; object-fit: cover;
      transition: transform 0.6s ease;
    }
    .featured-inner:hover .featured-img img { transform: scale(1.04); }
    .featured-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to right, transparent 60%, rgba(15,23,42,0.6));
    }
    .featured-live-badge {
      position: absolute; top: 20px; left: 20px;
      display: flex; align-items: center; gap: 7px;
      padding: 6px 14px; border-radius: 100px;
      background: rgba(15,23,42,0.85); border: 1px solid var(--green);
      font-size: 0.70rem; font-weight: 600; color: var(--green);
      letter-spacing: 0.06em; text-transform: uppercase;
    }
    .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; }
    .featured-content { padding: 52px 48px; display: flex; flex-direction: column; justify-content: center; }
    .featured-flag {
      display: inline-block; font-size: 0.68rem; font-weight: 700;
      letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 14px;
    }
    .featured-content h2 {
      font-family: 'Syne', sans-serif; font-size: clamp(1.5rem, 2.5vw, 2rem);
      font-weight: 800; color: var(--text); line-height: 1.15; margin-bottom: 12px;
    }
    .featured-tagline { font-size: 0.9rem; color: var(--muted); line-height: 1.65; margin-bottom: 28px; }

    /* Problem / Solution blocks */
    .ps-blocks { display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
    .ps-block {
      padding: 16px 18px; border-radius: 10px; border: 1px solid var(--border);
      background: rgba(15,23,42,0.45);
    }
    .ps-block-label {
      font-size: 0.66rem; font-weight: 700; letter-spacing: 0.10em;
      text-transform: uppercase; margin-bottom: 6px;
    }
    .ps-block-label.problem { color: #F87171; }
    .ps-block-label.solution { color: var(--green); }
    .ps-block p { font-size: 0.82rem; line-height: 1.6; color: var(--muted); }

    /* Impact metrics */
    .impact-row {
      display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px; margin-bottom: 28px;
    }
    .impact-stat {
      padding: 12px 10px; border-radius: 10px; text-align: center;
      border: 1px solid var(--border); background: rgba(15,23,42,0.5);
    }
    .impact-val {
      font-family: 'Syne', sans-serif; font-size: clamp(1rem, 1.8vw, 1.25rem);
      font-weight: 800; color: var(--text); line-height: 1; display: block;
    }
    .impact-val em { color: var(--accent); font-style: normal; }
    .impact-label { font-size: 0.65rem; color: var(--muted); margin-top: 4px; display: block; }

    /* Stack pills */
    .stack-row { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 28px; }
    .stack-chip {
      padding: 4px 12px; border-radius: 6px;
      background: rgba(255,255,255,0.04); border: 1px solid var(--border);
      font-size: 0.72rem; color: var(--muted); font-weight: 500;
      white-space: nowrap;
    }

    .featured-actions { display: flex; gap: 10px; flex-wrap: wrap; }

    /* ── WHY IT MATTERS ── */
    .featured-why {
      border-top: 1px solid var(--border);
      padding: 28px 48px; display: flex; align-items: flex-start; gap: 20px;
    }
    .why-icon {
      width: 40px; height: 40px; flex-shrink: 0;
      border-radius: 10px; background: var(--accent-dim); border: 1px solid var(--accent-glow);
      display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
    }
    .why-text p { font-size: 0.84rem; line-height: 1.7; color: var(--muted); }
    .why-text p strong { color: var(--accent-light); font-weight: 500; }

    /* ── SUPPORTING PROJECTS ── */
    .projects-grid-section { padding: 64px 0 0; }
    .projects-grid {
      display: grid; grid-template-columns: repeat(2, 1fr);
      gap: 20px; margin-top: 40px;
    }
    .proj-card {
      border-radius: 18px; overflow: hidden; min-width: 0;
      background: var(--card-bg); border: 1px solid var(--border);
      backdrop-filter: blur(12px); display: flex; flex-direction: column;
      transition: all 0.3s cubic-bezier(0.25,0.8,0.25,1);
    }
    .proj-card:hover { transform: translateY(-4px); border-color: var(--border-hover); box-shadow: 0 20px 56px rgba(0,0,0,0.4); }
    .proj-img { position: relative; height: 200px; overflow: hidden; }
    .proj-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .proj-card:hover .proj-img img { transform: scale(1.06); }
    .proj-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(15,23,42,0.9) 0%, transparent 60%);
    }
    .proj-tech-badge {
      position: absolute; top: 14px; right: 14px;
      padding: 4px 12px; border-radius: 100px;
      background: rgba(15,23,42,0.88); border: 1px solid var(--border);
      font-size: 0.66rem; font-weight: 600; color: var(--muted); letter-spacing: 0.04em;
    }
    .proj-body { padding: 28px; flex: 1; display: flex; flex-direction: column; }
    .proj-category {
      font-size: 0.66rem; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--accent); margin-bottom: 10px;
    }
    .proj-body h3 {
      font-family: 'Syne', sans-serif; font-weight: 700;
      font-size: 1.05rem; color: var(--text); margin-bottom: 6px;
    }
    .proj-problem {
      font-size: 0.78rem; font-weight: 600; color: #F87171;
      margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
    }
    .proj-desc { font-size: 0.84rem; line-height: 1.65; color: var(--muted); flex: 1; }
    .proj-outcome {
      display: flex; align-items: center; gap: 8px;
      margin-top: 12px; font-size: 0.78rem; font-weight: 600;
      color: var(--green); line-height: 1.4;
    }
    .proj-outcome-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--green); flex-shrink: 0;
    }
    .proj-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
    .proj-chip {
      padding: 3px 10px; border-radius: 4px;
      background: var(--accent-dim); border: 1px solid var(--accent-glow);
      font-size: 0.65rem; color: var(--accent-light); font-weight: 500;
    }
    .proj-footer {
      display: flex; align-items: center; justify-content: space-between;
      margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border); gap: 8px;
    }
    .proj-links { display: flex; gap: 10px; }
    .proj-link {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 0.78rem; font-weight: 600; color: var(--accent);
      text-decoration: none; transition: gap 0.2s;
    }
    .proj-link:hover { gap: 8px; }
    .proj-link.ghost { color: var(--muted); font-weight: 500; }
    .proj-link.ghost:hover { color: var(--text); }

    /* ── HOW I BUILD ── */
    .approach-section { padding: 80px 0 0; }
    .approach-inner {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 0; border-radius: 20px; overflow: hidden;
      border: 1px solid var(--border); background: var(--card-bg); backdrop-filter: blur(16px);
    }
    .approach-left { padding: 56px 48px; border-right: 1px solid var(--border); }
    .approach-left p {
      margin-top: 20px; font-size: 1.0rem; line-height: 1.8; color: var(--muted);
    }
    .approach-left p strong { color: var(--text); font-weight: 500; }
    .approach-right { padding: 56px 48px; }
    .approach-steps { display: flex; flex-direction: column; gap: 0; }
    .approach-step {
      display: flex; gap: 18px; padding-bottom: 28px; position: relative;
    }
    .approach-step:last-child { padding-bottom: 0; }
    .step-left { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
    .step-num-box {
      width: 36px; height: 36px; border-radius: 9px;
      background: var(--accent-dim); border: 1px solid var(--accent-glow);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif; font-size: 0.72rem;
      font-weight: 800; color: var(--accent); flex-shrink: 0;
    }
    .step-connector {
      width: 1px; flex: 1; min-height: 24px; margin-top: 8px;
      background: linear-gradient(to bottom, var(--accent-glow), transparent);
    }
    .approach-step:last-child .step-connector { display: none; }
    .step-content { padding-top: 6px; }
    .step-content h4 {
      font-family: 'Syne', sans-serif; font-weight: 700;
      font-size: 0.88rem; color: var(--text); margin-bottom: 4px;
    }
    .step-content p { font-size: 0.78rem; color: var(--muted); line-height: 1.55; }

    /* ── CTA ── */
    .projects-cta-section { padding: 80px 0 140px; }
    .projects-cta-inner {
      border-radius: 24px; border: 1px solid var(--border);
      background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95));
      backdrop-filter: blur(24px); padding: 90px 80px;
      text-align: center; position: relative; overflow: hidden;
    }
    .projects-cta-inner::before {
      content: ''; position: absolute; top: -60%; left: 50%;
      transform: translateX(-50%); width: 70%; height: 300px;
      background: radial-gradient(ellipse, rgba(59,130,246,0.12), transparent 70%);
      pointer-events: none;
    }
    .projects-cta-inner h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.9rem, 3.5vw, 3rem);
      font-weight: 800; letter-spacing: -0.025em;
      line-height: 1.1; margin-bottom: 16px;
    }
    .projects-cta-inner > p {
      font-size: 1.0rem; color: var(--muted); max-width: 480px;
      margin: 0 auto 44px; line-height: 1.75; font-weight: 300;
    }
    .cta-buttons { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    .cta-scarcity {
      display: inline-flex; align-items: center; gap: 8px;
      margin-bottom: 32px; padding: 9px 18px; border-radius: 100px;
      border: 1px solid var(--border); background: rgba(255,255,255,0.04);
      font-size: 0.76rem; color: var(--muted); letter-spacing: 0.02em;
    }
    .cta-scarcity-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--green); animation: pulse 2s infinite; flex-shrink: 0;
    }

    /* ── FOOTER ── */
    footer {
      position: relative; z-index: 1;
      border-top: 1px solid var(--border);
      padding: 36px 64px; max-width: 1180px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
    }
    .footer-left p { font-size: 0.78rem; color: var(--muted-2); }
    .footer-left p span { color: var(--accent); }
    .footer-links { display: flex; gap: 28px; }
    .footer-links a { font-size: 0.78rem; color: var(--muted-2); text-decoration: none; transition: color 0.2s; }
    .footer-links a:hover { color: var(--text); }

    /* ── RESPONSIVE ── */
    @media (max-width: 1024px) {
      .container { padding: 0 28px; }
      footer { padding: 28px; flex-direction: column; gap: 16px; text-align: center; }
      .featured-top { grid-template-columns: 1fr; }
      .featured-img { min-height: 260px; }
      .featured-img-overlay { background: linear-gradient(to top, rgba(15,23,42,0.7), transparent); }
      .featured-content { padding: 36px 32px; }
      .featured-why { padding: 24px 32px; }
      .projects-grid { grid-template-columns: 1fr 1fr; }
      .approach-inner { grid-template-columns: 1fr; }
      .approach-left { border-right: none; border-bottom: 1px solid var(--border); padding: 40px 32px; }
      .approach-right { padding: 40px 32px; }
      .projects-cta-inner { padding: 64px 40px; }
      .featured-section    { padding-top: 60px; }
      .projects-grid-section { padding-top: 60px; }
      .approach-section    { padding-top: 60px; }
      .projects-cta-section { padding-top: 60px; }
    }
    @media (max-width: 640px) {
      /* Prevent page from overflowing horizontally */
      html, body { overflow-x: hidden; max-width: 100vw; }
      .container { padding: 0 20px; }
      .projects-hero { padding-top: 130px; padding-bottom: 60px; }
      .projects-headline { font-size: 2.1rem; letter-spacing: -0.02em; }
      .projects-sub { font-size: 0.92rem; margin-top: 18px; }
      .filter-bar { margin-top: 32px; }

      /* Featured card — prevent overflow */
      .featured-inner { border-radius: 16px; }
      .featured-content { padding: 24px 18px; }
      .featured-why { padding: 18px; flex-direction: column; gap: 12px; }
      .featured-actions { flex-direction: column; }
      .featured-actions .btn-primary,
      .featured-actions .btn-outline,
      .featured-actions .btn-ghost { width: 100%; justify-content: center; }
      .stack-row { gap: 6px; }

      /* Impact — 2x2, no overflow */
      .impact-row { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
      .impact-val { font-size: 1rem; }

      /* Supporting projects — single column */
      .projects-grid { grid-template-columns: 1fr; }

      /* Approach */
      .approach-left, .approach-right { padding: 24px 18px; }

      /* CTA */
      .projects-cta-inner { padding: 48px 20px; }
      .cta-scarcity { font-size: 0.70rem; text-align: center; }
      .cta-buttons { flex-direction: column; align-items: center; }
      .cta-buttons .btn-primary,
      .cta-buttons .btn-ghost { width: 100%; justify-content: center; }

      /* Footer */
      footer { padding: 24px 20px; }

      /* Section spacing */
      .featured-section     { padding-top: 40px; }
      .projects-grid-section { padding-top: 40px; }
      .approach-section     { padding-top: 40px; }
      .projects-cta-section { padding-top: 40px; padding-bottom: 80px; }
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
  <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
    <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconGithub = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const filters = ['All', 'Mobile', 'Web', 'Full-Stack'];

const supportingProjects = [
  {
    id: 2,
    name: 'Phonics Assessment Tool',
    category: 'Web · EdTech',
    tech: 'Next.js',
    problem: 'No structured reading assessment tool built for Nigerian classrooms',
    desc: 'An interactive 30-word reading diagnostic app for primary school students. Designed for offline-first usage in low-bandwidth environments, with per-student progress tracking and teacher-facing reports.',
    outcome: 'Piloted in 3 classrooms across Lagos — currently in active use.',
    chips: ['Next.js', 'TypeScript', 'React', 'Edge Deploy'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['Web'],
  },
  {
    id: 3,
    name: 'Admin Command Center',
    category: 'Mobile · Operations',
    tech: 'Flutter',
    problem: 'No centralised dashboard for managing vendors, orders and risk flags in real-time',
    desc: 'Role-based operations dashboard for monitoring vendor risk scores, managing order pipelines, reviewing stolen-device flags, and handling dispute escalations — all in real-time with Firebase Firestore.',
    outcome: 'Cut average dispute response time from 48hrs to under 4hrs.',
    chips: ['Flutter', 'Firebase', 'Firestore', 'RBAC', 'Realtime'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80',
    liveUrl: '#',
    githubUrl: '#',
    tags: ['Mobile', 'Full-Stack'],
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
      <div className="bg-mesh" aria-hidden="true" />

      {/* ══ HERO ══ */}
      <section>
        <div className="container projects-hero">
          <div className="hero-label fade-up-1">Selected Work</div>
          <h1 className="projects-headline fade-up-2">
            Real Products.<br />
            <span className="dim">Real Users.</span><br />
            <span className="dim">Real Architecture.</span>
          </h1>
          <p className="projects-sub fade-up-3">
            Not a gallery — a <strong>track record</strong>. Every project here was built to solve a
            specific problem, deployed to real users, and engineered to last beyond launch day.
          </p>

          {/* Filter tabs */}
          <div className="filter-bar fade-up-4">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn${activeFilter === f ? ' active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROJECT — ZOLARUX ══ */}
      <section className="featured-section">
        <div className="container">
          <div className="featured-inner reveal">
            <div className="featured-top">
              {/* Image */}
              <div className="featured-img">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80"
                  alt="Zolarux Marketplace"
                  loading="eager"
                />
                <div className="featured-img-overlay" />
                <div className="featured-live-badge">
                  <span className="live-dot" /> Live in production
                </div>
              </div>

              {/* Content */}
              <div className="featured-content">
                <span className="featured-flag">★ Flagship Project · Full-Stack · Mobile + Web</span>
                <h2>Zolarux — Trust Infrastructure<br />for Social Commerce</h2>
                <p className="featured-tagline">
                  A marketplace platform built to enable secure, verifiable transactions between vendors
                  and buyers in the Nigerian social commerce market.
                </p>

                {/* Problem / Solution */}
                <div className="ps-blocks">
                  <div className="ps-block">
                    <div className="ps-block-label problem">↑ The Problem</div>
                    <p>Social commerce transactions in Nigeria lack structured trust systems — leading to fraud, unresolved disputes, and vendor impersonation with no recourse for buyers.</p>
                  </div>
                  <div className="ps-block">
                    <div className="ps-block-label solution">↓ The Solution</div>
                    <p>A verification-based marketplace with escrow-style payments, multi-step vendor onboarding, risk scoring, real-time transaction tracking, and structured dispute mediation.</p>
                  </div>
                </div>

                {/* Impact */}
                <div className="impact-row">
                  <div className="impact-stat">
                    <span className="impact-val">300<em>+</em></span>
                    <span className="impact-label">Users onboarded</span>
                  </div>
                  <div className="impact-stat">
                    <span className="impact-val">50<em>+</em></span>
                    <span className="impact-label">Vendors verified</span>
                  </div>
                  <div className="impact-stat">
                    <span className="impact-val">₦2M<em>+</em></span>
                    <span className="impact-label">Transaction volume</span>
                  </div>
                  <div className="impact-stat">
                    <span className="impact-val">6<em>mo</em></span>
                    <span className="impact-label">Live in production</span>
                  </div>
                </div>

                {/* Stack */}
                <div className="stack-row">
                  {['Flutter', 'Dart', 'Supabase', 'PostgreSQL', 'RLS', 'Supabase Auth', 'REST API', 'Vercel'].map(s => (
                    <span key={s} className="stack-chip">{s}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="featured-actions">
                  <a href="https://zolarux.com.ng" target="_blank" rel="noopener noreferrer" className="btn-primary">
                    View Live <IconExternal />
                  </a>
                  <a href="/projects/zolarux" className="btn-outline">Case Study →</a>
                  <a href="#" className="btn-ghost"><IconGithub /> GitHub</a>
                </div>
              </div>
            </div>

            {/* Why it matters */}
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

      {/* ══ SUPPORTING PROJECTS ══ */}
      <section className="projects-grid-section">
        <div className="container">
          <div className="reveal">
            <span className="section-tag">More Work</span>
            <h2 className="section-title">Other projects<br />worth your time.</h2>
          </div>
          <div className="projects-grid">
            {visible.map((proj, i) => (
              <div key={proj.id} className="proj-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="proj-img">
                  <img src={proj.image} alt={proj.name} loading="lazy" />
                  <div className="proj-img-overlay" />
                  <span className="proj-tech-badge">{proj.tech}</span>
                </div>
                <div className="proj-body">
                  <div className="proj-category">{proj.category}</div>
                  <h3>{proj.name}</h3>
                  <div className="proj-problem">
                    <span>Problem →</span> {proj.problem}
                  </div>
                  <p className="proj-desc">{proj.desc}</p>
                  <div className="proj-outcome">
                    <span className="proj-outcome-dot" />
                    {proj.outcome}
                  </div>
                  <div className="proj-chips">
                    {proj.chips.map(c => <span key={c} className="proj-chip">{c}</span>)}
                  </div>
                  <div className="proj-footer">
                    <div className="proj-links">
                      <a href={proj.liveUrl} className="proj-link">Live <IconExternal /></a>
                      <a href={proj.githubUrl} className="proj-link ghost"><IconGithub /> GitHub</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW I BUILD ══ */}
      <section className="approach-section">
        <div className="container">
          <div className="approach-inner reveal">
            <div className="approach-left">
              <span className="section-tag">My Development Approach</span>
              <h2 className="section-title">Every project.<br />Same standard.</h2>
              <p>
                I do not build differently based on the size of the project. Whether it is an MVP or a
                scaling product, the <strong>architecture, security, and deployment discipline stay the same</strong>.
              </p>
              <p style={{ marginTop: '16px' }}>
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

      {/* ══ CTA ══ */}
      <section className="projects-cta-section">
        <div className="container">
          <div className="projects-cta-inner reveal">
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
              <a href="mailto:hello@zolarux.com" className="btn-primary">Start a Project</a>
              <a href="/about" className="btn-ghost">Learn How I Work →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer>
        <div className="footer-left">
          <p>© 2026 <span>Rex Orokumue</span> · Built with Next.js & intention.</p>
        </div>
        <div className="footer-links">
          <a href="#">Twitter</a>
          <a href="#">LinkedIn</a>
          <a href="#">GitHub</a>
          <a href="mailto:hello@zolarux.com">Email</a>
        </div>
      </footer>
    </>
  );
}