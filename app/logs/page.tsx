'use client';

import { useState, useEffect } from 'react';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
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
      --mono:         'JetBrains Mono', monospace;
    }

    html { scroll-behavior: smooth; }
    body { background: var(--secondary); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; line-height: 1.6; }
    body::after {
      content: ''; position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 9999; opacity: 0.5;
    }
    .bg-mesh {
      position: fixed; inset: 0; z-index: 0;
      background:
        radial-gradient(ellipse 65% 45% at 5% 0%, rgba(59,130,246,0.11) 0%, transparent 60%),
        radial-gradient(ellipse 50% 55% at 95% 95%, rgba(59,130,246,0.06) 0%, transparent 55%),
        var(--secondary);
    }

    @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse  { 0%,100% { opacity:1; } 50% { opacity:0.4; } }

    .fade-up-1 { animation: fadeUp 0.7s 0.05s ease both; }
    .fade-up-2 { animation: fadeUp 0.7s 0.18s ease both; }
    .fade-up-3 { animation: fadeUp 0.7s 0.30s ease both; }

    .reveal { opacity:0; transform:translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
    .reveal.visible { opacity:1; transform:translateY(0); }

    section { position: relative; z-index: 1; }
    .container { max-width: 900px; margin: 0 auto; padding: 0 64px; }

    /* ── HERO ── */
    .logs-hero { padding-top: 160px; padding-bottom: 56px; }
    .hero-eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 5px 14px 5px 8px; border-radius: 100px;
      border: 1px solid var(--accent-glow); background: var(--accent-dim);
      font-size: 0.70rem; font-weight: 600; letter-spacing: 0.10em;
      text-transform: uppercase; color: var(--accent);
      margin-top: -60px; margin-bottom: 28px; width: fit-content;
    }
    .hero-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; flex-shrink: 0; }
    .logs-headline {
      font-family: 'Syne', sans-serif; font-size: clamp(2.2rem, 5vw, 3.8rem);
      font-weight: 800; line-height: 1.0; letter-spacing: -0.03em; color: var(--text);
    }
    .logs-headline .accent { color: var(--accent); }
    .logs-sub { margin-top: 18px; font-size: 1.0rem; line-height: 1.75; color: var(--muted); max-width: 560px; font-weight: 300; }
    .logs-sub strong { color: var(--text); font-weight: 500; }
    .logs-meta { display: flex; align-items: center; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
    .meta-pill { display: flex; align-items: center; gap: 7px; padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border); background: var(--card-bg); font-size: 0.75rem; color: var(--muted); }
    .meta-pill .live { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; flex-shrink: 0; }
    .meta-pill strong { color: var(--text); font-weight: 500; }

    /* ── GLOBAL FILTER ── */
    .global-filter { display: flex; align-items: center; gap: 8px; padding: 24px 0 0; flex-wrap: wrap; position: relative; z-index: 1; }
    .filter-label { font-size: 0.70rem; font-weight: 600; letter-spacing: 0.10em; text-transform: uppercase; color: var(--muted-2); margin-right: 4px; }
    .filter-btn { padding: 5px 14px; border-radius: 100px; border: 1px solid var(--border); background: transparent; font-size: 0.75rem; font-weight: 500; color: var(--muted); cursor: pointer; transition: all 0.2s; font-family: 'DM Sans', sans-serif; }
    .filter-btn:hover { border-color: var(--accent-glow); color: var(--text); }
    .filter-btn.active { background: var(--accent-dim); border-color: var(--accent-glow); color: var(--accent); font-weight: 600; }

    /* ── PROJECT GROUPS ── */
    .logs-body { padding-bottom: 120px; }
    .project-group { margin-top: 64px; }
    .project-group-header {
      display: flex; align-items: center; gap: 16px;
      padding-bottom: 24px; margin-bottom: 32px;
      border-bottom: 1px solid var(--border);
    }
    .project-group-icon {
      width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
      border: 1px solid var(--border); background: var(--card-bg);
      display: flex; align-items: center; justify-content: center; font-size: 1.2rem;
    }
    .project-group-info { flex: 1; min-width: 0; }
    .project-group-name {
      font-family: 'Syne', sans-serif; font-weight: 800; font-size: 1.15rem;
      color: var(--text); line-height: 1.2;
    }
    .project-group-meta { display: flex; align-items: center; gap: 10px; margin-top: 4px; flex-wrap: wrap; }
    .project-group-desc { font-size: 0.78rem; color: var(--muted); }
    .project-group-count {
      font-family: var(--mono); font-size: 0.65rem; font-weight: 600;
      color: var(--accent); letter-spacing: 0.08em;
      padding: 2px 8px; border-radius: 4px;
      background: var(--accent-dim); border: 1px solid var(--accent-glow);
    }
    .project-status-pill {
      font-size: 0.63rem; font-weight: 600; letter-spacing: 0.06em;
      text-transform: uppercase; padding: 2px 8px; border-radius: 4px;
    }
    .project-status-pill.live { background: rgba(52,211,153,0.10); border: 1px solid rgba(52,211,153,0.25); color: var(--green); }
    .project-status-pill.building { background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.25); color: #FDE68A; }
    .project-status-pill.design { background: rgba(167,139,250,0.10); border: 1px solid rgba(167,139,250,0.25); color: #C4B5FD; }

    /* ── TIMELINE ── */
    .timeline { position: relative; }
    .timeline::before {
      content: ''; position: absolute; left: 0; top: 8px; bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, var(--accent-glow) 0%, rgba(59,130,246,0.06) 80%, transparent 100%);
    }
    .log-entry { position: relative; padding: 0 0 40px 40px; }
    .log-entry:last-child { padding-bottom: 0; }
    .log-dot {
      position: absolute; left: -5px; top: 10px;
      width: 10px; height: 10px; border-radius: 50%;
      background: var(--secondary); border: 2px solid var(--accent-glow);
      transition: border-color 0.2s, transform 0.2s;
    }
    .log-entry:hover .log-dot { border-color: var(--accent); transform: scale(1.3); }
    .log-dot.latest { background: var(--accent); border-color: var(--accent); }
    .log-day {
      font-family: var(--mono); font-size: 0.67rem; font-weight: 600;
      color: var(--accent); letter-spacing: 0.10em; text-transform: uppercase;
      margin-bottom: 8px; display: flex; align-items: center; gap: 10px;
    }
    .log-day-sep { width: 16px; height: 1px; background: var(--accent-glow); }
    .log-day-date { color: var(--muted-2); font-weight: 400; }
    .latest-badge {
      padding: 2px 7px; border-radius: 4px;
      background: rgba(52,211,153,0.10); border: 1px solid rgba(52,211,153,0.3);
      font-size: 0.58rem; color: var(--green); font-family: var(--mono); letter-spacing: 0.08em;
    }
    .log-card {
      border-radius: 12px; border: 1px solid var(--border);
      background: var(--card-bg); backdrop-filter: blur(12px);
      padding: 20px 24px; transition: border-color 0.25s, transform 0.25s;
    }
    .log-card:hover { border-color: var(--border-hover); transform: translateX(3px); }
    .log-card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; flex-wrap: wrap; }
    .log-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 0.95rem; color: var(--text); line-height: 1.3; }
    .log-tags { display: flex; gap: 5px; flex-wrap: wrap; flex-shrink: 0; }
    .log-tag { padding: 2px 9px; border-radius: 4px; font-size: 0.60rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
    .log-tag.build    { background: var(--accent-dim); border: 1px solid var(--accent-glow); color: var(--accent-light); }
    .log-tag.design   { background: rgba(167,139,250,0.10); border: 1px solid rgba(167,139,250,0.25); color: #C4B5FD; }
    .log-tag.fix      { background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.25); color: #FDE68A; }
    .log-tag.launch   { background: rgba(52,211,153,0.10); border: 1px solid rgba(52,211,153,0.25); color: var(--green); }
    .log-tag.learning { background: rgba(251,146,60,0.08); border: 1px solid rgba(251,146,60,0.25); color: #FED7AA; }
    .log-body { font-size: 0.855rem; line-height: 1.75; color: var(--muted); }
    .log-body p + p { margin-top: 8px; }
    .log-decision {
      margin-top: 12px; padding: 10px 14px; border-radius: 8px;
      border-left: 2px solid var(--accent); background: rgba(59,130,246,0.06);
      font-size: 0.80rem; line-height: 1.65; color: var(--muted);
    }
    .log-decision-label { font-family: var(--mono); font-size: 0.58rem; font-weight: 600; letter-spacing: 0.10em; text-transform: uppercase; color: var(--accent); margin-bottom: 3px; }

    /* ── CTA ── */
    .logs-cta {
      margin-top: 72px; padding: 44px 40px; border-radius: 20px;
      border: 1px solid var(--border);
      background: linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95));
      backdrop-filter: blur(20px); text-align: center; position: relative; overflow: hidden;
    }
    .logs-cta::before { content: ''; position: absolute; top: -50%; left: 50%; transform: translateX(-50%); width: 60%; height: 200px; background: radial-gradient(ellipse, rgba(59,130,246,0.10), transparent 70%); pointer-events: none; }
    .logs-cta h3 { font-family: 'Syne', sans-serif; font-size: clamp(1.2rem, 2.5vw, 1.7rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 10px; }
    .logs-cta p { font-size: 0.875rem; color: var(--muted); max-width: 380px; margin: 0 auto 24px; line-height: 1.7; }
    .cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 12px 26px; background: var(--accent); color: #fff; border-radius: 8px; font-weight: 600; font-size: 0.875rem; text-decoration: none; transition: all 0.25s; box-shadow: 0 4px 24px var(--accent-glow); border: 1px solid transparent; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 32px var(--accent-glow); }
    .btn-ghost { display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; border: 1px solid var(--border); color: var(--text); border-radius: 8px; font-weight: 500; font-size: 0.875rem; text-decoration: none; transition: all 0.25s; background: transparent; }
    .btn-ghost:hover { border-color: rgba(255,255,255,0.18); background: rgba(255,255,255,0.04); }

    /* ── FOOTER ── */
    footer { position: relative; z-index: 1; border-top: 1px solid var(--border); padding: 36px 64px; max-width: 900px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
    .footer-left p { font-size: 0.78rem; color: var(--muted-2); }
    .footer-left p span { color: var(--accent); }
    .footer-links { display: flex; gap: 28px; }
    .footer-links a { font-size: 0.78rem; color: var(--muted-2); text-decoration: none; transition: color 0.2s; }
    .footer-links a:hover { color: var(--text); }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .container { padding: 0 20px; }
      footer { padding: 24px 20px; flex-direction: column; gap: 14px; text-align: center; }
      .logs-hero { padding-top: 130px; }
      .logs-headline { font-size: 2rem; }
      .log-entry { padding-left: 28px; padding-bottom: 32px; }
      .log-card { padding: 16px 18px; }
      .log-card-header { flex-direction: column; gap: 8px; }
      .logs-cta { padding: 32px 20px; }
      .project-group-header { flex-wrap: wrap; gap: 12px; }
    }
  `}</style>
);

function useReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

type Tag = 'build' | 'design' | 'fix' | 'launch' | 'learning';
type ProjectStatus = 'live' | 'building' | 'design';

interface LogEntry {
  day: string;
  date: string;
  title: string;
  tags: Tag[];
  body: string;
  decision?: string;
  isLatest?: boolean;
}

interface ProjectGroup {
  id: string;
  name: string;
  icon: string;
  desc: string;
  status: ProjectStatus;
  entries: LogEntry[];
}

const TAG_LABELS: Record<Tag, string> = {
  build: 'Build', design: 'Design', fix: 'Fix', launch: 'Launch', learning: 'Learning',
};

const ALL_TAGS: Tag[] = ['build', 'design', 'fix', 'launch', 'learning'];

const projects: ProjectGroup[] = [
  {
    id: 'portfolio',
    name: 'Portfolio Website',
    icon: '🌐',
    desc: 'This site — building it in public from scratch',
    status: 'building',
    entries: [
      {
        day: 'Day 01',
        date: 'Mar 2026',
        title: 'Project Setup — Next.js + TypeScript',
        tags: ['build'],
        body: 'Started the portfolio from scratch. Chose <strong>Next.js 14 App Router</strong>, TypeScript for type safety, and a custom CSS-in-JS approach to avoid Tailwind class bloat on complex layouts. Set up folder structure, installed dependencies, and configured project metadata.',
        decision: 'Building from scratch signals engineering depth better than customising a starter template.',
      },
      {
        day: 'Day 02',
        date: 'Mar 2026',
        title: 'Multi-Page Architecture + NavBar',
        tags: ['build', 'design'],
        body: 'Scaffolded all pages: <strong>Home, About, Projects, Build Logs</strong>. Built the NavBar with scroll-aware transparency, active link indicators, and a mobile hamburger menu. Spent more time than expected getting mobile nav state to close on route change.',
        decision: 'Single fixed NavBar in root layout rather than duplicating per page.',
      },
      {
        day: 'Day 03',
        date: 'Mar 2026',
        title: 'Homepage Hero + Animated Stats Grid',
        tags: ['build', 'design'],
        body: 'Built the hero section with three-line headline, live proof links, and tech tag strip. Added an <strong>animated counter component</strong> that triggers on scroll intersection — numbers count up from 0 when they enter the viewport.',
        decision: 'Used IntersectionObserver instead of a scroll listener — more performant and avoids layout jank.',
      },
      {
        day: 'Day 04',
        date: 'Mar 2026',
        title: 'About Page + Typewriter Effect',
        tags: ['build', 'design'],
        body: 'Built the full About page across 7 sections. Added a <strong>typewriter effect</strong> on the hero headline that loops through phrases. Fixed a page-shift bug caused by the animated line having no reserved height.',
        decision: 'Added min-height: 1.1em to the animated span to prevent layout shift during typewriter transitions.',
      },
      {
        day: 'Day 05',
        date: 'Mar 2026',
        title: 'Projects Page — Conversion-First Structure',
        tags: ['build', 'design'],
        body: 'Built the Projects page with <strong>problem → solution → impact</strong> framing for Zolarux as the flagship. Supporting project cards with outcome lines, a WordPress "Other Work" section, and filter tabs for Mobile / Web / Full-Stack.',
        decision: 'Positioned the page as a track record, not a gallery. Every project answers "what problem did this solve?" before showing the tech stack.',
      },
      {
        day: 'Day 06',
        date: 'Mar 2026',
        title: 'Full Mobile Responsiveness Audit',
        tags: ['fix'],
        body: 'Audited all pages on mobile. Found the hero text was overflowing the viewport due to aggressive letter-spacing at large font sizes. Fixed by switching to 3 stacked lines with explicit display:block spans. Reduced container padding from 64px to 20px at 640px.',
        decision: 'Applied min-width:0 to all grid children — the most common cause of grid overflow missed during desktop testing.',
      },
      {
        day: 'Day 07',
        date: 'Mar 2026',
        title: 'Build Logs Page — Project-Grouped Timeline',
        tags: ['build'],
        body: 'Built this page. Timeline layout grouped by project, with a vertical spine, dot indicators, monospace day labels, and colour-coded entry tags. Filter bar works across all projects by tag type.',
        isLatest: true,
      },
    ],
  },
  {
    id: 'zolarux',
    name: 'Zolarux',
    icon: '🔐',
    desc: 'Trust infrastructure for Nigerian social commerce',
    status: 'live',
    entries: [
      {
        day: 'Milestone',
        date: 'Oct 2025',
        title: 'Zolarux Website Goes Live',
        tags: ['launch'],
        body: 'Launched the <strong>Zolarux web platform</strong> after months of design and development. Vendor verification flow, buyer marketplace, and escrow payment logic all live in production.',
        decision: 'Launched with a small closed group of verified vendors first before opening to the public — controlled quality over fast growth.',
      },
      {
        day: 'Milestone',
        date: 'Nov 2025',
        title: 'Mobile App Launches — 1 Month After Website',
        tags: ['launch'],
        body: 'The <strong>Zolarux Flutter app</strong> went live on Android. Buyers can now browse verified vendors, initiate escrow transactions, and track orders from their phone.',
      },
      {
        day: 'Update',
        date: 'Dec 2025',
        title: '29 Verified Vendors Onboarded',
        tags: ['launch'],
        body: '29 vendors have passed the full verification process — identity check, product review, and admin approval. Each vendor represents a real business on the platform.',
        decision: 'Keeping vendor quality high intentionally. A marketplace with 29 trustworthy vendors is worth more than one with 500 unverified ones.',
      },
      {
        day: 'In Progress',
        date: 'Mar 2026',
        title: 'FinTech Engine — Wallet Interface Design',
        tags: ['design'],
        body: 'Currently designing the <strong>Zolarux FinTech Engine</strong> in Figma — an embedded wallet layer that will power buyer transactions directly inside the app. Balance management, transaction routing, and payment history all in one interface.',
        isLatest: true,
      },
    ],
  },
  {
    id: 'edupanion',
    name: 'EduPanion',
    icon: '📚',
    desc: 'Interactive phonics & literacy assessment tool for Nigerian classrooms',
    status: 'building',
    entries: [
      {
        day: 'Build',
        date: 'Jan 2026',
        title: 'Core Assessment Engine Built',
        tags: ['build'],
        body: 'Built the <strong>core phonics assessment logic</strong> in Flutter — 6 curriculum levels from Nursery through Senior Secondary. Each level has structured word sets, scoring logic, and progress tracking per student.',
      },
      {
        day: 'Build',
        date: 'Feb 2026',
        title: 'Offline-First Architecture Implemented',
        tags: ['build'],
        body: 'Nigerian classroom internet is unreliable. Built the app with <strong>full offline capability</strong> — assessments run, results save, and teacher dashboards update without needing a connection. Sync happens when connectivity is restored.',
        decision: 'Offline-first was a non-negotiable design requirement, not an afterthought. Built it in from day one.',
      },
      {
        day: 'Next',
        date: 'Q2 2026',
        title: 'Seeking First School Partnership',
        tags: ['launch'],
        body: 'The app is built and ready. The next milestone is getting it into the hands of real teachers. Currently reaching out to schools in Lagos for a pilot programme.',
        isLatest: true,
      },
    ],
  },
  {
    id: 'admin',
    name: 'Zolarux Admin Control Center',
    icon: '⚙️',
    desc: 'Real-time ops dashboard — mobile, web & Windows',
    status: 'live',
    entries: [
      {
        day: 'Build',
        date: 'Sep 2025',
        title: 'Real-Time Dashboard Built with Firebase',
        tags: ['build'],
        body: 'Built the admin dashboard that powers Zolarux operations — <strong>vendor risk scores, order pipeline, dispute queue, and stolen device flags</strong> all updating in real-time via Firebase Firestore.',
      },
      {
        day: 'Launch',
        date: 'Oct 2025',
        title: 'Cross-Platform: Mobile + Web + Windows',
        tags: ['launch'],
        body: 'Shipped the admin app across three platforms simultaneously using Flutter — <strong>mobile app, web interface, and Windows desktop</strong>. Operations team can manage the platform from any device.',
        decision: 'Flutter\'s cross-platform capability meant one codebase for three platforms. Maintained a single source of truth for all admin logic.',
      },
      {
        day: 'Impact',
        date: 'Nov 2025',
        title: 'Dispute Response Time Cut to Under 4 Hours',
        tags: ['launch'],
        body: 'Before the admin dashboard, disputes were handled manually and took up to 48 hours to resolve. With the real-time dashboard and structured escalation flow, <strong>average resolution dropped to under 4 hours</strong>.',
      },
    ],
  },
];

export default function BuildLogs() {
  useReveal();
  const [activeTag, setActiveTag] = useState<Tag | 'all'>('all');

  const totalEntries = projects.reduce((sum, p) => sum + p.entries.length, 0);

  const filteredProjects = projects.map(proj => ({
    ...proj,
    entries: activeTag === 'all'
      ? proj.entries
      : proj.entries.filter(e => e.tags.includes(activeTag)),
  })).filter(proj => proj.entries.length > 0);

  const tagCounts: Record<Tag, number> = {} as Record<Tag, number>;
  ALL_TAGS.forEach(tag => {
    tagCounts[tag] = projects.reduce(
      (sum, proj) => sum + proj.entries.filter(e => e.tags.includes(tag)).length, 0
    );
  });

  return (
    <>
      <GlobalStyles />
      <div className="bg-mesh" aria-hidden="true" />

      {/* HERO */}
      <section>
        <div className="container logs-hero">
          <div className="hero-eyebrow fade-up-1"><span className="dot" /> Build Logs</div>
          <h1 className="logs-headline fade-up-2">
            Building in<br /><span className="accent">public.</span>
          </h1>
          <p className="logs-sub fade-up-3">
            Every decision, mistake, and milestone — documented as it happens across all active projects.
            <strong> No polished post-mortems. Just the real process.</strong>
          </p>
          <div className="logs-meta fade-up-3">
            <div className="meta-pill"><span className="live" /><span>Active · Updated regularly</span></div>
            <div className="meta-pill"><strong>{projects.length}</strong>&nbsp;active projects</div>
            <div className="meta-pill"><strong>{totalEntries}</strong>&nbsp;entries logged</div>
          </div>

          {/* Global tag filter */}
          <div className="global-filter fade-up-3">
            <span className="filter-label">Filter:</span>
            <button className={`filter-btn${activeTag === 'all' ? ' active' : ''}`} onClick={() => setActiveTag('all')}>
              All ({totalEntries})
            </button>
            {ALL_TAGS.map(tag => tagCounts[tag] > 0 && (
              <button key={tag} className={`filter-btn${activeTag === tag ? ' active' : ''}`} onClick={() => setActiveTag(tag)}>
                {TAG_LABELS[tag]} ({tagCounts[tag]})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT GROUPS */}
      <section className="logs-body">
        <div className="container">
          {filteredProjects.map((proj, gi) => (
            <div key={proj.id} className="project-group reveal" style={{ transitionDelay: `${gi * 0.08}s` }}>
              {/* Group header */}
              <div className="project-group-header">
                <div className="project-group-icon">{proj.icon}</div>
                <div className="project-group-info">
                  <div className="project-group-name">{proj.name}</div>
                  <div className="project-group-meta">
                    <span className="project-group-desc">{proj.desc}</span>
                    <span className={`project-status-pill ${proj.status}`}>
                      {proj.status === 'live' ? '● Live' : proj.status === 'building' ? '◐ Building' : '◇ Design'}
                    </span>
                    <span className="project-group-count">{proj.entries.length} entries</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="timeline">
                {proj.entries.map((entry, ei) => (
                  <div key={`${proj.id}-${ei}`} className="log-entry">
                    <div className={`log-dot${entry.isLatest ? ' latest' : ''}`} />
                    <div className="log-day">
                      <span>{entry.day}</span>
                      <span className="log-day-sep" />
                      <span className="log-day-date">{entry.date}</span>
                      {entry.isLatest && <span className="latest-badge">LATEST</span>}
                    </div>
                    <div className="log-card">
                      <div className="log-card-header">
                        <h3 className="log-title">{entry.title}</h3>
                        <div className="log-tags">
                          {entry.tags.map(tag => (
                            <span key={tag} className={`log-tag ${tag}`}>{TAG_LABELS[tag]}</span>
                          ))}
                        </div>
                      </div>
                      <div className="log-body" dangerouslySetInnerHTML={{ __html: entry.body }} />
                      {entry.decision && (
                        <div className="log-decision">
                          <div className="log-decision-label">Decision</div>
                          {entry.decision}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="logs-cta reveal">
            <h3>Following the build?</h3>
            <p>If you are a founder or engineer interested in working together, reach out.</p>
            <div className="cta-row">
              <a href="mailto:hello@zolarux.com" className="btn-primary">Work With Me</a>
              <a href="/projects" className="btn-ghost">View Projects →</a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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