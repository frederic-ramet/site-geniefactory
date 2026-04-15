import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/lib/site';
import { getSeoFor, getFooter } from '@/lib/data';

export function generateMetadata(): Metadata {
  const seo = getSeoFor('aboutus');
  return { title: seo.title, description: seo.description };
}

const values = [
  {
    title: 'Proche du terrain',
    description:
      "Nos équipes ne quittent jamais longtemps le quotidien métier. Les décisions produit naissent au contact de vos utilisateurs.",
  },
  {
    title: 'Boucles courtes',
    description:
      "Moins de slides, plus de prototypes. Un prototype livré vaut toujours mieux qu'un document qui n'engage personne.",
  },
  {
    title: 'Conformité par défaut',
    description:
      "RBAC, traçabilité, AI Act — intégrés à chaque livrable, sans friction pour les équipes métier.",
  },
];

export default function AboutPage() {
  const seo = getSeoFor('aboutus');
  const footer = getFooter();
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title={seo.h1 ?? seo.title}
        description={seo.description}
      />
      <Section
        title="Nos convictions"
        subtitle="Comment on travaille, au quotidien."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="card">
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">
                {v.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Là où nous trouver"
        subtitle="Une adresse, une porte ouverte."
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="card">
            <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">
              Bureaux
            </h3>
            <address className="mt-3 not-italic text-ink-700">
              {footer.address.street}
              <br />
              {footer.address.postalCode} {footer.address.city}
              <br />
              {footer.address.country}
            </address>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary"
              >
                Demander une démo
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="btn-secondary"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
          <PlaceholderImage
            label="Nos locaux"
            aspect="wide"
            tone="ink"
            className="h-full"
          />
        </div>
      </Section>
    </>
  );
}
