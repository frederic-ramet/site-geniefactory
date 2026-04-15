'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/Section';
import { testimonials } from '@/lib/testimonials';

export function Testimonials() {
  return (
    <Section
      eyebrow="Témoignages"
      title="Ce qu'en disent les équipes qui nous font confiance"
      subtitle="Des retours terrain, loin du buzz, sur ce que change Genie Factory au quotidien."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.08,
            }}
            className="card flex h-full flex-col gap-6"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6 text-brand-400"
              fill="currentColor"
              aria-hidden
            >
              <path d="M7 7h3l-1 3v4H5v-4l2-3zm9 0h3l-1 3v4h-4v-4l2-3z" />
            </svg>
            <blockquote className="text-lg leading-relaxed text-ink-800">
              « {t.quote} »
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-4 border-t border-ink-100 pt-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full bg-ink-100">
                <Image
                  src={t.avatar.replace('.jpg', '.webp')}
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <div className="font-semibold text-ink-900">{t.name}</div>
                <div className="text-sm text-ink-600">
                  {t.role} · {t.company}
                </div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </Section>
  );
}
