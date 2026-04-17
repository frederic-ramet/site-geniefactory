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
  const seo = getSeoFor('claude-entreprise');
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: '/solutions/claude-entreprise' },
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      url: `${siteConfig.url}/solutions/claude-entreprise`,
      images: seo.og_image ? [seo.og_image] : undefined,
    },
  };
}

const useCases = [
  {
    title: 'Extraction documentaire',
    description:
      "Claude lit les documents entrants (factures, actes, contrats), extrait les données structurées avec niveau de confiance, prête à intégrer dans le SI.",
  },
  {
    title: 'Assistant métier contextualisé',
    description:
      "Un agent Claude nourri du Knowledge Graph de l'entreprise répond aux questions des collaborateurs, prépare les premiers jets, synthétise les dossiers.",
  },
  {
    title: 'Qualification et tri',
    description:
      "Classification automatique d'emails, tickets, demandes ou dossiers selon les règles métier, avec priorité et action suggérée.",
  },
  {
    title: 'Rapprochement et contrôle',
    description:
      "Claude croise plusieurs sources (comptabilité, bancaire, facturation), détecte les écarts, propose des actions, alerte sur les anomalies.",
  },
  {
    title: 'Rédaction supervisée',
    description:
      "Premiers jets de mails, courriers, comptes-rendus, synthèses. L'humain valide et envoie — Claude gagne le temps de l'ébauche.",
  },
  {
    title: 'Recherche interne augmentée',
    description:
      "Un agent de recherche sur vos documents internes (procédures, historique projets, bases de connaissance), avec citations sourcées.",
  },
];

const steps = [
  {
    name: 'Cadrage du processus et des garde-fous',
    text: "Choix d'un cas d'usage à valeur claire, définition du niveau d'autonomie attendu, identification des risques et des points de supervision humaine.",
  },
  {
    name: "Construction de l'agent Claude",
    text: "Orchestrateur, prompts métier, Knowledge Graph, connecteurs SI, garde-fous d'entrée et de sortie, logs d'audit. L'agent n'est pas un chat — c'est un système métier.",
  },
  {
    name: 'Évaluation qualité multi-LLM',
    text: "Tests sur jeux de données représentatifs, mesure de la qualité, comparaison Claude / GPT / Mistral si pertinent. Le choix de modèle est documenté, pas dogmatique.",
  },
  {
    name: 'Mise en production supervisée',
    text: "Déploiement progressif avec validation humaine systématique sur les premiers cas, ajustement du niveau d'autonomie, monitoring des dérives.",
  },
  {
    name: 'Documentation AI Act et transfert',
    text: "Fiche système, logs d'audit, procédures de supervision, formation des équipes. Code et paramétrage livrés dans votre infrastructure.",
  },
];

const guardrails = [
  {
    title: 'Données minimales envoyées',
    description:
      "Redaction, anonymisation, contextes réduits : Claude reçoit seulement ce qui est nécessaire à la tâche. Pas de dump de base de données au modèle.",
  },
  {
    title: "Hébergement via Bedrock ou Vertex",
    description:
      "Pour les cas sensibles, Claude est disponible sur AWS Bedrock et Google Vertex, ce qui permet un traitement en région Europe sous contrats cloud du client.",
  },
  {
    title: 'Logs et traçabilité',
    description:
      "Chaque appel à Claude est tracé : entrée, sortie, décision prise, validation humaine. Exportable pour audit AI Act.",
  },
  {
    title: 'Supervision humaine configurable',
    description:
      "Le niveau de validation humaine est paramétrable par type de cas : tout valider, valider en lot, ou autonome sur les cas standards uniquement.",
  },
];

