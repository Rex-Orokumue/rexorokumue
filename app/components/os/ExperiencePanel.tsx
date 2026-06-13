// app/components/os/ExperiencePanel.tsx
// Pure presentational — no hooks needed.

import { experience, skills } from '@/app/data/profileData';

export default function ExperiencePanel() {
  return (
    <div
      className="os-panel"
      style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
    >
      {/* panel header */}
      <span
        className="os-mono"
        style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em' }}
      >
        // experience
      </span>

      {/* experience entries */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {experience.map((item, i) => (
          <div key={`${item.company}-${i}`}>
            {/* divider between entries */}
            {i > 0 && (
              <div
                style={{
                  height: '1px',
                  background: 'var(--border)',
                  margin: '1rem 0',
                }}
              />
            )}

            {/* role */}
            <div
              className="os-display"
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '0.25rem',
              }}
            >
              {item.role}
            </div>

            {/* company + period + "now" chip */}
            <div
              className="os-mono"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.4rem',
                fontSize: '0.7rem',
                color: 'var(--muted)',
                marginBottom: '0.5rem',
              }}
            >
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: 'var(--muted)',
                    textDecoration: 'none',
                  }}
                >
                  {item.company} ↗
                </a>
              ) : (
                <span>{item.company}</span>
              )}
              <span style={{ opacity: 0.4 }}>·</span>
              <span>{item.period}</span>
              {item.current && (
                <span
                  className="os-mono"
                  style={{
                    fontSize: '0.58rem',
                    color: 'var(--accent)',
                    border: '1px solid var(--accent)',
                    borderRadius: '4px',
                    padding: '1px 6px',
                    letterSpacing: '0.06em',
                    lineHeight: 1.4,
                  }}
                >
                  ● now
                </span>
              )}
            </div>

            {/* summary */}
            <p
              style={{
                margin: '0 0 0.4rem 0',
                fontSize: '0.9rem',
                color: 'var(--text)',
                lineHeight: 1.55,
              }}
            >
              {item.summary}
            </p>

            {/* bullet points */}
            <ul
              style={{
                margin: 0,
                paddingLeft: '1.1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
              }}
            >
              {item.points.map((point, j) => (
                <li
                  key={j}
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* skills strip */}
      <div
        style={{
          marginTop: '0.5rem',
          paddingTop: '1rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.6rem',
        }}
      >
        {/* sub-label */}
        <span
          className="os-mono"
          style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em' }}
        >
          // stack
        </span>

        {/* skill groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {skills.map((group) => (
            <div
              key={group.label}
              style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.35rem' }}
            >
              {/* group label */}
              <span
                className="os-mono"
                style={{
                  fontSize: '0.62rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.04em',
                  flexShrink: 0,
                }}
              >
                {group.label.toLowerCase()}:
              </span>
              {/* tag chips — same style as ProjectsPanel tech tags */}
              {group.items.map((item) => (
                <span
                  key={item}
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
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
