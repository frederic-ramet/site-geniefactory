import Link from 'next/link';
import { PlaceholderImage } from './PlaceholderImage';
import type { BlogFrontmatter, ContentEntry } from '@/lib/content';
import { formatDate } from '@/lib/content';

export function BlogCard({ post }: { post: ContentEntry<BlogFrontmatter> }) {
  const { title, description, date, category, image } = post.frontmatter;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group card card-hover flex flex-col gap-4"
    >
      {image ? (
        <div className="relative overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt=""
            className="aspect-video w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <PlaceholderImage label={category ?? 'Article'} className="rounded-xl" />
      )}
      <div>
        <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-ink-400">
          {category && <span>{category}</span>}
          {category && <span aria-hidden>·</span>}
          <time dateTime={date}>{formatDate(date)}</time>
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink-900 group-hover:text-brand-700">
          {title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-ink-600">{description}</p>
      </div>
    </Link>
  );
}
