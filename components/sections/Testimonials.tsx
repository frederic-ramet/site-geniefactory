'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/lib/site';
import type { Testimonial } from '@/lib/data';

export function Testimonials({ items }: { items: Testimonial[] }) {
  // Hard filter — never render a testimonial without explicit public consent.
  const publicItems = items.filter((t) => t.usable_publicly === true);

  if (publicItems.length === 0) {
    return <TestimonialsWaitingState />;
  }

  return (
    <Section
      eyebrow="Témoignages"
      title="Ce qu'en disent les équipes qui nous font confiance"
      subtitle="Des retours terrain, loin du buzz, sur ce que change GenieFactory au quotidien."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {publicItems.map((t, i) => (
          <motion.figure
            key={`${t.company}-${t.name}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-80px' }}
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
                {t.photo && (
                  <Image
                    src={t.photo.replace('.jpg', '.webp')}
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                )}
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

/**
 * Rendered when no testimonial is cleared for public display. Keeps the layout
 * rhythm of the page without publishing anything unauthorized.
 */
function TestimonialsWaitingState() {
  return (
    <Section eyebrow="Témoignages" title="Retours clients — bientôt publiés">
      <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-ink-200 bg-ink-50/40 p-10 text-center">
        <p className="text-ink-700">
          Nos premiers clients préparent leurs retours publics. En attendant,
          nous partageons volontiers des références sur demande — dans le cadre
          d'un échange dédié.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={siteConfig.demoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary"
          >
            Échanger avec l'équipe
          </Link>
          <Link href="/portfolio" className="btn-secondary">
            Voir les cas d'usage
          </Link>
        </div>
      </div>
    </Section>
  );
}
