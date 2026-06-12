'use client';

// app/components/os/MissionsPanel.tsx

import Link from 'next/link';
import { projects } from '@/app/data/projectsData';

export default function MissionsPanel() {
  const building = projects.filter((p) => p.status === 'building');

  // fallback: most recent live project if nothing is in-flight
  const fallback = projects.filter((p) => p.status === 'live').slice(-1);
  const items = building.length > 0 ? building : fallback;
  const isFallback = building.length === 0;

  return (
    <div
      className="os-panel"
      style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}
    >
      {/* header */}
      <span
        className="os-mono"
        style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em' }}
      >
        // active missions
      </span>

      {isFallback && (
        <span
          className="os-mono"
          style={{ fontSize: '0.60rem', color: 'var(--muted)', letterSpacing: '0.04em' }}
        >
          latest ship
        </span>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {items.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
              }}
            >
              <span
                className="os-mono"
                style={{
                  color: 'var(--accent)',
                  fontSize: '0.70rem',
                  marginTop: '0.1rem',
                  flexShrink: 0,
                  lineHeight: 1.4,
                }}
              >
                ●
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                <span
                  className="os-mono"
                  style={{ fontSize: '0.78rem', color: 'var(--text)', fontWeight: 600, lineHeight: 1.3 }}
                >
                  {project.name}
                </span>
                <span
                  style={{ fontSize: '0.70rem', color: 'var(--muted)', lineHeight: 1.4 }}
                >
                  {project.tagline}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