export default function ClaudeEntreprisePage() {
  const seo = getSeoFor('claude-entreprise');
  const faq = getFaqFile('claude-entreprise-faq.yml');

  return (
    <>
      <PageHeader
        eyebrow="Intégration LLM"
        title={seo.h1 ?? seo.title}
        description="GenieFactory industrialise des agents Claude (Anthropic) dans le SI des PME et ETI — avec gouvernance AI Act, garde-fous, supervision humaine et propriété du code applicatif côté client. Architecture multi-LLM : vous n'êtes jamais verrouillé sur un fournisseur."
      >
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={siteConfig.demoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary"
          >
            Discuter d&apos;un projet Claude
          </Link>
          <Link
            href="/blog/industrialiser-agent-claude"
            className="btn-secondary"
          >
            Lire le guide d&apos;industrialisation
          </Link>
        </div>
      </PageHeader>

      <Section
        eyebrow="Cas d'usage"
        title="Agents Claude en production"
        subtitle="Six familles de cas d'usage où Claude est un bon candidat, dès lors que l'agent est cadré, supervisé et intégré au SI."
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
        eyebrow="Méthode"
        title="Comment industrialiser un agent Claude ?"
        subtitle="Framework ICPC appliqué à Claude : 5 étapes pour passer d'un cas d'usage à un agent en production, avec gouvernance."
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
        eyebrow="Architecture"
        title="Un agent Claude n&apos;est pas un chatbot Claude"
        subtitle="La différence entre un modèle consommé en API et un agent métier industrialisé."
      >
        <div className="card">
          <p className="text-base leading-relaxed text-ink-700">
            Claude est un modèle de langage exposé via API. Un agent Claude
            industrialisé, c&apos;est tout ce qu&apos;il y a autour :
            l&apos;orchestrateur qui décompose les tâches, les connecteurs qui
            lisent-écrivent dans votre SI, le Knowledge Graph qui encode vos
            règles métier, les garde-fous qui filtrent les entrées et les
            sorties, les logs d&apos;audit, la supervision humaine. Le modèle
            est une dépendance externe ; l&apos;agent est votre système.
            C&apos;est pourquoi l&apos;architecture GenieFactory est multi-LLM
            par conception — Claude aujourd&apos;hui, un autre modèle demain si
            cela sert votre cas d&apos;usage.
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Garde-fous"
        title="Sécurité, confidentialité, conformité"
        subtitle="Ce qui encadre un agent Claude en production chez un client."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {guardrails.map((g) => (
            <div key={g.title} className="card">
              <h3 className="font-display text-base font-semibold text-ink-900">
                {g.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {g.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Multi-LLM"
        title="Claude, GPT, Mistral : pourquoi l&apos;architecture compte plus que le modèle"
        subtitle="Le bon choix dépend du cas d&apos;usage, pas d&apos;une préférence d&apos;éditeur."
      >
        <div className="card">
          <p className="text-base leading-relaxed text-ink-700">
            Claude est souvent un excellent choix pour les tâches de
            raisonnement métier, la fiabilité comportementale et la qualité des
            extractions structurées. GPT reste très compétitif sur la
            polyvalence et l&apos;écosystème d&apos;outils. Mistral et les
            modèles open-source ouvrent des options d&apos;auto-hébergement.
            L&apos;architecture construite par GenieFactory permet de tester,
            comparer et changer de modèle sans rebâtir l&apos;agent — parce que
            le modèle n&apos;est qu&apos;une brique. Lire{' '}
            <Link
              href="/blog/claude-vs-gpt-entreprise"
              className="text-coral-600 underline"
            >
              le comparatif Claude vs GPT pour décideurs
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Propriété"
        title="Votre agent Claude vous appartient"
        subtitle="Ce qui reste chez le client quand le projet est livré."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <div className="card">
            <h3 className="font-display text-base font-semibold text-ink-900">
              Code applicatif
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Orchestrateur, connecteurs, garde-fous, interfaces : tout le code
              est livré dans votre dépôt. Déployable sur votre infrastructure.
            </p>
          </div>
          <div className="card">
            <h3 className="font-display text-base font-semibold text-ink-900">
              Knowledge Graph
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Les règles métier encodées pendant le projet vous appartiennent.
              Elles servent au projet suivant sans repartir de zéro.
            </p>
          </div>
          <div className="card">
            <h3 className="font-display text-base font-semibold text-ink-900">
              Données et logs
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Les données traitées et les logs d&apos;audit restent dans votre
              infrastructure. Exportables pour conformité AI Act.
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
