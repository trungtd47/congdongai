import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

export const dynamic = 'force-static';
import { getAllPostSlugs } from '@/lib/posts';
import { demoPosts } from '@/lib/demo-data';
import { batDauItems, huongDanItems } from '@/lib/content';
import { caseStudies } from '@/lib/case-studies';

const staticRoutes = [
  '',
  'bat-dau',
  'huong-dan',
  'thu-vien',
  'hoi-dap',
  'blog',
  'cau-chuyen',
  'lo-trinh',
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

  const batDau = batDauItems.map((item) => ({
    url: `${siteConfig.url}/bat-dau/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const huongDan = huongDanItems.map((item) => ({
    url: `${siteConfig.url}/huong-dan/${item.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const blog = getAllPostSlugs().map((slug) => ({
    url: `${siteConfig.url}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const cauChuyen = caseStudies.map((c) => ({
    url: `${siteConfig.url}/cau-chuyen/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const qa = demoPosts.map((p) => ({
    url: `${siteConfig.url}/hoi-dap/${p.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...base, ...batDau, ...huongDan, ...blog, ...cauChuyen, ...qa];
}
