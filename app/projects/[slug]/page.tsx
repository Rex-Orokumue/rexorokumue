// app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProject, getAllSlugs, Project } from '../../data/projectsData';

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: `${project.name} — Rex Orokumue`,
      description: project.description,
      url: `https://rexorokumue.vercel.app/projects/${slug}`,
      images: [{ url: project.heroImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} — Rex Orokumue`,
      description: project.description,
    },
    alternates: {
      canonical: `https://rexorokumue.vercel.app/projects/${slug}`,
    },
  };
}

const STATUS_MAP = {
  live:     { label: '● live',      color: '#4ade80', bg: 'rgba(74,222,128,0.08)',  border: 'rgba(74,222,128,0.2)' },
  building: { label: '◐ building',  color: '#ffb000', bg: 'rgba(255,176,0,0.08)',   border: 'rgba(255,176,0,0.2)' },
  design:   { label: '◇ in design', color: '#a3a3a3', bg: 'rgba(163,163,163,0.06)', border: 'rgba(163,163,163,0.18)' },
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const status = STATUS_MAP[project.status];

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; line-height: 1.6; }

        @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .cs-fade { animation: fadeUp 0.5s ease both; }

        section, nav, footer { position: relative; z-index: 1; }

        /* back nav */
        .back-nav { padding: 100px 0 0; margin-top: 80px; }
        .back-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'JetBrains Mono', monospace; font-size: .72rem;
          color: var(--muted); text-decoration: none; transition: color .15s;
        }
        .back-link:hover { color: var(--text); }

        /* hero */
        .cs-hero { padding: 28px 0 52px; }
        .hero-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
        .status-pill {
          padding: 2px 10px; border-radius: 5px;
          font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .05em;
        }
        .category-pill {
          padding: 2px 10px; border-radius: 5px;
          font-family: 'JetBrains Mono', monospace; font-size: .62rem; color: var(--muted);
          background: transparent; border: 1px solid var(--border);
        }
        .cs-hero-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 700;
          line-height: 1.05; letter-spacing: -.025em; margin-bottom: 14px;
        }
        .cs-hero-tagline { font-size: .95rem; color: var(--muted); line-height: 1.7; max-width: 600px; margin-bottom: 24px; }
        .hero-chips { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 24px; }
        .chip {
          padding: 3px 10px; border-radius: 5px;
          font-family: 'JetBrains Mono', monospace; font-size: .63rem;
          border: 1px solid var(--border); background: transparent; color: var(--muted);
        }
        .hero-links { display: flex; gap: 10px; flex-wrap: wrap; }

        /* hero image */
        .hero-img-wrap {
          margin: 36px 0; border-radius: 10px; overflow: hidden;
          border: 1px solid var(--border);
        }
        .hero-img-wrap img { width: 100%; display: block; }

        /* sections */
        .cs-section { padding: 44px 0; border-top: 1px solid var(--border); }

        /* role list */
        .role-list { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; }
        .role-item {
          display: flex; gap: 10px; align-items: flex-start; padding: 12px 16px;
          border-radius: 8px; border: 1px solid var(--border); background: var(--panel);
          font-size: .875rem; color: var(--muted); line-height: 1.5;
        }
        .role-check { color: var(--accent); flex-shrink: 0; font-family: 'JetBrains Mono', monospace; font-size: .72rem; margin-top: 2px; }

        /* architecture */
        .arch-overview { font-size: .875rem; color: var(--muted); line-height: 1.75; margin-bottom: 24px; max-width: 680px; }
        .arch-layers { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; margin-bottom: 24px; }
        .arch-layer { padding: 16px 18px; border-radius: 8px; border: 1px solid var(--border); background: var(--panel); }
        .arch-layer-label {
          font-family: 'JetBrains Mono', monospace; font-size: .60rem; letter-spacing: .08em;
          text-transform: lowercase; margin-bottom: 10px; display: block;
        }
        .arch-layer-items { display: flex; flex-wrap: wrap; gap: 5px; }
        .arch-item {
          padding: 2px 8px; border-radius: 4px;
          font-family: 'JetBrains Mono', monospace; font-size: .60rem;
          background: transparent; border: 1px solid var(--border); color: var(--muted);
        }
        .decisions { display: flex; flex-direction: column; gap: 12px; }
        .decision {
          padding: 18px 20px; border-radius: 8px; border: 1px solid var(--border);
          background: var(--panel); border-left: 3px solid var(--accent);
        }
        .decision-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: .9rem; color: var(--text); margin-bottom: 6px; }
        .decision-reason { font-size: .82rem; color: var(--muted); line-height: 1.65; }

        /* screenshots */
        .screenshots { display: flex; flex-direction: column; gap: 60px; margin-top: 28px; }
        .screenshot-item { display: grid; grid-template-columns: 1fr 1fr; gap: 36px; align-items: start; }
        .screenshot-item.reverse { direction: rtl; }
        .screenshot-item.reverse > * { direction: ltr; }
        .screenshot-caption { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1rem; color: var(--text); margin-bottom: 10px; }
        .screenshot-desc { font-size: .875rem; color: var(--muted); line-height: 1.75; }
        .screen-bugs { margin-top: 18px; display: flex; flex-direction: column; gap: 10px; }
        .screen-bug {
          padding: 14px 16px; border-radius: 8px;
          border: 1px solid var(--border); background: var(--panel-2);
        }
        .screen-bug-title {
          font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: .80rem;
          color: var(--text); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;
        }
        .screen-bug-block { margin-bottom: 6px; }
        .screen-bug-block:last-child { margin-bottom: 0; }
        .screen-bug-label {
          font-family: 'JetBrains Mono', monospace; font-size: .55rem; letter-spacing: .08em;
          text-transform: lowercase; padding: 1px 6px; border-radius: 3px;
          display: inline-block; margin-bottom: 4px;
        }
        .screen-bug-label.what { background: rgba(248,113,113,.08); border: 1px solid rgba(248,113,113,.18); color: #FCA5A5; }
        .screen-bug-label.fix  { background: rgba(74,222,128,.08); border: 1px solid rgba(74,222,128,.18); color: #86efac; }
        .screen-bug-text { font-size: .80rem; color: var(--muted); line-height: 1.65; }

        /* phone / desktop mockups */
        .phone-mockup { display: flex; justify-content: center; }
        .phone-frame {
          width: 210px; border-radius: 28px;
          border: 2px solid var(--border); overflow: hidden;
          background: var(--panel);
        }
        .phone-frame img { width: 100%; display: block; }
        .desktop-mockup { width: 100%; }
        .desktop-frame { border-radius: 10px; overflow: hidden; border: 1px solid var(--border); }
        .desktop-bar {
          background: var(--panel-2); padding: 7px 12px;
          display: flex; align-items: center; gap: 5px;
          border-bottom: 1px solid var(--border);
        }
        .desktop-dot { width: 9px; height: 9px; border-radius: 50%; }
        .desktop-frame img { width: 100%; display: block; }

        /* challenges */
        .challenge-list { display: flex; flex-direction: column; gap: 16px; margin-top: 20px; }
        .challenge { padding: 20px 22px; border-radius: 8px; border: 1px solid var(--border); background: var(--panel); }
        .challenge-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: .9rem; color: var(--text); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .challenge-label {
          font-family: 'JetBrains Mono', monospace; font-size: .55rem; letter-spacing: .06em;
          text-transform: lowercase; padding: 2px 7px; border-radius: 4px;
        }
        .challenge-label.problem { background: rgba(248,113,113,.08); border: 1px solid rgba(248,113,113,.2); color: #FCA5A5; }
        .challenge-label.solution { background: rgba(74,222,128,.08); border: 1px solid rgba(74,222,128,.2); color: #86efac; }
        .challenge-block { margin-bottom: 10px; }
        .challenge-block:last-child { margin-bottom: 0; }
        .challenge-text { font-size: .855rem; color: var(--muted); line-height: 1.7; }

        /* metrics */
        .metrics-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; margin-bottom: 24px; }
        .metric { padding: 18px; border-radius: 8px; border: 1px solid var(--border); background: var(--panel); text-align: center; }
        .metric-val { font-family: 'JetBrains Mono', monospace; font-size: 1.75rem; font-weight: 700; color: var(--accent); line-height: 1; }
        .metric-label { font-size: .72rem; color: var(--muted); margin-top: 6px; }
        .metric-sub { font-family: 'JetBrains Mono', monospace; font-size: .60rem; color: var(--muted); margin-top: 3px; }
        .outcomes-body { font-size: .875rem; color: var(--muted); line-height: 1.8; max-width: 640px; }

        /* next steps */
        .next-steps { display: flex; flex-direction: column; gap: 8px; margin-top: 18px; }
        .next-step {
          display: flex; align-items: flex-start; gap: 10px; padding: 12px 16px;
          border-radius: 8px; border: 1px solid var(--border); background: var(--panel);
          font-size: .875rem; color: var(--muted); line-height: 1.5; transition: border-color .15s;
        }
        .next-step:hover { border-color: var(--accent); }
        .next-step-icon { font-family: 'JetBrains Mono', monospace; color: var(--accent); flex-shrink: 0; font-size: .75rem; margin-top: 2px; }

        /* body text */
        .cs-body { font-size: .9rem; color: var(--muted); line-height: 1.8; max-width: 680px; }
        .cs-body strong { color: var(--text); font-weight: 500; }

        /* bottom nav */
        .bottom-nav {
          padding: 40px 0 72px; border-top: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap;
        }
        .bottom-nav-left { font-family: 'JetBrains Mono', monospace; font-size: .72rem; color: var(--muted); }

        /* footer */
        footer { border-top: 1px solid var(--border); padding: 28px 0; }
        .footer-inner { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
        .footer-text { font-family: 'JetBrains Mono', monospace; font-size: .70rem; color: var(--muted); }
        .footer-text span { color: var(--accent); }
        .footer-links { display: flex; gap: 22px; }
        .footer-links a { font-family: 'JetBrains Mono', monospace; font-size: .70rem; color: var(--muted); text-decoration: none; transition: color .15s; }
        .footer-links a:hover { color: var(--text); }

        /* responsive */
        @media (max-width: 1024px) {
          .arch-layers { grid-template-columns: 1fr; }
          .metrics-grid { grid-template-columns: repeat(2,1fr); }
          .screenshot-item { grid-template-columns: 1fr; gap: 20px; }
          .screenshot-item.reverse { direction: ltr; }
          footer { padding: 22px 0; }
          .footer-inner { flex-direction: column; text-align: center; }
        }
        @media (max-width: 640px) {
          .cs-hero-title { font-size: 2rem; }
          .metrics-grid { grid-template-columns: repeat(2,1fr); }
          .bottom-nav { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <nav>
        <div className="os-container back-nav">
          <Link href="/projects" className="back-link">← back to projects</Link>
        </div>
      </nav>

      <section>
        <div className="os-container cs-hero cs-fade">
          <div className="hero-meta">
            <span className="status-pill" style={{ color: status.color, background: status.bg, border: `1px solid ${status.border}` }}>
              {status.label}
            </span>
            <span className="category-pill">{project.category}</span>
          </div>
          <h1 className="cs-hero-title">{project.name}</h1>
          <p className="cs-hero-tagline">{project.tagline}</p>
          <div className="hero-chips">
            {project.chips.map(c => <span key={c} className="chip">{c}</span>)}
          </div>
          <div className="hero-links">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="os-btn os-btn-primary">
                View Live Product ↗
              </a>
            )}
            <Link href="/projects" className="os-btn">← All Projects</Link>
          </div>
          <div className="hero-img-wrap">
            <img src={project.heroImage} alt={project.name} />
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="os-container">
          <span className="os-label">// the problem</span>
          <h2 className="os-h2" style={{ marginBottom: '1rem' }}>{project.problem.headline}</h2>
          <p className="cs-body">{project.problem.body}</p>
        </div>
      </section>

      <section className="cs-section">
        <div className="os-container">
          <span className="os-label">// my role</span>
          <h2 className="os-h2" style={{ marginBottom: '0.6rem' }}>What I built and owned.</h2>
          <p className="cs-body">{project.role.summary}</p>
          <div className="role-list">
            {project.role.owned.map((item, i) => (
              <div key={i} className="role-item">
                <span className="role-check">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="os-container">
          <span className="os-label">// architecture</span>
          <h2 className="os-h2" style={{ marginBottom: '1.2rem' }}>How it's built.</h2>
          <p className="arch-overview">{project.architecture.overview}</p>
          <div className="arch-layers">
            {project.architecture.layers.map((layer, i) => (
              <div key={i} className="arch-layer">
                <span className="arch-layer-label" style={{ color: layer.color }}>{layer.label}</span>
                <div className="arch-layer-items">
                  {layer.items.map(item => (
                    <span key={item} className="arch-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <span className="os-label" style={{ marginBottom: '1rem' }}>// key decisions</span>
          <div className="decisions">
            {project.architecture.decisions.map((d, i) => (
              <div key={i} className="decision">
                <div className="decision-title">{d.title}</div>
                <div className="decision-reason">{d.reason}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="os-container">
          <span className="os-label">// screenshots</span>
          <h2 className="os-h2" style={{ marginBottom: '0.5rem' }}>Walking through the product.</h2>
          <div className="screenshots">
            {project.screenshots.map((s, i) => (
              <div key={i} className={`screenshot-item${i % 2 === 1 ? ' reverse' : ''}`}>
                <div className="screenshot-info">
                  <div className="screenshot-caption">{s.caption}</div>
                  <p className="screenshot-desc">{s.description}</p>
                  {s.bugs && s.bugs.length > 0 && (
                    <div className="screen-bugs">
                      {s.bugs.map((bug, bi) => (
                        <div key={bi} className="screen-bug">
                          <div className="screen-bug-title">⚠ {bug.title}</div>
                          <div className="screen-bug-block">
                            <span className="screen-bug-label what">// what happened</span>
                            <p className="screen-bug-text">{bug.what}</p>
                          </div>
                          <div className="screen-bug-block">
                            <span className="screen-bug-label fix">// how i fixed it</span>
                            <p className="screen-bug-text">{bug.fix}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {s.device === 'phone' ? (
                  <div className="phone-mockup">
                    <div className="phone-frame">
                      <img src={s.src} alt={s.caption} />
                    </div>
                  </div>
                ) : (
                  <div className="desktop-mockup">
                    <div className="desktop-frame">
                      <div className="desktop-bar">
                        <div className="desktop-dot" style={{ background: '#F87171' }} />
                        <div className="desktop-dot" style={{ background: '#fde68a' }} />
                        <div className="desktop-dot" style={{ background: '#4ade80' }} />
                      </div>
                      <img src={s.src} alt={s.caption} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="os-container">
          <span className="os-label">// challenges & solutions</span>
          <h2 className="os-h2" style={{ marginBottom: '0.5rem' }}>What was hard. How I solved it.</h2>
          <div className="challenge-list">
            {project.challenges.map((c, i) => (
              <div key={i} className="challenge">
                <div className="challenge-title">{c.title}</div>
                <div className="challenge-block">
                  <span className="challenge-label problem">// problem</span>
                  <p className="challenge-text" style={{ marginTop: 6 }}>{c.problem}</p>
                </div>
                <div className="challenge-block">
                  <span className="challenge-label solution">// solution</span>
                  <p className="challenge-text" style={{ marginTop: 6 }}>{c.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section">
        <div className="os-container">
          <span className="os-label">// outcomes</span>
          <h2 className="os-h2" style={{ marginBottom: '1.2rem' }}>{project.outcomes.headline}</h2>
          <div className="metrics-grid">
            {project.outcomes.metrics.map((m, i) => (
              <div key={i} className="metric">
                <div className="metric-val">{m.value}</div>
                <div className="metric-label">{m.label}</div>
                {m.sub && <div className="metric-sub">{m.sub}</div>}
              </div>
            ))}
          </div>
          <p className="outcomes-body">{project.outcomes.body}</p>
        </div>
      </section>

      <section className="cs-section">
        <div className="os-container">
          <span className="os-label">// next steps</span>
          <h2 className="os-h2" style={{ marginBottom: '0.5rem' }}>What's coming.</h2>
          <div className="next-steps">
            {project.nextSteps.map((step, i) => (
              <div key={i} className="next-step">
                <span className="next-step-icon">→</span>
                {step}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="os-container bottom-nav">
          <div className="bottom-nav-left">// enjoyed reading this? check out all projects.</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link href="/projects" className="os-btn">← All Projects</Link>
            <a href="mailto:gorokumue@gmail.com" className="os-btn os-btn-primary">Work With Me →</a>
          </div>
        </div>
      </section>

      <footer>
        <div className="os-container footer-inner">
          <p className="footer-text">© 2026 <span>Rex Orokumue</span> · Built with Next.js &amp; intention.</p>
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
