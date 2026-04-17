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
  const seo = getSeoFor('transformation-agentique');
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/transformation-agentique' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url: `${siteConfig.url}/transformation-agentique`,
      images: seo.og_image ? [seo.og_image] : undefined,
    },
  };
}

const pillars = [
  {
    title: 'Réorganiser les processus',
    description:
      "Passer de la tâche isolée à la chaîne complète : les agents IA prennent en charge des bouts de processus entiers, sous supervision humaine.",
  },
  {
    title: 'Industrialiser en production',
    description:
      "Pas de POC isolé : chaque agent est déployé en conditions réelles, intégré au SI, monitoré et gouverné dès le départ.",
  },
  {
    title: 'Capitaliser la connaissance',
    description:
      "Chaque projet enrichit un Knowledge Graph propriétaire — la mémoire organisationnelle de l'entreprise. Le projet suivant ne repart pas de zéro.",
  },
  {
    title: 'Garder la propriété',
    description:
      "Le code applicatif, les données et les modèles appartiennent au client. Livrés dans votre dépôt, déployables sur votre infrastructure. Aucun lock-in.",
  },
];

const icpcSteps = [
  {
    letter: 'I',
    name: 'Identifier',
    text: "Cartographier les cas d'usage, scorer chaque opportunité sur deux axes : valeur métier et faisabilité. Livrable : un portefeuille priorisé avec un ROI formulé en une phrase.",
  },
  {
    letter: 'C',
    name: 'Cadrer',
    text: "Aligner métier, tech et direction sur le même périmètre. C'est la phase que tout le monde saute — et la cause n°1 d'échec (71% des projets IT). Livrable : spécifications validées par les trois parties.",
  },
  {
    letter: 'P',
    name: 'Produire',
    text: "Construire et déployer en conditions réelles. Pas en labo, pas en démo. Les systèmes avec validation humaine intégrée ont 4 fois moins d'incidents critiques. Livrable : une application en production, adoptée.",
  },
  {
    letter: 'C',
    name: 'Capitaliser',
    text: "L'étape que personne ne fait. Chaque projet produit de la connaissance encodée dans le Knowledge Graph. Le projet suivant ne repart pas de zéro.",
  },
];

const differences = [
  ['Objectif', 'Outiller les humains', "Réorganiser l'entreprise"],
  ['Rôle de l\'IA', 'Outil ponctuel', "Membre de l'organisation"],
  ['Périmètre', 'Tâche isolée', 'Chaîne complète'],
  ['Expert métier', "Utilisateur de l'outil", 'Au centre, validateur'],
  ['Capitalisation', "Rien — on repart de zéro", 'Knowledge Graph durable'],
  ['Propriété', 'Chez le prestataire', 'Chez le client'],
] as const;

const proofs = [
  {
    sector: 'Notariat',
    client: 'Marianne Notaires',
    outcome: "Qualification d'actes automatisée, gain de temps sur les recherches documentaires.",
    href: '/cas-clients/marianne-notaires-caen',
  },
  {
    sector: 'Comptabilité',
    client: 'Actheos',
    outcome: "Rapprochement bancaire automatisé, traitement d'écritures, préparation TVA accélérée.",
    href: '/cas-clients/actheos-rapprochement-transactions',
  },
  {
    sector: 'Immobilier',
    client: 'Spirit Immo',
    outcome: "Extraction OCR de factures fournisseurs, intégration ERP, traçabilité.",
    href: '/cas-clients/spirit-immo-automatisation-factures',
  },
  {
    sector: 'Secteur associatif',
    client: 'Croix-Rouge française',
    outcome: "Hackathon IA, 6 prototypes métier conçus et testés, 2 passés en production.",
    href: '/cas-clients/croix-rouge',
  },
];

