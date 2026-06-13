// app/tech-serial/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Tech Serial',
  description:
    'Weekly short-form videos explaining tech concepts in plain language — no jargon, no gatekeeping. Follow on YouTube, TikTok, Instagram, and WhatsApp.',
  openGraph: {
    title: 'The Tech Serial — Tech Explained Simply',
    description:
      'Weekly short-form videos explaining tech concepts in plain language. New episode every week.',
    url: 'https://rexorokumue.vercel.app/tech-serial',
    images: [{ url: '/portfolio_thumbnail.png', width: 1200, height: 627 }],
  },
  alternates: { canonical: 'https://rexorokumue.vercel.app/tech-serial' },
};

interface LatestVideo {
  title: string;
  description: string;
  videoId: string;
  thumbnail: string;
  url: string;
  publishedAt: string;
}

async function getLatestVideo(): Promise<LatestVideo | null> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  if (!channelId) return null;

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const xml = await res.text();

    const entry = xml.match(/<entry>([\s\S]*?)<\/entry>/)?.[1];
    if (!entry) return null;

    const videoId   = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1] ?? '';
    const title     = entry.match(/<title>(.*?)<\/title>/)?.[1] ?? '';
    const published = entry.match(/<published>(.*?)<\/published>/)?.[1] ?? '';
    const rawDesc   = entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1]?.trim() ?? '';
    const desc      = rawDesc ? rawDesc.slice(0, 120) + '…' : '';

    return {
      videoId,
      title,
      description: desc,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      publishedAt: published
        ? new Date(published).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        : '',
    };
  } catch {
    return null;
  }
}

