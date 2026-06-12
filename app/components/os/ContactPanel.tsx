// ContactPanel — no hooks needed, pure presentational

const EMAIL = 'gorokumue@gmail.com';

export default function ContactPanel() {
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
        // contact
      </span>

      {/* CTA headline */}
      <p
        className="os-display"
        style={{
          margin: 0,
          fontSize: 'clamp(1.1rem, 2.5vw, 1.45rem)',
          fontWeight: 600,
          color: 'var(--text)',
          lineHeight: 1.2,
        }}
      >
        Got a role or project? Let&apos;s talk.
      </p>

      {/* action row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem' }}>
        {/* primary — email me */}
        <a
          href={`mailto:${EMAIL}`}
          className="os-mono"
          style={{
            fontSize: '0.7rem',
            padding: '0.4rem 0.9rem',
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            border: '1px solid var(--accent)',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          email me ↗
        </a>

        {/* resume */}
        {/* TODO: confirm resume PDF exists in /public */}
        <a
          href="/Rex-Orokumue-Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="os-mono"
          style={{
            fontSize: '0.7rem',
            padding: '0.4rem 0.9rem',
            background: 'transparent',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            textDecoration: 'none',
          }}
        >
          resume ↗
        </a>

        {/* TODO: add Cal.com link when available */}

        {/* reply time note */}
        <span
          className="os-mono"
          style={{ fontSize: '0.63rem', color: 'var(--muted)' }}
        >
          usually replies within 24h
        </span>
      </div>
    </div>
  );
}
