#!/usr/bin/env node
/**
 * scripts/wire-images.mjs
 *
 * After running fetch-assets.mjs, this script prints a report of which
 * public/images files exist and which PlaceholderImage instances in the
 * components need to be updated to use next/image.
 *
 * Usage:
 *   node scripts/wire-images.mjs
 */

import { readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC_IMAGES = join(ROOT, 'public', 'images');
const PUBLIC_VIDEOS = join(ROOT, 'public', 'videos');

function walk(dir, results = []) {
  if (!existsSync(dir)) return results;
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, results);
    else results.push(full);
  }
  return results;
}

function fmt(bytes) {
  return bytes > 1_000_000
    ? `${(bytes / 1_000_000).toFixed(1)} MB`
    : `${(bytes / 1_000).toFixed(0)} KB`;
}

console.log('\n=== public/images ===\n');
const images = walk(PUBLIC_IMAGES);
if (images.length === 0) {
  console.log('  No images found yet — run: node scripts/fetch-assets.mjs\n');
} else {
  images.forEach((f) => {
    const stat = statSync(f);
    const rel = relative(join(ROOT, 'public'), f);
    console.log(`  /${rel}  (${fmt(stat.size)})`);
  });
}

console.log('\n=== public/videos ===\n');
const videos = walk(PUBLIC_VIDEOS);
if (videos.length === 0) {
  console.log('  No videos found yet.\n');
} else {
  videos.forEach((f) => {
    const stat = statSync(f);
    const rel = relative(join(ROOT, 'public'), f);
    console.log(`  /${rel}  (${fmt(stat.size)})`);
  });
}

// Expected assets checklist
const EXPECTED = [
  { path: 'images/logo.svg',                       label: 'Logo principal (SVG — inclus en placeholder)' },
  { path: 'images/logo-mark.svg',                  label: 'Logo icône (SVG — inclus en placeholder)' },
  { path: 'images/platform-screenshot.webp',       label: 'Screenshot plateforme (Hero + CTA final)' },
  { path: 'images/steps/etabli.webp',              label: 'Capture Établi' },
  { path: 'images/steps/forge.webp',               label: 'Capture Forge' },
  { path: 'images/steps/evaluation.webp',          label: 'Capture Évaluation' },
  { path: 'images/steps/communaute.webp',          label: 'Capture Communauté' },
  { path: 'images/features/feature-1.webp',        label: 'Fonctionnalité 1' },
  { path: 'images/features/feature-2.webp',        label: 'Fonctionnalité 2' },
  { path: 'images/features/feature-3.webp',        label: 'Fonctionnalité 3' },
  { path: 'images/features/feature-4.webp',        label: 'Fonctionnalité 4' },
  { path: 'images/features/feature-5.webp',        label: 'Fonctionnalité 5' },
  { path: 'images/features/feature-6.webp',        label: 'Fonctionnalité 6' },
  { path: 'images/testimonials/weiss.webp',        label: 'Photo Sébastien Weiss' },
  { path: 'images/testimonials/ly.webp',           label: 'Photo Pierre Ly' },
  { path: 'images/demo-thumb.webp',                label: 'Thumbnail vidéo démo' },
  { path: 'videos/demo.mp4',                       label: 'Vidéo démo MP4' },
];

console.log('\n=== Checklist assets attendus ===\n');
let missing = 0;
for (const { path, label } of EXPECTED) {
  const full = join(ROOT, 'public', path);
  // also accept .png / .jpg variants
  const altFull = full.replace('.webp', '.png');
  const altFull2 = full.replace('.webp', '.jpg');
  const found = existsSync(full) || existsSync(altFull) || existsSync(altFull2);
  const icon = found ? '✓' : '✗';
  if (!found) missing++;
  console.log(`  ${icon}  ${path}  — ${label}`);
}

if (missing === 0) {
  console.log('\n  Tous les assets sont présents ! Étape suivante : wirer les composants.\n');
} else {
  console.log(`\n  ${missing} asset(s) manquant(s). Lancer : node scripts/fetch-assets.mjs\n`);
}
