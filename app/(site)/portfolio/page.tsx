import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { JsonLd } from '@/components/ui/JsonLd';
import { getUseCases } from '@/lib/content';
import { getSeoFor } from '@/lib/data';
import { collectionPageSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

export function generateMetadata(): Metadata {
  const seo = getSeoFor('portfolio');
  return { title: seo.title, description: seo.description };
}

export default function PortfolioPage() {
  const seo = getSeoFor('portfolio');
  const useCases = getUseCases();

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={seo.h1 ?? seo.title}
        description={seo.description}
      />
      <section className="container py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <Link
              key={u.slug}
              href={`/cas-clients/${u.slug}`}
              className="card card-hover group flex flex-col gap-4"
            >
              {u.frontmatter.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={u.frontmatter.image}
                  alt=""
                  className="aspect-video w-full rounded-xl object-cover"
                  loading="lazy"
                />
              ) : (
                <PlaceholderImage
                  label={u.frontmatter.client}
                  className="rounded-xl"
                />
              )}
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-ink-400">
                  <span>{u.frontmatter.category}</span>
                  <span>{u.frontmatter.client}</span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink-900 group-hover:text-brand-700">
                  {u.frontmatter.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-ink-600">
                  {u.frontmatter.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <JsonLd
        data={collectionPageSchema(
          seo.h1 ?? seo.title,
          seo.description,
          `${siteConfig.url}/portfolio`,
        )}
      />
    </>
  );
}
