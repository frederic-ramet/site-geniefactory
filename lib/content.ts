import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Zod schemas for frontmatter — matches the spec (sections 2 and 6).
// ---------------------------------------------------------------------------

export const authorSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  bio: z.string().optional(),
  linkedin: z.string().url().optional(),
  photo: z.string().optional(),
});

/**
 * gray-matter parses unquoted YAML dates as JS Date. Coerce them back
 * to ISO strings so the rest of the app can work with plain strings.
 */
const dateString = z.preprocess((v) => {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v;
}, z.string());

const optionalDateString = z.preprocess((v) => {
  if (v === undefined || v === null) return undefined;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v;
}, z.string().optional());

export const blogFrontmatterSchema = z.object({
  title: z.string(),
  slug: z.string().optional(),
  description: z.string(),
  date: dateString,
  updated: optionalDateString,
  author: z.union([z.string(), authorSchema]).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  schema: z.string().optional(),
  image: z.string().optional(),
  draft: z.boolean().optional(),
});

export const useCaseFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  client: z.string(),
  category: z.string(),
  date: dateString,
  updated: optionalDateString,
  image: z.string().optional(),
  draft: z.boolean().optional(),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;
export type UseCaseFrontmatter = z.infer<typeof useCaseFrontmatterSchema>;
export type Author = z.infer<typeof authorSchema>;

export type ContentEntry<T> = {
  slug: string;
  frontmatter: T;
  body: string;
};

// ---------------------------------------------------------------------------
// Loader
// ---------------------------------------------------------------------------

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readCollection<T>(
  dir: string,
  schema: z.ZodType<T>,
): ContentEntry<T>[] {
  const root = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(root)) return [];
  const files = fs
    .readdirSync(root)
    .filter(
      (f) =>
        (f.endsWith('.mdx') || f.endsWith('.md')) && !f.startsWith('_'),
    );

  const entries = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(path.join(root, file), 'utf8');
    const parsed = matter(raw);
    const check = schema.safeParse(parsed.data);
    if (!check.success) {
      const issues = check.error.issues
        .map((i) => `  · ${i.path.join('.') || '(root)'}: ${i.message}`)
        .join('\n');
      throw new Error(
        `Invalid frontmatter in ${dir}/${file}:\n${issues}\n\nFix the YAML frontmatter and rebuild.`,
      );
    }
    return {
      slug,
      frontmatter: check.data,
      body: parsed.content,
    } satisfies ContentEntry<T>;
  });

  return entries.filter((e) => {
    const draft = (e.frontmatter as unknown as { draft?: boolean }).draft;
    return !draft;
  });
}

export function getBlogPosts() {
  return readCollection('blog', blogFrontmatterSchema).sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((p) => p.slug === slug) ?? null;
}

export function getUseCases() {
  return readCollection('use-cases', useCaseFrontmatterSchema).sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );
}

export function getUseCase(slug: string) {
  return getUseCases().find((p) => p.slug === slug) ?? null;
}

export function getUseCaseCards() {
  return getUseCases().map((u) => ({
    slug: u.slug,
    title: u.frontmatter.title,
    client: u.frontmatter.client,
    category: u.frontmatter.category,
    excerpt: u.frontmatter.description,
    image: u.frontmatter.image,
  }));
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Normalize an author field which can be a plain string (legacy) or a
 * structured object (preferred, for E-E-A-T).
 */
export function resolveAuthor(
  author: BlogFrontmatter['author'],
): Author | null {
  if (!author) return null;
  if (typeof author === 'string') return { name: author };
  return author;
}
