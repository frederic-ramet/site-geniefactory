import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { useCases as curatedUseCases } from '@/lib/use-cases';
import { getUseCases } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Portfolio — Cas d\'usages clients',
  description:
    "Sélection de cas d'usage Genie Factory en production chez nos clients industriels, financiers et services.",
};

export default function PortfolioPage() {
  const mdxUseCases = getUseCases();
  const mdxSlugs = new Set(mdxUseCases.map((u) => u.slug));

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Cas d'usage en production"
        description="Une sélection de déploiements réussis — industrie, finance, services publics. Chaque cas couvre le contexte, l'approche et les résultats mesurés."
      />
      <section className="container py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mdxUseCases.map((u) => (
            <Link
              key={u.slug}
              href={`/use-cases/${u.slug}`}
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
          {curatedUseCases
            .filter((u) => !mdxSlugs.has(u.slug))
            .map((u) => (
              <Link
                key={u.slug}
                href={`/use-cases/${u.slug}`}
                className="card card-hover group flex flex-col gap-4"
              >
                <PlaceholderImage label={u.client} className="rounded-xl" />
                <div>
                  <div className="flex items-center justify-between text-xs uppercase tracking-widest text-ink-400">
                    <span>{u.category}</span>
                    <span>{u.client}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink-900 group-hover:text-brand-700">
                    {u.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-600">
                    {u.excerpt}
                  </p>
                  <span className="mt-2 inline-block text-xs font-medium text-ink-400">
                    Fiche détaillée à venir
                  </span>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
