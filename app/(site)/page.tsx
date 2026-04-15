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
import { JsonLd } from '@/components/ui/JsonLd';
import {
  getSeoFor,
  getSteps,
  getFeatures,
  getFaq,
  getTestimonials,
} from '@/lib/data';
import { getUseCaseCards } from '@/lib/content';
import { faqPageSchema } from '@/lib/schema';

export function generateMetadata(): Metadata {
  const seo = getSeoFor('home');
  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      title: seo.title,
      description: seo.description,
    },
  };
}

const HERO_SUBTITLE =
  'Transformez vos processus métier en déployant des agents IA en production — avec gouvernance, propriété du code et conformité AI Act.';

export default function HomePage() {
  const seo = getSeoFor('home');
  const steps = getSteps();
  const features = getFeatures();
  const faq = getFaq();
  const testimonials = getTestimonials();
  const useCases = getUseCaseCards();

  return (
    <>
      <Hero h1={seo.h1 ?? seo.title} subtitle={HERO_SUBTITLE} />
      <HowItWorks steps={steps} />
      <Features features={features} />
      <UseCasesCarousel items={useCases} />
      <VideoSection />
      <Testimonials items={testimonials} />
      <FAQ items={faq} />
      <BlogPreview />
      <FinalCTA />
      <JsonLd data={faqPageSchema(faq)} />
    </>
  );
}
