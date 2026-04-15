'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { ChatDemo } from './ChatDemo';

type Props = {
  h1: string;
  subtitle: string;
};

export function Hero({ h1, subtitle }: Props) {
  return (
    <section className="relative overflow-hidden pt-14 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-brand-50/80 via-white to-white" />
        <div className="absolute left-1/2 top-0 -z-10 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(47,123,255,0.15),transparent_70%)]" />
      </div>

      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="eyebrow"
            >
              Transformation agentique
              <span className="h-1 w-1 rounded-full bg-ink-400" />
              PME &amp; ETI
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-ink-900 sm:text-5xl md:text-6xl"
            >
              {h1}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary"
              >
                Demander une démo
                <ArrowRight />
              </Link>
              <Link href="/#how-it-works" className="btn-secondary">
                Voir comment ça marche
              </Link>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-ink-100 pt-6 text-sm"
            >
              <Stat value="Agents IA" label="en production" />
              <Stat value="Gouvernance" label="intégrée nativement" />
              <Stat value="AI Act" label="conformité by design" />
            </motion.dl>
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative"
            >
              <div className="relative flex items-center justify-center">
                <Image
                  src="/images/logo-hero.webp"
                  alt="GenieFactory"
                  width={480}
                  height={480}
                  className="w-full max-w-[480px]"
                  priority
                />
              </div>
              <div className="pointer-events-none absolute -bottom-10 -left-4 w-[300px] sm:-left-10 sm:w-[340px]">
                <ChatDemo />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-12 sm:h-16 lg:h-24" />
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="font-display text-2xl font-semibold tracking-tight text-ink-900">
        {value}
      </dt>
      <dd className="mt-1 text-ink-600">{label}</dd>
    </div>
  );
}

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
