import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/PageHeader';
import { BlogCard } from '@/components/ui/BlogCard';
import { getBlogPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    "Méthode, retours terrain et analyses sur l'industrialisation de l'IA dans l'entreprise.",
};

export default function BlogIndexPage() {
  const posts = getBlogPosts();
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Industrialiser l'IA, en pratique"
        description="Des articles courts et opérationnels issus de notre travail avec nos clients."
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
    </>
  );
}
