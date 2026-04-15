'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/site';

export function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-14 text-white shadow-lift sm:px-10 md:px-14 md:py-20"
        >
          <div className="pointer-events-none absolute inset-0 -z-0 opacity-70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,123,107,0.35),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,122,46,0.25),transparent_55%)]" />
          </div>
          <div className="relative mx-auto max-w-2xl text-center">
            <span className="eyebrow border-white/20 bg-white/10 text-white/80">
              Prêt à démarrer
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Vos processus métier, réorganisés par des agents IA.
            </h2>
            <p className="mt-4 text-white/80">
              Un échange de 30 minutes pour cadrer votre premier cas d'usage,
              estimer l'impact métier et identifier les prérequis AI Act. Démo
              live incluse.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn bg-coral-500 text-white shadow-soft hover:-translate-y-0.5 hover:bg-coral-600"
              >
                Demander une démo
              </Link>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="btn bg-transparent text-white ring-1 ring-inset ring-white/30 hover:bg-white/10"
              >
                {siteConfig.email}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
