import type { MetadataRoute } from 'next';
import { getBlogPosts, getUseCases } from '@/lib/content';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/aboutus`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/solutions/gouvernance-ia`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/transformation-agentique`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/solutions/notariat`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/solutions/finance-comptabilite`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/solutions/claude-entreprise`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/programme-adopters`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getBlogPosts().map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.updated ?? p.frontmatter.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const useCaseRoutes: MetadataRoute.Sitemap = getUseCases().map((u) => ({
    url: `${base}/cas-clients/${u.slug}`,
    lastModified: new Date(u.frontmatter.updated ?? u.frontmatter.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...useCaseRoutes];
}
