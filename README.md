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

- **SSG** sur toutes les pages (`next build` → 25+ routes prerendered)
- **Metas** dynamiques chargées depuis `content/data/seo.yml`
- **Schema.org** : Organization + WebSite au root, Article + FAQPage + HowTo
  + Service générés depuis les frontmatters (voir `lib/schema.ts`)
- **Canonical URL** sur chaque page
- **robots.txt** autorise explicitement `GPTBot`, `ChatGPT-User`,
  `anthropic-ai`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, `CCBot`
- **Bing Webmaster Tools** : inscription à faire après déploiement (ChatGPT
  indexe via Bing — cf. [`CONTENT-BRIEF.md`](./CONTENT-BRIEF.md))

Les sections ci-dessous détaillent la passe V2 d'avril 2026 : stratégie SEO,
implémentation SEO et implémentation technique associée.

## Stratégie SEO (V2 — avril 2026)

Spec source : [`SOURCES/GenieFactory_Strategie_SEO_V2_Avril2026.md`](./SOURCES/GenieFactory_Strategie_SEO_V2_Avril2026.md).

**Positionnement.** GenieFactory crée et occupe la catégorie **« transformation
agentique »** — volontairement distincte de « no-code / low-code »,
« déployer en 24h », « agence IA ». Le vocabulaire interdit est listé dans la
spec §2 et contrôlé automatiquement par le validateur (`npm run validate:content`).

**Clusters de contenu.**

| Cluster | Thème | Pages clés |
|---------|-------|-----------|
| 0 | Transformation agentique (hub catégorie) | `/transformation-agentique`, article pilier, ICPC, Knowledge Graph |
| A | Gouvernance IA et AI Act | `/solutions/gouvernance-ia`, conformité AI Act 2026 |
| B | Industrialisation et POC production | Articles POC → production, ROI POC, application sans lock-in |
| C | Méthodes et frameworks | Framework ICPC, réussir POC entreprise |
| D | Verticale publique / sécurité | Cas Croix-Rouge, diagnostic supply chain |
| E | Verticale immobilier | Cas Spirit Immo |
| F | Verticale comptable / notariat | Cas Actheos, cas Marianne Notaires, landings `/solutions/notariat` et `/solutions/finance-comptabilite` |
| G | Intégration LLM (Claude, GPT, Mistral) | `/solutions/claude-entreprise`, article pilier `industrialiser-agent-claude`, comparatif `claude-vs-gpt-entreprise` |

**Intentions de recherche ciblées.** Décideurs PME/ETI cherchant à industrialiser
l'IA métier (« industrialiser agent IA », « transformation agentique entreprise »,
« intégrer Claude en entreprise », « IA cabinet comptable », « agent IA notariat »,
« AI Act obligations 2026 ») — pas les recherches outils grand public.

**GEO (Generative Engine Optimization).** Le site est conçu pour être cité par
les moteurs génératifs (ChatGPT, Claude, Perplexity, Gemini) autant que pour
ranker sur Google. Règles appliquées : réponse directe en haut de page,
sources nommées, chiffres datés, FAQ structurée, schema.org couvrant.

## Implémentation SEO

**Metas et canonical.** Chaque page appelle `getSeoFor('<slug>')` depuis
`lib/data.ts` pour produire title, description, OG et canonical depuis
`content/data/seo.yml` (schéma Zod).

**JSON-LD par type de page.**

| Page | Schemas injectés |
|------|-----------------|
| Home (`/`) | `Organization` + `WebSite` (via `app/layout.tsx`) |
| Articles blog | `Article` + `FAQPage` (si `faq:` présente dans la frontmatter) |
| `/solutions/gouvernance-ia` | `FAQPage` + `HowTo` |
| `/transformation-agentique` | `FAQPage` |
| `/solutions/*` (notariat, finance-comptabilite, claude-entreprise) | `FAQPage` |
| `/portfolio`, `/blog` | `CollectionPage` |

Tous les générateurs sont dans `lib/schema.ts`, injectés via le composant
`<JsonLd>`.

**FAQ dual-canal.** Les FAQ sont rendues deux fois :
(1) en HTML visible (élément `<dl>` sémantique sur les articles, composant
`<FAQ>` sur les landings) pour l'utilisateur et le crawl classique ;
(2) en JSON-LD `FAQPage` pour les moteurs génératifs et les rich results.
Le même contenu alimente les deux canaux — une source unique dans le
frontmatter MDX (`faq:`) ou un YAML dédié (`*-faq.yml`).

