'use client';

// app/components/os/ProjectsPanel.tsx

import Link from 'next/link';
import { projects } from '@/app/data/projectsData';

const STATUS_STYLES: Record<string, { color: string; label: string }> = {
  live:     { color: 'var(--ok)',     label: 'live'     },
  building: { color: 'var(--accent)', label: 'building' },
  design:   { color: 'var(--muted)',  label: 'design'   },
};

export default function ProjectsPanel() {
  return (
    <div
      className="os-panel"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      {/* header */}
      <span
        className="os-mono"
        style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em' }}
      >
        // selected work
      </span>

      {/* project cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {projects.map((project) => {
          const statusStyle = STATUS_STYLES[project.status] ?? STATUS_STYLES.design;
          return (
            <div key={project.slug} style={{ position: 'relative' }}>
              <Link
                href={`/projects/${project.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div
                  style={{
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '0.75rem 0.9rem',
                    background: 'var(--panel-2)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  {/* name + status */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem',
                    }}
                  >
                    <span
                      className="os-display"
                      style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.2 }}
                    >
                      {project.name}
                    </span>
                    <span
                      className="os-mono"
                      style={{
                        fontSize: '0.58rem',
                        color: statusStyle.color,
                        border: `1px solid ${statusStyle.color}`,
                        borderRadius: '4px',
                        padding: '1px 6px',
                        letterSpacing: '0.06em',
                        flexShrink: 0,
                        opacity: project.status === 'design' ? 0.6 : 1,
                      }}
                    >
                      {statusStyle.label}
                    </span>
                  </div>

                  {/* tagline */}
                  <span
                    style={{ fontSize: '0.74rem', color: 'var(--muted)', lineHeight: 1.4 }}
                  >
                    {project.tagline}
                  </span>

                  {/* tech tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '0.2rem' }}>
                    {project.tech.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="os-mono"
                        style={{
                          fontSize: '0.58rem',
                          color: 'var(--muted)',
                          background: 'var(--panel)',
                          border: '1px solid var(--border)',
                          borderRadius: '3px',
                          padding: '1px 5px',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>

              {/* external links — outside the card Link to avoid nesting */}
              {(project.liveUrl || project.repoUrl) && (
                <div
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '0.3rem',
                    paddingLeft: '0.1rem',
                  }}
                >
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="os-mono"
                      style={{
                        fontSize: '0.60rem',
                        color: 'var(--ok)',
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                      }}
                    >
                      live ↗
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="os-mono"
                      style={{
                        fontSize: '0.60rem',
                        color: 'var(--muted)',
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                      }}
                    >
                      code ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
