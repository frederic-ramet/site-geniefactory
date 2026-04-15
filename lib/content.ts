import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type BlogFrontmatter = {
  title: string;
  description: string;
  date: string;
  author?: string;
  category?: string;
  image?: string;
  draft?: boolean;
};

export type UseCaseFrontmatter = {
  title: string;
  description: string;
  client: string;
  category: string;
  date: string;
  image?: string;
  draft?: boolean;
};

export type ContentEntry<T> = {
  slug: string;
  frontmatter: T;
  body: string;
};

const CONTENT_DIR = path.join(process.cwd(), 'content');

function readCollection<T>(dir: string): ContentEntry<T>[] {
  const root = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(root)) return [];
  const files = fs
    .readdirSync(root)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));

  const entries = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, '');
    const raw = fs.readFileSync(path.join(root, file), 'utf8');
    const parsed = matter(raw);
    return {
      slug,
      frontmatter: parsed.data as T,
      body: parsed.content,
    } satisfies ContentEntry<T>;
  });

  return entries.filter(
    (e) => !(e.frontmatter as unknown as { draft?: boolean }).draft,
  );
}

export function getBlogPosts() {
  return readCollection<BlogFrontmatter>('blog').sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((p) => p.slug === slug) ?? null;
}

export function getUseCases() {
  return readCollection<UseCaseFrontmatter>('use-cases').sort((a, b) =>
    b.frontmatter.date.localeCompare(a.frontmatter.date),
  );
}

export function getUseCase(slug: string) {
  return getUseCases().find((p) => p.slug === slug) ?? null;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
