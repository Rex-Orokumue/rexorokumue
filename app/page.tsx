'use client';

import { useState, useEffect, useRef } from 'react';

// ─── Global Styles ────────────────────────────────────────────────────────────
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
      --card-bg-2:    rgba(15,23,42,0.70);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--secondary);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
      line-height: 1.6;
    }

    /* Noise texture */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none;
      z-index: 9999;
      opacity: 0.5;
    }

    /* ── Gradient mesh ── */
    .bg-mesh {
      position: fixed;
      inset: 0;
      z-index: 0;
      background:
        radial-gradient(ellipse 75% 55% at 5% -5%, rgba(59,130,246,0.14) 0%, transparent 60%),
        radial-gradient(ellipse 50% 70% at 95% 90%, rgba(59,130,246,0.07) 0%, transparent 55%),
        radial-gradient(ellipse 40% 40% at 50% 50%, rgba(30,41,59,0.5) 0%, transparent 100%),
        var(--secondary);
    }

    /* ── keyframes ── */
    @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse  { 0%,100% { opacity:1; } 50% { opacity:0.45; } }

    .fade-up-1 { animation: fadeUp 0.75s 0.05s ease both; }
    .fade-up-2 { animation: fadeUp 0.75s 0.20s ease both; }
    .fade-up-3 { animation: fadeUp 0.75s 0.35s ease both; }
    .fade-up-4 { animation: fadeUp 0.75s 0.50s ease both; }
    .fade-up-5 { animation: fadeUp 0.75s 0.65s ease both; }

    /* ── Scroll reveal ── */
    .reveal {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.65s ease, transform 0.65s ease;
    }
    .reveal.visible { opacity:1; transform:translateY(0); }

    /* ── Layout ── */
    section { position: relative; z-index: 1; }
    .container {
      max-width: 1180px;
      margin: 0 auto;
      padding: 0 64px;
    }

    /* ════════════════════════════════════════
       HERO
    ════════════════════════════════════════ */
    .hero {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 160px;
      padding-bottom: 100px;
    }

    .hero-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 6px 16px 6px 10px;
      border-radius: 100px;
      border: 1px solid var(--accent-glow);
      background: var(--accent-dim);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      color: var(--accent);
      margin-top: -60px;
      margin-bottom: 36px;
      width: fit-content;
    }
    .hero-eyebrow .dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: var(--accent);
      animation: pulse 2.2s infinite;
      flex-shrink: 0;
    }

    .hero-headline {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2.8rem, 6.5vw, 5.2rem);
      font-weight: 800;
      line-height: 1.0;
      letter-spacing: -0.035em;
      color: var(--text);
      max-width: 860px;
    }
    .hero-headline .line-accent {
      display: block;
      background: linear-gradient(120deg, var(--accent) 20%, var(--accent-light) 80%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero-headline .line-dim {
      color: var(--muted);
      font-weight: 700;
    }

    .hero-sub {
      margin-top: 28px;
      font-size: 1.1rem;
      line-height: 1.75;
      color: var(--muted);
      max-width: 580px;
      font-weight: 300;
    }
    .hero-sub strong { color: var(--text); font-weight: 500; }

    /* Live proof links */
    .hero-proof {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-top: 18px;
      flex-wrap: wrap;
    }
    .proof-link {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 14px;
      border-radius: 8px;
      border: 1px solid var(--accent-glow);
      background: var(--accent-dim);
      font-size: 0.78rem;
      font-weight: 600;
      color: var(--accent);
      text-decoration: none;
      transition: all 0.2s;
    }
    .proof-link:hover { background: rgba(59,130,246,0.18); border-color: var(--accent); }
    .proof-link--ghost {
      background: transparent;
      border-color: var(--border);
      color: var(--muted);
    }
    .proof-link--ghost:hover {
      border-color: rgba(255,255,255,0.18);
      color: var(--text);
      background: rgba(255,255,255,0.04);
    }
    .proof-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #34D399;
      animation: pulse 2s infinite;
      flex-shrink: 0;
    }

    .hero-tech-stack {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 32px;
    }
    .tech-tag {
      padding: 4px 12px;
      border-radius: 6px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.03);
      font-size: 0.75rem;
      color: var(--muted);
      font-weight: 500;
      letter-spacing: 0.03em;
      transition: border-color 0.2s, color 0.2s;
    }
    .tech-tag:hover { border-color: var(--accent-glow); color: var(--accent-light); }

    .hero-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 44px;
      flex-wrap: wrap;
    }

    .btn-primary {
      padding: 14px 34px;
      background: var(--accent);
      color: #fff;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.9rem;
      text-decoration: none;
      letter-spacing: 0.02em;
      transition: all 0.25s;
      box-shadow: 0 4px 28px var(--accent-glow);
      border: 1px solid transparent;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 36px var(--accent-glow); }
    .btn-ghost {
      padding: 13px 30px;
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: 8px;
      font-weight: 500;
      font-size: 0.9rem;
      text-decoration: none;
      transition: all 0.25s;
      background: transparent;
    }
    .btn-ghost:hover { border-color: rgba(255,255,255,0.18); background: rgba(255,255,255,0.04); }

    .hero-scroll {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 72px;
      color: var(--muted-2);
      font-size: 0.72rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .scroll-line { width: 36px; height: 1px; background: var(--muted-2); }

    /* ════════════════════════════════════════
       STATS
    ════════════════════════════════════════ */
    .stats-section { padding-bottom: 120px; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      border: 1px solid var(--border);
      border-radius: 18px;
      background: var(--card-bg);
      backdrop-filter: blur(16px);
    }
    .stat-item {
      padding: 40px 32px;
      min-width: 0;
      overflow: hidden;
      border-right: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      position: relative;
      transition: background 0.25s;
    }
    .stat-item:nth-child(2n)   { border-right: none; }
    .stat-item:nth-child(3),
    .stat-item:nth-child(4)    { border-bottom: none; }
    .stat-item:hover { background: rgba(59,130,246,0.05); }
    .stat-number {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2rem, 3vw, 2.8rem);
      font-weight: 800;
      color: var(--text);
      line-height: 1;
      white-space: nowrap;
    }
    .stat-number em { color: var(--accent); font-style: normal; }
    .stat-label {
      font-size: 0.78rem;
      color: var(--muted);
      margin-top: 10px;
      letter-spacing: 0.04em;
      font-weight: 400;
      word-break: break-word;
    }
    .stat-desc {
      font-size: 0.72rem;
      color: var(--muted-2);
      margin-top: 4px;
      word-break: break-word;
    }

    /* ════════════════════════════════════════
       SECTION HEADERS
    ════════════════════════════════════════ */
    .section-tag {
      display: inline-block;
      font-size: 0.70rem;
      font-weight: 700;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 14px;
    }
    .section-title {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.9rem, 3.5vw, 2.9rem);
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.025em;
      color: var(--text);
    }

    /* ════════════════════════════════════════
       WHAT I DO
    ════════════════════════════════════════ */
    .about-section { padding: 140px 0 120px; }
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1.1fr;
      gap: 80px;
      margin-top: 64px;
      align-items: start;
    }
    .about-left p {
      font-size: 1.0rem;
      line-height: 1.8;
      color: var(--muted);
      margin-bottom: 22px;
    }
    .about-left p strong { color: var(--text); font-weight: 500; }
    .arch-callout {
      margin-top: 32px;
      padding: 20px 24px;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: var(--card-bg);
      font-size: 0.83rem;
      line-height: 1.7;
      color: var(--muted);
    }
    .arch-callout strong { color: var(--accent-light); font-weight: 500; }
    .capability-list { display: flex; flex-direction: column; gap: 2px; }
    .cap-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 20px 22px;
      border-radius: 12px;
      border: 1px solid transparent;
      transition: all 0.25s;
      cursor: default;
    }
    .cap-item:hover { background: var(--card-bg); border-color: var(--border); }
    .cap-icon {
      width: 42px; height: 42px;
      border-radius: 10px;
      background: var(--accent-dim);
      border: 1px solid var(--accent-glow);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
    }
    .cap-text h4 {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 0.92rem;
      color: var(--text);
      margin-bottom: 3px;
    }
    .cap-text p { font-size: 0.80rem; color: var(--muted); line-height: 1.5; }

    /* ════════════════════════════════════════
       TECH STACK
    ════════════════════════════════════════ */
    .tech-section { padding: 140px 0 120px; }
    .tech-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 48px;
    }
    .tech-categories {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    .tech-category {
      padding: 28px 24px;
      border-radius: 14px;
      border: 1px solid var(--border);
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      transition: all 0.25s;
    }
    .tech-category:hover { border-color: var(--border-hover); transform: translateY(-3px); }
    .tech-cat-label {
      font-size: 0.70rem;
      font-weight: 700;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 14px;
    }
    .tech-cat-items { display: flex; flex-direction: column; gap: 8px; }
    .tech-cat-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.82rem;
      color: var(--muted);
    }
    .tech-cat-item::before {
      content: '';
      width: 4px; height: 4px;
      border-radius: 50%;
      background: var(--accent);
      flex-shrink: 0;
      opacity: 0.6;
    }

    /* ════════════════════════════════════════
       PROJECTS
    ════════════════════════════════════════ */
    .projects-section { padding: 140px 0 120px; }
    .projects-header {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      margin-bottom: 52px;
    }
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .project-card {
      border-radius: 18px;
      overflow: hidden;
      background: var(--card-bg);
      border: 1px solid var(--border);
      backdrop-filter: blur(12px);
      transition: all 0.35s cubic-bezier(0.25,0.8,0.25,1);
      display: flex;
      flex-direction: column;
    }
    .project-card:hover {
      transform: translateY(-5px);
      border-color: var(--border-hover);
      box-shadow: 0 20px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(59,130,246,0.18);
    }
    .project-img-wrap {
      position: relative;
      overflow: hidden;
      height: 196px;
    }
    .project-img-wrap img {
      width: 100%; height: 100%;
      object-fit: cover;
      transition: transform 0.55s ease;
    }
    .project-card:hover .project-img-wrap img { transform: scale(1.06); }
    .project-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(15,23,42,0.9) 0%, rgba(15,23,42,0.2) 60%, transparent 100%);
    }
    .project-badge {
      position: absolute;
      top: 14px; right: 14px;
      padding: 4px 12px;
      border-radius: 100px;
      background: rgba(15,23,42,0.88);
      border: 1px solid var(--border);
      font-size: 0.68rem;
      font-weight: 600;
      color: var(--muted);
      letter-spacing: 0.04em;
    }
    .project-body { padding: 26px; flex: 1; display: flex; flex-direction: column; }
    .project-body h3 {
      font-family: 'Syne', sans-serif;
      font-weight: 700;
      font-size: 1.05rem;
      color: var(--text);
    }
    .project-body > p {
      margin-top: 10px;
      font-size: 0.845rem;
      line-height: 1.65;
      color: var(--muted);
      flex: 1;
    }
    .project-footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid var(--border);
      gap: 8px;
    }
    .project-tags { display: flex; gap: 6px; flex-wrap: wrap; }
    .project-tag {
      padding: 2px 9px;
      border-radius: 4px;
      background: var(--accent-dim);
      border: 1px solid var(--accent-glow);
      font-size: 0.66rem;
      color: var(--accent-light);
      font-weight: 500;
    }
    .project-links { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.80rem;
      font-weight: 600;
      color: var(--accent);
      text-decoration: none;
      transition: gap 0.2s;
      white-space: nowrap;
    }
    .project-link:hover { gap: 9px; }
    .project-link--secondary {
      color: var(--muted);
      font-size: 0.75rem;
      font-weight: 500;
    }
    .project-link--secondary:hover { color: var(--text); gap: 7px; }

    /* ════════════════════════════════════════
       PROCESS
    ════════════════════════════════════════ */
    .process-section { padding: 140px 0 120px; }
    .process-steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 0;
      margin-top: 64px;
      position: relative;
    }
    .process-steps::before {
      content: '';
      position: absolute;
      top: 27px;
      left: 12%; right: 12%;
      height: 1px;
      background: linear-gradient(to right, transparent, var(--accent-glow), transparent);
    }
    .process-step { padding: 0 20px; text-align: center; }
    .step-num {
      width: 54px; height: 54px;
      border-radius: 50%;
      border: 1px solid var(--accent-glow);
      background: var(--accent-dim);
      display: flex; align-items: center; justify-content: center;
      font-family: 'Syne', sans-serif;
      font-weight: 800; font-size: 0.9rem;
      color: var(--accent);
      margin: 0 auto 24px;
    }
    .process-step h4 {
      font-family: 'Syne', sans-serif;
      font-weight: 700; font-size: 0.92rem;
      color: var(--text); margin-bottom: 10px;
    }
    .process-step p { font-size: 0.80rem; line-height: 1.65; color: var(--muted); }

    /* ════════════════════════════════════════
       CREDIBILITY
    ════════════════════════════════════════ */
    .cred-section { padding: 140px 0 120px; }
    .cred-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 52px;
    }
    .cred-card {
      padding: 32px;
      border-radius: 16px;
      border: 1px solid var(--border);
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      transition: all 0.25s;
    }
    .cred-card:hover { border-color: var(--border-hover); }
    .cred-card-label {
      font-size: 0.70rem;
      font-weight: 700;
      letter-spacing: 0.10em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 12px;
    }
    .cred-card h3 {
      font-family: 'Syne', sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 10px;
    }
    .cred-card p { font-size: 0.85rem; line-height: 1.7; color: var(--muted); }
    .cred-pill-row { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 16px; }
    .cred-pill {
      padding: 4px 12px;
      border-radius: 6px;
      background: rgba(255,255,255,0.04);
      border: 1px solid var(--border);
      font-size: 0.72rem;
      color: var(--muted);
    }

    /* ════════════════════════════════════════
       ARCHITECTURE / TECHNICAL SIGNAL
    ════════════════════════════════════════ */
    .arch-section { padding: 0 0 120px; }
    .arch-inner {
      border-radius: 20px;
      border: 1px solid var(--border);
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      padding: 56px 60px;
      position: relative;
      overflow: hidden;
    }
    .arch-inner::before {
      content: '';
      position: absolute;
      top: -30%; right: -10%;
      width: 400px; height: 400px;
      background: radial-gradient(ellipse, rgba(59,130,246,0.07), transparent 70%);
      pointer-events: none;
    }
    .arch-top {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 48px;
      margin-bottom: 52px;
      flex-wrap: wrap;
    }
    .arch-top-left { max-width: 480px; }
    .arch-top-left p {
      margin-top: 16px;
      font-size: 0.9rem;
      line-height: 1.75;
      color: var(--muted);
    }
    /* Diagram */
    .arch-diagram {
      display: flex;
      align-items: center;
      gap: 0;
      flex-wrap: wrap;
      row-gap: 16px;
      flex-shrink: 0;
    }
    .arch-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }
    .arch-node-box {
      padding: 10px 18px;
      border-radius: 10px;
      border: 1px solid var(--border);
      background: rgba(15,23,42,0.7);
      font-family: 'Syne', sans-serif;
      font-size: 0.78rem;
      font-weight: 700;
      color: var(--text);
      white-space: nowrap;
    }
    .arch-node-box.accent {
      border-color: var(--accent-glow);
      background: var(--accent-dim);
      color: var(--accent-light);
    }
    .arch-node-sub {
      font-size: 0.62rem;
      color: var(--muted-2);
      letter-spacing: 0.04em;
      text-align: center;
    }
    .arch-arrow {
      padding: 0 8px;
      padding-bottom: 22px;
      color: var(--muted-2);
      font-size: 1rem;
    }
    /* Decisions */
    .arch-decisions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      padding-top: 40px;
      border-top: 1px solid var(--border);
    }
    .arch-decision {
      padding: 22px;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: rgba(15,23,42,0.4);
      transition: border-color 0.25s;
    }
    .arch-decision:hover { border-color: var(--border-hover); }
    .arch-decision-q {
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 8px;
    }
    .arch-decision h4 {
      font-family: 'Syne', sans-serif;
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 8px;
    }
    .arch-decision p { font-size: 0.78rem; line-height: 1.65; color: var(--muted); }

    /* ════════════════════════════════════════
       CTA
    ════════════════════════════════════════ */
    .cta-section { padding: 140px 0 140px; }
    .cta-inner {
      border-radius: 24px;
      border: 1px solid var(--border);
      background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95));
      backdrop-filter: blur(24px);
      padding: 90px 80px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .cta-inner::before {
      content: '';
      position: absolute;
      top: -60%; left: 50%;
      transform: translateX(-50%);
      width: 70%; height: 300px;
      background: radial-gradient(ellipse, rgba(59,130,246,0.12), transparent 70%);
      pointer-events: none;
    }
    .cta-inner h2 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(1.9rem, 3.5vw, 3rem);
      font-weight: 800;
      letter-spacing: -0.025em;
      line-height: 1.1;
      margin-bottom: 20px;
    }
    .cta-inner > p {
      font-size: 1.0rem;
      color: var(--muted);
      max-width: 460px;
      margin: 0 auto 44px;
      line-height: 1.75;
      font-weight: 300;
    }
    .cta-avail {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
      color: var(--muted);
      margin-bottom: 40px;
      letter-spacing: 0.05em;
    }
    .cta-avail .dot { width: 6px; height: 6px; border-radius: 50%; background: #34D399; animation: pulse 2s infinite; }
    .cta-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }

    /* ════════════════════════════════════════
       FOOTER
    ════════════════════════════════════════ */
    footer {
      position: relative; z-index: 1;
      border-top: 1px solid var(--border);
      padding: 36px 64px;
      max-width: 1180px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .footer-left p { font-size: 0.78rem; color: var(--muted-2); }
    .footer-left p span { color: var(--accent); }
    .footer-links { display: flex; gap: 28px; }
    .footer-links a {
      font-size: 0.78rem;
      color: var(--muted-2);
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-links a:hover { color: var(--text); }

    /* ════════════════════════════════════════
       RESPONSIVE
    ════════════════════════════════════════ */
    @media (max-width: 1024px) {
      .container { padding: 0 28px; }
      footer { padding: 28px; flex-direction: column; gap: 16px; text-align: center; }
      .about-grid { grid-template-columns: 1fr; gap: 48px; }
      .tech-categories { grid-template-columns: 1fr 1fr; }
      .projects-grid { grid-template-columns: 1fr 1fr; }
      .process-steps { grid-template-columns: 1fr 1fr; gap: 40px; }
      .process-steps::before { display: none; }
      .cred-grid { grid-template-columns: 1fr; }
      .arch-decisions { grid-template-columns: 1fr 1fr; }
      .arch-inner { padding: 40px 32px; }
      .arch-top { flex-direction: column; }
      .about-section    { padding-top: 100px; }
      .tech-section     { padding-top: 100px; }
      .projects-section { padding-top: 100px; }
      .process-section  { padding-top: 100px; }
      .cred-section     { padding-top: 100px; }
      .cta-section      { padding-top: 100px; }
    }
    @media (max-width: 640px) {
      .hero { padding-top: 140px; }
      .hero-headline { font-size: 2.4rem; }
      .projects-grid { grid-template-columns: 1fr; }
      .process-steps { grid-template-columns: 1fr; }
      .tech-categories { grid-template-columns: 1fr 1fr; }
      .projects-header { flex-direction: column; align-items: flex-start; gap: 20px; }
      .cta-inner { padding: 52px 24px; }
      .arch-decisions { grid-template-columns: 1fr; }
      .arch-inner { padding: 28px 20px; }
      .about-section    { padding-top: 72px; }
      .tech-section     { padding-top: 72px; }
      .projects-section { padding-top: 72px; }
      .process-section  { padding-top: 72px; }
      .cred-section     { padding-top: 72px; }
      .cta-section      { padding-top: 72px; }
    }
  `}</style>
);

// ─── Scroll reveal ────────────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible');
      }),
      { threshold: 0.10 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ─── Counter ─────────────────────────────────────────────────────────────────
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [val, setVal] = useState<number | null>(null);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    setVal(0);
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      let s = 0;
      const step = end / 40;
      const t = setInterval(() => {
        s = Math.min(s + step, end);
        setVal(Math.round(s));
        if (s >= end) clearInterval(t);
      }, 28);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);
  return <span ref={ref}>{val === null ? end : val}{suffix}</span>;
}

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconExternal = () => (
  <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
    <path d="M1 13L13 1M13 1H5M13 1v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Static data ─────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    name: 'Zolarux Marketplace',
    description: 'Trust-first social commerce platform for the Nigerian market. Handles escrow payments, multi-step vendor verification, and structured dispute mediation.',
    tech: 'Flutter',
    tags: ['Supabase', 'Dart', 'REST API'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80',
    liveUrl: 'https://zolarux.com.ng',
    caseStudyUrl: '/projects/zolarux',
  },
  {
    id: 2,
    name: 'Admin Command Center',
    description: 'Real-time operations dashboard for monitoring vendor risk scores, processing orders, and reviewing stolen device reports with role-based access control.',
    tech: 'Flutter',
    tags: ['Firebase', 'Auth', 'Realtime'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=80',
    liveUrl: '#',
    caseStudyUrl: null,
  },
  {
    id: 3,
    name: 'Phonics Assessment Tool',
    description: 'Interactive 30-word reading assessment app for primary school students built specifically for Nigerian classrooms with offline-first support.',
    tech: 'Next.js',
    tags: ['React', 'TypeScript', 'Edge'],
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80',
    liveUrl: '#',
    caseStudyUrl: null,
  },
];

const capabilities = [
  { icon: '📱', title: 'Mobile Development',     desc: 'Flutter apps for iOS & Android — architected for scale, shipped to production.' },
  { icon: '⚙️', title: 'Backend & APIs',          desc: 'Supabase, Firebase, REST API design, real-time sync & secure JWT auth.' },
  { icon: '🌐', title: 'Web Applications',        desc: 'Next.js, React — server components, edge deployment, optimised performance.' },
  { icon: '🔐', title: 'Trust Systems',           desc: 'Escrow logic, vendor verification, risk scoring & fraud prevention flows.' },
  { icon: '🤖', title: 'AI-Accelerated Builds',   desc: 'Using AI as a force multiplier to accelerate development cycles without cutting corners.' },
];

const techCategories = [
  { label: 'Frontend',        items: ['Flutter / Dart', 'Next.js 14', 'React', 'TypeScript'] },
  { label: 'Backend & DB',    items: ['Supabase', 'Firebase', 'REST APIs', 'PostgreSQL'] },
  { label: 'Auth & Payments', items: ['Supabase Auth', 'Firebase Auth', 'Escrow Flows', 'Webhooks'] },
  { label: 'Infra & Deploy',  items: ['Vercel', 'Edge Functions', 'CI / CD', 'GitHub Actions'] },
];

const processSteps = [
  { n: '01', title: 'Understand', desc: 'Deep dive into the problem, the user, and the constraints before writing a single line.' },
  { n: '02', title: 'Design',     desc: 'Wireframes, data models, and API contracts — architecture before implementation.' },
  { n: '03', title: 'Build',      desc: 'Tight iteration cycles with weekly demos. No blackholes, no surprises.' },
  { n: '04', title: 'Ship',       desc: 'Launch early, instrument everything, iterate on real user signal.' },
];

const archNodes = [
  { label: 'Flutter App', sub: 'Client',         accent: false },
  { arrow: true },
  { label: 'REST / WS',   sub: 'API Layer',       accent: false },
  { arrow: true },
  { label: 'Supabase',    sub: 'Postgres + RLS',  accent: true  },
  { arrow: true },
  { label: 'Edge Fn',     sub: 'Vercel',           accent: false },
];

const archDecisions = [
  {
    q: 'Why Supabase over Firebase?',
    title: 'SQL over NoSQL',
    desc: "Escrow and risk scoring require complex relational queries and strict Row-Level Security. Firebase's document model made that brittle. Supabase gave us Postgres, RLS policies, and real-time — out of the box.",
  },
  {
    q: 'How is auth handled?',
    title: 'JWT + RLS policies',
    desc: 'Every DB query is scoped to the authenticated user via Supabase RLS. No server-side auth middleware needed — security lives at the database layer, making it impossible to accidentally expose data.',
  },
  {
    q: 'Edge cases handled?',
    title: 'Escrow & dispute flows',
    desc: 'Funds are held in escrow until delivery is confirmed. Disputes trigger a mediation state with admin override. All state transitions are atomic DB transactions — no partial updates, ever.',
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  useReveal();

  return (
    <>
      <GlobalStyles />
      <div className="bg-mesh" aria-hidden="true" />

      {/* ══════════ HERO ══════════ */}
      <section>
        <div className="container hero">
          <div className="hero-eyebrow fade-up-1">
            <span className="dot" />
            Open to freelance &amp; co-founding
          </div>

          <h1 className="hero-headline fade-up-2">
            Full-Stack Engineer.<br />
            <span className="line-accent">Founder Instinct.</span>
            <br />
            <span className="line-dim">AI-First Execution.</span>
          </h1>

          <p className="hero-sub fade-up-3">
            I design, architect, and ship <strong>production-grade apps</strong> — mobile to web — with the
            speed of a solo founder and the rigour of an engineering team. Currently building{' '}
            <strong>Zolarux</strong>, a trust infrastructure layer for Nigerian social commerce.
          </p>

          {/* Immediate proof — live product link right under the description */}
          <div className="hero-proof fade-up-3">
            <a href="https://zolarux.com.ng" target="_blank" rel="noopener noreferrer" className="proof-link">
              <span className="proof-dot" />
              Live — zolarux.com.ng
              <IconExternal />
            </a>
            <a href="/projects/zolarux" className="proof-link proof-link--ghost">
              Case Study →
            </a>
          </div>

          <div className="hero-tech-stack fade-up-4">
            {['Flutter', 'Next.js', 'Supabase', 'Firebase', 'TypeScript', 'Vercel'].map(t => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>

          <div className="hero-actions fade-up-5">
            <a href="#work" className="btn-primary">See My Work</a>
            <a href="mailto:hello@zolarux.com" className="btn-ghost">Get in Touch →</a>
          </div>

          <div className="hero-scroll fade-up-5">
            <span className="scroll-line" />
            Scroll to explore
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section>
        <div className="container stats-section">
          <div className="stats-grid reveal">
            <div className="stat-item">
              <div className="stat-number"><Counter end={6} /><em>+</em></div>
              <div className="stat-label">Production apps shipped</div>
              <div className="stat-desc">iOS, Android &amp; web</div>
            </div>
            <div className="stat-item">
              <div className="stat-number"><Counter end={300} /><em>+</em></div>
              <div className="stat-label">Real users served</div>
              <div className="stat-desc">Across Zolarux &amp; client projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-number"><Counter end={4} /></div>
              <div className="stat-label">Systems designed end-to-end</div>
              <div className="stat-desc">Auth · payments · real-time · CMS</div>
            </div>
            <div className="stat-item">
              <div className="stat-number"><Counter end={50} /><em>+</em></div>
              <div className="stat-label">Features deployed to production</div>
              <div className="stat-desc">With CI/CD &amp; zero-downtime releases</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ WHAT I DO ══════════ */}
      <section id="about">
        <div className="container about-section">
          <div className="reveal">
            <span className="section-tag">What I Do</span>
            <h2 className="section-title">Engineer. Founder.<br />One person. Full stack.</h2>
          </div>
          <div className="about-grid">
            <div className="about-left reveal">
              <p>
                I combine <strong>product thinking with hands-on engineering</strong> to build platforms that
                work in the real world — not just on pitch decks. Every decision is oriented around shipping
                something people will actually use.
              </p>
              <p>
                Right now I'm building <strong>Zolarux</strong> — a trust infrastructure layer for Nigerian
                social commerce handling vendor verification, escrow payments, risk scoring, and dispute
                mediation end-to-end.
              </p>
              <p>
                I use AI tools deliberately — as force multipliers to accelerate development cycles — not as a
                replacement for engineering discipline.
              </p>
              <div className="arch-callout">
                <strong>Architecture snapshot:</strong> Built with Next.js, deployed on Vercel edge, backed by
                Supabase with Row-Level Security, real-time subscriptions, and secure JWT auth flows. State
                management via Zustand. CI/CD through GitHub Actions.
              </div>
            </div>
            <div className="capability-list reveal">
              {capabilities.map(cap => (
                <div key={cap.title} className="cap-item">
                  <div className="cap-icon">{cap.icon}</div>
                  <div className="cap-text">
                    <h4>{cap.title}</h4>
                    <p>{cap.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TECH STACK ══════════ */}
      <section id="tech">
        <div className="container tech-section">
          <div className="tech-header reveal">
            <div>
              <span className="section-tag">Tech Stack</span>
              <h2 className="section-title">Tools I ship with.</h2>
            </div>
          </div>
          <div className="tech-categories">
            {techCategories.map((cat, i) => (
              <div key={cat.label} className="tech-category reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="tech-cat-label">{cat.label}</div>
                <div className="tech-cat-items">
                  {cat.items.map(item => (
                    <div key={item} className="tech-cat-item">{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROJECTS ══════════ */}
      <section id="work">
        <div className="container projects-section">
          <div className="projects-header reveal">
            <div>
              <span className="section-tag">Selected Work</span>
              <h2 className="section-title">Projects that ship.</h2>
            </div>
            <a href="/projects" className="btn-ghost" style={{ whiteSpace: 'nowrap' }}>All Projects →</a>
          </div>
          <div className="projects-grid">
            {projects.map((project, i) => (
              <div key={project.id} className="project-card reveal" style={{ transitionDelay: `${i * 0.10}s` }}>
                <div className="project-img-wrap">
                  <img src={project.image} alt={project.name} loading="lazy" />
                  <div className="project-overlay" />
                  <span className="project-badge">{project.tech}</span>
                </div>
                <div className="project-body">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="project-footer">
                    <div className="project-tags">
                      {project.tags.map(tag => (
                        <span key={tag} className="project-tag">{tag}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.caseStudyUrl && (
                        <a href={project.caseStudyUrl} className="project-link project-link--secondary">
                          Deep Dive →
                        </a>
                      )}
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Live <IconExternal />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ HOW I WORK ══════════ */}
      <section id="process">
        <div className="container process-section">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <span className="section-tag">How I Work</span>
            <h2 className="section-title">From idea to live product.</h2>
          </div>
          <div className="process-steps">
            {processSteps.map((s, i) => (
              <div key={s.n} className="process-step reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="step-num">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CREDIBILITY ══════════ */}
      <section>
        <div className="container cred-section">
          <div className="reveal">
            <span className="section-tag">Why Take Me Seriously</span>
            <h2 className="section-title">Built real things.<br />Shipped to real users.</h2>
          </div>
          <div className="cred-grid">
            <div className="cred-card reveal">
              <div className="cred-card-label">Founder Track Record</div>
              <h3>I run Zolarux end-to-end</h3>
              <p>
                As founder and sole engineer, I designed the architecture, built the mobile app and admin
                dashboard, and onboarded verified vendors — managing the product from idea to live users
                without a team.
              </p>
              <div className="cred-pill-row">
                <span className="cred-pill">Product Design</span>
                <span className="cred-pill">Architecture</span>
                <span className="cred-pill">Deployment</span>
                <span className="cred-pill">Operations</span>
              </div>
            </div>
            <div className="cred-card reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="cred-card-label">Engineering Depth</div>
              <h3>Systems that handle edge cases</h3>
              <p>
                Escrow flows, risk scoring, real-time sync, role-based access, stolen device databases — the
                hard problems that separate toy apps from production software. That's where I've spent my time.
              </p>
              <div className="cred-pill-row">
                <span className="cred-pill">Auth & RLS</span>
                <span className="cred-pill">Real-time DB</span>
                <span className="cred-pill">Escrow Logic</span>
                <span className="cred-pill">Risk Scoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ TECHNICAL SIGNAL — Architecture ══════════ */}
      <section id="architecture">
        <div className="container arch-section">
          <div className="arch-inner reveal">
            <div className="arch-top">
              <div className="arch-top-left">
                <span className="section-tag">Technical Depth</span>
                <h2 className="section-title">How I think<br />about systems.</h2>
                <p>
                  The actual architecture behind Zolarux — real decisions, real tradeoffs, real edge cases.
                  Not a tutorial project. A system built for production constraints.
                </p>
              </div>

              {/* Visual architecture diagram */}
              <div className="arch-diagram">
                {archNodes.map((node, i) =>
                  node.arrow ? (
                    <div key={i} className="arch-arrow">→</div>
                  ) : (
                    <div key={i} className="arch-node">
                      <div className={`arch-node-box${node.accent ? ' accent' : ''}`}>
                        {node.label}
                      </div>
                      <span className="arch-node-sub">{node.sub}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Engineering decisions */}
            <div className="arch-decisions">
              {archDecisions.map((d, i) => (
                <div key={i} className="arch-decision reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="arch-decision-q">{d.q}</div>
                  <h4>{d.title}</h4>
                  <p>{d.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section>
        <div className="container cta-section">
          <div className="cta-inner reveal">
            <div className="cta-avail">
              <span className="dot" />
              Available for new projects — Q2–Q4 2026
            </div>
            <h2>Ready to build<br />something real?</h2>
            <p>
              Open to freelance projects, product consulting, and technical co-founding opportunities.
              Let's ship something people will actually use.
            </p>
            <div className="cta-buttons">
              <a href="mailto:hello@zolarux.com" className="btn-primary">Work With Me</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                View GitHub →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer>
        <div className="footer-left">
          <p>© 2026 <span>Rex Orokumue</span> · Built with Next.js &amp; intention.</p>
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