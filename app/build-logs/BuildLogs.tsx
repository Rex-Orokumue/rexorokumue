'use client';

// app/build-logs/BuildLogs.tsx
// Client component — handles project + tag filtering on pre-fetched data

import { useState, useMemo } from 'react';
import type { Entry } from './page';

type Tag = 'build' | 'design' | 'fix' | 'launch' | 'learning';

interface ProjectMeta {
  id: string;
  name: string;
  icon: string;
  desc: string;
  status: 'live' | 'building' | 'design';
}

const PROJECT_META: ProjectMeta[] = [
  { id: 'portfolio',  name: 'Portfolio Website',           icon: '🌐', desc: 'This site — building in public from scratch',               status: 'building' },
  { id: 'zolarux',   name: 'Zolarux',                      icon: '🔐', desc: 'Trust infrastructure for Nigerian social commerce',          status: 'live'     },
  { id: 'escrowpay', name: 'EscrowPay Engine',             icon: '💳', desc: 'Fintech ledger & escrow infrastructure — Node.js & PostgreSQL double-entry accounting', status: 'building' },
  { id: 'edupanion', name: 'EduPanion',                    icon: '📚', desc: 'Interactive phonics & literacy tool for Nigerian classrooms', status: 'building' },
  { id: 'admin',     name: 'Zolarux Admin Control Center', icon: '⚙️', desc: 'Real-time ops dashboard — mobile, web & Windows',           status: 'live'     },
  { id: 'e-technix', name: 'E-Technix',                    icon: '🎓', desc: 'Digital & tech skills training platform — Nigeria & UK',     status: 'building' },
  { id: 'ican-warri', name: 'ICAN Warri District',         icon: '🏛️', desc: 'Regional website for ICAN Warri',                           status: 'building' },
  { id: 'foodgram',  name: 'FoodGram',                     icon: '🍔', desc: 'Food social network — Node.js, PostgreSQL & Flutter',        status: 'building' },
];

const ALL_TAGS: Tag[] = ['build', 'design', 'fix', 'launch', 'learning'];

const TAG_LABELS: Record<Tag, string> = {
  build: 'Build', design: 'Design', fix: 'Fix', launch: 'Launch', learning: 'Learning',
};

interface Props { entries: Entry[]; }

