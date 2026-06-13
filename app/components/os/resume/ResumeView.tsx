'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from '../ThemeProvider';
import { runResumeCommand, RESUME_COMMANDS } from './resumeCommands';
import { profile, experience, skills, education } from '../../../data/profileData';
import { projects } from '../../../data/projectsData';

type Mode = 'terminal' | 'document';

interface HistoryEntry {
  input: string;
  lines: string[];
}

// ─── Terminal sub-component ───────────────────────────────────────────────────

function ResumeTerminal({ onDownload }: { onDownload: () => void }) {
  const BANNER: HistoryEntry = {
    input: '',
    lines: [
      "rex os // resume — type 'help' or click a command below.",
    ],
  };

  const [history, setHistory] = useState<HistoryEntry[]>([BANNER]);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  function execute(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const result = runResumeCommand(trimmed);
    if (result.action === 'clear') {
      setHistory([BANNER]);
    } else if (result.action === 'download') {
      setHistory(prev => [...prev, { input: trimmed, lines: result.lines }]);
      onDownload();
    } else {
      setHistory(prev => [...prev, { input: trimmed, lines: result.lines }]);
    }
    setValue('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      execute(value);
    }
  }

  function focusInput() {
    inputRef.current?.focus();
  }

  const CHIPS = Object.keys(RESUME_COMMANDS);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
      {/* Terminal panel */}
      <div
        className="os-panel"
        onClick={focusInput}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          cursor: 'text',
          flex: 1,
          minHeight: 420,
        }}
      >
        {/* scrollback */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2rem',
          }}
        >
          {history.map((entry, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              {entry.input && (
                <span className="os-mono" style={{ fontSize: '0.72rem', color: 'var(--text)', marginTop: '0.4rem' }}>
                  <span style={{ color: 'var(--accent)' }}>$</span> {entry.input}
                </span>
              )}
              {entry.lines.map((line, j) => (
                <span
                  key={j}
                  className="os-mono"
                  style={{
                    fontSize: '0.68rem',
                    color: line.startsWith('rex os') || line.startsWith('REX') || line.startsWith('──')
                      ? 'var(--muted)'
                      : line.includes('● live') || line.includes('● now')
                        ? 'var(--ok)'
                        : 'var(--text)',
                    whiteSpace: 'pre',
                    lineHeight: 1.5,
                  }}
                >
                  {line || ' '}
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* input row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            borderTop: '1px solid var(--border)',
            paddingTop: '0.5rem',
            flexShrink: 0,
          }}
        >
          <span className="os-mono os-accent" style={{ fontSize: '0.8rem', userSelect: 'none' }}>$</span>
          <input
            ref={inputRef}
            className="os-mono"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="type a command…"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text)',
              fontSize: '0.75rem',
              caretColor: 'var(--accent)',
              fontFamily: 'inherit',
            }}
          />
          {/* blinking caret decoration */}
          <span
            className="os-mono no-print"
            style={{
              fontSize: '0.8rem',
              color: 'var(--accent)',
              animation: 'rex-blink 1s step-end infinite',
              lineHeight: 1,
            }}
          >
            ▋
          </span>
        </div>
      </div>

      {/* command chips */}
      <div className="no-print" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {CHIPS.map(cmd => (
          <button
            key={cmd}
            onClick={() => execute(cmd)}
            className="os-mono"
            style={{
              fontSize: '0.67rem',
              padding: '0.25rem 0.65rem',
              background: 'transparent',
              color: 'var(--muted)',
              border: '1px solid var(--border)',
              borderRadius: 5,
              cursor: 'pointer',
              transition: 'color 0.12s, border-color 0.12s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = 'var(--text)';
              el.style.borderColor = 'var(--accent)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = 'var(--muted)';
              el.style.borderColor = 'var(--border)';
            }}
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Document sub-component ───────────────────────────────────────────────────

function ResumeDocument() {
  const statusColor: Record<string, string> = {
    live: 'var(--ok)',
    building: 'var(--accent)',
    design: 'var(--muted)',
  };
  const statusLabel: Record<string, string> = {
    live: '● live',
    building: '◌ building',
    design: '◻ design',
  };

  return (
    <div
      className="resume-doc"
      style={{
        maxWidth: 720,
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '2.5rem',
        paddingBottom: '3rem',
      }}
    >
      {/* ── Header ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h1
          className="os-display"
          style={{ margin: 0, fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 700, color: 'var(--text)', lineHeight: 1.1 }}
        >
          {profile.name}
        </h1>
        <p style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.5 }}>
          {profile.title}
        </p>
        <div className="os-mono" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.72rem', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--ok)' }}>●</span>
          <span>{profile.availability}</span>
          <span style={{ color: 'var(--border)' }}>·</span>
          <span>{profile.location}</span>
        </div>
        {/* contact row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', alignItems: 'center' }}>
          <a
            href={`mailto:${profile.email}`}
            className="os-mono"
            style={{ fontSize: '0.68rem', color: 'var(--accent)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '0.2rem 0.55rem' }}
          >
            {profile.email}
          </a>
          {([
            { label: 'github', url: profile.socials.github },
            { label: 'linkedin', url: profile.socials.linkedin },
            { label: 'x', url: profile.socials.x },
            { label: 'youtube', url: profile.socials.youtube },
            { label: 'zolarux', url: profile.socials.zolarux },
          ] as const).map(s => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="os-mono"
              style={{ fontSize: '0.68rem', color: 'var(--muted)', textDecoration: 'none', border: '1px solid var(--border)', borderRadius: 4, padding: '0.2rem 0.55rem', transition: 'color 0.12s' }}
            >
              {s.label} ↗
            </a>
          ))}
        </div>
      </div>

      {/* ── Experience ── */}
      <section>
        <h2
          className="os-mono"
          style={{ margin: '0 0 1.25rem 0', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem' }}
        >
          Experience
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {experience.map((item, i) => (
            <div key={i}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.15rem' }}>
                <h3
                  className="os-display"
                  style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}
                >
                  {item.role}
                </h3>
                {item.current && (
                  <span className="os-mono" style={{ fontSize: '0.6rem', color: 'var(--ok)', border: '1px solid var(--ok)', borderRadius: 3, padding: '0.1rem 0.35rem', opacity: 0.85 }}>
                    ● now
                  </span>
                )}
              </div>
              <div className="os-mono" style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: '0.5rem' }}>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}>{item.company}</a>
                ) : (
                  item.company
                )}
                {' · '}{item.period}
              </div>
              <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.6 }}>
                {item.summary}
              </p>
              <ul style={{ margin: 0, padding: '0 0 0 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {item.points.map((pt, j) => (
                  <li key={j} style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.55 }}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Skills ── */}
      <section>
        <h2
          className="os-mono"
          style={{ margin: '0 0 1rem 0', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem' }}
        >
          Skills
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {skills.map((group, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="os-mono" style={{ fontSize: '0.7rem', color: 'var(--muted)', minWidth: 100, paddingTop: '0.2rem' }}>
                {group.label}:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {group.items.map((item, j) => (
                  <span
                    key={j}
                    className="os-mono"
                    style={{
                      fontSize: '0.68rem',
                      padding: '0.2rem 0.55rem',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      color: 'var(--text)',
                      background: 'var(--panel-2)',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Education ── */}
      <section>
        <h2
          className="os-mono"
          style={{ margin: '0 0 1rem 0', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem' }}
        >
          Education
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {education.map((item, i) => (
            <div key={i} style={{ fontSize: '0.9rem', color: 'var(--text)', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 600 }}>{item.title}</span>
              {item.org && <span style={{ color: 'var(--muted)' }}> — {item.org}</span>}
              {item.note && <span className="os-mono" style={{ fontSize: '0.68rem', color: 'var(--muted)' }}> ({item.note})</span>}
            </div>
          ))}
        </div>
      </section>

      {/* ── Selected Projects ── */}
      <section>
        <h2
          className="os-mono"
          style={{ margin: '0 0 1.25rem 0', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--border)', paddingBottom: '0.4rem' }}
        >
          Selected Projects
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {projects.map((p, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text)' }}>{p.name}</span>
                <span
                  className="os-mono"
                  style={{ fontSize: '0.6rem', color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}`, borderRadius: 3, padding: '0.1rem 0.35rem', opacity: 0.85 }}
                >
                  {statusLabel[p.status]}
                </span>
                <div style={{ display: 'flex', gap: '0.4rem', marginLeft: 'auto' }}>
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="os-mono" style={{ fontSize: '0.65rem', color: 'var(--accent)', textDecoration: 'none' }}>live ↗</a>
                  )}
                  {p.repoUrl && (
                    <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="os-mono" style={{ fontSize: '0.65rem', color: 'var(--muted)', textDecoration: 'none' }}>code ↗</a>
                  )}
                </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>{p.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer>
        <p className="os-mono" style={{ margin: 0, fontSize: '0.62rem', color: 'var(--muted)', textAlign: 'center' }}>
          generated from rexorokumue.vercel.app
        </p>
      </footer>
    </div>
  );
}

// ─── Top bar ─────────────────────────────────────────────────────────────────

function TopBar({
  mode,
  onToggleMode,
  onDownload,
}: {
  mode: Mode;
  onToggleMode: () => void;
  onDownload: () => void;
}) {
  const { theme, toggle } = useTheme();

  const btnStyle: React.CSSProperties = {
    background: 'transparent',
    border: '1px solid var(--border)',
    borderRadius: 5,
    color: 'var(--muted)',
    cursor: 'pointer',
    fontSize: '0.7rem',
    padding: '0.3rem 0.75rem',
    fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    lineHeight: 1.4,
    transition: 'color 0.12s, border-color 0.12s',
    whiteSpace: 'nowrap' as const,
  };

  function hoverOn(e: React.MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    el.style.color = 'var(--text)';
    el.style.borderColor = 'var(--text)';
  }
  function hoverOff(e: React.MouseEvent) {
    const el = e.currentTarget as HTMLElement;
    el.style.color = 'var(--muted)';
    el.style.borderColor = 'var(--border)';
  }

  return (
    <header
      className="no-print"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        background: 'var(--panel)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.3rem 1rem',
        minHeight: '44px',
        gap: '0.75rem',
        flexWrap: 'wrap',
      }}
    >
      {/* Left — back link */}
      <Link
        href="/"
        className="os-mono"
        style={{ fontSize: '0.72rem', color: 'var(--muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', flexShrink: 0 }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')}
      >
        ← back to rex os
      </Link>

      {/* Right — controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
        <button
          onClick={onToggleMode}
          style={btnStyle}
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
        >
          {mode === 'terminal' ? 'view as document →' : 'view as terminal →'}
        </button>

        <button
          onClick={toggle}
          aria-label="Toggle theme"
          style={btnStyle}
          onMouseEnter={hoverOn}
          onMouseLeave={hoverOff}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>

        <button
          onClick={onDownload}
          style={{ ...btnStyle, color: 'var(--accent)', borderColor: 'var(--accent)' }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'var(--accent)';
            el.style.color = 'var(--accent-ink)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'transparent';
            el.style.color = 'var(--accent)';
            el.style.borderColor = 'var(--accent)';
          }}
        >
          download pdf ↓
        </button>
      </div>
    </header>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ResumeView() {
  const [mode, setMode] = useState<Mode>('terminal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('rex-resume-mode') as Mode | null;
    if (stored === 'terminal' || stored === 'document') {
      setMode(stored);
    }
  }, []);

  function toggleMode() {
    setMode(prev => {
      const next: Mode = prev === 'terminal' ? 'document' : 'terminal';
      localStorage.setItem('rex-resume-mode', next);
      return next;
    });
  }

  function handleDownload() {
    // Switch to document mode first so there's printable content
    if (mode !== 'document') {
      setMode('document');
      localStorage.setItem('rex-resume-mode', 'document');
      // Give React a tick to re-render, then print
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.print();
        });
      });
    } else {
      window.print();
    }
  }

  if (!mounted) {
    // Avoid hydration mismatch — render shell on server
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
        <div style={{ height: 44, borderBottom: '1px solid var(--border)', background: 'var(--panel)' }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Blink keyframe */}
      <style>{`
        @keyframes rex-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      <TopBar mode={mode} onToggleMode={toggleMode} onDownload={handleDownload} />

      <main style={{ padding: '1.5rem 1rem 2rem' }}>
        {mode === 'terminal' ? (
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <ResumeTerminal onDownload={handleDownload} />
          </div>
        ) : (
          <ResumeDocument />
        )}
      </main>
    </div>
  );
}
