import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Features } from '@/components/sections/Features';
import { UseCasesCarousel } from '@/components/sections/UseCasesCarousel';
import { VideoSection } from '@/components/sections/VideoSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { FinalCTA } from '@/components/sections/FinalCTA';

export const metadata: Metadata = {
  title: 'La plate-forme IA pour industrialiser vos applications',
  description:
    "Du besoin métier au prototype IA testable en moins de 24h. Spécifications, génération, évaluation et marketplace de composants IA.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Features />
      <UseCasesCarousel />
      <VideoSection />
      <Testimonials />
      <FAQ />
      <BlogPreview />
      <FinalCTA />
    </>
  );
}
