'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider } from './ThemeProvider';
import MenuBar from './MenuBar';
import ActivityPanel from './ActivityPanel';
import ProjectsPanel from './ProjectsPanel';
import MissionsPanel from './MissionsPanel';
import LogsPanel from './LogsPanel';
import IdentityPanel from './IdentityPanel';
import Terminal from './Terminal';
import ContactPanel from './ContactPanel';

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
            padding: 1rem 1rem 3rem;
          }
        }
        @media (max-width: 480px) {
          .rex-os-grid {
            padding: 0.75rem 0.75rem 3rem;
          }
        }
      `}</style>

      <main className="rex-os-grid">
        {/* identity */}
        <div className="panel-identity">
          <IdentityPanel />
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

        {/* terminal */}
        <div className="panel-terminal">
          <Terminal />
        </div>

        {/* contact */}
        <div className="panel-contact">
          <ContactPanel />
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
