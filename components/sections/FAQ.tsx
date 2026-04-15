'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import clsx from 'clsx';
import { Section } from '@/components/ui/Section';
import type { FaqItem } from '@/lib/data';

export function FAQ({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Questions fréquentes"
      subtitle="L'essentiel pour se projeter : délais, conformité, intégration, suite après le POC."
    >
      <div className="mx-auto max-w-3xl divide-y divide-ink-100 rounded-2xl border border-ink-100 bg-white shadow-soft">
        {items.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={item.question} className="px-5">
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-base font-semibold text-ink-900 sm:text-lg"
                >
                  <span>{item.question}</span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                    className={clsx(
                      'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-700',
                      open && 'border-brand-200 bg-brand-50 text-brand-700',
                    )}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-12 text-base leading-relaxed text-ink-600">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
