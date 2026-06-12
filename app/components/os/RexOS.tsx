'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from './ThemeProvider';
import MenuBar from './MenuBar';
import ActivityPanel from './ActivityPanel';
import ProjectsPanel from './ProjectsPanel';
import MissionsPanel from './MissionsPanel';
import LogsPanel from './LogsPanel';

interface GitHubData {
  ok: boolean;
  commitsThisWeek?: number;
  currentStreakDays?: number;
  publicRepos?: number;
  totalThisYear?: number;
  days?: { date: string; contributionCount: number }[];
  profileUrl?: string;
  error?: string;
}

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
        {/* identity — placeholder for next task */}
        <div
          className="os-panel panel-identity"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <span
            className="os-mono"
            style={{ fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.04em' }}
          >
            ~/identity
          </span>
          <span
            className="os-mono"
            style={{ fontSize: '0.72rem', color: 'var(--border)', marginTop: 'auto' }}
          >
            — placeholder —
          </span>
        </div>

        {/* activity — real data */}
        <div className="panel-activity">
          <ActivityPanel data={githubData} />
        </div>

        {/* missions — real data */}
        <div className="panel-missions">
          <MissionsPanel />
        </div>

        {/* projects — real data */}
        <div className="panel-projects">
          <ProjectsPanel />
        </div>

        {/* logs — real data */}
        <div className="panel-logs">
          <LogsPanel />
        </div>

        {/* terminal — placeholder for next task */}
        <div
          className="os-panel panel-terminal"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <span
            className="os-mono"
            style={{ fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.04em' }}
          >
            ~/terminal
          </span>
          <span
            className="os-mono"
            style={{ fontSize: '0.72rem', color: 'var(--border)', marginTop: 'auto' }}
          >
            — placeholder —
          </span>
        </div>

        {/* contact — placeholder for next task */}
        <div
          className="os-panel panel-contact"
          style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
        >
          <span
            className="os-mono"
            style={{ fontSize: '0.68rem', color: 'var(--muted)', letterSpacing: '0.04em' }}
          >
            ~/contact
          </span>
          <span
            className="os-mono"
            style={{ fontSize: '0.72rem', color: 'var(--border)', marginTop: 'auto' }}
          >
            — placeholder —
          </span>
        </div>
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
