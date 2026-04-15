'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Section } from '@/components/ui/Section';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

const features = [
  {
    title: 'Spécifications intelligentes',
    subtitle: 'Conception orientée besoins métier',
    description:
      'Dialogue guidé pour capturer les besoins, contraintes et KPIs — puis génération d\'un document de spec exploitable.',
    tone: 'brand' as const,
  },
  {
    title: 'Cycle accéléré',
    subtitle: 'De 10 semaines à 24h',
    description:
      'Passez d\'une idée à un prototype testable en une journée grâce à l\'orchestration IA et aux templates.',
    tone: 'accent' as const,
  },
  {
    title: 'Composants IA réutilisables',
    subtitle: 'Bibliothèque agents, RAG, templates',
    description:
      'Des briques prêtes à l\'emploi : agents, recherche augmentée, workflows — combinables à volonté.',
    tone: 'ink' as const,
  },
  {
    title: 'Compatible environnements',
    subtitle: 'Intégration ERP, API, workflows',
    description:
      'Connecteurs pour vos systèmes existants (ERP, GED, API internes) afin de livrer des POC proches du réel.',
    tone: 'brand' as const,
  },
  {
    title: 'Conformité by design',
    subtitle: 'RBAC, AI Act, traçabilité',
    description:
      'Gouvernance, journalisation et contrôle d\'accès intégrés — la conformité ne ralentit plus vos itérations.',
    tone: 'ink' as const,
  },
  {
    title: 'Du besoin au POC en heures',
    subtitle: 'Prototype testable en < 24h',
    description:
      'Les métiers valident sur un prototype fonctionnel. Feedback direct, itérations courtes, décisions rapides.',
    tone: 'accent' as const,
  },
];

export function Features() {
  return (
    <Section
      id="features"
      eyebrow="Fonctionnalités"
      title="Tout ce qu'il faut pour passer à l'échelle"
      subtitle="Une plate-forme modulaire qui couvre le cycle complet : spécifier, générer, évaluer, réutiliser."
    >
      <div className="flex flex-col gap-16">
        {features.map((feature, i) => (
          <FeatureRow key={feature.title} {...feature} index={i} />
        ))}
      </div>
    </Section>
  );
}

type Tone = 'brand' | 'ink' | 'accent';

function FeatureRow({
  title,
  subtitle,
  description,
  tone,
  index,
}: {
  title: string;
  subtitle: string;
  description: string;
  tone: Tone;
  index: number;
}) {
  const reverse = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        'grid items-center gap-8 md:grid-cols-2 md:gap-14',
        reverse && 'md:[&>*:first-child]:order-2',
      )}
    >
      <div>
        <span className="eyebrow">0{index + 1}</span>
        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-ink-900 sm:text-3xl">
          {title}
        </h3>
        <p className="mt-1 text-base font-medium text-brand-700">{subtitle}</p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600">
          {description}
        </p>
      </div>
      <div className="relative">
        <div className="rounded-3xl border border-ink-100 bg-white p-3 shadow-soft">
          <PlaceholderImage
            label={title}
            aspect="wide"
            tone={tone}
            className="rounded-2xl"
          />
        </div>
      </div>
    </motion.article>
  );
}