export default function TransformationAgentiquePage() {
  const seo = getSeoFor('transformation-agentique');
  const faq = getFaqFile('transformation-agentique-faq.yml');

  return (
    <>
      <PageHeader
        eyebrow="Transformation agentique"
        title={seo.h1 ?? seo.title}
        description="La transformation agentique réorganise les processus, les métiers et la gouvernance de votre entreprise par des agents IA autonomes — avec l'humain au contrôle et la propriété des actifs chez vous."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={siteConfig.demoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary"
          >
            Discuter de votre transformation
          </Link>
          <Link href="/blog/transformation-agentique" className="btn-secondary">
            Lire l'article pilier
          </Link>
        </div>
      </PageHeader>

      <Section
        eyebrow="4 piliers"
        title="Les 4 piliers d'une transformation agentique"
        subtitle="Ce qui la distingue d'une énième adoption d'outils IA."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="card card-hover">
              <h3 className="font-display text-lg font-semibold tracking-tight text-ink-900">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Méthode"
        title="Le framework ICPC — Identifier, Cadrer, Produire, Capitaliser"
        subtitle="La méthode GenieFactory pour industrialiser une transformation agentique projet par projet."
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {icpcSteps.map((step, i) => (
            <li key={step.name + i} className="card">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-sm font-semibold text-white">
                  {step.letter}
                </span>
                <h3 className="font-display text-base font-semibold text-ink-900">
                  {step.name}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-600">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        eyebrow="Comparaison"
        title="Transformation digitale vs transformation agentique"
        subtitle="Ce n'est pas la même nature de projet. Ni les mêmes livrables."
      >
        <div className="overflow-x-auto rounded-2xl border border-ink-100 bg-white shadow-soft">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-left font-display text-ink-900">
              <tr>
                <th className="px-5 py-4 font-semibold">Dimension</th>
                <th className="px-5 py-4 font-semibold">Transformation digitale</th>
                <th className="px-5 py-4 font-semibold">Transformation agentique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100 text-ink-700">
              {differences.map(([dim, digi, agent]) => (
                <tr key={dim}>
                  <td className="px-5 py-4 font-semibold text-ink-900">{dim}</td>
                  <td className="px-5 py-4">{digi}</td>
                  <td className="px-5 py-4">{agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        eyebrow="Cas clients"
        title="La transformation agentique en production"
        subtitle="Des agents IA déployés dans des processus métier réels, par secteur."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {proofs.map((p) => (
            <Link
              key={p.client}
              href={p.href}
              className="card card-hover block"
            >
              <span className="eyebrow">{p.sector}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink-900">
                {p.client}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {p.outcome}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-coral-600">
                Voir le cas →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Pour aller plus loin"
        title="Ressources sur la transformation agentique"
        subtitle="Articles piliers pour comprendre la méthode et l'exécuter."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/blog/transformation-agentique"
            className="card card-hover block"
          >
            <h3 className="font-display text-base font-semibold text-ink-900">
              Qu'est-ce que la transformation agentique ?
            </h3>
            <p className="mt-2 text-sm text-ink-600">
              L'article pilier : définition, différences avec la transformation digitale, framework ICPC, Knowledge Graph.
            </p>
          </Link>
          <Link
            href="/blog/passer-poc-ia-production"
            className="card card-hover block"
          >
            <h3 className="font-display text-base font-semibold text-ink-900">
              Passer d'un POC IA à la production
            </h3>
            <p className="mt-2 text-sm text-ink-600">
              Les 5 raisons d'échec d'un POC et la méthode pour industrialiser un agent IA métier.
            </p>
          </Link>
          <Link
            href="/blog/conformite-ai-act-2026"
            className="card card-hover block"
          >
            <h3 className="font-display text-base font-semibold text-ink-900">
              Conformité AI Act en 2026
            </h3>
            <p className="mt-2 text-sm text-ink-600">
              Obligations, documentation, gouvernance : ce que les PME et ETI doivent concrètement faire.
            </p>
          </Link>
        </div>
      </Section>

      <div id="faq">
        <FAQ items={faq} />
      </div>

      <JsonLd data={faqPageSchema(faq)} />
    </>
  );
}
