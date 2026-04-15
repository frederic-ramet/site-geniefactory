# Brief de contenu — à remplir par l'équipe Genie Factory

Ce document liste **tout ce qui est attendu côté rédaction / asset** pour que
le site passe en production. Le scaffolding technique est prêt : il manque
uniquement le contenu éditorial et les validations juridiques.

Chaque section indique : **où** déposer le contenu, **quel format**, et
**quels contrôles** sont automatiquement appliqués à la soumission (via
`npm run validate:content` ou la GitHub Action `Validate content`).

---

## 1. Témoignages clients `/content/data/testimonials.yml`

**Priorité : P0 (bloque l'affichage d'une section de la home).**

Actuellement la section "Témoignages" est en état d'attente (`TestimonialsWaitingState`).
Dès qu'un témoignage est fourni avec `usable_publicly: true`, il s'affiche.

**Clients cibles** (les seuls cleared pour affichage public d'après la spec §12) :

### Témoignage 1 — Chambre des Notaires de Caen
- Nom de la personne citée :
- Poste exact :
- Photo (JPG, ~800×800px, fond neutre de préférence) → `/public/images/testimonials/notaires-caen.jpg`
- Citation (2-4 lignes, style direct, éviter les superlatifs) :
- Accord signé pour publication publique : oui / non

### Témoignage 2 — Doc'n Kit
- Nom de la personne citée :
- Poste exact :
- Photo → `/public/images/testimonials/docnkit.jpg`
- Citation :
- Accord signé pour publication publique : oui / non

Une fois reçu, remplacer les blocs commentés en bas de `testimonials.yml` et passer
`usable_publicly: true`. La section bascule automatiquement en mode "afficher".

---

## 2. Articles de blog `/content/blog/*.mdx`

**Tous les articles sont actuellement en `draft: true`** (ils n'apparaissent ni sur
`/blog` ni dans le sitemap). Pour publier : remplir le contenu puis passer
`draft: false` (ou supprimer la ligne).

### Template à suivre
`content/blog/_template.md` — contient la checklist GEO complète (H2/H3 en format
question, réponses directes, stats, auteur E-E-A-T).

### Liste des articles à produire

| Priorité | Slug | Prompt LLM cible | Longueur cible |
|---|---|---|---|
| P0 | `transformation-agentique` | "C'est quoi la transformation agentique ?" | 1200-1500 mots — article fondateur |
| P1 | `transformation-agentique-vs-digitale` | "Transformation agentique vs transformation digitale" | 800-1000 mots |
| P1 | `conformite-ai-act-2026` | "Comment être conforme AI Act pour mes applications IA ?" | 1000-1200 mots |
| P1 | `passer-poc-ia-production` | "Comment passer d'un POC IA à la production ?" | 1000-1200 mots |
| P2 | `reussir-poc-ia-entreprise` | "Réussir un POC IA en entreprise" | 800-1000 mots |
| P2 | `roi-poc-ia` | "ROI d'un POC IA comment le calculer" | 1000-1200 mots — inclure modèle de calcul |
| P2 | `framework-identifier-cadrer-produire-capitaliser` | "framework transformation agentique" | 1000-1200 mots |
| P2 | `diagnostic-supply-chain-ia` | "diagnostic supply chain IA ETI industrielle" | 800-1000 mots |
| P3 | `application-ia-sans-lock-in` | "application IA entreprise sans lock-in" | 800-1000 mots |

### Pour chaque article, attendu :
- **Titre final** (inclure le mot-clé cible)
- **Description** (150-160 caractères, réponse au prompt en 1 phrase)
- **Auteur** : nom complet + poste + bio courte 2 lignes + URL LinkedIn
- **Image d'entête** : 1600×900px WebP → `/public/images/blog/<slug>.webp`
- **Corps de l'article** avec a minima :
  - 1 stat interne (chiffre maison issu de notre expérience)
  - 1 stat marché sourcée (lien externe vers la source)
  - 1 comparaison chiffrée (avant/après, nous/concurrence…)
  - H2/H3 en format question quand pertinent
  - Réponse directe en 1ʳᵉ phrase après chaque header-question

---

## 3. Cas d'usage `/content/use-cases/*.mdx`

**9 cas d'usage** avec frontmatter complet + corps "À compléter".

Sauf pour les 2 premiers (`actheos-rapprochement-transactions` et `copilote-rh`
qui ont du contenu d'exemple), chaque fichier a 3 sections à remplir : Contexte,
Approche, Résultats.

### Pour chaque cas, attendu :
- **Autorisation du client** : OK pour affichage nominatif ? Sinon utiliser
  un nom générique (déjà le cas pour la plupart — "Industriel", "Retail" etc.)
- **Image** : 1600×900px JPG ou WebP → `/public/images/use-cases/<slug>.jpg`
- **Contexte** : 3-5 lignes, besoin métier + volumétrie
- **Approche** : 4-6 lignes, briques IA mobilisées + intégrations
- **Résultats** : 3 bullets chiffrés (impact mesurable)

Liste des slugs (1 fichier MDX par slug, déjà présents) :
- `actheos-rapprochement-transactions` ✅ (exemple rempli)
- `copilote-rh` ✅ (exemple rempli)
- `digitalisation-facturation` — À remplir
- `securite-industrielle` — À remplir
- `tests-feu` — À remplir
- `recettes-traduction` — À remplir
- `data-ia-diagnostic` — À remplir
- `marketing-conversationnel` — À remplir
- `post-processeurs` — À remplir

---

## 4. Assets visuels `/public/images/`

Reprise de la liste déjà partagée avec le stagiaire — voir commit précédent.
Ajouts spécifiques à cette itération :

### Images blog (9)
- `/public/images/blog/transformation-agentique.webp` — illustration article fondateur
- `/public/images/blog/transformation-agentique-vs-digitale.webp`
- `/public/images/blog/conformite-ai-act-2026.webp`
- `/public/images/blog/passer-poc-ia-production.webp`
- `/public/images/blog/reussir-poc-ia-entreprise.webp`
- `/public/images/blog/roi-poc-ia.webp`
- `/public/images/blog/framework-icpc.webp`
- `/public/images/blog/diagnostic-supply-chain-ia.webp`
- `/public/images/blog/application-ia-sans-lock-in.webp`

Format conseillé : WebP, 1600×900, <200 KB par image.

### Images OG (partage réseaux sociaux) — 6
- `/public/images/og/home.webp` (1200×630)
- `/public/images/og/portfolio.webp`
- `/public/images/og/blog.webp`
- `/public/images/og/about.webp`
- `/public/images/og/gouvernance.webp`
- `/public/images/og/adopters.webp`

Template : logo + titre de la page + sous-titre, fond à la charte.

---

## 5. Contenu à valider / modifier directement dans les YAML

Les fichiers suivants peuvent être édités sans intervention technique.
La CI GitHub (`Validate content`) alertera automatiquement si le format est cassé.

### `/content/data/seo.yml`
- Tous les titles et descriptions sont alignés sur la spec §4/§5
- À relire avant déploiement — notamment `description` de `home` pour le snippet Google

### `/content/data/faq.yml`
- 7 questions issues de la spec §4.8
- Les formulations ont été orientées GEO (questions telles que posées à un LLM)
- À valider / reformuler si besoin par le métier

### `/content/data/gouvernance-faq.yml`
- 5 questions dédiées à la page `/solutions/gouvernance-ia`
- Génère automatiquement le schema `FAQPage` pour le SEO/GEO

### `/content/data/features.yml`
- 6 blocs, dont un ajout explicite "Propriété du code" (aligné avec le
  positionnement "sans lock-in" de la spec §1)

### `/content/data/steps.yml`
- Les 4 étapes (Établi, Forge, Évaluation, Communauté) — inchangées sauf
  reformulation pour enlever le vocabulaire interdit

### `/content/data/footer.yml`
- 3 sections (Produit / Ressources / Contact)
- Vérifier le lien Google Calendar `demoUrl` dans `lib/site.ts` — actuellement
  un placeholder, à remplacer par l'URL réelle.

---

## 6. Checklist de validation avant déploiement

```bash
# 1. Contenu valide (frontmatter, YAML, vocabulaire)
npm run validate:content

# 2. TypeScript OK
npm run typecheck

# 3. Build production
npm run build

# 4. Lighthouse > 90 sur les 4 métriques (à vérifier sur Vercel preview)
```

**Actions hors-code à mener par l'équipe** :

- [ ] Inscrire le site à **Bing Webmaster Tools** (prérequis GEO — ChatGPT
      indexe via Bing)
- [ ] Soumettre `sitemap.xml` à Google Search Console et Bing
- [ ] Vérifier l'indexation des 20 pages après mise en ligne
- [ ] Remplacer l'URL Google Calendar placeholder dans `lib/site.ts`
- [ ] Fournir les photos et citations des 2 témoignages publics
- [ ] Décider si un cookie banner RGPD est nécessaire (dépend des analytics)

---

## 7. Suivi des prompts cibles (opérationnel, mensuel)

Pour chaque prompt listé dans la spec §6, poser manuellement la question à
ChatGPT / Claude / Perplexity une fois par mois après mise en ligne. Noter
si Genie Factory est cité dans la réponse, et sur quelle source. C'est le
seul vrai KPI GEO — il n'existe pas d'outil grand public pour l'instant.

| Prompt | ChatGPT cite ? | Perplexity cite ? | Claude cite ? |
|---|---|---|---|
| "C'est quoi la transformation agentique ?" | | | |
| "Transformation agentique vs transformation digitale" | | | |
| "Comment passer d'un POC IA à la production ?" | | | |
| "Comment industrialiser une application IA métier ?" | | | |
| "Comment être conforme AI Act pour mes applications IA ?" | | | |
| "Application IA entreprise sans lock-in" | | | |
| "ROI d'un POC IA comment le calculer" | | | |

Si un prompt ne cite pas Genie Factory après 3 mois → retoucher l'article
correspondant (champ `updated` dans le frontmatter → bénéfice fraîcheur GEO).
