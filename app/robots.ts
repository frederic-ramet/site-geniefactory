import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

/**
 * robots.txt — generic rule plus explicit allow-list for LLM crawlers.
 * Being crawled by these bots is a prerequisite for being cited by the
 * corresponding generative engines (GEO strategy — spec §5.4 / §6).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
