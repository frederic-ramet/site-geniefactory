# Contenu GenieFactory — Récap complet

**Dernière mise à jour :** 16 avril 2026

Ce dossier contient tout le contenu prêt à déposer dans `/content/` du projet Next.js.

---

## 📁 Structure complète

```
/content/
├── data/
│   ├── seo.yml              ✅ Metas SEO de chaque page
│   ├── nav.yml              ✅ Navigation principale
│   ├── footer.yml           ✅ Données du footer
│   ├── steps.yml            ✅ 4 étapes "Comment ça marche"
│   ├── features.yml         ✅ 6 blocs fonctionnalités
│   ├── testimonials.yml     ⚠️ Témoignages (voir QUESTIONS)
│   └── faq.yml              ⚠️ FAQ (voir QUESTIONS)
│
├── pages/
│   ├── aboutus.md           ⚠️ Page À propos (bios à compléter)
│   ├── gouvernance-ia.md    ✅ Landing page gouvernance
│   └── programme-adopters.md ✅ Landing page adopters
│
├── blog/
│   ├── transformation-agentique.md              ⚠️ P0 — À RELIRE
│   ├── transformation-agentique-vs-digitale.md  ⚠️ P1 — À RELIRE
│   ├── conformite-ai-act-2026.md                ⚠️ P1 — À VALIDER JURIDIQUEMENT
│   ├── passer-poc-ia-production.md              ⚠️ P1 — À RELIRE
│   ├── industrialiser-application-ia-entreprise.md ✅ (repris du site)
│   ├── methode-bmad-vibe-coding-software-engineering.md ✅ (repris du site)
│   ├── geniefactory-techinnov-2026.md           ✅ (repris du site)
│   └── croix-rouge.md                           ✅ (repris du site)
│
├── use-cases/
│   ├── actheos.md                       ✅
│   ├── digitalisation-facturation.md    ✅
│   ├── securite-industrielle.md         ⚠️ (Nexans — accord à vérifier)
│   ├── tests-feu.md                     ⚠️ (Nexans — accord à vérifier)
│   ├── recettes-traduction.md           ✅ (Groupe SEB)
│   ├── data-ia-diagnostic.md            ✅ (Axylis)
│   ├── marketing-conversationnel.md     ✅ (Qomod)
│   └── post-processeurs.md              ✅ (GO2cam)
│
└── ASSETS-TO-DOWNLOAD.md                ✅ Liste + script bash des images à récupérer
```

Légende : ✅ Prêt • ⚠️ Prêt mais nécessite relecture/validation

---

## 🔴 QUESTIONS — Informations qu'il me manque

### 1. Témoignages clients publiquement utilisables

D'après ta stratégie SEO, Nexans et Croix-Rouge ne sont **pas utilisables publiquement** (pas d'accord). Les clients utilisables sont :

- **Chambre des Notaires de Caen** — j'ai mis un placeholder, il me faut :
  - Nom de la personne qui témoigne
  - Son rôle
  - La citation
  - Une photo (ou juste un logo ?)

- **Doc'n Kit** — idem :
  - Nom, rôle, citation, photo/logo

Si tu n'as pas de citations, je peux juste lister les logos dans une section « Ils nous font confiance » sans témoignage textuel.

### 2. FAQ — validation des réponses

**Une seule réponse** est confirmée par le site V2 : celle de « Que se passe-t-il si le POC est concluant ? ». J'ai rédigé les 6 autres en cohérence avec la stratégie, mais elles ont besoin d'être relues/validées par l'équipe avant publication.

### 3. Bios équipe (page About)

Pour chacun des trois fondateurs, j'ai besoin d'une bio courte (3-5 lignes) :

- **Frédéric Ramet** (CEO) — parcours, expertise, ce qui le motive
- **Mazen Alsarem** (CTO) — j'ai « 20 ans de produits logiciels, LIRIS/CNRS » mais il faut étoffer
- **Paul Casado** (COO) — parcours, expertise

### 4. Use cases — accords clients

Les 4 use cases **Nexans, Axylis, Qomod, GO2cam, SEB** utilisent les noms de clients. À vérifier que tu as leur accord pour publication. Sinon, on peut anonymiser (ex : « Leader mondial du câble électrique CAC40 » au lieu de Nexans).

