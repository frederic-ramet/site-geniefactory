import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { Logo } from './Logo';
import type { Footer as FooterData } from '@/lib/data';

export function Footer({ footer }: { footer: FooterData }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-ink-100 bg-ink-50/40">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2" aria-label="Accueil">
            <Logo className="h-8 w-auto" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-600">
            {footer.tagline}
          </p>
          <address className="mt-6 not-italic text-sm text-ink-600">
            {footer.address.street}
            <br />
            {footer.address.postalCode} {footer.address.city}
            <br />
            {footer.address.country}
          </address>
        </div>
        {footer.sections.map((section) => (
          <nav key={section.title} aria-label={section.title}>
            <h3 className="text-sm font-semibold text-ink-900">
              {section.title}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {section.items.map((item) => (
                <li key={`${section.title}-${item.label}`}>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-ink-600 transition hover:text-ink-900"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-ink-600 transition hover:text-ink-900"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-ink-100">
        <div className="container flex flex-col items-start justify-between gap-2 py-6 text-xs text-ink-500 sm:flex-row sm:items-center">
          <p>{footer.legal.replace('{year}', String(year))}</p>
          <p>
            Contact :{' '}
            <a
              href={`mailto:${siteConfig.email}`}
              className="hover:text-ink-800"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
