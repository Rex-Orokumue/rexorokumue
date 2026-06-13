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
  live:     { label: '● Live',      color: '#34D399', bg: 'rgba(52,211,153,0.10)',  border: 'rgba(52,211,153,0.25)' },
  building: { label: '◐ Building',  color: '#FDE68A', bg: 'rgba(251,191,36,0.08)',  border: 'rgba(251,191,36,0.25)' },
  design:   { label: '◇ In Design', color: '#C4B5FD', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.25)' },
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const status = STATUS_MAP[project.status];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --accent-dim:   color-mix(in srgb, var(--accent) 12%, transparent);
          --accent-glow:  transparent;
          --accent-light: var(--accent);
          --muted-2:      var(--muted);
          --border-hover: var(--accent);
          --card:         var(--panel);
          --mono: 'JetBrains Mono', monospace;
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; overflow-x: hidden; line-height: 1.6; }
        .bg-mesh { position: fixed; inset: 0; z-index: 0; background: transparent; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        section, nav, footer { position: relative; z-index: 1; }
        .container { max-width: 900px; margin: 0 auto; padding: 0 64px; }
        .back-nav { padding: 100px 0 0; margin-top: 80px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; font-size: .82rem; color: var(--muted); text-decoration: none; transition: color .2s; }
        .back-link:hover { color: var(--text); }
        .hero { padding: 32px 0 64px; margin-top: 60px; }
        .hero-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
        .status-pill { padding: 3px 12px; border-radius: 100px; font-size: .68rem; font-weight: 700; letter-spacing: .06em; }
        .category-pill { padding: 3px 12px; border-radius: 100px; font-size: .68rem; font-weight: 500; color: var(--muted); background: rgba(255,255,255,0.04); border: 1px solid var(--border); }
        .hero-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.4rem,5vw,4rem); font-weight: 800; line-height: .95; letter-spacing: -.04em; margin-bottom: 16px; }
        .hero-tagline { font-size: 1.1rem; color: var(--muted); font-weight: 300; line-height: 1.65; max-width: 600px; margin-bottom: 28px; }
        .hero-chips { display: flex; gap: 7px; flex-wrap: wrap; margin-bottom: 28px; }
        .chip { padding: 4px 12px; border-radius: 6px; font-family: var(--mono); font-size: .68rem; font-weight: 500; border: 1px solid var(--accent-glow); background: var(--accent-dim); color: var(--accent-light); }
        .hero-links { display: flex; gap: 12px; flex-wrap: wrap; }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 11px 24px; background: var(--accent); color: var(--accent-ink); border-radius: 8px; font-weight: 600; font-size: .875rem; text-decoration: none; border: 1px solid transparent; transition: all .2s; }
        .btn-primary:hover { transform: translateY(-2px); }
        .btn-ghost { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border: 1px solid var(--border); color: var(--muted); border-radius: 8px; font-weight: 500; font-size: .875rem; text-decoration: none; background: transparent; transition: all .2s; }
        .btn-ghost:hover { border-color: var(--border-hover); color: var(--text); }
        .hero-img-wrap { margin: 40px 0; border-radius: 16px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 24px 80px rgba(0,0,0,0.5); }
        .hero-img-wrap img { width: 100%; display: block; }
        .section { padding: 56px 0; border-top: 1px solid var(--border); }
        .section-eyebrow { font-family: var(--mono); font-size: .65rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
        .section-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.6rem,3vw,2.2rem); font-weight: 800; letter-spacing: -.025em; line-height: 1.1; margin-bottom: 20px; }
        .section-body { font-size: .95rem; color: var(--muted); line-height: 1.8; max-width: 680px; }
        .section-body strong { color: var(--text); font-weight: 500; }
        .role-list { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; }
        .role-item { display: flex; gap: 12px; align-items: flex-start; padding: 14px 18px; border-radius: 10px; border: 1px solid var(--border); background: var(--card); font-size: .875rem; color: var(--muted); line-height: 1.5; transition: border-color .2s; }
        .role-item:hover { border-color: var(--border-hover); }
        .role-check { color: var(--accent); flex-shrink: 0; font-size: .75rem; margin-top: 2px; }
        .arch-overview { font-size: .9rem; color: var(--muted); line-height: 1.75; margin-bottom: 28px; max-width: 680px; }
        .arch-layers { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px; margin-bottom: 28px; }
        .arch-layer { padding: 18px 20px; border-radius: 12px; border: 1px solid var(--border); background: var(--card); }
        .arch-layer-label { font-family: var(--mono); font-size: .62rem; font-weight: 600; letter-spacing: .10em; text-transform: uppercase; margin-bottom: 10px; }
        .arch-layer-items { display: flex; flex-wrap: wrap; gap: 6px; }
        .arch-item { padding: 3px 9px; border-radius: 4px; font-family: var(--mono); font-size: .65rem; font-weight: 500; background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: var(--muted-2); }
        .decisions { display: flex; flex-direction: column; gap: 14px; }
        .decision { padding: 20px 22px; border-radius: 12px; border: 1px solid var(--border); background: var(--card); border-left: 3px solid var(--accent); }
        .decision-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: .92rem; color: var(--text); margin-bottom: 6px; }
        .decision-reason { font-size: .83rem; color: var(--muted); line-height: 1.65; }
        .screenshots { display: flex; flex-direction: column; gap: 72px; margin-top: 32px; }
        .screenshot-item { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .screenshot-item.reverse { direction: rtl; }
        .screenshot-item.reverse > * { direction: ltr; }
        .screenshot-caption { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.1rem; color: var(--text); margin-bottom: 12px; }
        .screenshot-desc { font-size: .875rem; color: var(--muted); line-height: 1.75; margin-bottom: 0; }
        .screen-bugs { margin-top: 20px; display: flex; flex-direction: column; gap: 12px; }
        .screen-bug { padding: 14px 16px; border-radius: 10px; border: 1px solid rgba(251,191,36,0.2); background: rgba(251,191,36,0.04); }
        .screen-bug-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: .82rem; color: #FDE68A; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        .screen-bug-title::before { content: '⚠'; font-size: .75rem; }
        .screen-bug-block { margin-bottom: 6px; }
        .screen-bug-block:last-child { margin-bottom: 0; }
        .screen-bug-label { font-family: var(--mono); font-size: .58rem; font-weight: 600; letter-spacing: .10em; text-transform: uppercase; padding: 1px 7px; border-radius: 3px; display: inline-block; margin-bottom: 4px; }
        .screen-bug-label.what { background: rgba(248,113,113,.10); border: 1px solid rgba(248,113,113,.2); color: #FCA5A5; }
        .screen-bug-label.fix  { background: rgba(52,211,153,.10); border: 1px solid rgba(52,211,153,.2); color: #6EE7B7; }
        .screen-bug-text { font-size: .80rem; color: var(--muted); line-height: 1.65; }
        .phone-mockup { display: flex; justify-content: center; }
        .phone-frame { width: 220px; border-radius: 36px; border: 3px solid rgba(255,255,255,0.12); overflow: hidden; box-shadow: 0 24px 60px rgba(0,0,0,0.6); background: #000; }
        .phone-frame img { width: 100%; display: block; }
        .desktop-mockup { width: 100%; }
        .desktop-frame { border-radius: 12px; overflow: hidden; border: 1px solid var(--border); box-shadow: 0 16px 48px rgba(0,0,0,0.5); }
        .desktop-bar { background: #1E293B; padding: 8px 14px; display: flex; align-items: center; gap: 6px; border-bottom: 1px solid var(--border); }
        .desktop-dot { width: 10px; height: 10px; border-radius: 50%; }
        .desktop-frame img { width: 100%; display: block; }
        .challenge-list { display: flex; flex-direction: column; gap: 20px; margin-top: 24px; }
        .challenge { padding: 24px 26px; border-radius: 14px; border: 1px solid var(--border); background: var(--card); }
        .challenge-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: .95rem; color: var(--text); margin-bottom: 14px; display: flex; align-items: center; gap: 10px; }
        .challenge-label { font-family: var(--mono); font-size: .60rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; }
        .challenge-label.problem { background: rgba(248,113,113,.10); border: 1px solid rgba(248,113,113,.25); color: #FCA5A5; }
        .challenge-label.solution { background: rgba(52,211,153,.10); border: 1px solid rgba(52,211,153,.25); color: #6EE7B7; }
        .challenge-block { margin-bottom: 12px; }
        .challenge-block:last-child { margin-bottom: 0; }
        .challenge-text { font-size: .855rem; color: var(--muted); line-height: 1.7; }
        .outcomes-headline { font-family: 'Space Grotesk', sans-serif; font-size: 1.3rem; font-weight: 700; color: var(--text); margin-bottom: 24px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 28px; }
        .metric { padding: 20px; border-radius: 12px; border: 1px solid var(--border); background: var(--card); text-align: center; }
        .metric-val { font-family: 'Space Grotesk', sans-serif; font-size: 2rem; font-weight: 800; color: var(--text); line-height: 1; }
        .metric-label { font-size: .75rem; color: var(--muted); margin-top: 6px; font-weight: 500; }
        .metric-sub { font-size: .65rem; color: var(--muted-2); margin-top: 3px; font-family: var(--mono); }
        .outcomes-body { font-size: .9rem; color: var(--muted); line-height: 1.8; max-width: 640px; }
        .next-steps { display: flex; flex-direction: column; gap: 10px; margin-top: 20px; }
        .next-step { display: flex; align-items: flex-start; gap: 12px; padding: 14px 18px; border-radius: 10px; border: 1px solid var(--border); background: var(--card); font-size: .875rem; color: var(--muted); line-height: 1.5; transition: all .2s; }
        .next-step:hover { border-color: var(--border-hover); transform: translateX(4px); }
        .next-step-icon { color: var(--accent); flex-shrink: 0; font-size: .8rem; margin-top: 2px; }
        .bottom-nav { padding: 48px 0 80px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
        .bottom-nav-left { font-size: .82rem; color: var(--muted-2); }
        footer { border-top: 1px solid var(--border); padding: 32px 64px; max-width: 900px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .footer-text { font-size: .78rem; color: var(--muted-2); }
        .footer-text span { color: var(--accent); }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: .78rem; color: var(--muted-2); text-decoration: none; transition: color .2s; }
        .footer-links a:hover { color: var(--text); }
        @media (max-width: 1024px) {
          .container { padding: 0 28px; }
          .arch-layers { grid-template-columns: 1fr; }
          .metrics-grid { grid-template-columns: repeat(2,1fr); }
          .screenshot-item { grid-template-columns: 1fr; gap: 24px; }
          .screenshot-item.reverse { direction: ltr; }
          footer { padding: 28px; flex-direction: column; gap: 12px; text-align: center; }
        }
        @media (max-width: 640px) {
          .container { padding: 0 20px; }
          .hero-title { font-size: 2.2rem; }
          .metrics-grid { grid-template-columns: repeat(2,1fr); }
          footer { padding: 24px 20px; }
        }
      `}</style>

      <div className="bg-mesh" aria-hidden="true" />

      <nav>
        <div className="container back-nav">
          <Link href="/projects" className="back-link">← Back to Projects</Link>
        </div>
      </nav>

      <section>
        <div className="container hero">
          <div className="hero-meta">
            <span className="status-pill" style={{ color: status.color, background: status.bg, border: `1px solid ${status.border}` }}>
              {status.label}
            </span>
            <span className="category-pill">{project.category}</span>
          </div>
          <h1 className="hero-title">{project.name}</h1>
          <p className="hero-tagline">{project.tagline}</p>
          <div className="hero-chips">
            {project.chips.map(c => <span key={c} className="chip">{c}</span>)}
          </div>
          <div className="hero-links">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                View Live Product ↗
              </a>
            )}
            <Link href="/projects" className="btn-ghost">← All Projects</Link>
          </div>
          <div className="hero-img-wrap">
            <img src={project.heroImage} alt={project.name} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-eyebrow">The Problem</div>
          <h2 className="section-title">{project.problem.headline}</h2>
          <p className="section-body">{project.problem.body}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-eyebrow">My Role</div>
          <h2 className="section-title">What I built and owned.</h2>
          <p className="section-body">{project.role.summary}</p>
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

      <section className="section">
        <div className="container">
          <div className="section-eyebrow">Technical Architecture</div>
          <h2 className="section-title">How it's built.</h2>
          <p className="arch-overview">{project.architecture.overview}</p>
          <div className="arch-layers">
            {project.architecture.layers.map((layer, i) => (
              <div key={i} className="arch-layer">
                <div className="arch-layer-label" style={{ color: layer.color }}>{layer.label}</div>
                <div className="arch-layer-items">
                  {layer.items.map(item => (
                    <span key={item} className="arch-item">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="section-eyebrow" style={{ marginBottom: 14 }}>Key Decisions</div>
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

      <section className="section">
        <div className="container">
          <div className="section-eyebrow">Screenshots</div>
          <h2 className="section-title">Walking through the product.</h2>
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
                          <div className="screen-bug-title">{bug.title}</div>
                          <div className="screen-bug-block">
                            <span className="screen-bug-label what">What happened</span>
                            <p className="screen-bug-text">{bug.what}</p>
                          </div>
                          <div className="screen-bug-block">
                            <span className="screen-bug-label fix">How I fixed it</span>
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
                        <div className="desktop-dot" style={{ background: '#FDE68A' }} />
                        <div className="desktop-dot" style={{ background: '#34D399' }} />
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

      <section className="section">
        <div className="container">
          <div className="section-eyebrow">Challenges & Solutions</div>
          <h2 className="section-title">What was hard. How I solved it.</h2>
          <div className="challenge-list">
            {project.challenges.map((c, i) => (
              <div key={i} className="challenge">
                <div className="challenge-title">{c.title}</div>
                <div className="challenge-block">
                  <span className="challenge-label problem">Problem</span>
                  <p className="challenge-text" style={{ marginTop: 8 }}>{c.problem}</p>
                </div>
                <div className="challenge-block">
                  <span className="challenge-label solution">Solution</span>
                  <p className="challenge-text" style={{ marginTop: 8 }}>{c.solution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-eyebrow">Outcomes & Results</div>
          <h2 className="section-title">{project.outcomes.headline}</h2>
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

      <section className="section">
        <div className="container">
          <div className="section-eyebrow">Next Steps</div>
          <h2 className="section-title">What's coming.</h2>
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
        <div className="container bottom-nav">
          <div className="bottom-nav-left">Enjoyed reading this? Check out all projects.</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/projects" className="btn-ghost">← All Projects</Link>
            <a href="mailto:gorokumue@gmail.com" className="btn-primary">Work With Me →</a>
          </div>
        </div>
      </section>

      <footer>
        <p className="footer-text">© 2026 <span>Rex Orokumue</span> · Built with Next.js & intention.</p>
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