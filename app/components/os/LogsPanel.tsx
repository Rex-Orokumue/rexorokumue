'use client';

// app/components/os/LogsPanel.tsx
// Logs are fetched server-side via Supabase service role key on the /build-logs page.
// Rather than duplicating that call client-side (which would expose credentials),
// we render a clean panel linking to the full build logs.

import Link from 'next/link';

export default function LogsPanel() {
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
        // build logs
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <span
          style={{ fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.5 }}
        >
          building in public — every decision, mistake, and milestone documented as it happens.
        </span>
        <span
          style={{ fontSize: '0.65rem', color: 'var(--muted)', lineHeight: 1.5 }}
        >
          no polished post-mortems. just the real process.
        </span>
      </div>

      <Link
        href="/build-logs"
        className="os-mono"
        style={{
          fontSize: '0.68rem',
          color: 'var(--accent)',
          textDecoration: 'none',
          marginTop: 'auto',
          letterSpacing: '0.04em',
        }}
      >
        latest from the build logs →
      </Link>
    </div>
  );
}
