import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { BlogCard } from '@/components/ui/BlogCard';
import { getBlogPosts } from '@/lib/content';

export function BlogPreview() {
  const posts = getBlogPosts().slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <Section
      eyebrow="Blog"
      title="À lire pour aller plus loin"
      subtitle="Méthode, terrain, conformité — ce que nous apprenons à industrialiser l'IA avec nos clients."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <Link href="/blog" className="btn-secondary">
          Tous les articles
        </Link>
      </div>
    </Section>
  );
}
