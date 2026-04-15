'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/lib/site';

export function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    setPlaying(true);
    // Next render will mount the video — play on load.
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => {
        /* autoplay blocked — user will click the native control */
      });
    });
  };

  return (
    <Section
      eyebrow="Démo"
      title="Des prototypes IA prêts à être testés"
      subtitle="Regardez en moins de 90 secondes comment Genie Factory produit une application fonctionnelle depuis un simple brief métier."
      align="center"
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl border border-ink-100 bg-white p-2 shadow-lift">
          {!playing ? (
            <button
              type="button"
              onClick={handlePlay}
              className="group relative block w-full"
              aria-label="Lire la vidéo de démonstration"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-ink-900">
                <Image
                  src="/images/demo-thumb.webp"
                  alt="Démo Genie Factory"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 896px"
                  priority
                />
              </div>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-ink-900 shadow-lift transition group-hover:scale-105">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-1 h-6 w-6"
                    aria-hidden
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </span>
            </button>
          ) : (
            <video
              ref={videoRef}
              className="aspect-video w-full rounded-2xl bg-ink-900"
              controls
              playsInline
              preload="metadata"
              poster="/images/demo-thumb.webp"
            >
              <source src="/videos/demo.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={siteConfig.demoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary"
          >
            Rejoindre la waitlist
          </Link>
        </div>
      </div>
    </Section>
  );
}