**Vocabulaire interdit.** Le script `scripts/validate-content.mjs` grep
les termes bannis de la V2 (« sans équipe technique », « sans développeur »,
« en 24h », « no-code », « agence IA »…) sur `content/` — hors `SOURCES/`
qui contient les archives stratégiques. Un hit bloque la CI.

**Robots et sitemap.**

- `app/robots.ts` autorise les bots IA listés plus haut et délègue le
  crawl général à Google.
- `app/sitemap.ts` liste les routes statiques + les articles blog + les
  cas clients générés depuis le filesystem. Les 4 nouvelles pages V2
  (`/transformation-agentique`, `/solutions/notariat`,
  `/solutions/finance-comptabilite`, `/solutions/claude-entreprise`) y
  sont ajoutées avec priority 0.8–0.9.

**Liens internes.** Maillage explicite entre hub, articles pilier et
landings vertical/LLM. Chaque nouvelle page référence au minimum un
article pilier et une page sœur — couverture cluster plutôt que
silos isolés.

## Implémentation technique (passe V2)

Périmètre de la session : intégration complète de la stratégie SEO V2 et
création des 6 deliverables P1 hors périmètre initial.

**Modifications sur contenu existant.**

- `content/blog/geniefactory-techinnov-2026.mdx`, `passer-poc-ia-production.mdx` —
  suppression des termes bannis V2.
- `content/blog/transformation-agentique.mdx`, `conformite-ai-act-2026.mdx`,
  `reussir-poc-ia-entreprise.mdx`, `passer-poc-ia-production.mdx` — ajout
  FAQ frontmatter (8 à 9 Q/R chacune).
- `components/sections/ChatDemo.tsx` — exemple aligné sur cas Actheos
  (rapprochement bancaire) plutôt que « copilote RH ».
- `components/sections/HowItWorks.tsx` — titre aligné sur le positionnement
  « industrialiser agents IA métier ».
- `lib/content.ts` + `app/(site)/blog/[slug]/page.tsx` — ajout du champ
  `faq` dans le schéma Zod du blog et rendu HTML + JSON-LD associés.

**Pages créées (6 deliverables P1).**

| Route | Type | Schema | FAQ |
|-------|------|--------|-----|
| `/transformation-agentique` | Hub catégorie | WebPage + FAQPage | 9 Q/R |
| `/solutions/notariat` | Landing verticale | Service + FAQPage | 8 Q/R |
| `/solutions/finance-comptabilite` | Landing verticale | Service + FAQPage | 9 Q/R |
| `/solutions/claude-entreprise` | Landing LLM (cluster G) | Service + FAQPage | 9 Q/R |
| `/blog/industrialiser-agent-claude` | Article pilier cluster G | Article + FAQPage | 8 Q/R |
| `/blog/claude-vs-gpt-entreprise` | Article comparatif décideur | Article + FAQPage | 8 Q/R |

**Patterns appliqués sur chaque landing.**

- `generateMetadata()` depuis `getSeoFor(slug)` + `og_image` optionnelle.
- `<PageHeader>` avec eyebrow / h1 / description + 2 CTAs (démo + article
  pilier croisé).
- Sections `<Section>` pour cas d'usage, méthode ICPC, garde-fous,
  intégrations SI, propriété du code.
- `<FAQ>` + `<JsonLd data={faqPageSchema(...)} />` pour le dual-canal.

**Intégrations nav et sitemap.**

- `content/data/nav.yml` — ajout « Transformation agentique » en tête de
  navigation primaire.
- `content/data/footer.yml` — nouvelle section « Solutions » listant
  notariat, comptable et Claude en entreprise.
- `app/sitemap.ts` — 4 routes statiques ajoutées avec les priorités
  appropriées.

**Visuels articles cluster G.**

Les 2 articles cluster G ont des images générées en style GenieFactory
(fond navy, isométrique 3D, glow corail) redimensionnées à 1600px et
encodées webp q85 :
- `/public/images/blog/industrialiser-agent-claude.webp`
- `/public/images/blog/claude-vs-gpt-entreprise.webp`

Les 4 landings et le hub utilisent l'OG par défaut du site — pas de
visuel dédié (optionnel, à ajouter si besoin).

**Vérification de non-régression.**

- `npx tsc --noEmit` — pas d'erreurs
- `npx next lint` — clean
- Parsing Zod sur les 15 articles MDX — tous valides
- Parsing YAML sur les 4 nouveaux `*-faq.yml` + `seo.yml` + `nav.yml` +
  `footer.yml` — tous valides
- Grep vocabulaire interdit sur `content/` (hors `SOURCES/`) — 0 occurrence

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