export default function BuildLogs({ entries }: Props) {
  const [activeProject, setActiveProject] = useState<string>('all');
  const [activeTag, setActiveTag] = useState<Tag | 'all'>('all');

  // derive which projects actually have entries
  const presentProjectIds = useMemo(
    () => new Set(entries.map(e => e.project_id)),
    [entries]
  );
  const presentProjects = PROJECT_META.filter(p => presentProjectIds.has(p.id));

  // filtered entries
  const filtered = useMemo(() => {
    return entries.filter(e => {
      const matchProject = activeProject === 'all' || e.project_id === activeProject;
      const matchTag = activeTag === 'all' || (e.tags as string[]).includes(activeTag);
      return matchProject && matchTag;
    });
  }, [entries, activeProject, activeTag]);

  // group filtered entries by project (preserve PROJECT_META order)
  const grouped = PROJECT_META
    .filter(p => presentProjectIds.has(p.id))
    .map(meta => ({
      ...meta,
      entries: filtered.filter(e => e.project_id === meta.id),
    }))
    .filter(g => g.entries.length > 0);

  const totalFiltered = filtered.length;
  const hasFilters = activeProject !== 'all' || activeTag !== 'all';

  return (
    <>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }

        .bl-page { animation: fadeIn .35s ease both; }

        /* HERO */
        .bl-hero { padding-top: 7rem; padding-bottom: 2.5rem; }
        .bl-headline { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem,4.5vw,3.2rem); font-weight: 700; line-height: 1.05; letter-spacing: -.03em; color: var(--text); margin-bottom: .75rem; }
        .bl-headline .accent { color: var(--accent); }
        .bl-sub { font-size: .9rem; line-height: 1.75; color: var(--muted); max-width: 540px; font-weight: 300; }
        .bl-sub strong { color: var(--text); font-weight: 500; }
        .bl-meta { display: flex; align-items: center; gap: 10px; margin-top: 1.25rem; flex-wrap: wrap; }
        .bl-meta-pill { display: flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--panel); font-family: 'JetBrains Mono', monospace; font-size: .68rem; color: var(--muted); }
        .bl-meta-pill strong { color: var(--text); font-weight: 600; }
        .bl-meta-live { width: 6px; height: 6px; border-radius: 50%; background: var(--ok); flex-shrink: 0; }

        /* FILTERS */
        .bl-filter-bar { padding: 1.5rem 0 2rem; border-bottom: 1px solid var(--border); }
        .bl-filter-row { display: flex; align-items: flex-start; gap: 1.5rem; flex-wrap: wrap; }
        .bl-filter-group { display: flex; flex-direction: column; gap: 8px; }
        .bl-filter-divider { width: 1px; background: var(--border); align-self: stretch; margin: 0 4px; flex-shrink: 0; }
        .bl-chips { display: flex; gap: 6px; flex-wrap: wrap; }
        .bl-chip { padding: 4px 12px; border-radius: 6px; border: 1px solid var(--border); background: transparent; font-family: 'JetBrains Mono', monospace; font-size: .68rem; color: var(--muted); cursor: pointer; transition: border-color .15s, color .15s; white-space: nowrap; }
        .bl-chip:hover { border-color: var(--accent); color: var(--text); }
        .bl-chip.active { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); color: var(--accent); }

        /* FILTER STATE */
        .bl-filter-state { display: flex; align-items: center; gap: 10px; padding: 1rem 0 0; flex-wrap: wrap; }
        .bl-filter-state-text { font-family: 'JetBrains Mono', monospace; font-size: .68rem; color: var(--muted); }
        .bl-filter-state-text strong { color: var(--text); }
        .bl-clear { padding: 3px 10px; border-radius: 5px; border: 1px solid var(--border); background: transparent; font-family: 'JetBrains Mono', monospace; font-size: .65rem; color: var(--muted); cursor: pointer; transition: border-color .15s, color .15s; }
        .bl-clear:hover { border-color: var(--accent); color: var(--text); }

        /* BODY */
        .bl-body { padding-bottom: 5rem; }
        .bl-project-group { margin-top: 3rem; }
        .bl-group-header { display: flex; align-items: center; gap: 12px; padding-bottom: 1rem; margin-bottom: 1.5rem; border-bottom: 1px solid var(--border); }
        .bl-group-icon { width: 38px; height: 38px; border-radius: 8px; flex-shrink: 0; border: 1px solid var(--border); background: var(--panel); display: flex; align-items: center; justify-content: center; font-size: 1.1rem; }
        .bl-group-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1rem; color: var(--text); }
        .bl-group-meta { display: flex; align-items: center; gap: 8px; margin-top: 3px; flex-wrap: wrap; }
        .bl-group-desc { font-size: .76rem; color: var(--muted); }
        .bl-group-count { font-family: 'JetBrains Mono', monospace; font-size: .62rem; color: var(--accent); padding: 1px 7px; border-radius: 4px; background: color-mix(in srgb, var(--accent) 10%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent); }
        .bl-status { font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .05em; padding: 1px 7px; border-radius: 4px; }
        .bl-status.live     { background: color-mix(in srgb, var(--ok) 10%, transparent); border: 1px solid color-mix(in srgb, var(--ok) 25%, transparent); color: var(--ok); }
        .bl-status.building { background: color-mix(in srgb, var(--accent) 8%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent); color: var(--accent); }
        .bl-status.design   { background: rgba(167,139,250,.10); border: 1px solid rgba(167,139,250,.25); color: #C4B5FD; }

        /* TIMELINE */
        .bl-timeline { position: relative; }
        .bl-timeline::before { content: ''; position: absolute; left: 0; top: 8px; bottom: 0; width: 1px; background: var(--border); }
        .bl-entry { position: relative; padding: 0 0 2.25rem 2.25rem; }
        .bl-entry:last-child { padding-bottom: 0; }
        .bl-dot { position: absolute; left: -4px; top: 9px; width: 8px; height: 8px; border-radius: 50%; background: var(--bg); border: 1px solid var(--border); }
        .bl-dot.latest { background: var(--accent); border-color: var(--accent); }
        .bl-day { font-family: 'JetBrains Mono', monospace; font-size: .65rem; color: var(--accent); letter-spacing: .08em; margin-bottom: 6px; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .bl-day-date { color: var(--muted); font-weight: 400; }
        .bl-latest-badge { padding: 1px 6px; border-radius: 3px; background: color-mix(in srgb, var(--ok) 10%, transparent); border: 1px solid color-mix(in srgb, var(--ok) 28%, transparent); font-size: .58rem; color: var(--ok); }
        .bl-card-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: .92rem; color: var(--text); line-height: 1.3; }
        .bl-card-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
        .bl-tags { display: flex; gap: 5px; flex-wrap: wrap; flex-shrink: 0; }
        .bl-tag { padding: 1px 8px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-size: .59rem; letter-spacing: .05em; }
        .bl-tag.build    { background: color-mix(in srgb, var(--accent) 10%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 25%, transparent); color: var(--accent); }
        .bl-tag.design   { background: rgba(167,139,250,.10); border: 1px solid rgba(167,139,250,.25); color: #C4B5FD; }
        .bl-tag.fix      { background: rgba(251,191,36,.08); border: 1px solid rgba(251,191,36,.22); color: #FDE68A; }
        .bl-tag.launch   { background: color-mix(in srgb, var(--ok) 10%, transparent); border: 1px solid color-mix(in srgb, var(--ok) 25%, transparent); color: var(--ok); }
        .bl-tag.learning { background: rgba(251,146,60,.08); border: 1px solid rgba(251,146,60,.22); color: #FED7AA; }
        .bl-body-text { font-size: .845rem; line-height: 1.75; color: var(--muted); }
        .bl-body-text p { margin-bottom: 10px; }
        .bl-body-text p:last-child { margin-bottom: 0; }
        .bl-body-text strong { color: var(--text); font-weight: 600; }
        .bl-body-text code { font-family: 'JetBrains Mono', monospace; font-size: .78rem; background: rgba(255,255,255,.05); border: 1px solid var(--border); border-radius: 4px; padding: 1px 5px; color: var(--accent); }
        .bl-decision { margin-top: 10px; padding: 8px 12px; border-radius: 6px; border-left: 2px solid var(--accent); background: color-mix(in srgb, var(--accent) 5%, transparent); font-size: .79rem; line-height: 1.65; color: var(--muted); }
        .bl-decision-label { font-family: 'JetBrains Mono', monospace; font-size: .57rem; letter-spacing: .09em; color: var(--accent); margin-bottom: 3px; }

        /* EMPTY */
        .bl-empty { padding: 4rem 0; text-align: center; }
        .bl-empty-icon { font-size: 1.75rem; margin-bottom: 1rem; opacity: .4; }
        .bl-empty-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: .95rem; color: var(--muted); margin-bottom: 6px; }
        .bl-empty-sub { font-size: .8rem; color: var(--muted); }

        /* CTA */
        .bl-cta { margin-top: 3.5rem; padding: 2.25rem 2rem; border-radius: 10px; border: 1px solid var(--border); background: var(--panel); text-align: center; }
        .bl-cta h3 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.1rem,2vw,1.4rem); font-weight: 700; letter-spacing: -.02em; margin-bottom: 8px; }
        .bl-cta p { font-size: .855rem; color: var(--muted); max-width: 360px; margin: 0 auto 1.25rem; line-height: 1.7; }
        .bl-cta-row { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 768px) {
          .bl-hero { padding-top: 5.5rem; }
          .bl-headline { font-size: 1.9rem; }
          .bl-entry { padding-left: 1.5rem; padding-bottom: 1.75rem; }
          .bl-filter-row { flex-direction: column; gap: 1rem; }
          .bl-filter-divider { display: none; }
        }
      `}</style>

      <div className="bl-page">
        {/* HERO */}
        <section>
          <div className="os-container bl-hero">
            <span className="os-label">// build logs</span>
            <h1 className="bl-headline">Building in<br /><span className="accent">public.</span></h1>
            <p className="bl-sub">
              Every decision, mistake, and milestone — documented as it happens across all active projects.
              <strong> No polished post-mortems. Just the real process.</strong>
            </p>
            <div className="bl-meta">
              <div className="bl-meta-pill"><span className="bl-meta-live" /><span>Active · Updated regularly</span></div>
              <div className="bl-meta-pill"><strong>{presentProjects.length}</strong>&nbsp;active projects</div>
              <div className="bl-meta-pill"><strong>{entries.length}</strong>&nbsp;entries logged</div>
              <a href="/admin" className="os-btn">✎ Add Entry</a>
            </div>
          </div>
        </section>

        {/* FILTERS */}
        <section>
          <div className="os-container">
            <div className="bl-filter-bar">
              <div className="bl-filter-row">
                {/* Project filter */}
                <div className="bl-filter-group">
                  <span className="os-label" style={{ marginBottom: 0 }}>// project</span>
                  <div className="bl-chips">
                    <button
                      className={`bl-chip${activeProject === 'all' ? ' active' : ''}`}
                      onClick={() => setActiveProject('all')}
                    >all</button>
                    {presentProjects.map(p => (
                      <button
                        key={p.id}
                        className={`bl-chip${activeProject === p.id ? ' active' : ''}`}
                        onClick={() => setActiveProject(p.id)}
                      >
                        {p.icon} {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bl-filter-divider" />

                {/* Tag filter */}
                <div className="bl-filter-group">
                  <span className="os-label" style={{ marginBottom: 0 }}>// tag</span>
                  <div className="bl-chips">
                    <button
                      className={`bl-chip${activeTag === 'all' ? ' active' : ''}`}
                      onClick={() => setActiveTag('all')}
                    >all</button>
                    {ALL_TAGS.map(tag => (
                      <button
                        key={tag}
                        className={`bl-chip${activeTag === tag ? ' active' : ''}`}
                        onClick={() => setActiveTag(tag)}
                      >
                        {TAG_LABELS[tag].toLowerCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active filter summary */}
              {hasFilters && (
                <div className="bl-filter-state">
                  <span className="bl-filter-state-text">
                    showing <strong>{totalFiltered}</strong> of {entries.length} entries
                    {activeProject !== 'all' && <> · <strong>{PROJECT_META.find(p => p.id === activeProject)?.name}</strong></>}
                    {activeTag !== 'all' && <> · tag:<strong>{TAG_LABELS[activeTag].toLowerCase()}</strong></>}
                  </span>
                  <button className="bl-clear" onClick={() => { setActiveProject('all'); setActiveTag('all'); }}>
                    clear ×
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ENTRIES */}
        <section className="bl-body">
          <div className="os-container">
            {grouped.length === 0 ? (
              <div className="bl-empty">
                <div className="bl-empty-icon">🔍</div>
                <div className="bl-empty-title">No entries match these filters</div>
                <div className="bl-empty-sub">Try a different project or tag combination</div>
                <button className="os-btn" style={{ marginTop: '1.25rem' }} onClick={() => { setActiveProject('all'); setActiveTag('all'); }}>
                  clear filters
                </button>
              </div>
            ) : (
              grouped.map(proj => (
                <div key={proj.id} className="bl-project-group">
                  <div className="bl-group-header">
                    <div className="bl-group-icon">{proj.icon}</div>
                    <div>
                      <div className="bl-group-name">{proj.name}</div>
                      <div className="bl-group-meta">
                        <span className="bl-group-desc">{proj.desc}</span>
                        <span className={`bl-status ${proj.status}`}>
                          {proj.status === 'live' ? '● live' : proj.status === 'building' ? '◐ building' : '◇ design'}
                        </span>
                        <span className="bl-group-count">{proj.entries.length} entries</span>
                      </div>
                    </div>
                  </div>

                  <div className="bl-timeline">
                    {proj.entries.map(entry => (
                      <div key={entry.id} className="bl-entry">
                        <div className={`bl-dot${entry.is_latest ? ' latest' : ''}`} />
                        <div className="bl-day">
                          <span>{entry.day}</span>
                          <span className="bl-day-date">{entry.date}</span>
                          {entry.is_latest && <span className="bl-latest-badge">latest</span>}
                        </div>
                        <div className="os-card">
                          <div className="bl-card-head">
                            <h3 className="bl-card-title">{entry.title}</h3>
                            <div className="bl-tags">
                              {entry.tags.map(tag => (
                                <span key={tag} className={`bl-tag ${tag}`}>{TAG_LABELS[tag as Tag].toLowerCase()}</span>
                              ))}
                            </div>
                          </div>
                          <div className="bl-body-text" dangerouslySetInnerHTML={{ __html: entry.body }} />
                          {entry.decision && (
                            <div className="bl-decision">
                              <div className="bl-decision-label">// decision</div>
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

            <div className="bl-cta">
              <h3>Following the build?</h3>
              <p>If you are a founder or engineer interested in working together, reach out.</p>
              <div className="bl-cta-row">
                <a href="mailto:gorokumue@gmail.com" className="os-btn os-btn-primary">Work With Me</a>
                <a href="/projects" className="os-btn">View Projects →</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
