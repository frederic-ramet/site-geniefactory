import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Zod schemas — validated at build time. A malformed YAML file throws
// with a human-readable error that points to the field in question.
// ---------------------------------------------------------------------------

export const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const navSchema = z.object({
  primary: z.array(navItemSchema),
});

export const footerSchema = z.object({
  tagline: z.string(),
  address: z.object({
    street: z.string(),
    postalCode: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  sections: z.array(
    z.object({
      title: z.string(),
      items: z.array(
        z.object({
          label: z.string(),
          href: z.string(),
          external: z.boolean().optional(),
        }),
      ),
    }),
  ),
  legal: z.string(),
});

export const seoPageSchema = z.object({
  title: z.string(),
  description: z.string(),
  og_image: z.string().optional(),
  schema: z.string().optional(),
  h1: z.string().optional(),
});

export const seoSchema = z.record(z.string(), seoPageSchema);

export const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const faqSchema = z.array(faqItemSchema);

export const testimonialSchema = z.object({
  name: z.string(),
  role: z.string(),
  company: z.string(),
  photo: z.string().optional(),
  quote: z.string(),
  usable_publicly: z.boolean(),
});

export const testimonialsSchema = z.array(testimonialSchema);

export const featureSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  image: z.string().optional(),
  icon: z.string().optional(),
});

export const featuresSchema = z.array(featureSchema);

export const stepSchema = z.object({
  number: z.string(),
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
});

export const stepsSchema = z.array(stepSchema);

// ---------------------------------------------------------------------------
// Loader
// ---------------------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), 'content', 'data');

function readYaml<T>(filename: string, schema: z.ZodType<T>): T {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Content file missing: ${filePath}. Expected under /content/data/.`,
    );
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = yaml.load(raw);
  const result = schema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `  · ${i.path.join('.') || '(root)'}: ${i.message}`)
      .join('\n');
    throw new Error(
      `Invalid content in ${filename}:\n${issues}\n\nFix the YAML and rebuild.`,
    );
  }
  return result.data;
}

// Cached so the files are only read + validated once per build
let _nav: z.infer<typeof navSchema> | null = null;
let _footer: z.infer<typeof footerSchema> | null = null;
let _seo: z.infer<typeof seoSchema> | null = null;
let _faq: z.infer<typeof faqSchema> | null = null;
let _testimonials: z.infer<typeof testimonialsSchema> | null = null;
let _features: z.infer<typeof featuresSchema> | null = null;
let _steps: z.infer<typeof stepsSchema> | null = null;

export const getNav = () => (_nav ??= readYaml('nav.yml', navSchema));
export const getFooter = () => (_footer ??= readYaml('footer.yml', footerSchema));
export const getSeo = () => (_seo ??= readYaml('seo.yml', seoSchema));
export const getFaq = () => (_faq ??= readYaml('faq.yml', faqSchema));
export const getTestimonials = () =>
  (_testimonials ??= readYaml('testimonials.yml', testimonialsSchema));
export const getFeatures = () =>
  (_features ??= readYaml('features.yml', featuresSchema));
export const getSteps = () => (_steps ??= readYaml('steps.yml', stepsSchema));

// Non-cached helper for optional FAQ files per-page (e.g. gouvernance-faq.yml).
export const getFaqFile = (filename: string) =>
  readYaml(filename, faqSchema);

export function getSeoFor(page: string) {
  const seo = getSeo();
  const entry = seo[page];
  if (!entry) {
    throw new Error(
      `No SEO entry for page "${page}" in content/data/seo.yml. Add it under that key.`,
    );
  }
  return entry;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export type Nav = z.infer<typeof navSchema>;
export type Footer = z.infer<typeof footerSchema>;
export type Seo = z.infer<typeof seoSchema>;
export type SeoPage = z.infer<typeof seoPageSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Feature = z.infer<typeof featureSchema>;
export type Step = z.infer<typeof stepSchema>;
