import type { Metadata } from 'next';
import Link from 'next/link';
import { promptLab } from '../data/promptLabData';

export const metadata: Metadata = {
  title: 'Prompt Lab — AI & ChatGPT Work',
  description:
    'Real ChatGPT and Claude work by Rex Orokumue — strategy, content, and code. Prompt engineering samples with teaching notes.',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
  fontSize: '0.62rem',
  letterSpacing: '0.06em',
  color: 'var(--muted)',
  textTransform: 'lowercase',
};

export default function PromptLabPage() {
  return (
    <main className="os-container" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
      {/* Intro */}
      <section className="os-section" style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
        <span className="os-label">// prompt lab</span>
        <h1 className="os-h2" style={{ marginTop: '0.5rem', maxWidth: '18ch' }}>
          What I build with AI.
        </h1>
        <p style={{ marginTop: '1rem', maxWidth: '60ch', color: 'var(--text)', lineHeight: 1.65 }}>
          {promptLab.intro}
        </p>
      </section>

      {/* What I can teach */}
      <section className="os-card" style={{ marginBottom: '2.5rem' }}>
        <span style={labelStyle}>// what i can teach</span>
        <ul
          style={{
            listStyle: 'none',
            margin: '0.9rem 0 0',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.55rem',
          }}
        >
          {promptLab.teach.map((t) => (
            <li key={t} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', lineHeight: 1.55 }}>
              <span className="os-accent" style={{ fontFamily: "'JetBrains Mono', monospace", flexShrink: 0 }}>
                ›
              </span>
              <span style={{ color: 'var(--text)', fontSize: '0.92rem' }}>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Examples */}
      <span style={labelStyle}>// real samples</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
        {promptLab.examples.map((ex, i) => (
          <article key={i} className="os-card" style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {/* category + title */}
            <div>
              <span
                style={{
                  ...labelStyle,
                  color: 'var(--accent)',
                  border: '1px solid var(--border)',
                  borderRadius: '4px',
                  padding: '2px 7px',
                }}
              >
                {ex.categoryLabel}
              </span>
              <h2 className="os-display" style={{ margin: '0.75rem 0 0', fontSize: '1.1rem', color: 'var(--text)', lineHeight: 1.25 }}>
                {ex.title}
              </h2>
            </div>

            {/* prompt */}
            <div>
              <span style={labelStyle}>// my prompt</span>
              <div
                className="os-mono"
                style={{
                  marginTop: '0.4rem',
                  background: 'var(--panel-2)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '0.8rem 1rem',
                  fontSize: '0.8rem',
                  color: 'var(--text)',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {ex.prompt}
              </div>
            </div>

            {/* output */}
            <div>
              <span style={labelStyle}>
                {ex.excerpt ? '// chatgpt output (excerpt)' : '// chatgpt output'}
              </span>
              <div
                style={{
                  marginTop: '0.4rem',
                  background: 'var(--panel-2)',
                  border: '1px solid var(--border)',
                  borderLeft: '2px solid var(--accent)',
                  borderRadius: '8px',
                  padding: '0.85rem 1rem',
                  fontSize: '0.86rem',
                  color: 'var(--muted)',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {ex.output}
              </div>
            </div>

            {/* why it works — teaching note */}
            <div
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: '0.8rem',
                display: 'flex',
                gap: '0.6rem',
                alignItems: 'flex-start',
              }}
            >
              <span className="os-accent" style={{ fontFamily: "'JetBrains Mono', monospace", flexShrink: 0, fontSize: '0.85rem' }}>
                ★
              </span>
              <div>
                <span style={{ ...labelStyle, color: 'var(--accent)' }}>why it works</span>
                <p style={{ margin: '0.3rem 0 0', color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {ex.why}
                </p>
              </div>
            </div>

            {ex.link && (
              <Link href={ex.link.href} className="os-btn" style={{ alignSelf: 'flex-start' }}>
                {ex.link.label}
              </Link>
            )}
          </article>
        ))}
      </div>

      {/* Published with AI + private note */}
      <section className="os-card" style={{ marginTop: '2.5rem' }}>
        <span style={labelStyle}>// published with ai</span>
        <p style={{ margin: '0.7rem 0 1rem', color: 'var(--text)', fontSize: '0.92rem', lineHeight: 1.6 }}>
          {promptLab.published}
        </p>
        <Link href="/blog" className="os-btn os-btn-primary" style={{ alignSelf: 'flex-start' }}>
          read the blog →
        </Link>
        <p style={{ marginTop: '1.4rem', color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>
          {promptLab.privateNote}
        </p>
      </section>
    </main>
  );
}
