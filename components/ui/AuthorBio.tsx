import type { Author } from '@/lib/content';

/**
 * E-E-A-T author card — rendered at the bottom of articles.
 * Signals authorship + expertise to search engines and LLM crawlers.
 */
export function AuthorBio({ author }: { author: Author }) {
  return (
    <aside className="mt-12 rounded-2xl border border-ink-100 bg-ink-50/40 p-6">
      <div className="flex items-start gap-4">
        {author.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={author.photo}
            alt=""
            className="h-14 w-14 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div
            aria-hidden
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-100 to-ink-100 font-display text-sm font-semibold text-ink-700"
          >
            {author.name
              .split(' ')
              .map((p) => p[0])
              .join('')
              .slice(0, 2)}
          </div>
        )}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-ink-400">
            Auteur
          </p>
          <p className="mt-1 font-display text-lg font-semibold text-ink-900">
            {author.name}
          </p>
          {author.role && (
            <p className="text-sm text-ink-600">{author.role}</p>
          )}
          {author.bio && (
            <p className="mt-3 text-sm leading-relaxed text-ink-700">
              {author.bio}
            </p>
          )}
          {author.linkedin && (
            <a
              href={author.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              LinkedIn →
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
