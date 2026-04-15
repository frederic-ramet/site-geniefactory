import Link from 'next/link';
import { primaryNav, siteConfig } from '@/lib/site';
import { Logo } from './Logo';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink-100 bg-ink-50/40">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2" aria-label="Accueil">
            <Logo className="h-8 w-auto" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-600">
            {siteConfig.description}
          </p>
          <address className="mt-6 not-italic text-sm text-ink-600">
            {siteConfig.address.street}
            <br />
            {siteConfig.address.postalCode} {siteConfig.address.city}
            <br />
            {siteConfig.address.country}
          </address>
        </div>
        <nav aria-label="Navigation pied de page">
          <h3 className="text-sm font-semibold text-ink-900">Navigation</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-ink-600 transition hover:text-ink-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/portfolio"
                className="text-ink-600 transition hover:text-ink-900"
              >
                Portfolio
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h3 className="text-sm font-semibold text-ink-900">Contact</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-ink-600 transition hover:text-ink-900"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink-600 transition hover:text-ink-900"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink-600 transition hover:text-ink-900"
              >
                Demander une démo
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-100">
        <div className="container flex flex-col items-start justify-between gap-2 py-6 text-xs text-ink-500 sm:flex-row sm:items-center">
          <p>© {year} Genie Factory. Tous droits réservés.</p>
          <p>Construit en Next.js + Tailwind — hébergé avec amour.</p>
        </div>
      </div>
    </footer>
  );
}
