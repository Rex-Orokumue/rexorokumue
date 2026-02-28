'use client';

import { useState, useEffect, useRef } from 'react';

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
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: 0.5;
    }
    .bg-mesh {
      position: fixed; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse 70% 50% at 0% 10%, rgba(59,130,246,0.12) 0%, transparent 60%),
        radial-gradient(ellipse 55% 65% at 100% 85%, rgba(59,130,246,0.07) 0%, transparent 55%),
        var(--secondary);
    }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse    { 0%,100% { opacity:1; } 50% { opacity:0.45; } }
    @keyframes blink    { 0%,100% { opacity:1; } 50% { opacity:0; } }

    /* Typewriter cursor */
    .tw-cursor {
      display: inline-block;
      width: 3px;
      background: var(--accent);
      margin-left: 4px;
      vertical-align: middle;
      border-radius: 2px;
      animation: blink 0.75s step-end infinite;
    }

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
      display: inline-block;
      font-size: 0.70rem; font-weight: 700;
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
      padding: 14px 34px; background: var(--accent); color: #fff;
      border-radius: 8px; font-weight: 600; font-size: 0.9rem;
      text-decoration: none; letter-spacing: 0.02em;
      transition: all 0.25s;
      box-shadow: 0 4px 28px var(--accent-glow);
      border: 1px solid transparent;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 36px var(--accent-glow); }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 13px 30px; border: 1px solid var(--border);
      color: var(--text); border-radius: 8px;
      font-weight: 500; font-size: 0.9rem;
      text-decoration: none; transition: all 0.25s; background: transparent;
    }
    .btn-ghost:hover { border-color: rgba(255,255,255,0.18); background: rgba(255,255,255,0.04); }

    /* HERO */
    .about-hero {
      min-height: 70vh; display: flex; flex-direction: column;
      justify-content: flex-start;
      padding-top: 160px; padding-bottom: 100px;
    }
    .about-eyebrow {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 6px 16px 6px 10px; border-radius: 100px;
      border: 1px solid var(--accent-glow); background: var(--accent-dim);
      font-size: 0.72rem; font-weight: 600; letter-spacing: 0.10em;
      text-transform: uppercase; color: var(--accent);
      margin-top: -60px;
      margin-bottom: 36px; width: fit-content;
    }
    .about-headline {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2.2rem, 4vw, 3.4rem);
      font-weight: 800; line-height: 1.0;
      letter-spacing: -0.03em; color: var(--text); max-width: 780px;
    }
    .about-headline .line-accent {
      display: block;
      min-height: 1.1em;
      background: linear-gradient(120deg, var(--accent) 20%, var(--accent-light) 80%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    }
    .about-intro {
      margin-top: 32px; font-size: 1.15rem; line-height: 1.8;
      color: var(--muted); max-width: 640px; font-weight: 300;
    }
    .about-intro strong { color: var(--text); font-weight: 500; }
    .about-avail {
      display: inline-flex; align-items: center; gap: 10px;
      margin-top: 40px; padding: 10px 20px; border-radius: 10px;
      border: 1px solid var(--border); background: var(--card-bg);
      font-size: 0.80rem; color: var(--muted);
    }
    .avail-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #34D399; animation: pulse 2s infinite; flex-shrink: 0;
    }
    .about-avail strong { color: var(--text); font-weight: 500; }

    /* WHAT I HELP WITH */
    .help-section { padding: 120px 0; }
    .help-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 64px; margin-top: 56px; align-items: start;
    }
    .help-left p {
      font-size: 1.0rem; line-height: 1.85;
      color: var(--muted); margin-bottom: 20px;
    }
    .help-left p strong { color: var(--text); font-weight: 500; }
    .help-items { display: flex; flex-direction: column; gap: 12px; }
    .help-item {
      display: flex; align-items: flex-start; gap: 16px;
      padding: 20px 22px; border-radius: 12px;
      border: 1px solid var(--border); background: var(--card-bg);
      backdrop-filter: blur(12px); transition: all 0.25s;
    }
    .help-item:hover { border-color: var(--border-hover); transform: translateX(4px); }
    .help-num {
      font-family: 'Syne', sans-serif; font-size: 0.70rem;
      font-weight: 800; color: var(--accent);
      letter-spacing: 0.06em; flex-shrink: 0; padding-top: 2px;
    }
    .help-item-text h4 {
      font-family: 'Syne', sans-serif; font-weight: 700;
      font-size: 0.92rem; color: var(--text); margin-bottom: 4px;
    }
    .help-item-text p { font-size: 0.80rem; color: var(--muted); line-height: 1.5; }

    /* PHILOSOPHY */
    .philosophy-section { padding: 0 0 120px; }
    .philosophy-inner {
      border-radius: 20px; border: 1px solid var(--border);
      background: var(--card-bg); backdrop-filter: blur(16px);
      padding: 64px; position: relative; overflow: hidden;
    }
    .philosophy-inner::before {
      content: ''; position: absolute; top: -40%; right: -5%;
      width: 500px; height: 500px;
      background: radial-gradient(ellipse, rgba(59,130,246,0.07), transparent 70%);
      pointer-events: none;
    }
    .philosophy-header {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 64px; align-items: start; margin-bottom: 56px;
    }
    .philosophy-header-left p {
      margin-top: 20px; font-size: 1.05rem; line-height: 1.8; color: var(--muted);
    }
    .philosophy-header-left p strong { color: var(--text); font-weight: 500; }
    .philosophy-header-left p + p { margin-top: 16px; }
    .philosophy-quote {
      padding: 28px 32px; border-radius: 14px;
      border: 1px solid var(--accent-glow); background: var(--accent-dim);
      position: relative;
    }
    .philosophy-quote::before {
      content: '"'; position: absolute; top: -16px; left: 24px;
      font-family: 'Syne', sans-serif; font-size: 4rem; font-weight: 800;
      color: var(--accent); line-height: 1; opacity: 0.4;
    }
    .philosophy-quote p {
      font-size: 1.05rem; line-height: 1.75; color: var(--text);
      font-weight: 400; font-style: italic;
    }
    .philosophy-quote cite {
      display: block; margin-top: 16px; font-size: 0.75rem;
      color: var(--accent); font-style: normal;
      font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase;
    }
    .principles-grid {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 16px; padding-top: 48px; border-top: 1px solid var(--border);
    }
    .principle {
      padding: 24px 20px; border-radius: 12px;
      border: 1px solid var(--border); background: rgba(15,23,42,0.4);
      transition: all 0.25s;
    }
    .principle:hover { border-color: var(--border-hover); transform: translateY(-3px); }
    .principle-icon { font-size: 1.4rem; margin-bottom: 14px; display: block; }
    .principle h4 {
      font-family: 'Syne', sans-serif; font-weight: 700;
      font-size: 0.88rem; color: var(--text); margin-bottom: 8px;
    }
    .principle p { font-size: 0.78rem; line-height: 1.6; color: var(--muted); }

    /* JOURNEY */
    .journey-section { padding: 0 0 120px; }
    .journey-grid {
      display: grid; grid-template-columns: 1.1fr 1fr;
      gap: 80px; margin-top: 56px; align-items: start;
    }
    .journey-text p {
      font-size: 1.0rem; line-height: 1.85;
      color: var(--muted); margin-bottom: 20px;
    }
    .journey-text p strong { color: var(--text); font-weight: 500; }
    .journey-milestones { display: flex; flex-direction: column; gap: 0; }
    .milestone { display: flex; gap: 20px; padding-bottom: 32px; position: relative; }
    .milestone:last-child { padding-bottom: 0; }
    .milestone-left { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; }
    .milestone-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: var(--accent); border: 2px solid var(--accent-glow);
      flex-shrink: 0; margin-top: 4px;
    }
    .milestone-line {
      width: 1px; flex: 1;
      background: linear-gradient(to bottom, var(--accent-glow), transparent);
      margin-top: 8px; min-height: 32px;
    }
    .milestone:last-child .milestone-line { display: none; }
    .milestone-year {
      font-size: 0.68rem; font-weight: 700; letter-spacing: 0.10em;
      text-transform: uppercase; color: var(--accent); margin-bottom: 6px;
    }
    .milestone-content h4 {
      font-family: 'Syne', sans-serif; font-weight: 700;
      font-size: 0.90rem; color: var(--text); margin-bottom: 4px;
    }
    .milestone-content p { font-size: 0.78rem; color: var(--muted); line-height: 1.55; }

    /* CURRENT FOCUS */
    .focus-section { padding: 0 0 120px; }
    .focus-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 24px; margin-top: 52px;
    }
    .focus-card {
      padding: 36px; border-radius: 16px;
      border: 1px solid var(--border); background: var(--card-bg);
      backdrop-filter: blur(12px); transition: all 0.25s;
      position: relative; overflow: hidden;
    }
    .focus-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(to right, transparent, var(--accent-glow), transparent);
    }
    .focus-card:hover { border-color: var(--border-hover); transform: translateY(-3px); }
    .focus-card-label {
      font-size: 0.68rem; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--accent); margin-bottom: 14px;
    }
    .focus-card h3 {
      font-family: 'Syne', sans-serif; font-size: 1.1rem;
      font-weight: 700; color: var(--text); margin-bottom: 12px;
    }
    .focus-card p { font-size: 0.85rem; line-height: 1.75; color: var(--muted); }
    .focus-note {
      margin-top: 24px; padding: 16px 20px; border-radius: 10px;
      border: 1px solid var(--border); background: rgba(15,23,42,0.5);
      font-size: 0.82rem; color: var(--muted); line-height: 1.65; font-style: italic;
    }
    .focus-note strong { color: var(--accent-light); font-style: normal; font-weight: 500; }

    /* Metrics row inside focus card */
    .focus-metrics {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .focus-metric {
      display: flex; flex-direction: column; gap: 4px;
      padding: 14px 12px; border-radius: 10px;
      border: 1px solid var(--border); background: rgba(15,23,42,0.5);
      text-align: center;
    }
    .focus-metric-val {
      font-family: 'Syne', sans-serif; font-size: clamp(1rem, 2.5vw, 1.3rem);
      font-weight: 800; color: var(--text); line-height: 1;
    }
    .focus-metric-val em { color: var(--accent); font-style: normal; font-size: 0.85em; }
    .focus-metric-label { font-size: 0.68rem; color: var(--muted); letter-spacing: 0.04em; }

    /* SELECTED WORK TEASER */
    .work-teaser-section { padding: 0 0 120px; }
    .work-teaser-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 16px; margin-top: 48px;
    }
    .work-teaser-card {
      padding: 28px 24px; border-radius: 14px;
      border: 1px solid var(--border); background: var(--card-bg);
      backdrop-filter: blur(12px); text-decoration: none;
      transition: all 0.25s; display: flex; flex-direction: column; gap: 10px;
    }
    .work-teaser-card:hover { border-color: var(--border-hover); transform: translateY(-4px); }
    .work-teaser-tag {
      font-size: 0.66rem; font-weight: 700; letter-spacing: 0.10em;
      text-transform: uppercase; color: var(--accent);
    }
    .work-teaser-card h3 {
      font-family: 'Syne', sans-serif; font-size: 0.95rem;
      font-weight: 700; color: var(--text); line-height: 1.3;
    }
    .work-teaser-card p { font-size: 0.78rem; color: var(--muted); line-height: 1.55; flex: 1; }
    .work-teaser-footer {
      display: flex; align-items: center; justify-content: space-between;
      padding-top: 14px; border-top: 1px solid var(--border); margin-top: 4px;
    }
    .work-teaser-pills { display: flex; gap: 6px; flex-wrap: wrap; }
    .work-teaser-pill {
      padding: 2px 8px; border-radius: 4px;
      background: var(--accent-dim); border: 1px solid var(--accent-glow);
      font-size: 0.63rem; color: var(--accent-light); font-weight: 500;
    }
    .work-teaser-arrow { font-size: 0.78rem; color: var(--accent); font-weight: 600; flex-shrink: 0; }

    /* CORE STACK */
    .stack-section { padding: 0 0 120px; }
    .stack-grid {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 16px; margin-top: 48px;
    }
    .stack-group {
      padding: 28px 24px; border-radius: 14px;
      border: 1px solid var(--border); background: var(--card-bg);
      backdrop-filter: blur(12px); transition: all 0.25s;
    }
    .stack-group:hover { border-color: var(--border-hover); }
    .stack-group-label {
      font-size: 0.68rem; font-weight: 700; letter-spacing: 0.10em;
      text-transform: uppercase; color: var(--accent); margin-bottom: 16px;
    }
    .stack-items { display: flex; flex-wrap: wrap; gap: 8px; }
    .stack-pill {
      padding: 5px 14px; border-radius: 100px;
      border: 1px solid var(--border); background: rgba(255,255,255,0.03);
      font-size: 0.78rem; color: var(--muted); font-weight: 500; transition: all 0.2s;
    }
    .stack-pill:hover { border-color: var(--accent-glow); color: var(--accent-light); }

    /* CLOSING CTA */
    .about-cta-section { padding: 0 0 140px; }
    .about-cta-inner {
      border-radius: 24px; border: 1px solid var(--border);
      background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95));
      backdrop-filter: blur(24px); padding: 90px 80px;
      display: grid; grid-template-columns: 1fr auto;
      gap: 64px; align-items: center;
      position: relative; overflow: hidden;
    }
    .about-cta-inner::before {
      content: ''; position: absolute; bottom: -40%; left: -5%;
      width: 400px; height: 400px;
      background: radial-gradient(ellipse, rgba(59,130,246,0.10), transparent 70%);
      pointer-events: none;
    }
    .about-cta-text h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.8rem, 3vw, 2.8rem);
      font-weight: 800; letter-spacing: -0.025em;
      line-height: 1.1; margin-bottom: 16px;
    }
    .about-cta-text p {
      font-size: 1.0rem; color: var(--muted);
      line-height: 1.75; max-width: 480px; font-weight: 300;
    }
    .about-cta-actions { display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; }

    /* FOOTER */
    footer {
      position: relative; z-index: 1;
      border-top: 1px solid var(--border);
      padding: 36px 64px; max-width: 1180px; margin: 0 auto;
      display: flex; align-items: center; justify-content: space-between;
    }
    .footer-left p { font-size: 0.78rem; color: var(--muted-2); }
    .footer-left p span { color: var(--accent); }
    .footer-links { display: flex; gap: 28px; }
    .footer-links a {
      font-size: 0.78rem; color: var(--muted-2);
      text-decoration: none; transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--text); }

    /* RESPONSIVE */
    @media (max-width: 1024px) {
      .container { padding: 0 28px; }
      footer { padding: 28px; flex-direction: column; gap: 16px; text-align: center; }
      .help-grid { grid-template-columns: 1fr; gap: 48px; }
      .philosophy-header { grid-template-columns: 1fr; gap: 40px; }
      .principles-grid { grid-template-columns: 1fr 1fr; }
      .journey-grid { grid-template-columns: 1fr; gap: 48px; }
      .focus-grid { grid-template-columns: 1fr; }
      .stack-grid { grid-template-columns: 1fr 1fr; }
      .work-teaser-grid { grid-template-columns: 1fr 1fr; }
      .about-cta-inner { grid-template-columns: 1fr; gap: 40px; padding: 56px 40px; }
      .philosophy-inner { padding: 40px 32px; }

      /* Section top spacing on tablet */
      .help-section       { padding-top: 100px; }
      .philosophy-section { padding-top: 100px; }
      .journey-section    { padding-top: 100px; }
      .focus-section      { padding-top: 100px; }
      .stack-section      { padding-top: 100px; }
      .work-teaser-section { padding-top: 100px; }
      .about-cta-section  { padding-top: 100px; }
    }
    @media (max-width: 640px) {
      .about-hero { padding-top: 140px; }
      .about-headline { font-size: 2.2rem; }
      .principles-grid { grid-template-columns: 1fr; }
      .stack-grid { grid-template-columns: 1fr; }
      .work-teaser-grid { grid-template-columns: 1fr; }
      .about-cta-inner { padding: 48px 24px; }

      /* Section top spacing on mobile — prevents sections crowding element above */
      .help-section      { padding-top: 80px; }
      .philosophy-section { padding-top: 80px; }
      .journey-section   { padding-top: 80px; }
      .focus-section     { padding-top: 80px; }
      .stack-section     { padding-top: 80px; }
      .work-teaser-section { padding-top: 80px; }
      .about-cta-section { padding-top: 80px; }
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

// Typewriter hook — loops through phrases indefinitely
function useTypewriter(phrases: string[], typingSpeed = 55, deletingSpeed = 30, pauseMs = 2000) {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const atFull = displayed === current;
    const atEmpty = displayed === '';

    if (!isDeleting && atFull) {
      timeout.current = setTimeout(() => setIsDeleting(true), pauseMs);
    } else if (isDeleting && atEmpty) {
      setIsDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timeout.current = setTimeout(() => {
        setDisplayed(isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
        );
      }, speed);
    }

    return () => { if (timeout.current) clearTimeout(timeout.current); };
  }, [displayed, isDeleting, phraseIdx, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return displayed;
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
];

export default function About() {
  useReveal();

  const twPhrases = [
    'production-ready software',
    'scalable mobile apps',
    'trust-driven platforms',
    'systems built to last',
  ];
  const twText = useTypewriter(twPhrases);

  return (
    <>
      <GlobalStyles />
      <div className="bg-mesh" aria-hidden="true" />

      {/* OPENING */}
      <section>
        <div className="container about-hero">
          <div className="about-eyebrow fade-up-1">About Rex</div>
          <h1 className="about-headline fade-up-2">
            I build reliable,<br />
            <span className="line-accent">
              {twText}<span className="tw-cursor" style={{ height: '0.85em' }} />
            </span>
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
      <section>
        <div className="container help-section">
          <div className="reveal">
            <span className="section-tag">What I Help With</span>
            <h2 className="section-title">The work I do<br />for clients.</h2>
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
      <section>
        <div className="container philosophy-section">
          <div className="philosophy-inner reveal">
            <div className="philosophy-header">
              <div className="philosophy-header-left">
                <span className="section-tag">How I Build</span>
                <h2 className="section-title">I do not just code features.<br />I think in systems.</h2>
                <p>
                  Every technical decision I make is shaped by one question: <strong>will this hold up under
                  real conditions?</strong> Not demo conditions. Not tutorial conditions. Real users, real load,
                  real edge cases.
                </p>
                <p>
                  That mindset comes from building Zolarux — a product where a bad architectural decision means
                  a user's money gets stuck, a vendor cannot be verified, or a dispute cannot be resolved. The
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
      <section>
        <div className="container journey-section">
          <div className="reveal">
            <span className="section-tag">Background</span>
            <h2 className="section-title">Built by doing,<br />not by watching.</h2>
          </div>
          <div className="journey-grid">
            <div className="journey-text reveal">
              <p>
                I am a <strong>self-taught engineer</strong> who learned by shipping real systems — not just
                completing courses. My education happened in the gap between "this does not work" and "now it
                does," repeated enough times to build genuine intuition.
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
      <section>
        <div className="container focus-section">
          <div className="reveal">
            <span className="section-tag">Current Focus</span>
            <h2 className="section-title">Where my energy<br />is going right now.</h2>
          </div>
          <div className="focus-grid">
            <div className="focus-card reveal">
              <div className="focus-card-label">Primary</div>
              <h3>Building Zolarux</h3>
              <p>
                Zolarux is my main product — a trust infrastructure layer for Nigerian social commerce.
                I am actively expanding its vendor verification system, improving the escrow dispute resolution
                flow, and building the next version of the mobile app.
              </p>
              <div className="focus-metrics">
                <div className="focus-metric">
                  <span className="focus-metric-val">300<em>+</em></span>
                  <span className="focus-metric-label">Users onboarded</span>
                </div>
                <div className="focus-metric">
                  <span className="focus-metric-val">50<em>+</em></span>
                  <span className="focus-metric-label">Vendors verified</span>
                </div>
                <div className="focus-metric">
                  <span className="focus-metric-val">6<em>mo</em></span>
                  <span className="focus-metric-label">Live in production</span>
                </div>
              </div>
              <div className="focus-note">
                <strong>Live at zolarux.com.ng</strong> — real users, real transactions, real problems being solved.
              </div>
            </div>
            <div className="focus-card reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="focus-card-label">Secondary</div>
              <h3>Client Projects and MVPs</h3>
              <p>
                I am currently focused on helping <strong>early-stage founders</strong> launch faster using
                modern full-stack tooling and AI-assisted development workflows. I take on a limited number of
                projects at a time to ensure quality and genuine attention to your product.
              </p>
              <div className="focus-note">
                <strong>Limited availability.</strong> I work with a small number of clients at once — which means
                the projects I take on get my full focus, not a fraction of it.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE STACK */}
      <section>
        <div className="container stack-section">
          <div className="reveal">
            <span className="section-tag">Core Stack</span>
            <h2 className="section-title">The tools I reach<br />for in production.</h2>
          </div>
          <div className="stack-grid">
            {stackGroups.map((group, i) => (
              <div key={group.label} className="stack-group reveal" style={{ transitionDelay: `${i * 0.09}s` }}>
                <div className="stack-group-label">{group.label}</div>
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
      <section>
        <div className="container work-teaser-section">
          <div className="reveal">
            <span className="section-tag">Selected Work</span>
            <h2 className="section-title">Some of what<br />I have shipped.</h2>
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
              <span className="work-teaser-tag">Next.js · React</span>
              <h3>Phonics Assessment Tool — EdTech for Nigerian Classrooms</h3>
              <p>
                Interactive reading assessment app for primary school students. Offline-first,
                optimised for low-bandwidth environments.
              </p>
              <div className="work-teaser-footer">
                <div className="work-teaser-pills">
                  <span className="work-teaser-pill">TypeScript</span>
                  <span className="work-teaser-pill">Edge</span>
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
      <section>
        <div className="container about-cta-section">
          <div className="about-cta-inner reveal">
            <div className="about-cta-text">
              <h2>If you are building something ambitious and need an engineer who thinks in systems — let us talk.</h2>
              <p>
                Open to freelance projects, product consulting, and technical co-founding. Tell me what you are
                building and let us figure out if we are a good fit.
              </p>
            </div>
            <div className="about-cta-actions">
              <a href="mailto:hello@zolarux.com" className="btn-primary">Work With Me</a>
              <a href="/projects" className="btn-ghost">See My Work →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-left">
          <p>2026 <span>Rex Orokumue</span> · Built with Next.js and intention.</p>
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