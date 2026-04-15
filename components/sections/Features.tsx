'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Section } from '@/components/ui/Section';
import Image from 'next/image';

const features = [
  {
    title: 'Spécifications intelligentes',
    subtitle: 'Conception orientée besoins métier',
    description:
      'Dialogue guidé pour capturer les besoins, contraintes et KPIs — puis génération d\'un document de spec exploitable.',
    image: '/images/features/feature-1.webp',
  },
  {
    title: 'Cycle accéléré',
    subtitle: 'De 10 semaines à 24h',
    description:
      'Passez d\'une idée à un prototype testable en une journée grâce à l\'orchestration IA et aux templates.',
    image: '/images/features/feature-2.webp',
  },
  {
    title: 'Composants IA réutilisables',
    subtitle: 'Bibliothèque agents, RAG, templates',
    description:
      'Des briques prêtes à l\'emploi : agents, recherche augmentée, workflows — combinables à volonté.',
    image: '/images/features/feature-3.webp',
  },
  {
    title: 'Compatible environnements',
    subtitle: 'Intégration ERP, API, workflows',
    description:
      'Connecteurs pour vos systèmes existants (ERP, GED, API internes) afin de livrer des POC proches du réel.',
    image: '/images/features/feature-4.webp',
  },
  {
    title: 'Conformité by design',
    subtitle: 'RBAC, AI Act, traçabilité',
    description:
      'Gouvernance, journalisation et contrôle d\'accès intégrés — la conformité ne ralentit plus vos itérations.',
    image: '/images/features/feature-5.webp',
  },
  {
    title: 'Du besoin au POC en heures',
    subtitle: 'Prototype testable en < 24h',
    description:
      'Les métiers valident sur un prototype fonctionnel. Feedback direct, itérations courtes, décisions rapides.',
    image: '/images/features/feature-6.webp',
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

function FeatureRow({
  title,
  subtitle,
  description,
  image,
  index,
}: {
  title: string;
  subtitle: string;
  description: string;
  image: string;
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
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink-50">
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
