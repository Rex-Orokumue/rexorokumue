// app/blog/[slug]/page.tsx
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  published_at: string;
  created_at: string;
  scheduled_at?: string | null;
  cover_image?: string | null;
}

const CATEGORY_COLORS: Record<string, string> = {
  engineering: '#3B82F6',
  product:     '#A78BFA',
  ai:          '#34D399',
  general:     '#94A3B8',
};

async function getPost(slug: string): Promise<Post | null> {
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .eq('site', 'portfolio')
    .or(`scheduled_at.is.null,scheduled_at.lte.${now}`)
    .single();
  if (error || !data) return null;
  return data as Post;
}

async function getRelatedPosts(slug: string, category: string): Promise<Post[]> {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, category, published_at')
    .eq('published', true)
    .eq('category', category)
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(2);
  return (data ?? []) as Post[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function estimateReadTime(body: string): number {
  const words = body.replace(/<[^>]+>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post Not Found' };

  const finalImage = post.cover_image || '/portfolio_thumbnail.png';

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://rexorokumue.vercel.app/blog/${slug}`,
      type: 'article',
      publishedTime: post.published_at,
      authors: ['Rex Orokumue'],
      images: [{ url: finalImage, width: 1200, height: 627 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [finalImage],
    },
    alternates: {
      canonical: `https://rexorokumue.vercel.app/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, post.category);
  const readTime = estimateReadTime(post.body);
  const categoryColor = CATEGORY_COLORS[post.category] ?? '#94A3B8';

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --accent-dim:   color-mix(in srgb, var(--accent) 12%, transparent);
          --accent-glow:  transparent;
          --accent-light: var(--accent);
          --muted-2:      var(--muted);
          --border-hover: var(--accent);
          --card:         var(--panel);
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; overflow-x: hidden; line-height: 1.6; }
        .bg-mesh { position: fixed; inset: 0; z-index: 0; background: transparent; }
        section, nav, footer { position: relative; z-index: 1; }
        .container { max-width: 900px; margin: 0 auto; padding: 0 5%; }
        .container-wide { max-width: 1280px; margin: 0 auto; padding: 0 5%; }
        .back-nav { padding: 100px 0 0; margin-top: 80px; max-width: 1400px; margin-left: auto; margin-right: auto; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; font-size: .9rem; color: var(--muted); text-decoration: none; transition: color .2s; }
        .back-link:hover { color: var(--text); }
        .post-cover-image { width: 100%; max-height: 600px; object-fit: cover; border-radius: 24px; margin-bottom: 48px; border: 1px solid rgba(255,255,255,.05); box-shadow: 0 24px 64px rgba(0,0,0,0.5); display: block; }
        .post-header { padding: 40px 0 56px; }
        .post-meta-row { display: flex; align-items: center; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }
        .post-category { padding: 4px 14px; border-radius: 100px; font-size: .75rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
        .post-date { font-size: .85rem; color: var(--muted-2); }
        .post-read-time { font-size: .85rem; color: var(--muted-2); }
        .meta-sep { width: 4px; height: 4px; border-radius: 50%; background: var(--muted-2); flex-shrink: 0; }
        .post-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; line-height: 1.05; letter-spacing: -.03em; margin-bottom: 24px; }
        .post-excerpt { font-size: 1.25rem; color: var(--muted); line-height: 1.8; font-weight: 300; border-left: 3px solid var(--accent); padding-left: 24px; margin-bottom: 32px; }
        .post-tags { display: flex; gap: 7px; flex-wrap: wrap; }
        .post-tag { padding: 3px 10px; border-radius: 5px; background: var(--accent-dim); border: 1px solid var(--accent-glow); font-size: .65rem; color: var(--accent-light); font-weight: 500; }
        .post-divider { border: none; border-top: 1px solid rgba(255,255,255,.05); margin: 0 0 56px; }

        .post-body { font-size: 1.15rem; line-height: 1.9; color: #E2E8F0; padding-bottom: 80px; }
        .post-body h1, .post-body h2 { font-family: 'Space Grotesk', sans-serif; font-weight: 800; letter-spacing: -.025em; color: var(--text); margin: 48px 0 20px; line-height: 1.15; }
        .post-body h1 { font-size: 2.2rem; }
        .post-body h2 { font-size: 1.8rem; }
        .post-body h3 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.1rem; color: var(--text); margin: 32px 0 12px; line-height: 1.3; }
        .post-body p { margin-bottom: 20px; }
        .post-body p:last-child { margin-bottom: 0; }
        .post-body strong { color: var(--text); font-weight: 600; }
        .post-body em { color: var(--muted); font-style: italic; }
        .post-body a { color: var(--accent); text-decoration: underline; text-decoration-color: var(--accent-glow); }
        .post-body a:hover { color: var(--accent-light); }
        .post-body ul, .post-body ol { padding-left: 20px; margin-bottom: 20px; }
        .post-body li { margin-bottom: 8px; line-height: 1.7; }
        .post-body code { font-family: 'JetBrains Mono', 'Courier New', monospace; font-size: .82em; background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 4px; padding: 1px 6px; color: var(--accent-light); }
        .post-body pre { background: rgba(15,23,42,0.8); border: 1px solid var(--border); border-radius: 10px; padding: 20px 24px; margin: 24px 0; overflow-x: auto; }
        .post-body pre code { background: transparent; border: none; padding: 0; font-size: .85rem; color: #CBD5E1; }
        .post-body hr { border: none; border-top: 1px solid var(--border); margin: 40px 0; }
        .post-body img { width: 100%; border-radius: 10px; border: 1px solid var(--border); margin: 24px 0; display: block; }
        .post-body figure { margin: 28px 0; }
        .post-body figure img { margin: 0 0 10px; }
        .post-body figcaption { font-size: .78rem; color: var(--muted-2); text-align: center; font-style: italic; }
        .post-body blockquote { border-left: 3px solid var(--accent); margin: 2.5rem 0; padding: 0.85rem 0 0.85rem 1.5rem; font-size: 1.15rem; font-style: italic; line-height: 1.65; color: var(--accent-light); background: transparent; border-radius: 0; }
        .post-body .feature-list { display: flex; flex-direction: column; gap: 10px; margin: 1.75rem 0 2rem; }
        .post-body .feature-item { display: flex; gap: 14px; align-items: flex-start; padding: 16px 18px; background: color-mix(in srgb, var(--accent) 6%, transparent); border-radius: 8px; border-left: 3px solid var(--accent); border-top: 1px solid var(--border); border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .post-body .feature-item .arrow { color: var(--accent); font-weight: 700; font-size: 1rem; flex-shrink: 0; margin-top: 0.05rem; }
        .post-body .feature-item p { margin-bottom: 0; font-size: 0.95rem; line-height: 1.7; color: #CBD5E1; }
        .post-body .feature-item strong { color: var(--text); }
        .post-body .section-break { text-align: center; margin: 2.5rem 0; color: var(--accent); font-size: 1rem; letter-spacing: 0.5em; }
        .post-body .highlight { background: color-mix(in srgb, var(--accent) 7%, transparent); border-top: 2px solid var(--accent); border-radius: 4px; padding: 1.4rem 1.6rem; margin: 2rem 0; font-size: 0.95rem; line-height: 1.8; color: var(--muted); }
        .post-body .highlight p { margin-bottom: 0; }
        .post-body .body-cta { margin: 3rem 0 1rem; padding: 2rem 2.25rem; background: var(--panel); border: 1px solid var(--border); border-radius: 12px; position: relative; overflow: hidden; }
        .post-body .body-cta::before { content: ''; position: absolute; top: -50%; left: 50%; transform: translateX(-50%); width: 60%; height: 160px; background: transparent; pointer-events: none; }
        .post-body .body-cta h3 { font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 800; color: var(--text); margin: 0 0 8px; line-height: 1.3; letter-spacing: -.02em; }
        .post-body .body-cta p { font-size: 0.875rem; color: var(--muted); margin-bottom: 18px; line-height: 1.65; }
        .post-body .body-cta a { display: inline-block; background: var(--accent); color: var(--accent-ink); padding: 10px 22px; border-radius: 8px; font-size: 0.875rem; font-weight: 600; text-decoration: none; transition: all 0.2s; letter-spacing: 0.02em; }
        .post-body .body-cta a:hover { transform: translateY(-2px); color: var(--accent-ink); }

        .related-section { padding: 0 0 80px; border-top: 1px solid var(--border); }
        .related-title { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 800; color: var(--text); margin: 40px 0 20px; letter-spacing: -.01em; }
        .related-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .related-card { display: flex; flex-direction: column; padding: 20px 22px; border-radius: 12px; border: 1px solid var(--border); background: var(--card); text-decoration: none; transition: all .2s; }
        .related-card:hover { border-color: var(--border-hover); transform: translateY(-3px); }
        .related-cat { font-size: .62rem; font-weight: 700; letter-spacing: .10em; text-transform: uppercase; margin-bottom: 8px; }
        .related-card-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: .88rem; color: var(--text); line-height: 1.3; margin-bottom: 6px; }
        .related-card-excerpt { font-size: .78rem; color: var(--muted); line-height: 1.55; flex: 1; }
        .related-arrow { font-size: .72rem; color: var(--accent); margin-top: 12px; font-weight: 600; }

        .post-cta { padding: 40px; border-radius: 16px; border: 1px solid var(--border); background: var(--panel); backdrop-filter: blur(20px); text-align: center; margin-bottom: 64px; position: relative; overflow: hidden; }
        .post-cta::before { content: ''; position: absolute; top: -40%; left: 50%; transform: translateX(-50%); width: 60%; height: 200px; background: transparent; pointer-events: none; }
        .post-cta h3 { font-family: 'Space Grotesk', sans-serif; font-size: 1.2rem; font-weight: 800; margin-bottom: 8px; }
        .post-cta p { font-size: .875rem; color: var(--muted); margin-bottom: 20px; line-height: 1.65; }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 11px 24px; background: var(--accent); color: var(--accent-ink); border-radius: 8px; font-weight: 600; font-size: .875rem; text-decoration: none; transition: all .2s; }
        .btn-primary:hover { transform: translateY(-2px); }
        .btn-ghost { display: inline-flex; align-items: center; gap: 8px; padding: 10px 20px; border: 1px solid var(--border); color: var(--muted); border-radius: 8px; font-weight: 500; font-size: .875rem; text-decoration: none; background: transparent; transition: all .2s; margin-left: 10px; }
        .btn-ghost:hover { border-color: var(--border-hover); color: var(--text); }

        footer { border-top: 1px solid var(--border); padding: 32px 64px; max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .footer-text { font-size: .78rem; color: var(--muted-2); }
        .footer-text span { color: var(--accent); }
        .footer-links { display: flex; gap: 24px; }
        .footer-links a { font-size: .78rem; color: var(--muted-2); text-decoration: none; transition: color .2s; }
        .footer-links a:hover { color: var(--text); }

        @media (max-width: 768px) {
          .container, .container-wide { padding: 0 8%; }
          .post-title { font-size: 2.2rem; }
          .post-excerpt { font-size: 1.1rem; }
          .related-grid { grid-template-columns: 1fr; }
          .post-cta { padding: 32px 24px; }
          footer { padding: 24px 8%; flex-direction: column; gap: 12px; text-align: center; }
        }
      `}</style>

      <div className="bg-mesh" aria-hidden="true" />

      <nav>
        <div className="container-wide back-nav">
          <Link href="/blog" className="back-link">← Back to Blog</Link>
        </div>
      </nav>

      {post.cover_image && (
        <section>
          <div className="container-wide">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image} alt={post.title} className="post-cover-image" />
          </div>
        </section>
      )}

      <section>
        <div className="container">
          <div className="post-header" style={{ paddingTop: post.cover_image ? 0 : 32 }}>
            <div className="post-meta-row">
              <span className="post-category" style={{ color: categoryColor, background: `${categoryColor}18`, border: `1px solid ${categoryColor}40` }}>
                {post.category}
              </span>
              <span className="meta-sep" />
              <span className="post-date">{formatDate(post.published_at)}</span>
              <span className="meta-sep" />
              <span className="post-read-time">{readTime} min read</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-excerpt">{post.excerpt}</p>
            {post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="post-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <hr className="post-divider" />
          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </section>

      <section>
        <div className="container">
          <div className="post-cta">
            <h3>Building something serious?</h3>
            <p>I&apos;m available for remote engineering roles and contracts in Europe and North America.</p>
            <a href="mailto:gorokumue@gmail.com" className="btn-primary">Get in Touch →</a>
            <Link href="/projects" className="btn-ghost">View My Work</Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <div className="container">
            <div className="related-section">
              <div className="related-title">More from {post.category}</div>
              <div className="related-grid">
                {related.map(r => (
                  <Link key={r.id} href={`/blog/${r.slug}`} className="related-card">
                    <div className="related-cat" style={{ color: CATEGORY_COLORS[r.category] ?? '#94A3B8' }}>
                      {r.category}
                    </div>
                    <div className="related-card-title">{r.title}</div>
                    <div className="related-card-excerpt">{r.excerpt}</div>
                    <div className="related-arrow">Read →</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <footer>
        <p className="footer-text">© 2026 <span>Rex Orokumue</span> · Built with Next.js &amp; intention.</p>
        <div className="footer-links">
          <a href="https://x.com/iamrexorokumue">𝕏</a>
          <a href="https://www.linkedin.com/in/rexorokumue/">LinkedIn</a>
          <a href="https://github.com/Rex-Orokumue">GitHub</a>
          <a href="mailto:gorokumue@gmail.com">Email</a>
        </div>
      </footer>
    </>
  );
}