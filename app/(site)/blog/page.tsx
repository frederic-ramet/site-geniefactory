import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { BlogCard } from '@/components/ui/BlogCard';
import { JsonLd } from '@/components/ui/JsonLd';
import { getBlogPosts } from '@/lib/content';
import { getSeoFor } from '@/lib/data';
import { collectionPageSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

export function generateMetadata(): Metadata {
  const seo = getSeoFor('blog');
  return { title: seo.title, description: seo.description };
}

export default function BlogIndexPage() {
  const seo = getSeoFor('blog');
  const posts = getBlogPosts();
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={seo.h1 ?? seo.title}
        description={seo.description}
      />
      <section className="container py-16 sm:py-20">
        {posts.length === 0 ? (
          <p className="text-ink-600">
            Les premiers articles arrivent bientôt — revenez nous voir.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
      <JsonLd
        data={collectionPageSchema(
          seo.h1 ?? seo.title,
          seo.description,
          `${siteConfig.url}/blog`,
        )}
      />
    </>
  );
}
