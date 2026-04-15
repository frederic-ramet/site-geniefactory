import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate, getUseCase, getUseCases } from '@/lib/content';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { JsonLd } from '@/components/ui/JsonLd';
import { articleSchemaForUseCase } from '@/lib/schema';

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  return getUseCases().map((u) => ({ slug: u.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const uc = getUseCase(params.slug);
  if (!uc) return {};
  return {
    title: uc.frontmatter.title,
    description: uc.frontmatter.description,
    alternates: { canonical: `/use-cases/${uc.slug}` },
  };
}

export default function UseCasePage({ params }: Params) {
  const uc = getUseCase(params.slug);
  if (!uc) notFound();
  const { title, description, client, category, date, updated, image } =
    uc.frontmatter;

  return (
    <article className="pb-20">
      <header className="border-b border-ink-100 bg-gradient-to-b from-brand-50/40 to-white">
        <div className="container py-12 sm:py-16">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink-600 hover:text-ink-900"
          >
            ← Tous les cas d'usage
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-ink-500">
            <span>{client}</span>
            <span aria-hidden>·</span>
            <span>{category}</span>
            <span aria-hidden>·</span>
            <time dateTime={date}>{formatDate(date)}</time>
            {updated && updated !== date && (
              <>
                <span aria-hidden>·</span>
                <span>mis à jour le {formatDate(updated)}</span>
              </>
            )}
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
            <PlaceholderImage label={client} className="shadow-soft" />
          )}
          <div className="mdx mt-10">
            <MDXRemote source={uc.body} />
          </div>
        </div>
      </div>
      <JsonLd data={articleSchemaForUseCase(uc.slug, uc.frontmatter)} />
    </article>
  );
}
