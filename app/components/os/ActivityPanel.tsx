'use client';

// app/components/os/ActivityPanel.tsx

interface ContributionDay {
  date: string;
  contributionCount: number;
}

interface GitHubData {
  ok: boolean;
  commitsThisWeek?: number;
  currentStreakDays?: number;
  publicRepos?: number;
  totalThisYear?: number;
  days?: ContributionDay[];
  profileUrl?: string;
  error?: string;
}

interface Props {
  data: GitHubData | null;
}

function heatOpacity(count: number): string {
  if (count === 0) return 'var(--panel-2)';
  if (count <= 2) return 'rgba(255,176,0,0.3)';
  if (count <= 5) return 'rgba(255,176,0,0.6)';
  return 'var(--accent)';
}

export default function ActivityPanel({ data }: Props) {
  // loading state
  if (data === null) {
    return (
      <div className="os-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <span
          className="os-mono"
          style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em' }}
        >
          // activity
        </span>
        <span
          className="os-mono"
          style={{ fontSize: '0.72rem', color: 'var(--muted)' }}
        >
          syncing with github…
        </span>
      </div>
    );
  }

  // error / no-token fallback
  if (!data.ok) {
    return (
      <div className="os-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <span
          className="os-mono"
          style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em' }}
        >
          // activity
        </span>
        <span
          className="os-mono"
          style={{ fontSize: '0.78rem', color: 'var(--text)' }}
        >
          building in public
        </span>
        <a
          href="https://github.com/Rex-Orokumue"
          target="_blank"
          rel="noopener noreferrer"
          className="os-mono"
          style={{
            fontSize: '0.68rem',
            color: 'var(--accent)',
            textDecoration: 'none',
            marginTop: 'auto',
          }}
        >
          see github →
        </a>
      </div>
    );
  }

  // success state
  const recentDays = (data.days ?? []).slice(-70);

  return (
    <div className="os-panel" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
      {/* header */}
      <span
        className="os-mono"
        style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em' }}
      >
        // activity
      </span>

      {/* stat blocks */}
      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <span
            className="os-mono os-accent"
            style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1 }}
          >
            {data.commitsThisWeek ?? 0}
          </span>
          <span
            className="os-mono"
            style={{ fontSize: '0.60rem', color: 'var(--muted)', letterSpacing: '0.04em' }}
          >
            commits / 7d
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <span
            className="os-mono os-accent"
            style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1 }}
          >
            {data.currentStreakDays ?? 0}
          </span>
          <span
            className="os-mono"
            style={{ fontSize: '0.60rem', color: 'var(--muted)', letterSpacing: '0.04em' }}
          >
            day streak
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
          <span
            className="os-mono os-accent"
            style={{ fontSize: '1.1rem', fontWeight: 700, lineHeight: 1 }}
          >
            {data.publicRepos ?? 0}
          </span>
          <span
            className="os-mono"
            style={{ fontSize: '0.60rem', color: 'var(--muted)', letterSpacing: '0.04em' }}
          >
            public repos
          </span>
        </div>
      </div>

      {/* heat strip */}
      {recentDays.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2px',
          }}
          title="contribution activity"
          aria-hidden="true"
        >
          {recentDays.map((day) => (
            <div
              key={day.date}
              title={`${day.date}: ${day.contributionCount}`}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                background: heatOpacity(day.contributionCount),
                border: '1px solid var(--border)',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* profile link */}
      <a
        href={data.profileUrl ?? 'https://github.com/Rex-Orokumue'}
        target="_blank"
        rel="noopener noreferrer"
        className="os-mono"
        style={{
          fontSize: '0.65rem',
          color: 'var(--muted)',
          textDecoration: 'none',
          marginTop: 'auto',
        }}
      >
        github.com/Rex-Orokumue ↗
      </a>
    </div>
  );
}
