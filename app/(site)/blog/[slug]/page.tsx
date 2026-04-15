import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate, getBlogPost, getBlogPosts } from '@/lib/content';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return getBlogPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      images: post.frontmatter.image ? [post.frontmatter.image] : undefined,
    },
  };
}

export default function BlogPostPage({ params }: Params) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();
  const { title, description, date, category, image, author } = post.frontmatter;

  return (
    <article className="pb-20">
      <header className="border-b border-ink-100 bg-gradient-to-b from-brand-50/40 to-white">
        <div className="container py-12 sm:py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-600 hover:text-ink-900"
          >
            ← Tous les articles
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-widest text-ink-500">
            {category && <span>{category}</span>}
            {category && <span aria-hidden>·</span>}
            <time dateTime={date}>{formatDate(date)}</time>
            {author && <span aria-hidden>·</span>}
            {author && <span>{author}</span>}
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-ink-600">{description}</p>
        </div>
      </header>

      <div className="container grid gap-10 pt-12 lg:grid-cols-[minmax(0,720px)_1fr]">
        <div>
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              className="aspect-video w-full rounded-2xl object-cover shadow-soft"
            />
          ) : (
            <PlaceholderImage
              label={category ?? 'Article'}
              className="shadow-soft"
            />
          )}
          <div className="mdx mt-10">
            <MDXRemote source={post.body} />
          </div>
        </div>
      </div>
    </article>
  );
}
