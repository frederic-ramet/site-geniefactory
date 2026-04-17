'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { siteConfig } from '@/lib/site';

export function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Autoplay muted when 50% visible
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playing) {
          setPlaying(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [playing]);

  // Play when state flips to true
  useEffect(() => {
    if (playing) {
      videoRef.current?.play().catch(() => {});
    }
  }, [playing]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setMuted(videoRef.current.muted);
  };

  const handleThumbnailClick = () => {
    setMuted(false);
    setPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  };

  return (
    <Section
      eyebrow="Démo"
      title="Des agents IA prêts pour la production"
      subtitle="Découvrez comment GenieFactory transforme un brief métier en application IA gouvernée — de la spec à la mise en production."
      align="center"
    >
      <div className="mx-auto max-w-4xl">
        {/* Player */}
        <div
          ref={containerRef}
          className="group relative overflow-hidden rounded-3xl border border-ink-100 bg-ink-900 shadow-lift"
        >
          {/* Thumbnail overlay */}
          {!playing && (
            <button
              type="button"
              onClick={handleThumbnailClick}
              className="absolute inset-0 z-10 flex items-center justify-center"
              aria-label="Lire la démo"
            >
              <Image
                src="/images/logo-hero.webp"
                alt="Aperçu démo GenieFactory"
                fill
                className="object-cover transition duration-300 group-hover:scale-105 group-hover:brightness-75"
                sizes="(max-width: 768px) 100vw, 896px"
                priority
              />
              {/* Play button */}
              <span className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-ink-900 shadow-lift transition duration-200 group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-8 w-8" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}

          {/* Video */}
          <video
            ref={videoRef}
            className="aspect-video w-full rounded-3xl"
            playsInline
            muted={muted}
            loop
            preload="metadata"
            poster="/images/logo-hero.webp"
          >
            <source src="/videos/GF_Demo.mp4" type="video/mp4" />
          </video>

          {/* Controls overlay (visible when playing) */}
          {playing && (
            <div className="absolute bottom-4 right-4 z-10 flex gap-2 opacity-0 transition duration-200 group-hover:opacity-100">
              {/* Mute toggle */}
              <button
                type="button"
                onClick={toggleMute}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
                aria-label={muted ? 'Activer le son' : 'Couper le son'}
              >
                {muted ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-3-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 19L19 20.27 20.27 19 5.27 4 4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>
            </div>
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
