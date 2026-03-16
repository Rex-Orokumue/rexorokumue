// app/build-logs/page.tsx
// Server component — fetches live from Supabase on every request

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── Types ────────────────────────────────────────────────────────────────────
type Tag = 'build' | 'design' | 'fix' | 'launch' | 'learning';

interface Entry {
  id: string;
  project_id: string;
  day: string;
  date: string;
  title: string;
  body: string;
  tags: Tag[];
  decision?: string;
  is_latest: boolean;
  sort_order: number;
}

interface ProjectMeta {
  id: string;
  name: string;
  icon: string;
  desc: string;
  status: 'live' | 'building' | 'design';
}

const PROJECT_META: ProjectMeta[] = [
  { id: 'portfolio', name: 'Portfolio Website',            icon: '🌐', desc: 'This site — building in public from scratch',              status: 'building' },
  { id: 'zolarux',  name: 'Zolarux',                       icon: '🔐', desc: 'Trust infrastructure for Nigerian social commerce',         status: 'live'     },
  { id: 'edupanion',name: 'EduPanion',                     icon: '📚', desc: 'Interactive phonics & literacy tool for Nigerian classrooms',status: 'building' },
  { id: 'admin',    name: 'Zolarux Admin Control Center',  icon: '⚙️', desc: 'Real-time ops dashboard — mobile, web & Windows',          status: 'live'     },
];

const TAG_LABELS: Record<Tag, string> = {
  build: 'Build', design: 'Design', fix: 'Fix', launch: 'Launch', learning: 'Learning',
};

