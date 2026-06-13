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
  ai:          '#4ade80',
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
        @keyframes fadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        .blog-page { animation: fadeIn .35s ease both; }

        /* HERO */
        .blog-hero { padding-top: 7rem; padding-bottom: 2.5rem; }
        .blog-headline { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.9rem,4vw,3rem); font-weight: 700; line-height: 1.05; letter-spacing: -.03em; color: var(--text); }
        .blog-sub { margin-top: .75rem; font-size: .9rem; color: var(--muted); max-width: 500px; font-weight: 300; line-height: 1.75; }

        /* FILTER */
        .blog-filter { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 1.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--border); }
        .filter-chip { padding: 4px 14px; border-radius: 6px; border: 1px solid var(--border); background: transparent; font-family: 'JetBrains Mono', monospace; font-size: .68rem; color: var(--muted); text-decoration: none; transition: border-color .15s, color .15s; }
        .filter-chip:hover { border-color: var(--accent); color: var(--text); }
        .filter-chip.active { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 10%, transparent); color: var(--accent); }

        /* GRID */
        .posts-section { padding-bottom: 5rem; }
        .posts-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .post-card { display: flex; flex-direction: column; text-decoration: none; border-radius: 10px; border: 1px solid var(--border); background: var(--panel); transition: border-color .2s; overflow: hidden; }
        .post-card:hover { border-color: var(--accent); }
        .post-cover-wrapper { width: 100%; height: 160px; overflow: hidden; background: rgba(0,0,0,0.2); }
        .post-cover-image { width: 100%; height: 100%; object-fit: cover; display: block; }
        .post-card-body { display: flex; flex-direction: column; flex: 1; padding: 1.1rem 1.2rem; }
        .post-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: .75rem; }
        .post-category { font-family: 'JetBrains Mono', monospace; font-size: .62rem; letter-spacing: .06em; }
        .post-date { font-family: 'JetBrains Mono', monospace; font-size: .62rem; color: var(--muted); }
        .post-title { font-family: 'Space Grotesk', sans-serif; font-size: .95rem; font-weight: 700; color: var(--text); line-height: 1.3; margin-bottom: .5rem; }
        .post-excerpt { font-size: .81rem; color: var(--muted); line-height: 1.7; flex: 1; }
        .post-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 1rem; padding-top: .9rem; border-top: 1px solid var(--border); }
        .post-tags { display: flex; gap: 5px; flex-wrap: wrap; }
        .post-tag { padding: 2px 7px; border-radius: 4px; background: color-mix(in srgb, var(--accent) 10%, transparent); border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent); font-family: 'JetBrains Mono', monospace; font-size: .59rem; color: var(--accent); }
        .post-arrow { font-family: 'JetBrains Mono', monospace; font-size: .68rem; color: var(--accent); flex-shrink: 0; }

        .blog-empty { padding: 3.5rem 1rem; text-align: center; border: 1px solid var(--border); border-radius: 10px; color: var(--muted); }
        .blog-empty p { font-size: .875rem; }
        .blog-empty a { color: var(--accent); text-decoration: none; }

        @media (max-width: 768px) {
          .blog-hero { padding-top: 5.5rem; }
          .blog-headline { font-size: 1.75rem; }
          .posts-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="blog-page">
        <section>
          <div className="os-container blog-hero">
            <span className="os-label">// writing</span>
            <h1 className="blog-headline">Thinking out loud.<br />Writing it down.</h1>
            <p className="blog-sub">Engineering decisions, product lessons, AI workflows, and honest observations from building in public.</p>

            <div className="blog-filter">
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
                    {cat.toLowerCase()}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="posts-section">
          <div className="os-container">
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
                    <div className="post-card-body">
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
                        <span className="post-arrow">read →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
