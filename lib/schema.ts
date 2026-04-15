/**
 * JSON-LD schema generators (schema.org).
 *
 * Each function returns a plain object that should be rendered inside
 * <script type="application/ld+json"> in the page head or body.
 *
 * The generators accept only structured data that already lives in our
 * YAML / MDX frontmatter — no free-form strings — so updating the content
 * automatically updates the schema.
 */
import { siteConfig } from './site';
import type { FaqItem } from './data';
import type { Author, BlogFrontmatter, UseCaseFrontmatter } from './content';
import { resolveAuthor } from './content';

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.svg`,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '12 avenue des Prés',
      postalCode: '78180',
      addressLocality: 'Montigny-le-Bretonneux',
      addressCountry: 'FR',
    },
    sameAs: [siteConfig.linkedin],
  };
}

// ---------------------------------------------------------------------------
// WebSite
// ---------------------------------------------------------------------------
export function websiteSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description,
    inLanguage: 'fr-FR',
  };
}

// ---------------------------------------------------------------------------
// Article (blog post or use case) — E-E-A-T ready
// ---------------------------------------------------------------------------
type ArticleInput = {
  url: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  image?: string;
  author?: Author | null;
};

export function articleSchema(input: ArticleInput) {
  const image = input.image
    ? new URL(input.image, siteConfig.url).toString()
    : undefined;

  const author = input.author
    ? {
        '@type': 'Person',
        name: input.author.name,
        ...(input.author.role && { jobTitle: input.author.role }),
        ...(input.author.bio && { description: input.author.bio }),
        ...(input.author.linkedin && { sameAs: [input.author.linkedin] }),
      }
    : {
        '@type': 'Organization',
        name: siteConfig.name,
      };

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.date,
    dateModified: input.updated ?? input.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': input.url,
    },
    author,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/images/logo.svg`,
      },
    },
    ...(image && { image }),
  };
}

export function articleSchemaForBlog(
  slug: string,
  fm: BlogFrontmatter,
): ReturnType<typeof articleSchema> {
  return articleSchema({
    url: `${siteConfig.url}/blog/${slug}`,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    updated: fm.updated,
    image: fm.image,
    author: resolveAuthor(fm.author),
  });
}

export function articleSchemaForUseCase(
  slug: string,
  fm: UseCaseFrontmatter,
): ReturnType<typeof articleSchema> {
  return articleSchema({
    url: `${siteConfig.url}/use-cases/${slug}`,
    title: fm.title,
    description: fm.description,
    date: fm.date,
    updated: fm.updated,
    image: fm.image,
    author: null,
  });
}

// ---------------------------------------------------------------------------
// FAQPage
// ---------------------------------------------------------------------------
export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ---------------------------------------------------------------------------
// HowTo — used on /solutions/gouvernance-ia and similar explainers
// ---------------------------------------------------------------------------
type HowToStep = { name: string; text: string };

export function howToSchema(name: string, description: string, steps: HowToStep[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

// ---------------------------------------------------------------------------
// CollectionPage — portfolio / blog index
// ---------------------------------------------------------------------------
export function collectionPageSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
  };
}

// ---------------------------------------------------------------------------
// Helper: render JSON-LD in a <script> tag
// ---------------------------------------------------------------------------
export function jsonLd(data: object) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}
