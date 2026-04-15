'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import type { Step } from '@/lib/data';

const TONES = ['brand', 'ink', 'accent', 'brand'] as const;

export function HowItWorks({ steps }: { steps: Step[] }) {
  return (
    <Section
      id="how-it-works"
      eyebrow="Comment ça marche"
      title="Du besoin à l'application IA en production"
      subtitle="Une boucle courte entre vos équipes métier et les agents IA — chaque étape produit un livrable concret et mesurable."
    >
      <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, i) => (
          <motion.li
            key={step.number}
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
                Étape {step.number}
              </span>
              <span
                aria-hidden
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-xs font-semibold text-white"
              >
                {i + 1}
              </span>
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-ink-50">
              {step.image && (
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                />
              )}
            </div>
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
