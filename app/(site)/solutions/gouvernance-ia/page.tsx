import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { Section } from '@/components/ui/Section';
import { FAQ } from '@/components/sections/FAQ';
import { JsonLd } from '@/components/ui/JsonLd';
import { getSeoFor, getFaqFile } from '@/lib/data';
import { faqPageSchema, howToSchema } from '@/lib/schema';
import { siteConfig } from '@/lib/site';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

export function generateMetadata(): Metadata {
  const seo = getSeoFor('gouvernance-ia');
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/solutions/gouvernance-ia' },
  };
}

// HowTo steps — 5 étapes pour mettre en conformité un cas d'usage IA.
const howToSteps = [
  {
    name: 'Classifier le niveau de risque AI Act',
    text: "Catégoriser le cas d'usage selon les 4 niveaux de risque de l'AI Act pour déterminer les obligations applicables.",
  },
  {
    name: 'Documenter les spécifications et la méthode',
    text: "Produire la spec fonctionnelle, les jeux de tests et la méthode d'évaluation — l'Établi le fait nativement.",
  },
  {
    name: 'Activer le RBAC et le SSO',
    text: "Définir les rôles, permissions et intégrer l'authentification (SAML/OIDC) avant déploiement.",
  },
  {
    name: 'Déployer avec traçabilité et journalisation',
    text: "Chaque exécution d'agent produit un journal structuré, consultable et exportable pour audit.",
  },
  {
    name: 'Superviser et auditer en continu',
    text: 'Tableau de bord par cas d\'usage, revue périodique, plan de remédiation documenté.',
  },
];

const pillars = [
  {
    title: 'Traçabilité',
    description:
      "Journal structuré de chaque exécution d'agent : prompts, outils appelés, documents récupérés, décisions. Exportable pour audit.",
  },
  {
    title: 'RBAC + SSO',
    description:
      "Rôles et permissions par cas d'usage, propagés à tous les composants. SSO SAML / OIDC standard.",
  },
  {
    title: 'Conformité AI Act',
    description:
      "Classification par niveau de risque, documentation produite à chaque itération, contrôles intégrés.",
  },
  {
    title: 'Propriété du code',
    description:
      "Le code généré vous appartient, livré dans votre dépôt. Aucun lock-in — vous gardez la main sur vos actifs.",
  },
];

export default function GouvernanceIaPage() {
  const seo = getSeoFor('gouvernance-ia');
  const faq = getFaqFile('gouvernance-faq.yml');

  return (
    <>
      <PageHeader
        eyebrow="Solution"
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
            Demander une démo gouvernance
          </Link>
          <Link href="#faq" className="btn-secondary">
            FAQ AI Act
          </Link>
        </div>
      </PageHeader>

      <Section
        title="Les 4 piliers de la gouvernance GenieFactory"
        subtitle="Tout ce dont votre DSI et votre DPO ont besoin — intégré nativement à la plateforme."
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
        title="Comment mettre en conformité un cas d'usage IA ?"
        subtitle="Les 5 étapes que la plateforme exécute avec vous — sans quitter votre environnement."
      >
        <ol className="grid gap-4 md:grid-cols-2">
          {howToSteps.map((step, i) => (
            <li key={step.name} className="card">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-xs font-semibold text-white">
                  {i + 1}
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
        title="Journalisation agent — exemple"
        subtitle="Chaque décision est traçable, par cas d'usage."
      >
        <div className="mx-auto max-w-3xl">
          <PlaceholderImage
            label="Journal d'audit — agents IA"
            aspect="wide"
            tone="ink"
          />
        </div>
      </Section>

      <div id="faq">
        <FAQ items={faq} />
      </div>

      <JsonLd data={faqPageSchema(faq)} />
      <JsonLd
        data={howToSchema(
          "Mettre en conformité AI Act un cas d'usage IA métier",
          "Méthode en 5 étapes pour déployer un agent IA conforme à l'AI Act avec GenieFactory.",
          howToSteps,
        )}
      />
    </>
  );
}
