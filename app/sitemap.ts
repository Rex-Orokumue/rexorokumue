import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BASE = 'https://rexorokumue.vercel.app';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // re-generate at most once per hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch published blog post slugs
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false });

  const blogRoutes: MetadataRoute.Sitemap = (posts ?? []).map(p => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.published_at),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [
    { url: BASE,                                                    lastModified: new Date(), changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${BASE}/about`,                                         lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${BASE}/projects`,                                      lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.9 },
    { url: `${BASE}/projects/zolarux-marketplace`,                  lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${BASE}/projects/zolarux-admin`,                        lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${BASE}/projects/edupanion`,                            lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${BASE}/projects/escrowpay-engine`,                     lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${BASE}/blog`,                                          lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.8 },
    { url: `${BASE}/build-logs`,                                    lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.7 },
    { url: `${BASE}/tech-serial`,                                   lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.6 },
    { url: `${BASE}/bootcamp`,                                      lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.7 },
    ...blogRoutes,
  ];
}