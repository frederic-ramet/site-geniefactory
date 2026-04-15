import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[70vh] items-center">
        <div className="container flex flex-col items-center gap-6 py-20 text-center">
          <span className="eyebrow">404</span>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink-900 sm:text-5xl">
            Cette page n'existe pas (encore).
          </h1>
          <p className="max-w-xl text-lg text-ink-600">
            Le lien est peut-être obsolète ou la page en cours de fabrication.
            Revenez à l'accueil, ou parcourez les ressources disponibles.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              Retour à l'accueil
            </Link>
            <Link href="/blog" className="btn-secondary">
              Lire le blog
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
