# Genie Factory — site web

Refonte du site [geniefactory.fr](https://www.geniefactory.fr/) en Next.js 14
(App Router) + TypeScript + Tailwind CSS + Framer Motion.

**Positionnement :** plateforme de transformation agentique pour PME et ETI.
Vocabulaire, contenu éditorial et stratégie GEO définis dans
[`CONTENT-BRIEF.md`](./CONTENT-BRIEF.md).

## Démarrer

```bash
npm install
npm run dev
```

Le site est ensuite accessible sur [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande                    | Action                                        |
|-----------------------------|-----------------------------------------------|
| `npm run dev`               | Serveur de développement                      |
| `npm run build`             | Build production (SSG)                        |
| `npm run start`             | Sert le build production                      |
| `npm run lint`              | Lint Next.js / ESLint                         |
| `npm run typecheck`         | Vérification TypeScript                        |
| `npm run validate:content`  | Valide YAML + frontmatter + vocabulaire       |

## Architecture contenu

**Tout le contenu éditorial vit dans `/content/`.** Aucune modification de
composant React n'est nécessaire pour ajouter un article, changer une FAQ ou
mettre à jour un témoignage.

```
content/
├── data/                         # YAML — validé par Zod au build
│   ├── nav.yml
│   ├── footer.yml
│   ├── seo.yml                   # Metas par page (title, description, h1)
│   ├── faq.yml                   # FAQ de la home
│   ├── gouvernance-faq.yml       # FAQ de /solutions/gouvernance-ia
│   ├── testimonials.yml          # avec `usable_publicly` (filtre dur)
│   ├── features.yml              # 6 blocs fonctionnalités
│   └── steps.yml                 # 4 étapes Comment ça marche
├── blog/                         # MDX — frontmatter enrichi (auteur, tags, schema)
│   ├── _template.md              # Template avec checklist GEO
│   └── <slug>.mdx
└── use-cases/
    └── <slug>.mdx
```

## Structure code

```
app/
  (site)/                         # Groupe de routes marketing (layout commun)
    page.tsx                      # /
    aboutus/page.tsx
    portfolio/page.tsx
    blog/page.tsx + [slug]/
    use-cases/[slug]/page.tsx
    solutions/gouvernance-ia/     # FAQPage + HowTo schemas
    programme-adopters/
  layout.tsx                      # Layout racine
  not-found.tsx                   # 404
  sitemap.ts + robots.ts
components/
  layout/                         # Navbar, Footer, Logo
  sections/                       # Sections de la home
  ui/                             # Primitives (Section, Reveal, JsonLd, AuthorBio…)
lib/
  data.ts                         # Loader YAML + schémas Zod
  content.ts                      # Loader MDX + schémas frontmatter
  schema.ts                       # Générateurs JSON-LD (Article, FAQPage, HowTo…)
  site.ts                         # Config technique (URL, email, calendar)
scripts/
  validate-content.mjs            # Validation YAML+MDX+vocabulaire (CI)
  fetch-assets.mjs                # Scrape + téléchargement assets Framer
  wire-images.mjs                 # Checklist assets attendus
```

## SEO / GEO

- **SSG** sur toutes les pages (`next build` → 20 routes prerendered)
- **Metas** dynamiques chargées depuis `content/data/seo.yml`
- **Schema.org** : Organization + WebSite au root, Article + FAQPage + HowTo
  générés depuis les frontmatters (voir `lib/schema.ts`)
- **Canonical URL** sur chaque page
- **robots.txt** autorise explicitement `GPTBot`, `ChatGPT-User`,
  `anthropic-ai`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`
- **Bing Webmaster Tools** : inscription à faire après déploiement (ChatGPT
  indexe via Bing — cf. [`CONTENT-BRIEF.md`](./CONTENT-BRIEF.md))

## Validation CI

`.github/workflows/validate-content.yml` exécute sur chaque PR :

1. `npm run validate:content` — YAML + MDX frontmatter + vocabulaire interdit
2. `npm run typecheck` — TypeScript strict

Un YAML cassé, une frontmatter invalide ou un terme banni (spec §1) bloque
le merge avant qu'il n'atteigne Vercel.

## Assets

À télécharger depuis [framerusercontent.com](https://framerusercontent.com/)
via `scripts/fetch-assets.mjs`. Liste complète et chemins cibles dans
[`CONTENT-BRIEF.md`](./CONTENT-BRIEF.md).

## Déploiement

- **Vercel** recommandé (Next.js + SSG + Image Optimization natifs)
- Domaine : `www.geniefactory.fr`
- Variables d'env : aucune pour l'instant (site statique)

## Ressources

- [`CONTENT-BRIEF.md`](./CONTENT-BRIEF.md) — brief éditorial complet à remplir
- Spec de refonte (Avril 2026) — fournie hors-repo
