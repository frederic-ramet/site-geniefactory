import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { PlaceholderImage } from '@/components/ui/PlaceholderImage';

export function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-ink-900 px-6 py-14 text-white shadow-lift sm:px-10 md:px-14 md:py-20">
          <div className="pointer-events-none absolute inset-0 -z-0 opacity-70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(47,123,255,0.35),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,122,46,0.25),transparent_55%)]" />
          </div>
          <div className="relative grid items-center gap-10 md:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="eyebrow border-white/20 bg-white/10 text-white/80">
                Prêt à démarrer
              </span>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                Votre innovation, industrialisée.
              </h2>
              <p className="mt-4 max-w-lg text-white/80">
                Un échange de 30 minutes pour cadrer votre premier cas d'usage
                et estimer l'impact. Démo live incluse.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn bg-white text-ink-900 shadow-soft hover:-translate-y-0.5 hover:bg-ink-50"
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
            <div className="relative">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur">
                <PlaceholderImage
                  label="Plateforme"
                  aspect="video"
                  tone="brand"
                  className="rounded-xl opacity-95"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
