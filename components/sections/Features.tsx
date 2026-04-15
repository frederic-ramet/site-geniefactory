'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Section } from '@/components/ui/Section';
import type { Feature } from '@/lib/data';

export function Features({ features }: { features: Feature[] }) {
  return (
    <Section
      id="features"
      eyebrow="Fonctionnalités"
      title="Tout ce qu'il faut pour industrialiser vos agents IA"
      subtitle="Une plateforme modulaire qui couvre le cycle complet : spécifier, générer, évaluer, gouverner."
    >
      <div className="flex flex-col gap-16">
        {features.map((feature, i) => (
          <FeatureRow
            key={feature.title}
            feature={feature}
            index={i}
          />
        ))}
      </div>
    </Section>
  );
}

function FeatureRow({
  feature,
  index,
}: {
  feature: Feature;
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
          {feature.title}
        </h3>
        <p className="mt-1 text-base font-medium text-coral-600">
          {feature.subtitle}
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600">
          {feature.description}
        </p>
      </div>
      <div className="relative">
        <div className="rounded-3xl border border-ink-100 bg-white p-3 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-ink-50">
            {feature.image && (
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-contain p-6"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
