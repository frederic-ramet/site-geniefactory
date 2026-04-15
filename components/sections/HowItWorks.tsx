'use client';

import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

const steps = [
  {
    n: '01',
    title: 'Établi',
    description:
      'Capture et structuration des besoins métier, production de specs et KPIs.',
    tone: 'brand' as const,
  },
  {
    n: '02',
    title: 'Forge',
    description:
      'Génération automatique du code et déploiement en un clic.',
    tone: 'ink' as const,
  },
  {
    n: '03',
    title: 'Évaluation',
    description:
      'Test immédiat par les métiers avec suivi temps réel des KPIs.',
    tone: 'accent' as const,
  },
  {
    n: '04',
    title: 'Communauté',
    description:
      'Marketplace de templates métiers et briques IA réutilisables.',
    tone: 'brand' as const,
  },
];

export function HowItWorks() {
  return (
    <Section
      id="how-it-works"
      eyebrow="Comment ça marche"
      title="Du besoin au prototype, en 4 étapes"
      subtitle="Une boucle courte entre vos équipes métier et l'IA — chaque étape produit un livrable concret et mesurable."
    >
      <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, i) => (
          <motion.li
            key={step.n}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.08,
            }}
            className="card card-hover flex flex-col gap-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-ink-400">
                Étape {step.n}
              </span>
              <span
                aria-hidden
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-xs font-semibold text-white"
              >
                {i + 1}
              </span>
            </div>
            <PlaceholderImage
              label={step.title}
              aspect="video"
              tone={step.tone}
              className="rounded-xl"
            />
            <div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-ink-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {step.description}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
