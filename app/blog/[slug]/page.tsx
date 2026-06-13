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
  engineering: 'var(--accent)',
  product:     '#A78BFA',
  ai:          '#4ade80',
  general:     'var(--muted)',
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
  const categoryColor = CATEGORY_COLORS[post.category] ?? 'var(--muted)';

  return (
    <>
      <style>{`
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .post-page { animation: fadeIn .35s ease both; }

        .back-nav { padding-top: 5.5rem; padding-bottom: 1rem; }
        .back-link { font-family: 'JetBrains Mono', monospace; font-size: .72rem; color: var(--muted); text-decoration: none; transition: color .15s; }
        .back-link:hover { color: var(--text); }

        .post-cover-image { width: 100%; max-height: 500px; object-fit: cover; border-radius: 10px; margin-bottom: 2.5rem; border: 1px solid var(--border); display: block; }

        .post-header { padding: 1.5rem 0 2.5rem; }
        .post-meta-row { display: flex; align-items: center; gap: 10px; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .post-category { font-family: 'JetBrains Mono', monospace; padding: 2px 10px; border-radius: 5px; font-size: .65rem; letter-spacing: .06em; }
        .post-date { font-family: 'JetBrains Mono', monospace; font-size: .68rem; color: var(--muted); }
        .post-read-time { font-family: 'JetBrains Mono', monospace; font-size: .68rem; color: var(--muted); }
        .meta-sep { width: 3px; height: 3px; border-radius: 50%; background: var(--border); flex-shrink: 0; }
        .post-title { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem,4.5vw,3.2rem); font-weight: 700; line-height: 1.07; letter-spacing: -.03em; color: var(--text); margin-bottom: 1rem; }
        .post-excerpt { font-size: 1.05rem; color: var(--muted); line-height: 1.8; font-weight: 300; border-left: 2px solid var(--accent); padding-left: 1.25rem; margin-bottom: 1.25rem; }
        .post-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .post-tag { padding: 2px 8px; border-radius: 4px; background: color-mix(in srgb, var(--accent) 10%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent); font-family: 'JetBrains Mono', monospace; font-size: .62rem; color: var(--accent); }
        .post-divider { border: none; border-top: 1px solid var(--border); margin: 0 0 2.5rem; }

        .post-body { font-size: 1.05rem; line-height: 1.9; color: var(--text); padding-bottom: 4rem; }
        .post-body h1, .post-body h2 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; letter-spacing: -.025em; color: var(--text); margin: 2.75rem 0 1rem; line-height: 1.15; }
        .post-body h1 { font-size: 1.9rem; }
        .post-body h2 { font-size: 1.5rem; }
        .post-body h3 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 1.05rem; color: var(--text); margin: 1.75rem 0 .6rem; line-height: 1.3; }
        .post-body p { margin-bottom: 1.1rem; }
        .post-body p:last-child { margin-bottom: 0; }
        .post-body strong { color: var(--text); font-weight: 600; }
        .post-body em { color: var(--muted); font-style: italic; }
        .post-body a { color: var(--accent); text-decoration: underline; text-decoration-color: color-mix(in srgb, var(--accent) 35%, transparent); }
        .post-body a:hover { color: var(--text); }
        .post-body ul, .post-body ol { padding-left: 1.25rem; margin-bottom: 1.1rem; }
        .post-body li { margin-bottom: 6px; line-height: 1.7; }
        .post-body code { font-family: 'JetBrains Mono', monospace; font-size: .8em; background: rgba(255,255,255,0.05); border: 1px solid var(--border); border-radius: 4px; padding: 1px 5px; color: var(--accent); }
        .post-body pre { background: var(--panel); border: 1px solid var(--border); border-radius: 8px; padding: 1.1rem 1.25rem; margin: 1.25rem 0; overflow-x: auto; }
        .post-body pre code { background: transparent; border: none; padding: 0; font-size: .82rem; color: var(--muted); }
        .post-body hr { border: none; border-top: 1px solid var(--border); margin: 2.25rem 0; }
        .post-body img { width: 100%; border-radius: 8px; border: 1px solid var(--border); margin: 1.25rem 0; display: block; }
        .post-body figure { margin: 1.5rem 0; }
        .post-body figure img { margin: 0 0 8px; }
        .post-body figcaption { font-family: 'JetBrains Mono', monospace; font-size: .68rem; color: var(--muted); text-align: center; }
        .post-body blockquote { border-left: 2px solid var(--accent); margin: 1.75rem 0; padding: .7rem 0 .7rem 1.25rem; font-size: 1rem; font-style: italic; line-height: 1.65; color: var(--muted); }
        .post-body .feature-list { display: flex; flex-direction: column; gap: 8px; margin: 1.5rem 0 1.75rem; }
        .post-body .feature-item { display: flex; gap: 12px; align-items: flex-start; padding: 12px 16px; background: color-mix(in srgb, var(--accent) 5%, transparent); border-radius: 6px; border-left: 2px solid var(--accent); border-top: 1px solid var(--border); border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); }
        .post-body .feature-item .arrow { color: var(--accent); font-weight: 700; font-size: .95rem; flex-shrink: 0; margin-top: 2px; }
        .post-body .feature-item p { margin-bottom: 0; font-size: .9rem; line-height: 1.7; color: var(--muted); }
        .post-body .feature-item strong { color: var(--text); }
        .post-body .section-break { text-align: center; margin: 2rem 0; color: var(--accent); font-family: 'JetBrains Mono', monospace; font-size: .8rem; letter-spacing: .4em; }
        .post-body .highlight { background: color-mix(in srgb, var(--accent) 6%, transparent); border-top: 2px solid var(--accent); border-radius: 4px; padding: 1.1rem 1.4rem; margin: 1.75rem 0; font-size: .9rem; line-height: 1.8; color: var(--muted); }
        .post-body .highlight p { margin-bottom: 0; }
        .post-body .body-cta { margin: 2.5rem 0 1rem; padding: 1.5rem 1.75rem; background: var(--panel); border: 1px solid var(--border); border-radius: 10px; }
        .post-body .body-cta h3 { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 700; color: var(--text); margin: 0 0 6px; line-height: 1.3; letter-spacing: -.02em; }
        .post-body .body-cta p { font-size: .845rem; color: var(--muted); margin-bottom: 1rem; line-height: 1.65; }
        .post-body .body-cta a { display: inline-flex; align-items: center; gap: .4rem; font-family: 'JetBrains Mono', monospace; font-size: .72rem; padding: .45rem .85rem; border: 1px solid var(--accent); border-radius: 6px; color: var(--accent-ink); background: var(--accent); font-weight: 600; text-decoration: none; }
        .post-body .body-cta a:hover { color: var(--accent-ink); opacity: .9; }

        /* RELATED */
        .related-section { padding: 2rem 0 4rem; border-top: 1px solid var(--border); }
        .related-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 1.25rem; }
        .related-card { display: flex; flex-direction: column; padding: 1.1rem 1.2rem; border-radius: 10px; border: 1px solid var(--border); background: var(--panel); text-decoration: none; transition: border-color .2s; }
        .related-card:hover { border-color: var(--accent); }
        .related-cat { font-family: 'JetBrains Mono', monospace; font-size: .60rem; letter-spacing: .07em; margin-bottom: 7px; }
        .related-card-title { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: .85rem; color: var(--text); line-height: 1.3; margin-bottom: 5px; }
        .related-card-excerpt { font-size: .76rem; color: var(--muted); line-height: 1.55; flex: 1; }
        .related-arrow { font-family: 'JetBrains Mono', monospace; font-size: .65rem; color: var(--accent); margin-top: .75rem; }

        /* CTA */
        .post-cta { padding: 2rem; border-radius: 10px; border: 1px solid var(--border); background: var(--panel); text-align: center; margin-bottom: 3.5rem; }
        .post-cta h3 { font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 700; margin-bottom: 6px; }
        .post-cta p { font-size: .855rem; color: var(--muted); margin-bottom: 1.1rem; line-height: 1.65; }
        .post-cta-row { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 768px) {
          .back-nav { padding-top: 4.5rem; }
          .post-title { font-size: 1.85rem; }
          .post-excerpt { font-size: .95rem; }
          .related-grid { grid-template-columns: 1fr; }
          .post-cta { padding: 1.5rem 1.1rem; }
        }
      `}</style>

      <div className="post-page">
        <nav>
          <div className="os-container back-nav">
            <Link href="/blog" className="back-link">← back to blog</Link>
          </div>
        </nav>

        {post.cover_image && (
          <section>
            <div className="os-container">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover_image} alt={post.title} className="post-cover-image" />
            </div>
          </section>
        )}

        <section>
          <div className="os-container">
            <div className="post-header" style={{ paddingTop: post.cover_image ? 0 : '1.5rem' }}>
              <div className="post-meta-row">
                <span className="post-category" style={{ color: categoryColor, background: `color-mix(in srgb, ${categoryColor} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${categoryColor} 28%, transparent)` }}>
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
          <div className="os-container">
            <hr className="post-divider" />
            <div className="post-body" dangerouslySetInnerHTML={{ __html: post.body }} />
          </div>
        </section>

        <section>
          <div className="os-container">
            <div className="post-cta">
              <h3>Building something serious?</h3>
              <p>I&apos;m available for remote engineering roles and contracts in Europe and North America.</p>
              <div className="post-cta-row">
                <a href="mailto:gorokumue@gmail.com" className="os-btn os-btn-primary">Get in Touch →</a>
                <Link href="/projects" className="os-btn">View My Work</Link>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section>
            <div className="os-container">
              <div className="related-section">
                <span className="os-label">// more from {post.category}</span>
                <div className="related-grid">
                  {related.map(r => (
                    <Link key={r.id} href={`/blog/${r.slug}`} className="related-card">
                      <div className="related-cat" style={{ color: CATEGORY_COLORS[r.category] ?? 'var(--muted)' }}>
                        {r.category}
                      </div>
                      <div className="related-card-title">{r.title}</div>
                      <div className="related-card-excerpt">{r.excerpt}</div>
                      <div className="related-arrow">read →</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
