import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://rexorokumue.vercel.app',                    lastModified: new Date(), changeFrequency: 'monthly',  priority: 1.0  },
    { url: 'https://rexorokumue.vercel.app/about',              lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.8  },
    { url: 'https://rexorokumue.vercel.app/projects',           lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.9  },
    { url: 'https://rexorokumue.vercel.app/projects/zolarux-marketplace', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://rexorokumue.vercel.app/projects/zolarux-admin',       lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://rexorokumue.vercel.app/projects/edupanion',           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://rexorokumue.vercel.app/projects/escrowpay-engine',    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: 'https://rexorokumue.vercel.app/blog',               lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.8  },
    { url: 'https://rexorokumue.vercel.app/build-logs',         lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.7  },
    { url: 'https://rexorokumue.vercel.app/tech-serial',        lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.6  },
    { url: 'https://rexorokumue.vercel.app/bootcamp',           lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.7  },
  ];
}