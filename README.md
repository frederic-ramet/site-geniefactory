# Genie Factory — site web

Refonte du site [geniefactory.fr](https://www.geniefactory.fr/) en Next.js 14
(App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Démarrer

```bash
npm install
npm run dev
```

Le site est ensuite accessible sur [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande            | Action                                |
|---------------------|---------------------------------------|
| `npm run dev`       | Lance le serveur de développement      |
| `npm run build`     | Build production (SSG)                |
| `npm run start`     | Sert le build production              |
| `npm run lint`      | Lint Next.js / ESLint                 |
| `npm run typecheck` | Vérification TypeScript (sans emit)   |

## Structure

```
app/                       # App Router Next.js
  (site)/                  # Groupes de routes marketing
    page.tsx               # /
    aboutus/page.tsx       # /aboutus
    portfolio/page.tsx     # /portfolio
    blog/
      page.tsx             # /blog
      [slug]/page.tsx      # /blog/:slug
    use-cases/[slug]/page.tsx
  layout.tsx               # Layout racine (fonts, meta)
  not-found.tsx            # 404 personnalisée
  sitemap.ts               # Sitemap dynamique
  robots.ts                # robots.txt
components/
  layout/                  # Navbar, Footer
  sections/                # Sections de la home
  ui/                      # Primitives (Button, Card, Section…)
content/
  blog/                    # MDX articles
  use-cases/               # MDX cas d'usage
lib/                       # Helpers (content, metadata)
public/
  images/                  # Assets statiques (logos, screenshots…)
```

## Gestion du contenu

Les articles de blog et les cas d'usage sont stockés en **MDX** dans
`content/blog` et `content/use-cases`. Chaque fichier contient un frontmatter
YAML (titre, date, image, extrait, catégorie) et le corps de l'article.
Cf. `lib/content.ts` pour le chargement.

## Assets

Les assets du site Framer d'origine doivent être téléchargés et placés dans
`public/images/`. Une version de secours (SVG) est utilisée tant que les
fichiers sont absents — cf. `components/ui/PlaceholderImage.tsx`.

Assets attendus :

- `public/images/logo.svg` + `public/images/logo-mark.svg`
- `public/images/platform-screenshot.png`
- `public/images/steps/{etabli,forge,evaluation,communaute}.png`
- `public/images/features/feature-{1..6}.png`
- `public/images/use-cases/{slug}.jpg`
- `public/images/testimonials/{weiss,ly}.jpg`
- `public/videos/demo.mp4` + `public/images/demo-thumb.jpg`

## Déploiement

Prévu sur Vercel. `npm run build` génère des pages statiques (SSG) pour les
routes marketing — cf. `generateStaticParams` des routes dynamiques.
