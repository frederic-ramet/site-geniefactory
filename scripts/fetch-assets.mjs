#!/usr/bin/env node
/**
 * scripts/fetch-assets.mjs
 *
 * Scrape geniefactory.fr (Framer), download all images + video,
 * convert to WebP with sharp, and save under public/images/.
 *
 * Prerequisites (run once):
 *   npm install sharp node-fetch cheerio     (or use the --fetch flag below)
 *
 * Usage:
 *   node scripts/fetch-assets.mjs
 *
 * Options (env vars):
 *   DRY_RUN=1   — list URLs only, don't download
 *   FORCE=1     — re-download already existing files
 */

import { createWriteStream, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pipeline } from 'node:stream/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');

const DRY = process.env.DRY_RUN === '1';
const FORCE = process.env.FORCE === '1';

// ---------------------------------------------------------------------------
// 1. Dynamic imports (installed separately to not bloat next.js deps)
// ---------------------------------------------------------------------------
let fetch, cheerio, sharp;
try {
  ({ default: fetch } = await import('node-fetch'));
} catch {
  console.error('\n  ERROR: node-fetch not found. Run:\n\n    npm install node-fetch cheerio sharp\n');
  process.exit(1);
}
try {
  cheerio = await import('cheerio');
} catch {
  console.error('\n  ERROR: cheerio not found. Run:\n\n    npm install node-fetch cheerio sharp\n');
  process.exit(1);
}
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('  WARN: sharp not found — images will be saved as-is (no WebP conversion).');
  sharp = null;
}

// ---------------------------------------------------------------------------
// 2. Asset mapping: [remoteUrlPattern, localPath, description]
//    We'll auto-discover more from the HTML, but these are the critical ones
//    with their correct target paths according to README.md.
// ---------------------------------------------------------------------------
const KNOWN_TARGETS = {
  // Logos — matched by page role or file name hint in URL
  'logo': 'images/logo.png',
  'logo-mark': 'images/logo-mark.png',

  // Steps (How it works section)
  'etabli': 'images/steps/etabli.png',
  'forge': 'images/steps/forge.png',
  'evaluation': 'images/steps/evaluation.png',
  'communaute': 'images/steps/communaute.png',

  // Platform screenshot
  'platform': 'images/platform-screenshot.png',
  'screenshot': 'images/platform-screenshot.png',

  // Testimonials
  'weiss': 'images/testimonials/weiss.jpg',
  'ly': 'images/testimonials/ly.jpg',

  // Demo
  'demo': 'images/demo-thumb.jpg',
  'thumb': 'images/demo-thumb.jpg',
};

// ---------------------------------------------------------------------------
// 3. Pages to scrape
// ---------------------------------------------------------------------------
const PAGES = [
  'https://www.geniefactory.fr/',
  'https://www.geniefactory.fr/portfolio',
  'https://www.geniefactory.fr/blog',
  'https://www.geniefactory.fr/aboutus',
];

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
};

