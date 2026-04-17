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
  const seo = getSeoFor('finance-comptabilite');
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/solutions/finance-comptabilite' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url: `${siteConfig.url}/solutions/finance-comptabilite`,
      images: seo.og_image ? [seo.og_image] : undefined,
    },
  };
}

const useCases = [
  {
    title: 'Rapprochement bancaire',
    description:
      "L'agent rapproche automatiquement les mouvements bancaires et les écritures comptables, détecte les écarts, pré-qualifie les non-rapprochés. Gain typique : 40 à 70%.",
  },
  {
    title: 'Extraction et saisie factures',
    description:
      "OCR intelligent des factures fournisseurs, extraction des données structurées (dates, montants, TVA, ventilations), import direct dans le logiciel comptable.",
  },
  {
    title: 'Préparation TVA',
    description:
      "Agrégation des écritures, contrôle de cohérence, préparation du préremplissage CA3 ou CA12. Le comptable valide.",
  },
  {
    title: 'Qualification d\'écritures',
    description:
      "Classification automatique des écritures non ventilées selon les règles du cabinet, apprentissage progressif sur vos habitudes.",
  },
  {
    title: 'Relances clients',
    description:
      "Suivi des échéances, génération de relances contextualisées, hiérarchisation selon le risque. Le chargé de compte valide et envoie.",
  },
  {
    title: "Assistant métier comptable",
    description:
      "Réponse aux questions récurrentes, préparation de synthèses clients, rédaction de premiers jets de lettres de mission.",
  },
];

const steps = [
  {
    name: 'Cadrage du processus prioritaire',
    text: "Choix d'un processus à volume et règles claires (rapprochement bancaire est souvent le meilleur candidat), accès au logiciel comptable.",
  },
  {
    name: "Construction du Knowledge Graph du cabinet",
    text: "Encodage des règles métier : plan comptable, ventilations habituelles, codes TVA, cas particuliers clients.",
  },
  {
    name: 'Industrialisation avec les comptables',
    text: "Développement itératif avec les utilisateurs, tests sur données anonymisées, ajustement des règles sur cas réels.",
  },
  {
    name: 'Mise en production supervisée',
    text: "Déploiement progressif, validation humaine systématique sur les premiers cycles, ajustement du niveau d'autonomie.",
  },
  {
    name: 'Documentation AI Act et formation',
    text: "Livraison de la fiche système, logs d'audit, et formation des équipes — usage, limites, cas d'escalade.",
  },
];

export default function FinanceComptabilitePage() {
  const seo = getSeoFor('finance-comptabilite');
  const faq = getFaqFile('finance-comptabilite-faq.yml');

  return (
    <>
      <PageHeader
        eyebrow="Finance & Comptabilité"
        title={seo.h1 ?? seo.title}
        description="GenieFactory industrialise des agents IA pour cabinets comptables et directions financières — rapprochement bancaire, extraction de factures, TVA, qualification d'écritures. Gouvernance AI Act intégrée, secret professionnel préservé, propriété des actifs chez le cabinet."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={siteConfig.demoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary"
          >
            Discuter de votre projet comptable
          </Link>
          <Link
            href="/cas-clients/actheos-rapprochement-transactions"
            className="btn-secondary"
          >
            Voir le cas Actheos
          </Link>
        </div>
      </PageHeader>

      <Section
        eyebrow="Cas d'usage"
        title="Agents IA pour la finance-comptabilité"
        subtitle="Six processus à volume où un agent IA métier libère du temps — sans toucher à la responsabilité de l'expert-comptable."
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
        title="Cas client : Actheos — rapprochement bancaire automatisé"
        subtitle="Un cabinet qui industrialise un agent IA sur un processus à volume."
      >
        <div className="card">
          <p className="text-base leading-relaxed text-ink-700">
            Actheos a déployé avec GenieFactory un agent IA pour automatiser le
            rapprochement des transactions bancaires et qualifier les écritures.
            L'agent traite les cas standards en autonomie supervisée, le
            comptable arbitre les cas limites. Résultat : un gain de temps
            significatif redéployé vers le conseil client à forte valeur.
          </p>
          <Link
            href="/cas-clients/actheos-rapprochement-transactions"
            className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-coral-600"
          >
            Lire le cas complet →
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Méthode"
        title="Comment industrialiser un agent IA dans votre cabinet ?"
        subtitle="Framework ICPC appliqué à la comptabilité : 5 étapes en 6 à 10 semaines."
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
        eyebrow="Intégrations"
        title="Connecté à votre logiciel comptable"
        subtitle="L'agent s'intègre aux outils du marché sans les remplacer."
      >
        <div className="card">
          <p className="text-base leading-relaxed text-ink-700">
            Connecteurs disponibles pour les principaux logiciels du marché :
            Sage, Cegid, Pennylane, Agiris, Quadratus, Coala, EBP. L'agent lit
            et écrit via API ou imports/exports standards, sans casser les
            workflows du cabinet. Les extensions spécifiques à votre
            organisation sont développées avec vous pendant la phase
            d'industrialisation.
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Gouvernance"
        title="Confidentialité, conformité et propriété"
        subtitle="Ce qui distingue un agent comptable industrialisé d'un outil grand public."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <div className="card">
            <h3 className="font-display text-base font-semibold text-ink-900">
              Secret professionnel
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Déploiement sur votre cloud ou on-premise, aucune donnée client
              transmise à des tiers, RBAC fin par dossier ou par client.
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
              Propriété du cabinet
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Code applicatif, paramétrage, Knowledge Graph : tout appartient
              au cabinet, livré dans votre infrastructure. Aucun lock-in.
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
