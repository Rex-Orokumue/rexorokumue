'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { runCommand } from './terminal/commands';
import { useTheme } from './ThemeProvider';
import { projects } from '../../data/projectsData';

interface HistoryEntry {
  input: string;
  lines: string[];
}

const slugs = projects.map((p) => p.slug);

export default function Terminal() {
  const router = useRouter();
  const { toggle } = useTheme();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // auto-scroll to bottom on new history
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter') return;
    const trimmed = value.trim();
    const r = runCommand(trimmed, slugs);

    if (r.action === 'clear') {
      setHistory([]);
    } else {
      setHistory((prev) => [...prev, { input: trimmed, lines: r.lines }]);
    }

    if (r.action === 'toggle-theme') toggle();
    if (r.navigate) router.push(r.navigate);
    if (r.external) window.open(r.external, '_blank');

    setValue('');
  }

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <div
      className="os-panel"
      onClick={focusInput}
      style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', cursor: 'text', height: '100%', minHeight: 220 }}
    >
      {/* header */}
      <span
        className="os-mono"
        style={{ fontSize: '0.65rem', color: 'var(--muted)', letterSpacing: '0.06em', flexShrink: 0 }}
      >
        // terminal&nbsp;&nbsp;<span style={{ color: 'var(--border)' }}>(optional)</span>
      </span>

      {/* scrollback area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          minHeight: 0,
          maxHeight: 160,
        }}
      >
        {/* intro line */}
        <span
          className="os-mono"
          style={{ fontSize: '0.68rem', color: 'var(--muted)' }}
        >
          rex os // type &apos;help&apos; to explore — everything is clickable too
        </span>

        {history.map((entry, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
            {/* input prompt line */}
            <span
              className="os-mono"
              style={{ fontSize: '0.68rem', color: 'var(--text)' }}
            >
              <span style={{ color: 'var(--accent)' }}>$</span> {entry.input}
            </span>
            {/* output lines */}
            {entry.lines.map((line, j) => (
              <span
                key={j}
                className="os-mono"
                style={{ fontSize: '0.65rem', color: 'var(--muted)', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
              >
                {line}
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
        <span
          className="os-mono os-accent"
          style={{ fontSize: '0.72rem', userSelect: 'none' }}
        >
          $
        </span>
        <input
          ref={inputRef}
          className="os-mono"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text)',
            fontSize: '0.72rem',
            caretColor: 'var(--accent)',
            fontFamily: 'inherit',
          }}
        />
      </div>
    </div>
  );
}