// ---------------------------------------------------------------------------
// 4. Scrape all pages and collect media URLs
// ---------------------------------------------------------------------------
async function scrapePage(url) {
  console.log(`  Scraping ${url} …`);
  let html;
  try {
    const resp = await fetch(url, { headers: HEADERS, redirect: 'follow' });
    html = await resp.text();
  } catch (err) {
    console.warn(`  WARN: failed to fetch ${url}: ${err.message}`);
    return [];
  }

  const $ = cheerio.load(html);
  const urls = new Set();

  // img src and srcset
  $('img').each((_, el) => {
    const src = $(el).attr('src');
    if (src && src.includes('framerusercontent.com')) {
      // Strip query params to get full-res
      urls.add(src.split('?')[0]);
    }
    const srcset = $(el).attr('srcset');
    if (srcset) {
      srcset.split(',').forEach((part) => {
        const u = part.trim().split(' ')[0];
        if (u.includes('framerusercontent.com')) urls.add(u.split('?')[0]);
      });
    }
  });

  // background images in style attributes and inline <style> blocks
  const styleRe = /url\(['"](https:\/\/framerusercontent\.com[^'"?]+)['"?]/g;
  const fullHtml = html;
  let m;
  while ((m = styleRe.exec(fullHtml)) !== null) {
    urls.add(m[1].split('?')[0]);
  }

  // video src
  $('video source, video').each((_, el) => {
    const src = $(el).attr('src');
    if (src && (src.includes('framerusercontent.com') || src.endsWith('.mp4'))) {
      urls.add(src.split('?')[0]);
    }
  });

  return [...urls];
}

// ---------------------------------------------------------------------------
// 5. Determine best local path for a URL
// ---------------------------------------------------------------------------
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const usedPaths = new Map(); // url -> local path

function localPathFor(url, index) {
  // Check known targets
  for (const [hint, path] of Object.entries(KNOWN_TARGETS)) {
    if (url.toLowerCase().includes(hint)) {
      if (!usedPaths.has(url)) usedPaths.set(url, path);
      return path;
    }
  }

  // Auto-assign: images/auto/<slug>.<ext>
  const raw = url.split('/').pop() ?? `asset-${index}`;
  const name = slugify(raw.replace(/\.[^.]+$/, ''));
  const ext = extname(raw) || '.jpg';
  const path = `images/auto/${name || `asset-${index}`}${ext}`;
  usedPaths.set(url, path);
  return path;
}

// ---------------------------------------------------------------------------
// 6. Download + (optionally) convert to WebP
// ---------------------------------------------------------------------------
async function downloadAsset(url, localRel, idx) {
  const dest = join(PUBLIC, localRel);
  const destDir = dirname(dest);

  if (!FORCE && existsSync(dest)) {
    console.log(`  SKIP (exists): ${localRel}`);
    return;
  }

  if (DRY) {
    console.log(`  [dry] ${url}\n         → public/${localRel}`);
    return;
  }

  mkdirSync(destDir, { recursive: true });

  console.log(`  [${String(idx).padStart(3)}] Downloading → public/${localRel}`);
  let resp;
  try {
    resp = await fetch(url, { headers: HEADERS, redirect: 'follow' });
    if (!resp.ok) {
      console.warn(`  WARN: HTTP ${resp.status} for ${url}`);
      return;
    }
  } catch (err) {
    console.warn(`  WARN: fetch error for ${url}: ${err.message}`);
    return;
  }

  const isVideo = url.endsWith('.mp4') || url.endsWith('.webm');
  const isWebpTarget = !isVideo && sharp;

  if (isVideo) {
    const videoDir = join(PUBLIC, 'videos');
    mkdirSync(videoDir, { recursive: true });
    const videoDest = join(videoDir, 'demo.mp4');
    console.log(`  [${String(idx).padStart(3)}] Saving video → public/videos/demo.mp4`);
    const stream = createWriteStream(videoDest);
    await pipeline(resp.body, stream);
    return;
  }

  if (isWebpTarget) {
    // Convert to WebP
    const webpDest = dest.replace(/\.(png|jpg|jpeg|gif)$/i, '.webp');
    const webpRel = localRel.replace(/\.(png|jpg|jpeg|gif)$/i, '.webp');
    const buf = await resp.arrayBuffer();
    try {
      await sharp(Buffer.from(buf))
        .webp({ quality: 85, effort: 4 })
        .toFile(webpDest);
      console.log(`  [${String(idx).padStart(3)}] Converted  → public/${webpRel}`);
    } catch (e) {
      console.warn(`  WARN: sharp failed (${e.message}), saving original`);
      writeFileSync(dest, Buffer.from(buf));
    }
  } else {
    const stream = createWriteStream(dest);
    await pipeline(resp.body, stream);
  }
}

// ---------------------------------------------------------------------------
// 7. Main
// ---------------------------------------------------------------------------
async function main() {
  console.log('\n=== Genie Factory — asset scraper ===\n');

  if (DRY) console.log('  DRY RUN — no files will be written\n');

  // Collect all unique image URLs across all pages
  const allUrls = new Set();
  for (const page of PAGES) {
    const found = await scrapePage(page);
    found.forEach((u) => allUrls.add(u));
  }

  console.log(`\n  Found ${allUrls.size} unique media URLs\n`);

  const urlList = [...allUrls];
  for (let i = 0; i < urlList.length; i++) {
    const url = urlList[i];
    const localRel = localPathFor(url, i);
    await downloadAsset(url, localRel, i + 1);
  }

  // Print mapping summary
  console.log('\n=== URL → local path mapping ===\n');
  for (const [url, path] of usedPaths.entries()) {
    console.log(`  public/${path}`);
    console.log(`    ← ${url}\n`);
  }

  console.log(`\n=== Done — ${allUrls.size} assets processed ===\n`);
  console.log('  Next steps:');
  console.log('  1. Replace placeholder <PlaceholderImage> with next/image using these paths.');
  console.log('  2. Update public/images/og-default.svg → real screenshot (export as PNG 1200×630).');
  console.log('  3. Run: npm run build && npm run start\n');
}

main().catch((err) => {
  console.error('\nFatal:', err);
  process.exit(1);
});
