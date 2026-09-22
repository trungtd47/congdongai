import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';
import { getAllPostSlugs } from '@/lib/posts';
import { demoPosts } from '@/lib/demo-data';

const staticRoutes = [
  '',
  'bat-dau',
  'huong-dan',
  'thu-vien',
  'hoi-dap',
  'blog',
  'terms',
  'quy-tac-cong-dong',
  'privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const base = staticRoutes.map((path) => ({
    url: `${siteConfig.url}/${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  const blog = getAllPostSlugs().map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const qa = demoPosts.map((p) => ({
    url: `${siteConfig.url}/hoi-dap/${p.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...base, ...blog, ...qa];
}