export default async function TechSerialPage() {
  const latest = await getLatestVideo();
  const hasVideo = Boolean(latest?.videoId);
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

        .ts-fade-1 { animation: fadeUp 0.55s 0.05s ease both; }
        .ts-fade-2 { animation: fadeUp 0.55s 0.12s ease both; }
        .ts-fade-3 { animation: fadeUp 0.55s 0.20s ease both; }
        .ts-fade-4 { animation: fadeUp 0.55s 0.28s ease both; }

        section { position: relative; z-index: 1; }

        /* HERO */
        .ts-hero { padding-top: 140px; padding-bottom: 56px; display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
        .ts-headline {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700; line-height: 1.08; letter-spacing: -0.02em; color: var(--text);
        }
        .ts-headline .accent { color: var(--accent); }
        .ts-sub { margin-top: 18px; font-size: 0.95rem; color: var(--muted); line-height: 1.75; max-width: 480px; }
        .ts-sub strong { color: var(--text); font-weight: 500; }

        /* Platform links */
        .ts-platforms { display: flex; flex-direction: column; gap: 8px; margin-top: 28px; }
        .platform-link { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 10px; border: 1px solid var(--border); background: var(--panel); text-decoration: none; transition: border-color 0.2s; }
        .platform-link:hover { border-color: var(--accent); }
        .platform-icon { width: 32px; height: 32px; border-radius: 7px; display: flex; align-items: center; justify-content: center; font-size: 1rem; flex-shrink: 0; border: 1px solid var(--border); background: var(--panel-2); }
        .platform-info { flex: 1; min-width: 0; }
        .platform-name { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.85rem; color: var(--text); }
        .platform-handle { font-family: 'JetBrains Mono', monospace; font-size: 0.68rem; color: var(--muted); margin-top: 2px; }
        .platform-arrow { font-family: 'JetBrains Mono', monospace; font-size: 0.70rem; color: var(--accent); flex-shrink: 0; }

        /* Featured episode card */
        .ts-featured-card { border-radius: 10px; border: 1px solid var(--border); background: var(--panel); overflow: hidden; display: block; transition: border-color 0.2s; text-decoration: none; }
        .ts-featured-card:hover { border-color: var(--accent); }
        .ts-featured-thumb { width: 100%; aspect-ratio: 16/9; background: var(--panel-2); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .ts-featured-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .ts-play-btn { position: absolute; width: 48px; height: 48px; border-radius: 50%; background: var(--accent); border: 2px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; cursor: pointer; }
        .ts-play-btn svg { margin-left: 3px; }
        .ts-featured-body { padding: 18px 20px; }
        .ts-featured-label { font-family: 'JetBrains Mono', monospace; font-size: 0.62rem; letter-spacing: 0.06em; color: var(--accent); margin-bottom: 8px; }
        .ts-featured-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.92rem; color: var(--text); line-height: 1.3; }
        .ts-featured-desc { font-size: 0.75rem; color: var(--muted); margin-top: 6px; line-height: 1.55; }

        /* About section */
        .ts-about-inner { border-radius: 10px; border: 1px solid var(--border); background: var(--panel); padding: 44px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
        .ts-about-left h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.4rem, 2.5vw, 1.9rem); font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 18px; }
        .ts-about-left p { font-size: 0.88rem; color: var(--muted); line-height: 1.8; margin-bottom: 14px; }
        .ts-about-left p strong { color: var(--text); font-weight: 500; }
        .ts-topics { display: flex; flex-direction: column; gap: 8px; }
        .ts-topic { display: flex; gap: 12px; padding: 14px 16px; border-radius: 8px; border: 1px solid var(--border); background: var(--panel-2); transition: border-color 0.2s; }
        .ts-topic:hover { border-color: var(--accent); }
        .ts-topic-icon { font-size: 1rem; flex-shrink: 0; width: 28px; text-align: center; }
        .ts-topic-text h4 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 0.82rem; color: var(--text); margin-bottom: 2px; }
        .ts-topic-text p { font-size: 0.73rem; color: var(--muted); line-height: 1.5; }

        /* CTA */
        .ts-cta-inner { border-radius: 10px; border: 1px solid var(--border); background: var(--panel); padding: 60px 60px; text-align: center; }
        .ts-cta-inner h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.5rem, 2.8vw, 2.2rem); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 12px; }
        .ts-cta-inner p { font-size: 0.88rem; color: var(--muted); max-width: 440px; margin: 0 auto 28px; line-height: 1.75; }
        .platform-btn-row { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }

        footer { position: relative; z-index: 1; border-top: 1px solid var(--border); padding: 28px 0; display: flex; align-items: center; justify-content: space-between; }
        .footer-left p { font-family: 'JetBrains Mono', monospace; font-size: 0.70rem; color: var(--muted); }
        .footer-left p span { color: var(--accent); }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-family: 'JetBrains Mono', monospace; font-size: 0.70rem; color: var(--muted); text-decoration: none; transition: color 0.15s; }
        .footer-links a:hover { color: var(--text); }

        @media (max-width: 1024px) {
          .ts-hero { grid-template-columns: 1fr; gap: 40px; }
          .ts-about-inner { grid-template-columns: 1fr; padding: 36px 28px; gap: 36px; }
          .ts-cta-inner { padding: 48px 28px; }
          footer { flex-direction: column; gap: 14px; text-align: center; }
        }
        @media (max-width: 640px) {
          .ts-hero { padding-top: 110px; }
          .ts-headline { font-size: 2rem; }
          .ts-cta-inner { padding: 36px 18px; }
          .platform-btn-row { flex-direction: column; align-items: center; }
          footer { padding: 20px 0; }
        }
      `}</style>

      {/* HERO */}
      <section>
        <div className="os-container">
          <div className="ts-hero">
            <div>
              <span className="os-label ts-fade-1">// the tech serial</span>
              <h1 className="ts-headline ts-fade-2">Tech explained.<br /><span className="accent">Simply.</span> Weekly.</h1>
              <p className="ts-sub ts-fade-3">
                Short weekly videos breaking down <strong>tech concepts, tools, and trends</strong> in plain language — no jargon, no gatekeeping. If you can watch a 60-second clip, you can understand it.
              </p>

              <div className="ts-platforms ts-fade-4">
                {[
                  { icon: '▶', name: 'YouTube',         handle: '@TheTechSerial',  url: 'https://www.youtube.com/@TheTechSerial' },
                  { icon: '♪', name: 'TikTok',           handle: '@thetechserial',  url: 'https://www.tiktok.com/@thetechserial' },
                  { icon: '◈', name: 'Instagram',        handle: '@thetechserial',  url: 'https://www.instagram.com/thetechserial' },
                  { icon: '✆', name: 'WhatsApp Channel', handle: 'The Tech Serial', url: 'https://whatsapp.com/channel/0029Vb7i8oR17En0yhOjDA1h' },
                ].map(p => (
                  <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="platform-link">
                    <div className="platform-icon">{p.icon}</div>
                    <div className="platform-info">
                      <div className="platform-name">{p.name}</div>
                      <div className="platform-handle">{p.handle}</div>
                    </div>
                    <span className="platform-arrow">Follow →</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Featured episode — auto-updates from YouTube RSS, no API key needed */}
            <a
              href={latest?.url ?? 'https://www.youtube.com/@TheTechSerial'}
              target="_blank"
              rel="noopener noreferrer"
              className="ts-featured-card ts-fade-3"
            >
              <div className="ts-featured-thumb">
                {hasVideo ? (
                  <img src={latest!.thumbnail} alt={latest!.title} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--panel-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontSize: '0.80rem' }}>
                    First episode coming soon
                  </div>
                )}
                {hasVideo && (
                  <div className="ts-play-btn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--accent-ink)">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="ts-featured-body">
                <div className="ts-featured-label">
                  latest episode {latest?.publishedAt && `· ${latest.publishedAt}`}
                </div>
                <div className="ts-featured-title">
                  {latest?.title ?? 'Coming soon — first episode dropping shortly.'}
                </div>
                <div className="ts-featured-desc">
                  {latest?.description ?? 'Subscribe on YouTube to be notified when the first episode drops.'}
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* WHAT IS THE TECH SERIAL */}
      <section className="os-section">
        <div className="os-container">
          <div className="ts-about-inner">
            <div className="ts-about-left">
              <span className="os-label">// what is the tech serial?</span>
              <h2>Tech literacy for everyone who uses tech.</h2>
              <p>
                Most people use technology every day without understanding how any of it works. That is not a failure — it is a gap that has never been properly filled.
              </p>
              <p>
                The Tech Serial is a <strong>weekly short-form video series</strong> that explains one tech concept per episode, clearly and briefly. No prior knowledge required. No condescension. Just the thing explained well.
              </p>
              <p>
                Topics range from &ldquo;what is the cloud&rdquo; to &ldquo;how does end-to-end encryption work&rdquo; — anything a curious person might wonder about but never had properly explained.
              </p>
            </div>
            <div>
              <span className="os-label">// topics covered</span>
              <div className="ts-topics">
                {[
                  { icon: '☁️', title: 'Cloud & Infrastructure', desc: 'What servers really are, what "the cloud" means, and why it matters.' },
                  { icon: '🔐', title: 'Security & Privacy', desc: 'Encryption, passwords, data breaches — explained without the fear tactics.' },
                  { icon: '🤖', title: 'AI & Machine Learning', desc: 'How AI actually works, what LLMs are, and what they can and cannot do.' },
                  { icon: '📱', title: 'Apps & Software', desc: 'How apps are built, what APIs are, and why your app keeps asking to update.' },
                  { icon: '🌐', title: 'The Internet', desc: 'DNS, HTTP, browsers, and why websites sometimes just go down.' },
                ].map(t => (
                  <div key={t.title} className="ts-topic">
                    <div className="ts-topic-icon">{t.icon}</div>
                    <div className="ts-topic-text">
                      <h4>{t.title}</h4>
                      <p>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="os-section" style={{ paddingTop: 0 }}>
        <div className="os-container">
          <div className="ts-cta-inner">
            <span className="os-label" style={{ textAlign: 'center' }}>// pick your platform</span>
            <h2>New episode every week.<br />Pick your platform.</h2>
            <p>Follow on whichever platform you are already on. The content is the same everywhere — short, clear, and actually useful.</p>
            <div className="platform-btn-row">
              <a href="https://www.youtube.com/@TheTechSerial"                        target="_blank" rel="noopener noreferrer" className="os-btn">▶ YouTube</a>
              <a href="https://www.tiktok.com/@thetechserial"                         target="_blank" rel="noopener noreferrer" className="os-btn">♪ TikTok</a>
              <a href="https://www.instagram.com/thetechserial"                       target="_blank" rel="noopener noreferrer" className="os-btn">◈ Instagram</a>
              <a href="https://whatsapp.com/channel/0029Vb7i8oR17En0yhOjDA1h"        target="_blank" rel="noopener noreferrer" className="os-btn">✆ WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="os-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div className="footer-left">
            <p>© 2026 <span>Rex Orokumue</span> · Built with Next.js &amp; intention.</p>
          </div>
          <div className="footer-links">
            <a href="https://x.com/iamrexorokumue">𝕏</a>
            <a href="https://www.linkedin.com/in/rexorokumue/">LinkedIn</a>
            <a href="https://github.com/Rex-Orokumue">GitHub</a>
            <a href="mailto:gorokumue@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
}
