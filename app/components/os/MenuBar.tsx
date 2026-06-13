'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

interface GitHubData {
  ok: boolean;
  currentStreakDays?: number;
}

function LiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hh}:${mm}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      className="os-mono"
      style={{ fontSize: '0.78rem', color: 'var(--muted)', minWidth: '3ch', display: 'inline-block' }}
      suppressHydrationWarning
    >
      {time}
    </span>
  );
}

const NAV_LINKS = [
  { href: '/projects',   label: 'work' },
  { href: '/about',      label: 'about' },
  { href: '/blog',       label: 'writing' },
  { href: '/build-logs', label: 'logs' },
  { href: '/tech-serial',label: 'serial' },
  { href: '/bootcamp',   label: 'bootcamp' },
];

export default function MenuBar() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const [streak, setStreak] = useState<number | null>(null);

  // Fetch streak on mount — runs unconditionally (hooks rule)
  useEffect(() => {
    fetch('/api/github')
      .then(r => r.json())
      .then((data: GitHubData) => {
        if (data.ok && typeof data.currentStreakDays === 'number') {
          setStreak(data.currentStreakDays);
        } else {
          setStreak(0);
        }
      })
      .catch(() => setStreak(0));
  }, []);

  // Hide on resume — it has its own top bar
  if (pathname === '/resume') return null;

  return (
    <header
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
        padding: '0.25rem 1rem',
        minHeight: '42px',
        gap: '0.5rem',
        flexWrap: 'wrap',
        boxSizing: 'border-box',
      }}
    >
      {/* Left — wordmark */}
      <Link
        href="/"
        style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0, textDecoration: 'none' }}
      >
        <span className="os-mono os-accent" style={{ fontSize: '0.9rem', lineHeight: 1 }}>◉</span>
        <span className="os-mono" style={{ fontSize: '0.78rem', letterSpacing: '0.04em', color: 'var(--text)' }}>
          rex os
        </span>
      </Link>

      {/* Middle — status pill */}
      <div
        className="os-mono"
        style={{
          fontSize: '0.72rem',
          color: 'var(--muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          flexShrink: 0,
        }}
        suppressHydrationWarning
      >
        {streak !== null && streak > 0 ? (
          <>
            <span style={{ color: 'var(--ok)', lineHeight: 1 }}>●</span>
            <span>shipping — day {streak}</span>
          </>
        ) : (
          <>
            <span style={{ color: 'var(--muted)', lineHeight: 1 }}>●</span>
            <span>building in public</span>
          </>
        )}
      </div>

      {/* Right — nav + clock + theme toggle */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.9rem',
          flexShrink: 0,
          flexWrap: 'wrap',
        }}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="os-mono"
            style={{
              fontSize: '0.72rem',
              color: pathname === href ? 'var(--text)' : 'var(--muted)',
              textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'color 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color =
                pathname === href ? 'var(--text)' : 'var(--muted)';
            }}
          >
            {label}
          </Link>
        ))}

        {/* Hire me — amber accent */}
        <Link
          href="/resume"
          className="os-mono"
          style={{
            fontSize: '0.72rem',
            color: '#F59E0B',
            textDecoration: 'none',
            letterSpacing: '0.02em',
            border: '1px solid rgba(245,158,11,0.35)',
            borderRadius: '3px',
            padding: '1px 6px',
            transition: 'background 0.15s, color 0.15s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'rgba(245,158,11,0.12)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
          }}
        >
          hire me
        </Link>

        <LiveClock />

        <button
          onClick={toggle}
          aria-label="Toggle theme"
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            color: 'var(--muted)',
            cursor: 'pointer',
            fontSize: '0.78rem',
            padding: '2px 7px',
            lineHeight: 1.4,
            transition: 'color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = 'var(--text)';
            el.style.borderColor = 'var(--text)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = 'var(--muted)';
            el.style.borderColor = 'var(--border)';
          }}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </nav>
    </header>
  );
}
