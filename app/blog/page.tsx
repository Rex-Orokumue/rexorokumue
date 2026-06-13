// app/blog/page.tsx  — Server component, reads live from Supabase

import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Engineering decisions, product lessons, AI workflows, and honest observations from building in public. Written by Rex Orokumue.',
  openGraph: {
    title: 'Blog — Rex Orokumue',
    description:
      'Engineering decisions, product lessons, and observations from building in public.',
    url: 'https://rexorokumue.vercel.app/blog',
    images: [{ url: '/portfolio_thumbnail.png', width: 1200, height: 627 }],
  },
  alternates: { canonical: 'https://rexorokumue.vercel.app/blog' },
};

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
  category: string;
  tags: string[];
  published_at: string;
  cover_image?: string | null;
}

const CATEGORY_COLORS: Record<string, string> = {
  engineering: 'var(--accent)',
  product:     '#A78BFA',
  ai:          '#34D399',
  general:     'var(--muted)',
};

async function getPosts(category?: string): Promise<Post[]> {
  let query = supabase
    .from('blog_posts')
    .select('id, slug, title, excerpt, category, tags, published_at, cover_image')
    .eq('published', true)
    .eq('site', 'portfolio')
    .order('published_at', { ascending: false });

  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) { console.error(error); return []; }
  return data ?? [];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category?.toLowerCase() ?? 'all';
  const posts = await getPosts(activeCategory);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --secondary:    var(--bg);
          --accent-dim:   color-mix(in srgb, var(--accent) 12%, transparent);
          --accent-glow:  transparent;
          --accent-light: var(--accent);
          --muted-2:      var(--muted);
          --border-hover: var(--accent);
          --card-bg:      var(--panel);
        }
        body { font-family: 'DM Sans', sans-serif; overflow-x: hidden; line-height: 1.6; }
        .bg-mesh { position: fixed; inset: 0; z-index: 0; background: transparent; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }
        section { position: relative; z-index: 1; }
        .container { max-width: 1000px; margin: 0 auto; padding: 0 64px; }

        .blog-hero { padding-top: 160px; padding-bottom: 64px; margin-top: -20px; }
        .blog-eyebrow { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px 5px 8px; border-radius: 100px; border: 1px solid var(--accent-glow); background: var(--accent-dim); font-size: .70rem; font-weight: 600; letter-spacing: .10em; text-transform: uppercase; color: var(--accent); margin-top: -60px; margin-bottom: 28px; width: fit-content; animation: fadeUp .7s .05s ease both; }
        .blog-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; flex-shrink: 0; }
        .blog-headline { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2.2rem, 4.5vw, 3.6rem); font-weight: 800; line-height: 1.0; letter-spacing: -.03em; animation: fadeUp .7s .18s ease both; }
        .blog-sub { margin-top: 16px; font-size: 1rem; color: var(--muted); max-width: 520px; font-weight: 300; line-height: 1.75; animation: fadeUp .7s .30s ease both; }

        .blog-filter { display: flex; gap: 8px; flex-wrap: wrap; padding: 0 0 40px; animation: fadeUp .7s .40s ease both; }
        .filter-chip { padding: 6px 16px; border-radius: 100px; border: 1px solid var(--border); background: transparent; font-size: .75rem; font-weight: 500; color: var(--muted); cursor: pointer; font-family: 'DM Sans', sans-serif; text-decoration: none; transition: all .2s; }
        .filter-chip:hover, .filter-chip.active { border-color: var(--accent-glow); background: var(--accent-dim); color: var(--accent); }

        .posts-section { padding-bottom: 120px; }
        .posts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .post-card { display: flex; flex-direction: column; padding: 28px; border-radius: 16px; border: 1px solid var(--border); background: var(--card-bg); backdrop-filter: blur(12px); text-decoration: none; transition: all .25s; }
        .post-card:hover { border-color: var(--border-hover); transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.35); }
        .post-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
        .post-cover-wrapper { width: calc(100% + 56px); margin: -28px -28px 20px; height: 180px; overflow: hidden; border-radius: 16px 16px 0 0; background: rgba(0,0,0,0.2); }
        .post-cover-image { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .4s ease; }
        .post-card:hover .post-cover-image { transform: scale(1.05); }
        .post-category { font-size: .65rem; font-weight: 700; letter-spacing: .10em; text-transform: uppercase; }
        .post-date { font-size: .72rem; color: var(--muted-2); }
        .post-title { font-family: 'Space Grotesk', sans-serif; font-size: 1.05rem; font-weight: 700; color: var(--text); line-height: 1.3; margin-bottom: 10px; }
        .post-excerpt { font-size: .83rem; color: var(--muted); line-height: 1.7; flex: 1; }
        .post-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--border); }
        .post-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .post-tag { padding: 2px 8px; border-radius: 4px; background: var(--accent-dim); border: 1px solid var(--accent-glow); font-size: .63rem; color: var(--accent-light); font-weight: 500; }
        .post-arrow { font-size: .78rem; color: var(--accent); font-weight: 600; flex-shrink: 0; }

        .blog-empty { padding: 80px 20px; text-align: center; border: 1px dashed var(--border); border-radius: 16px; color: var(--muted-2); }
        .blog-empty p { font-size: .9rem; }
        .blog-empty a { color: var(--accent); }

        footer { position: relative; z-index: 1; border-top: 1px solid var(--border); padding: 36px 64px; max-width: 1000px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .footer-left p { font-size: .78rem; color: var(--muted-2); }
        .footer-left p span { color: var(--accent); }
        .footer-links { display: flex; gap: 28px; }
        .footer-links a { font-size: .78rem; color: var(--muted-2); text-decoration: none; transition: color .2s; }
        .footer-links a:hover { color: var(--text); }

        @media (max-width: 768px) {
          .container { padding: 0 20px; }
          .blog-hero { padding-top: 130px; }
          .blog-headline { font-size: 2rem; }
          .posts-grid { grid-template-columns: 1fr; }
          footer { padding: 24px 20px; flex-direction: column; gap: 14px; text-align: center; }
        }
      `}</style>

      <div className="bg-mesh" aria-hidden="true" />

      <section>
        <div className="container blog-hero">
          <div className="blog-eyebrow"><span className="dot" /> Blog</div>
          <h1 className="blog-headline">Thinking out loud.<br />Writing it down.</h1>
          <p className="blog-sub">Engineering decisions, product lessons, AI workflows, and honest observations from building in public.</p>

          <div className="blog-filter" style={{ marginTop: 28 }}>
            {['All', 'Engineering', 'Product', 'AI', 'General'].map(cat => {
              const catKey = cat.toLowerCase();
              const isActive = catKey === activeCategory || (catKey === 'all' && activeCategory === 'all');
              return (
                <Link
                  key={cat}
                  href={cat === 'All' ? '/blog' : `/blog?category=${catKey}`}
                  scroll={false}
                  className={`filter-chip${isActive ? ' active' : ''}`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="posts-section">
        <div className="container">
          {posts.length === 0 ? (
            <div className="blog-empty">
              <p>No posts yet. <a href="/admin/blog">Write the first one →</a></p>
            </div>
          ) : (
            <div className="posts-grid">
              {posts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="post-card">
                  {post.cover_image && (
                    <div className="post-cover-wrapper">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={post.cover_image} alt={post.title} className="post-cover-image" loading="lazy" />
                    </div>
                  )}
                  <div className="post-card-top">
                    <span className="post-category" style={{ color: CATEGORY_COLORS[post.category] ?? 'var(--muted)' }}>
                      {post.category}
                    </span>
                    <span className="post-date">{formatDate(post.published_at)}</span>
                  </div>
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-footer">
                    <div className="post-tags">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="post-tag">{tag}</span>
                      ))}
                    </div>
                    <span className="post-arrow">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer>
        <div className="footer-left">
          <p>© 2026 <span>Rex Orokumue</span> · Built with Next.js &amp; intention.</p>
        </div>
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