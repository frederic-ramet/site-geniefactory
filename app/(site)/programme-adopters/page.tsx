import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/lib/site';
import { getSeoFor } from '@/lib/data';

export function generateMetadata(): Metadata {
  const seo = getSeoFor('programme-adopters');
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/programme-adopters' },
  };
}

const perks = [
  {
    title: 'Accompagnement rapproché',
    description:
      "Un référent Genie Factory dédié tout au long du programme : cadrage, mise en production, itérations.",
  },
  {
    title: 'Tarifs early adopter',
    description:
      "Conditions commerciales préférentielles pour les 10 premières PME et ETI rejoignant le programme.",
  },
  {
    title: "Co-construction de la roadmap",
    description:
      "Vos cas d'usage orientent les prochaines briques métier — vous influencez la plateforme.",
  },
  {
    title: "Visibilité partagée",
    description:
      "Étude de cas publique co-signée (si vous le souhaitez) et participation à notre communauté adopters.",
  },
];

const criteria = [
  "PME ou ETI avec au moins un cas d'usage identifié",
  "Référent métier et référent IT mobilisés",
  "Données et processus documentés ou documentables",
  "Volonté d'industrialiser, pas seulement d'expérimenter",
];

export default function ProgrammeAdoptersPage() {
  const seo = getSeoFor('programme-adopters');
  return (
    <>
      <PageHeader
        eyebrow="Programme"
        title={seo.h1 ?? seo.title}
        description={seo.description}
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={siteConfig.demoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary"
          >
            Candidater au programme
          </Link>
          <Link href="#criteres" className="btn-secondary">
            Critères d'éligibilité
          </Link>
        </div>
      </PageHeader>

      <Section
        title="Ce que vous recevez"
        subtitle="Un programme conçu pour maximiser vos chances de succès — et nourrir notre roadmap produit."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {perks.map((perk) => (
            <div key={perk.title} className="card card-hover">
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">
                {perk.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="criteres"
        title="Qui peut rejoindre le programme ?"
        subtitle="Les 4 critères que nous regardons lors de la candidature."
      >
        <ul className="mx-auto max-w-2xl space-y-3">
          {criteria.map((c) => (
            <li
              key={c}
              className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white p-4 shadow-soft"
            >
              <span
                aria-hidden
                className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-semibold text-white"
              >
                ✓
              </span>
              <span className="text-ink-700">{c}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link
            href={siteConfig.demoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary"
          >
            Candidater
          </Link>
        </div>
      </Section>
    </>
  );
}