### 5. Articles blog stratégiques

J'ai rédigé 4 articles stratégiques (transformation agentique, agentique vs digitale, AI Act, POC to prod) en m'appuyant sur la stratégie SEO. Ils sont **signés Frédéric Ramet** par défaut. À valider :

- L'auteur correspond-il pour chaque article ?
- Les angles éditoriaux te conviennent-ils ?
- L'article AI Act doit absolument être relu par un juriste/DPO

### 6. Article sur les nouveaux articles — données spécifiques GenieFactory

La stratégie SEO mentionne :
- « étude 200 projets B2B » (benchmarks ROI)
- « cas supply chain ETI industrielle avec 5-10 M€ d'impact »
- « framework ICPC (Identifier, Cadrer, Produire, Capitaliser) »

J'ai utilisé ICPC dans les articles (en cohérence avec la stratégie). Si ces données internes existent vraiment (étude, cas concret), il faudrait m'envoyer les détails pour les intégrer — ça renforce énormément l'autorité SEO/GEO.

### 7. Mentions légales et politique de confidentialité

Je n'ai pas rédigé ces pages — elles nécessitent :
- Nom commercial, SIRET, siège social
- Hébergeur (Vercel ? VPS ?)
- DPO si applicable
- Détails sur les cookies et analytics prévus

### 8. Chambre des Notaires de Caen + Doc'n Kit — cas d'usage

La stratégie SEO dit que ces deux clients sont « en production ». Mais on n'a pas de cas d'usage détaillé pour eux. Si tu veux les valoriser :

- Quel est leur cas d'usage ?
- Peut-on en faire un 9e et 10e cas (en plus des 8 existants) ?

---

## 🟡 Points d'attention pour le dev

1. **Tous les textes sont en français.** La version EN (si prévue) nécessitera une traduction.
2. **Le nom du produit dans les fichiers existants du site mélange "Genie Factory" et "GenieFactory".** J'ai uniformisé vers **GenieFactory** (un mot) dans les nouveaux contenus. À trancher définitivement avec le client.
3. **Dates :** les articles repris du site portent leurs dates d'origine. Les nouveaux articles sont datés du 15 avril 2026 — à ajuster selon la date réelle de publication.
4. **Termes interdits** (stratégie SEO V2) : "no-code", "low-code", "en 24h", "sans développeur", "transformation digitale" (sauf pour s'en démarquer). J'ai nettoyé les nouveaux contenus, mais **à vérifier sur les articles repris du site** (notamment Techinnov qui contenait "sans équipe tech dédiée").

---

## 📊 Résumé chiffré

- **8 cas d'usage** complets
- **8 articles de blog** (4 repris + 4 stratégiques nouveaux)
- **3 pages statiques** (About, Gouvernance, Adopters)
- **7 fichiers YML** de données structurées
- **1 doc assets** avec ~45 URLs d'images à télécharger + script bash
- **1 vidéo démo** à migrer

Temps estimé pour Claude Code pour intégrer tout ce contenu : **3-4h** (parsing YML, génération pages dynamiques, téléchargement images, optimisation WebP).

---

## ✅ Checklist finale pour toi

- [ ] Relire les 4 articles stratégiques nouveaux (transformation-agentique, agentique-vs-digitale, AI Act, poc-to-prod)
- [ ] Faire valider l'article AI Act par un juriste/DPO
- [ ] Fournir les témoignages Chambre des Notaires + Doc'n Kit (ou confirmer qu'on affiche juste les logos)
- [ ] Valider les réponses FAQ (6 sur 7 sont rédigées par moi)
- [ ] Compléter les bios des 3 fondateurs
- [ ] Vérifier les accords clients pour tous les cas d'usage nommés (Nexans, SEB, Axylis, Qomod, GO2cam, Spirit, Actheos)
- [ ] Rédiger les mentions légales + politique de confidentialité
- [ ] Uniformiser "GenieFactory" vs "Genie Factory" (choix client)
- [ ] Exécuter le script de téléchargement des images
