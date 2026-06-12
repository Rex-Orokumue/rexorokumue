'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from './ThemeProvider';
import MenuBar from './MenuBar';

interface GitHubData {
  ok: boolean;
  currentStreakDays?: number;
  publicRepos?: number;
  totalContributions?: number;
  profileUrl?: string;
}

const PANELS = [
  { id: 'identity',  label: '~/identity',  gridArea: 'identity' },
  { id: 'activity',  label: '~/activity',  gridArea: 'activity' },
  { id: 'missions',  label: '~/missions',  gridArea: 'missions' },
  { id: 'projects',  label: '~/projects',  gridArea: 'projects' },
  { id: 'logs',      label: '~/logs',      gridArea: 'logs' },
  { id: 'terminal',  label: '~/terminal',  gridArea: 'terminal' },
  { id: 'contact',   label: '~/contact',   gridArea: 'contact' },
] as const;

function ShellGrid({ githubData }: { githubData: GitHubData | null }) {
  return (
    <>
      <style>{`
        .rex-os-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-areas:
            "identity  activity"
            "missions  projects"
            "logs      terminal"
            "contact   contact";
          gap: 1rem;
          max-width: 1100px;
          margin: 0 auto;
          padding: 1.5rem 1.5rem 3rem;
        }
        .rex-os-grid .panel-identity  { grid-area: identity; }
        .rex-os-grid .panel-activity  { grid-area: activity; }
        .rex-os-grid .panel-missions  { grid-area: missions; }
        .rex-os-grid .panel-projects  { grid-area: projects; }
        .rex-os-grid .panel-logs      { grid-area: logs; }
        .rex-os-grid .panel-terminal  { grid-area: terminal; }
        .rex-os-grid .panel-contact   { grid-area: contact; }

        /* identity gets a bit more height to feel like a hero card */
        .rex-os-grid .panel-identity  { min-height: 180px; }
        /* contact spans the full width */
        .rex-os-grid .panel-contact   { min-height: 120px; }

        @media (max-width: 900px) {
          .rex-os-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "identity"
              "activity"
              "missions"
              "projects"
              "logs"
              "terminal"
              "contact";
          }
        }
      `}</style>

      <main className="rex-os-grid">
        {PANELS.map(panel => (
          <div
            key={panel.id}
            className={`os-panel panel-${panel.id}`}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <span
              className="os-mono"
              style={{ fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.04em' }}
            >
              {panel.label}
            </span>
            <span
              className="os-mono"
              style={{ fontSize: '0.72rem', color: 'var(--border)', marginTop: 'auto' }}
            >
              — placeholder —
            </span>
          </div>
        ))}
      </main>
    </>
  );
}

function RexOSInner() {
  const [githubData, setGithubData] = useState<GitHubData | null>(null);

  useEffect(() => {
    fetch('/api/github')
      .then(r => r.json())
      .then((data: GitHubData) => setGithubData(data))
      .catch(() => setGithubData({ ok: false }));
  }, []);

  return (
    <>
      <MenuBar streak={githubData?.currentStreakDays} />
      <ShellGrid githubData={githubData} />
    </>
  );
}

export default function RexOS() {
  return (
    <ThemeProvider>
      <RexOSInner />
    </ThemeProvider>
  );
}
