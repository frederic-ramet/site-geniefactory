'use client';

import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useCallback, useEffect, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

export type UseCaseCard = {
  slug: string;
  title: string;
  client: string;
  category: string;
  excerpt: string;
  image?: string;
};

export function UseCasesCarousel({ items }: { items: UseCaseCard[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: 'start',
      containScroll: false,
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 0.8,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const update = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    update();
    emblaApi.on('select', update).on('reInit', update);
    return () => {
      emblaApi.off('select', update).off('reInit', update);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (items.length === 0) return null;

  return (
    <Section
      id="use-cases"
      eyebrow="Cas d'usage"
      title="Ils industrialisent leurs agents IA en production"
      subtitle="Des cas concrets, couvrant industrie, finance, services et secteur public."
      bleed
    >
      <div className="relative">
        <div className="mask-fade-x overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5 px-4 sm:px-6 lg:px-8">
            {items.concat(items).map((uc, i) => (
              <article
                key={`${uc.slug}-${i}`}
                className="card card-hover group flex min-w-[280px] max-w-[320px] flex-col gap-4 sm:min-w-[320px]"
              >
                <PlaceholderImage
                  label={uc.client}
                  aspect="video"
                  tone={i % 3 === 0 ? 'brand' : i % 3 === 1 ? 'ink' : 'accent'}
                  className="rounded-xl"
                />
                <div>
                  <div className="flex items-center justify-between text-xs font-medium uppercase tracking-widest text-ink-400">
                    <span>{uc.category}</span>
                    <span>{uc.client}</span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-semibold tracking-tight text-ink-900">
                    {uc.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm text-ink-600">
                    {uc.excerpt}
                  </p>
                </div>
                <Link
                  href={`/cas-clients/${uc.slug}`}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-brand-700 transition group-hover:gap-2"
                >
                  Voir plus
                  <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="container mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Cas précédent"
            disabled={!canPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition hover:bg-ink-50 disabled:opacity-40"
          >
            ←
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Cas suivant"
            disabled={!canNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 bg-white text-ink-700 transition hover:bg-ink-50 disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>
    </Section>
  );
}
