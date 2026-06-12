'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface MenuBarProps {
  streak?: number;
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

export default function MenuBar({ streak }: MenuBarProps) {
  const { theme, toggle } = useTheme();

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
        padding: '0 1.5rem',
        height: '42px',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      {/* Left — wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
        <span className="os-mono os-accent" style={{ fontSize: '0.9rem', lineHeight: 1 }}>◉</span>
        <span className="os-mono" style={{ fontSize: '0.78rem', letterSpacing: '0.04em', color: 'var(--text)' }}>
          rex os
        </span>
      </div>

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
      >
        {streak && streak > 0 ? (
          <>
            <span style={{ color: 'var(--ok)', lineHeight: 1 }}>●</span>
            <span>
              shipping — day {streak}
            </span>
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
          gap: '1.25rem',
          flexShrink: 0,
        }}
      >
        {(['work', 'logs', 'writing', 'about'] as const).map((label, i) => {
          const hrefs = ['/projects', '/build-logs', '/blog', '/about'];
          return (
            <Link
              key={label}
              href={hrefs[i]}
              className="os-mono"
              style={{
                fontSize: '0.72rem',
                color: 'var(--muted)',
                textDecoration: 'none',
                letterSpacing: '0.02em',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--text)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--muted)')}
            >
              {label}
            </Link>
          );
        })}

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