// ─── Fetch data ───────────────────────────────────────────────────────────────
async function getEntries(): Promise<Entry[]> {
  const { data, error } = await supabase
    .from('build_log_entries')
    .select('*')
    .order('project_id')
    .order('sort_order', { ascending: true });

  if (error) { console.error('Supabase error:', error); return []; }
  return data ?? [];
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function BuildLogsPage() {
  const entries = await getEntries();

  const grouped = PROJECT_META.map(meta => ({
    ...meta,
    entries: entries.filter(e => e.project_id === meta.id),
  })).filter(g => g.entries.length > 0);

  const totalEntries = entries.length;

  const tagCounts: Record<Tag, number> = { build: 0, design: 0, fix: 0, launch: 0, learning: 0 };
  entries.forEach(e => e.tags.forEach(t => { tagCounts[t] = (tagCounts[t] ?? 0) + 1; }));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --secondary: #0F172A; --accent: #3B82F6; --accent-dim: rgba(59,130,246,0.10);
          --accent-glow: rgba(59,130,246,0.30); --accent-light: #93C5FD;
          --text: #F1F5F9; --muted: #94A3B8; --muted-2: #64748B;
          --border: rgba(255,255,255,0.07); --border-hover: rgba(59,130,246,0.25);
          --card-bg: rgba(30,41,59,0.55); --green: #34D399;
          --mono: 'JetBrains Mono', monospace;
        }
        html { scroll-behavior: smooth; }
        body { background: var(--secondary); color: var(--text); font-family: 'DM Sans', sans-serif; overflow-x: hidden; line-height: 1.6; }
        body::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E"); pointer-events: none; z-index: 9999; opacity: 0.5; }
        .bg-mesh { position: fixed; inset: 0; z-index: 0; background: radial-gradient(ellipse 65% 45% at 5% 0%, rgba(59,130,246,0.11) 0%, transparent 60%), radial-gradient(ellipse 50% 55% at 95% 95%, rgba(59,130,246,0.06) 0%, transparent 55%), var(--secondary); }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.4} }
        section { position: relative; z-index: 1; }
        .container { max-width: 900px; margin: 0 auto; padding: 0 64px; }
        .logs-hero { padding-top: 160px; padding-bottom: 56px; }
        .hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px 5px 8px; border-radius: 100px; border: 1px solid var(--accent-glow); background: var(--accent-dim); font-size: .70rem; font-weight: 600; letter-spacing: .10em; text-transform: uppercase; color: var(--accent); margin-top: -60px; margin-bottom: 28px; width: fit-content; }
        .hero-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; flex-shrink: 0; }
        .logs-headline { font-family: 'Syne',sans-serif; font-size: clamp(2.2rem,5vw,3.8rem); font-weight: 800; line-height: 1.0; letter-spacing: -.03em; color: var(--text); }
        .logs-headline .accent { color: var(--accent); }
        .logs-sub { margin-top: 18px; font-size: 1rem; line-height: 1.75; color: var(--muted); max-width: 560px; font-weight: 300; }
        .logs-sub strong { color: var(--text); font-weight: 500; }
        .logs-meta { display: flex; align-items: center; gap: 12px; margin-top: 28px; flex-wrap: wrap; }
        .meta-pill { display: flex; align-items: center; gap: 7px; padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border); background: var(--card-bg); font-size: .75rem; color: var(--muted); }
        .meta-pill .live { width: 6px; height: 6px; border-radius: 50%; background: var(--green); animation: pulse 2s infinite; flex-shrink: 0; }
        .meta-pill strong { color: var(--text); font-weight: 500; }
        .logs-admin-link { display: inline-flex; align-items: center; gap: 7px; padding: 6px 14px; border-radius: 8px; border: 1px solid var(--border); background: var(--card-bg); font-size: .75rem; color: var(--muted); text-decoration: none; transition: border-color .2s, color .2s; }
        .logs-admin-link:hover { border-color: var(--border-hover); color: var(--text); }
        .logs-body { padding-bottom: 120px; }
        .project-group { margin-top: 64px; }
        .group-header { display: flex; align-items: center; gap: 16px; padding-bottom: 20px; margin-bottom: 28px; border-bottom: 1px solid var(--border); }
        .group-icon { width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0; border: 1px solid var(--border); background: var(--card-bg); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; }
        .group-name { font-family: 'Syne',sans-serif; font-weight: 800; font-size: 1.1rem; color: var(--text); }
        .group-meta { display: flex; align-items: center; gap: 8px; margin-top: 4px; flex-wrap: wrap; }
        .group-desc { font-size: .78rem; color: var(--muted); }
        .group-count { font-family: var(--mono); font-size: .63rem; font-weight: 600; color: var(--accent); letter-spacing: .08em; padding: 2px 8px; border-radius: 4px; background: var(--accent-dim); border: 1px solid var(--accent-glow); }
        .status-pill { font-size: .63rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; padding: 2px 8px; border-radius: 4px; }
        .status-pill.live { background: rgba(52,211,153,.10); border: 1px solid rgba(52,211,153,.25); color: var(--green); }
        .status-pill.building { background: rgba(251,191,36,.08); border: 1px solid rgba(251,191,36,.25); color: #FDE68A; }
        .status-pill.design { background: rgba(167,139,250,.10); border: 1px solid rgba(167,139,250,.25); color: #C4B5FD; }
        .timeline { position: relative; }
        .timeline::before { content: ''; position: absolute; left: 0; top: 8px; bottom: 0; width: 1px; background: linear-gradient(to bottom, var(--accent-glow) 0%, rgba(59,130,246,.06) 80%, transparent); }
        .log-entry { position: relative; padding: 0 0 40px 40px; }
        .log-entry:last-child { padding-bottom: 0; }
        .log-dot { position: absolute; left: -5px; top: 10px; width: 10px; height: 10px; border-radius: 50%; background: var(--secondary); border: 2px solid var(--accent-glow); }
        .log-dot.latest { background: var(--accent); border-color: var(--accent); }
        .log-day { font-family: var(--mono); font-size: .67rem; font-weight: 600; color: var(--accent); letter-spacing: .10em; text-transform: uppercase; margin-bottom: 8px; display: flex; align-items: center; gap: 10px; }
        .log-day-sep { width: 16px; height: 1px; background: var(--accent-glow); }
        .log-day-date { color: var(--muted-2); font-weight: 400; }
        .latest-badge { padding: 2px 7px; border-radius: 4px; background: rgba(52,211,153,.10); border: 1px solid rgba(52,211,153,.3); font-size: .58rem; color: var(--green); font-family: var(--mono); letter-spacing: .08em; }
        .log-card { border-radius: 12px; border: 1px solid var(--border); background: var(--card-bg); backdrop-filter: blur(12px); padding: 20px 24px; }
        .log-card-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px; flex-wrap: wrap; }
        .log-title { font-family: 'Syne',sans-serif; font-weight: 700; font-size: .95rem; color: var(--text); line-height: 1.3; }
        .log-tags { display: flex; gap: 5px; flex-wrap: wrap; flex-shrink: 0; }
        .log-tag { padding: 2px 9px; border-radius: 4px; font-size: .60rem; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; }
        .log-tag.build    { background: var(--accent-dim); border: 1px solid var(--accent-glow); color: var(--accent-light); }
        .log-tag.design   { background: rgba(167,139,250,.10); border: 1px solid rgba(167,139,250,.25); color: #C4B5FD; }
        .log-tag.fix      { background: rgba(251,191,36,.08); border: 1px solid rgba(251,191,36,.25); color: #FDE68A; }
        .log-tag.launch   { background: rgba(52,211,153,.10); border: 1px solid rgba(52,211,153,.25); color: var(--green); }
        .log-tag.learning { background: rgba(251,146,60,.08); border: 1px solid rgba(251,146,60,.25); color: #FED7AA; }
        .log-body { font-size: .855rem; line-height: 1.75; color: var(--muted); }
        .log-decision { margin-top: 12px; padding: 10px 14px; border-radius: 8px; border-left: 2px solid var(--accent); background: rgba(59,130,246,.06); font-size: .80rem; line-height: 1.65; color: var(--muted); }
        .log-decision-label { font-family: var(--mono); font-size: .58rem; font-weight: 600; letter-spacing: .10em; text-transform: uppercase; color: var(--accent); margin-bottom: 3px; }
        .empty-logs { padding: 80px 0; text-align: center; color: var(--muted-2); font-size: .9rem; }
        .logs-cta { margin-top: 72px; padding: 44px 40px; border-radius: 20px; border: 1px solid var(--border); background: linear-gradient(135deg,rgba(30,41,59,.9),rgba(15,23,42,.95)); backdrop-filter: blur(20px); text-align: center; position: relative; overflow: hidden; }
        .logs-cta::before { content: ''; position: absolute; top: -50%; left: 50%; transform: translateX(-50%); width: 60%; height: 200px; background: radial-gradient(ellipse,rgba(59,130,246,.10),transparent 70%); pointer-events: none; }
        .logs-cta h3 { font-family: 'Syne',sans-serif; font-size: clamp(1.2rem,2.5vw,1.7rem); font-weight: 800; letter-spacing: -.02em; margin-bottom: 10px; }
        .logs-cta p { font-size: .875rem; color: var(--muted); max-width: 380px; margin: 0 auto 24px; line-height: 1.7; }
        .cta-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 12px 26px; background: var(--accent); color: #fff; border-radius: 8px; font-weight: 600; font-size: .875rem; text-decoration: none; box-shadow: 0 4px 24px var(--accent-glow); border: 1px solid transparent; }
        .btn-ghost { display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; border: 1px solid var(--border); color: var(--text); border-radius: 8px; font-weight: 500; font-size: .875rem; text-decoration: none; background: transparent; }
        footer { position: relative; z-index: 1; border-top: 1px solid var(--border); padding: 36px 64px; max-width: 900px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .footer-left p { font-size: .78rem; color: var(--muted-2); }
        .footer-left p span { color: var(--accent); }
        .footer-links { display: flex; gap: 28px; }
        .footer-links a { font-size: .78rem; color: var(--muted-2); text-decoration: none; }
        .footer-links a:hover { color: var(--text); }
        @media (max-width: 768px) {
          .container { padding: 0 20px; }
          footer { padding: 24px 20px; flex-direction: column; gap: 14px; text-align: center; }
          .logs-hero { padding-top: 130px; }
          .logs-headline { font-size: 2rem; }
          .log-entry { padding-left: 28px; padding-bottom: 32px; }
          .log-card { padding: 16px 18px; }
          .log-card-header { flex-direction: column; gap: 8px; }
          .logs-cta { padding: 32px 20px; }
        }
      `}</style>

      <div className="bg-mesh" aria-hidden="true" />

      <section>
        <div className="container logs-hero">
          <div className="hero-eyebrow"><span className="dot" /> Build Logs</div>
          <h1 className="logs-headline">Building in<br /><span className="accent">public.</span></h1>
          <p className="logs-sub">
            Every decision, mistake, and milestone — documented as it happens across all active projects.
            <strong> No polished post-mortems. Just the real process.</strong>
          </p>
          <div className="logs-meta">
            <div className="meta-pill"><span className="live" /><span>Active · Updated regularly</span></div>
            <div className="meta-pill"><strong>{grouped.length}</strong>&nbsp;active projects</div>
            <div className="meta-pill"><strong>{totalEntries}</strong>&nbsp;entries logged</div>
            <a href="/admin" className="logs-admin-link">✎ Add Entry</a>
          </div>
        </div>
      </section>

      <section className="logs-body">
        <div className="container">
          {grouped.length === 0 ? (
            <div className="empty-logs">
              <p>No entries yet. <a href="/admin" style={{color:'var(--accent)'}}>Add the first one →</a></p>
            </div>
          ) : (
            grouped.map(proj => (
              <div key={proj.id} className="project-group">
                <div className="group-header">
                  <div className="group-icon">{proj.icon}</div>
                  <div>
                    <div className="group-name">{proj.name}</div>
                    <div className="group-meta">
                      <span className="group-desc">{proj.desc}</span>
                      <span className={`status-pill ${proj.status}`}>
                        {proj.status === 'live' ? '● Live' : proj.status === 'building' ? '◐ Building' : '◇ Design'}
                      </span>
                      <span className="group-count">{proj.entries.length} entries</span>
                    </div>
                  </div>
                </div>

                <div className="timeline">
                  {proj.entries.map(entry => (
                    <div key={entry.id} className="log-entry">
                      <div className={`log-dot${entry.is_latest ? ' latest' : ''}`} />
                      <div className="log-day">
                        <span>{entry.day}</span>
                        <span className="log-day-sep" />
                        <span className="log-day-date">{entry.date}</span>
                        {entry.is_latest && <span className="latest-badge">LATEST</span>}
                      </div>
                      <div className="log-card">
                        <div className="log-card-header">
                          <h3 className="log-title">{entry.title}</h3>
                          <div className="log-tags">
                            {entry.tags.map(tag => (
                              <span key={tag} className={`log-tag ${tag}`}>{TAG_LABELS[tag as Tag]}</span>
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
            ))
          )}

          <div className="logs-cta">
            <h3>Following the build?</h3>
            <p>If you are a founder or engineer interested in working together, reach out.</p>
            <div className="cta-row">
              <a href="mailto:hello@zolarux.com" className="btn-primary">Work With Me</a>
              <a href="/projects" className="btn-ghost">View Projects →</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-left"><p>© 2026 <span>Rex Orokumue</span> · Built with Next.js & intention.</p></div>
        <div className="footer-links">
          <a href="#">Twitter</a><a href="#">LinkedIn</a>
          <a href="#">GitHub</a><a href="mailto:hello@zolarux.com">Email</a>
        </div>
      </footer>
    </>
  );
}