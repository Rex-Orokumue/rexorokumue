// IdentityPanel — no hooks needed, pure presentational

const EMAIL = 'gorokumue@gmail.com';

export default function IdentityPanel() {
  return (
    <div
      className="os-panel"
      style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%' }}
    >
      {/* header label */}
      <span
        className="os-mono"
        style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em' }}
      >
        // whoami
      </span>

      {/* name */}
      <h1
        className="os-display"
        style={{
          margin: 0,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          color: 'var(--text)',
          lineHeight: 1.1,
        }}
      >
        Rex Orokumue
      </h1>

      {/* positioning line */}
      <p
        style={{
          margin: 0,
          fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)',
          color: 'var(--text)',
          lineHeight: 1.6,
        }}
      >
        Full-stack developer building production-ready web &amp; mobile apps with Next.js, Flutter &amp; Supabase. Founder of Zolarux.
      </p>

      {/* availability */}
      <div
        className="os-mono"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.72rem',
          color: 'var(--text)',
        }}
      >
        <span style={{ color: 'var(--ok)', fontSize: '0.7rem' }}>●</span>
        Open to remote full-stack roles · freelance welcome · WAT, overlaps EU/US mornings
      </div>

      {/* action buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginTop: 'auto',
        }}
      >
        {/* resume — primary amber */}
        <a
          href="/resume"
          className="os-mono"
          style={{
            fontSize: '0.68rem',
            padding: '0.35rem 0.75rem',
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            border: '1px solid var(--accent)',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          resume →
        </a>

        {/* email */}
        <a
          href={`mailto:${EMAIL}`}
          className="os-mono"
          style={{
            fontSize: '0.68rem',
            padding: '0.35rem 0.75rem',
            background: 'transparent',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            textDecoration: 'none',
          }}
        >
          email
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Rex-Orokumue"
          target="_blank"
          rel="noopener noreferrer"
          className="os-mono"
          style={{
            fontSize: '0.68rem',
            padding: '0.35rem 0.75rem',
            background: 'transparent',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            textDecoration: 'none',
          }}
        >
          github ↗
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/rexorokumue/"
          target="_blank"
          rel="noopener noreferrer"
          className="os-mono"
          style={{
            fontSize: '0.68rem',
            padding: '0.35rem 0.75rem',
            background: 'transparent',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            textDecoration: 'none',
          }}
        >
          linkedin ↗
        </a>

        {/* X */}
        <a
          href="https://x.com/iamrexorokumue"
          target="_blank"
          rel="noopener noreferrer"
          className="os-mono"
          style={{
            fontSize: '0.68rem',
            padding: '0.35rem 0.75rem',
            background: 'transparent',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            textDecoration: 'none',
          }}
        >
          x ↗
        </a>
      </div>
    </div>
  );
}
