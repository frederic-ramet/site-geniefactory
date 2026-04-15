'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

type Step = {
  id: string;
  author: 'user' | 'system';
  label: string;
  detail?: string;
  tone?: 'neutral' | 'progress' | 'success';
};

const steps: Step[] = [
  {
    id: 'ask',
    author: 'user',
    label: "Nous voulons un copilote RH pour les managers",
  },
  {
    id: 'spec',
    author: 'system',
    label: 'Génération des spécifications',
    detail: 'KPIs · personas · parcours',
    tone: 'progress',
  },
  {
    id: 'code',
    author: 'system',
    label: "Génération de l'application",
    detail: 'Agents · RAG · RBAC',
    tone: 'progress',
  },
  {
    id: 'test',
    author: 'system',
    label: 'Validation par les métiers',
    detail: 'Tests · feedback · KPIs',
    tone: 'progress',
  },
  {
    id: 'done',
    author: 'system',
    label: 'Mise en production — traçabilité AI Act active',
    tone: 'success',
  },
];

export function ChatDemo() {
  const [index, setIndex] = useState(1);

  useEffect(() => {
    if (index >= steps.length) return;
    const timer = setTimeout(() => setIndex((i) => i + 1), 1400);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (index < steps.length) return;
    const restart = setTimeout(() => setIndex(1), 3200);
    return () => clearTimeout(restart);
  }, [index]);

  const visible = steps.slice(0, index);

  return (
    <div className="rounded-2xl border border-ink-100 bg-white/95 p-4 shadow-lift backdrop-blur">
      <div className="mb-3 flex items-center justify-between text-xs text-ink-500">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 text-[10px] font-semibold text-white">
            GF
          </span>
          <span className="font-medium text-ink-800">Forge · session</span>
        </div>
        <Dots />
      </div>
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {visible.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={clsx(
                'flex items-start gap-2',
                step.author === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              <div
                className={clsx(
                  'max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-snug shadow-sm ring-1 ring-inset',
                  step.author === 'user'
                    ? 'rounded-br-sm bg-brand-600 text-white ring-brand-700'
                    : 'rounded-bl-sm bg-ink-50 text-ink-800 ring-ink-100',
                  step.tone === 'success' &&
                    'bg-emerald-50 text-emerald-800 ring-emerald-200',
                )}
              >
                <p className="font-medium">{step.label}</p>
                {step.detail && (
                  <p
                    className={clsx(
                      'mt-0.5 text-[11px]',
                      step.author === 'user' ? 'text-white/80' : 'text-ink-500',
                    )}
                  >
                    {step.detail}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Dots() {
  return (
    <div className="flex items-center gap-1" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-ink-300"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}
