#!/usr/bin/env node
/**
 * scripts/validate-content.mjs
 *
 * Validates all YAML + MDX content against the Zod schemas WITHOUT
 * running a full Next.js build. Fast enough for pre-commit / CI on PR.
 *
 * Also enforces the forbidden vocabulary list (spec §1 — positioning).
 *
 * Usage:
 *   node scripts/validate-content.mjs
 *
 * Exit code 0 on success, 1 on any error.
 */

import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const require = createRequire(import.meta.url);

// We cannot `import` from lib/data.ts directly (TS), so reimplement the
// minimal Zod pass here using the same shapes. Keep in sync with lib/data.ts.
const { z } = require('zod');
const yaml = require('js-yaml');
const matter = require('gray-matter');

let errors = 0;
function fail(file, msg) {
  console.error(`  ✗ ${relative(ROOT, file)}`);
  for (const line of msg.split('\n')) console.error(`      ${line}`);
  errors++;
}
function ok(file) {
  console.log(`  ✓ ${relative(ROOT, file)}`);
}

// ---------------------------------------------------------------------------
// Schemas (mirror lib/data.ts + lib/content.ts)
// ---------------------------------------------------------------------------
const navSchema = z.object({
  primary: z.array(z.object({ label: z.string(), href: z.string() })),
});

const footerSchema = z.object({
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

const seoSchema = z.record(
  z.string(),
  z.object({
    title: z.string(),
    description: z.string(),
    og_image: z.string().optional(),
    schema: z.string().optional(),
    h1: z.string().optional(),
  }),
);

const faqSchema = z.array(
  z.object({ question: z.string(), answer: z.string() }),
);

const testimonialsSchema = z.array(
  z.object({
    name: z.string(),
    role: z.string(),
    company: z.string(),
    photo: z.string().optional(),
    quote: z.string(),
    usable_publicly: z.boolean(),
  }),
);

const featuresSchema = z.array(
  z.object({
    title: z.string(),
    subtitle: z.string(),
    description: z.string(),
    image: z.string().optional(),
    icon: z.string().optional(),
  }),
);

const stepsSchema = z.array(
  z.object({
    number: z.string(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
  }),
);

const authorSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  bio: z.string().optional(),
  linkedin: z.string().url().optional(),
  photo: z.string().optional(),
});

// gray-matter parses unquoted YAML dates as JS Date — coerce to string.
const dateString = z.preprocess((v) => {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v;
}, z.string());
const optionalDateString = z.preprocess((v) => {
  if (v === undefined || v === null) return undefined;
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return v;
}, z.string().optional());

const blogFrontmatterSchema = z.object({
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

const useCaseFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  client: z.string(),
  category: z.string(),
  date: dateString,
  updated: optionalDateString,
  image: z.string().optional(),
  draft: z.boolean().optional(),
});

// ---------------------------------------------------------------------------
// Forbidden vocabulary (spec §1)
// ---------------------------------------------------------------------------
const FORBIDDEN = [
  /\bno[-\s]?code\b/i,
  /\blow[-\s]?code\b/i,
  /\ben\s+24\s*h\b/i,
  /\ben\s+moins\s+de\s+24\s*h\b/i,
  /\bsans\s+d[ée]veloppeur\b/i,
  /\btransformation\s+digitale\b/i,
];

function checkForbidden(file, text) {
  const hits = [];
  for (const re of FORBIDDEN) {
    const m = text.match(re);
    if (m) hits.push(m[0]);
  }
  if (hits.length > 0) {
    fail(file, `Forbidden vocabulary found: ${hits.join(', ')}`);
    return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Validators
// ---------------------------------------------------------------------------
function validateYaml(file, schema, { checkVocab = true } = {}) {
  const raw = readFileSync(file, 'utf8');
  try {
    const data = yaml.load(raw);
    const result = schema.safeParse(data);
    if (!result.success) {
      const issues = result.error.issues
        .map((i) => `· ${i.path.join('.') || '(root)'}: ${i.message}`)
        .join('\n');
      fail(file, issues);
      return;
    }
    if (checkVocab && !checkForbidden(file, raw)) return;
    ok(file);
  } catch (e) {
    fail(file, `YAML parse error: ${e.message}`);
  }
}

function validateMdx(file, schema, { checkVocab = true } = {}) {
  const raw = readFileSync(file, 'utf8');
  try {
    const { data } = matter(raw);
    const result = schema.safeParse(data);
    if (!result.success) {
      const issues = result.error.issues
        .map((i) => `· ${i.path.join('.') || '(root)'}: ${i.message}`)
        .join('\n');
      fail(file, issues);
      return;
    }
    // Forbidden-vocab check is skipped on MDX articles: a comparison article
    // legitimately needs to name the concept it opposes (e.g. "agentique vs
    // transformation digitale" is literally in the content plan, spec §7).
    // The rule applies to YAML marketing copy only.
    ok(file);
  } catch (e) {
    fail(file, `MDX parse error: ${e.message}`);
  }
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const s = statSync(full);
    if (s.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
console.log('\n=== Validating content ===\n');

const DATA = join(ROOT, 'content', 'data');
const yamlChecks = [
  ['nav.yml', navSchema],
  ['footer.yml', footerSchema],
  ['seo.yml', seoSchema],
  ['faq.yml', faqSchema],
  ['testimonials.yml', testimonialsSchema],
  ['features.yml', featuresSchema],
  ['steps.yml', stepsSchema],
];

for (const [file, schema] of yamlChecks) {
  validateYaml(join(DATA, file), schema);
}

// Optional YAML (per-page FAQs, etc.)
for (const f of readdirSync(DATA)) {
  if (f.endsWith('-faq.yml')) {
    validateYaml(join(DATA, f), faqSchema);
  }
}

const BLOG = join(ROOT, 'content', 'blog');
for (const file of walk(BLOG)) {
  const name = file.split('/').pop();
  if (!name.endsWith('.mdx') && !name.endsWith('.md')) continue;
  if (name.startsWith('_')) continue; // templates
  validateMdx(file, blogFrontmatterSchema);
}

const USE = join(ROOT, 'content', 'use-cases');
for (const file of walk(USE)) {
  const name = file.split('/').pop();
  if (!name.endsWith('.mdx') && !name.endsWith('.md')) continue;
  if (name.startsWith('_')) continue;
  validateMdx(file, useCaseFrontmatterSchema);
}

console.log();
if (errors > 0) {
  console.error(`\n❌ ${errors} validation error(s). See above.\n`);
  process.exit(1);
}
console.log('\n✅ All content valid.\n');
