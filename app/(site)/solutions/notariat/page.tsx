import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { FAQ } from '@/components/sections/FAQ';
import { JsonLd } from '@/components/ui/JsonLd';
import { getSeoFor, getFaqFile } from '@/lib/data';
import { faqPageSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';

export function generateMetadata(): Metadata {
  const seo = getSeoFor('notariat');
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/solutions/notariat' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url: `${siteConfig.url}/solutions/notariat`,
      images: seo.og_image ? [seo.og_image] : undefined,
    },
  };
}

const useCases = [
  {
    title: "Qualification d'actes",
    description:
      "L'agent lit les actes entrants, identifie leur nature, extrait les parties et les pièces attendues, alerte sur les pièces manquantes.",
  },
  {
    title: 'Extraction documentaire',
    description:
      "Pièces d'identité, titres de propriété, actes authentiques : extraction des données structurées avec niveau de confiance, prête à importer dans le logiciel notarial.",
  },
  {
    title: 'Rapprochement CARPA',
    description:
      "Rapprochement automatisé des mouvements bancaires avec les dossiers clients, alerte sur les écarts, préparation des relances.",
  },
  {
    title: 'Assistance aux clercs',
    description:
      "L'agent propose les premiers jets, prépare les tableaux, répond aux questions récurrentes — le clerc arbitre et valide.",
  },
];

const steps = [
  {
    name: 'Cadrage du périmètre',
    text: "Choix du processus notarial prioritaire, accès au logiciel (Genapi, Fiducial, iNot), identification des pièces sources et des règles métier.",
  },
  {
    name: 'Construction du Knowledge Graph notarial',
    text: "Encodage de la connaissance métier : types d'actes, pièces attendues, règles de qualification, points d'attention juridique.",
  },
  {
    name: 'Industrialisation avec les clercs',
    text: "Développement itératif avec les clercs utilisateurs. Tests en conditions réelles sur dossiers anonymisés, ajustement des règles.",
  },
  {
    name: 'Mise en production supervisée',
    text: "Déploiement progressif, supervision humaine systématique sur les premiers dossiers, ajustement du niveau de validation.",
  },
  {
    name: 'Documentation AI Act et formation',
    text: "Livraison de la fiche système AI Act, des logs d'audit, et formation des clercs à l'usage, aux limites et aux cas d'escalade.",
  },
];

export default function NotariatPage() {
  const seo = getSeoFor('notariat');
  const faq = getFaqFile('notariat-faq.yml');

  return (
    <>
      <PageHeader
        eyebrow="Notariat"
        title={seo.h1 ?? seo.title}
        description="GenieFactory industrialise des agents IA pour les études notariales — qualification d'actes, extraction documentaire, rapprochement CARPA, assistance aux clercs. Avec gouvernance AI Act intégrée et propriété des actifs chez l'étude."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={siteConfig.demoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary"
          >
            Discuter de votre projet notarial
          </Link>
          <Link
            href="/cas-clients/marianne-notaires-caen"
            className="btn-secondary"
          >
            Voir le cas Marianne Notaires
          </Link>
        </div>
      </PageHeader>

      <Section
        eyebrow="Cas d'usage"
        title="Agents IA pour le notariat"
        subtitle="Quatre processus notariaux où un agent IA métier libère du temps sans toucher à la responsabilité juridique du notaire."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {useCases.map((u) => (
            <div key={u.title} className="card card-hover">
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">
                {u.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {u.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Preuve terrain"
        title="Cas client : Marianne Notaires (Caen)"
        subtitle="Une étude qui industrialise un agent IA métier sur ses processus documentaires."
      >
        <div className="card">
          <p className="text-base leading-relaxed text-ink-700">
            L'étude Marianne Notaires, à Caen, a déployé un agent IA métier avec
            GenieFactory pour assister ses clercs sur la qualification d'actes
            et l'extraction de pièces. L'agent lit les documents entrants, en
            extrait les données structurées et prépare les dossiers, permettant
            aux clercs de se concentrer sur la valeur juridique ajoutée.
          </p>
          <Link
            href="/cas-clients/marianne-notaires-caen"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-coral-600"
          >
            Lire le cas complet →
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Méthode"
        title="Comment industrialiser un agent IA dans votre étude ?"
        subtitle="Le framework ICPC appliqué au notariat : 5 étapes en 8 à 12 semaines."
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {steps.map((s, i) => (
            <li key={s.name} className="card">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-xs font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="font-display text-base font-semibold text-ink-900">
                  {s.name}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {s.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="Gouvernance"
        title="Conformité, confidentialité et propriété"
        subtitle="Ce qui distingue un agent IA industrialisé d'un outil générique."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <div className="card">
            <h3 className="font-display text-base font-semibold text-ink-900">
              Confidentialité des données
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Déploiement sur votre cloud ou on-premise, aucune donnée client
              transmise à des tiers, RBAC par dossier, logs d'audit horodatés.
            </p>
          </div>
          <div className="card">
            <h3 className="font-display text-base font-semibold text-ink-900">
              Conformité AI Act
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Fiche système, traçabilité des décisions, supervision humaine
              configurable, documentation exportable pour audit.
            </p>
          </div>
          <div className="card">
            <h3 className="font-display text-base font-semibold text-ink-900">
              Propriété de l'étude
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Code applicatif, paramétrage, Knowledge Graph : tout appartient à
              l'étude, livré dans votre infrastructure. Aucun lock-in.
            </p>
          </div>
        </div>
      </Section>

      <div id="faq">
        <FAQ items={faq} />
      </div>

      <JsonLd data={faqPageSchema(faq)} />
    </>
  );
}
