#!/bin/bash
# Télécharge uniquement les images MANQUANTES sur le site local.
# À exécuter depuis la racine du projet : bash scripts/download-missing-assets.sh
# (Le réseau Cowork est bloqué sur framerusercontent.com — à lancer en local.)

set -e

mkdir -p public/images/{icons,use-cases,testimonials,team,about,faq,hero,blog}

cd public

# --- Logos manquants ---
curl -fL -o images/logo-icon.png      "https://framerusercontent.com/images/C8X2h1q289FnO4B4lu4ErWh2oAg.png"
curl -fL -o images/logo-linkedin.png  "https://framerusercontent.com/images/ErZcBg2rF022rleE7kbdugRB0o.png"
curl -fL -o images/hero-platform.png  "https://framerusercontent.com/images/KL4yTEQ9SIsT9E2IQs8MOOr76o.png"

# --- Icônes features (6) ---
curl -fL -o images/icons/specs.png        "https://framerusercontent.com/images/BP5SMHuPMOMRSmfwEQYyuFWsIlc.png"
curl -fL -o images/icons/cycle.svg        "https://framerusercontent.com/images/JYARhPqc5xALFU3Y1IMmNxkrzs.svg"
curl -fL -o images/icons/components.png   "https://framerusercontent.com/images/TFk12gqRMU0v6xMb20a7wrRszg.png"
curl -fL -o images/icons/integration.jpg  "https://framerusercontent.com/images/K5QC1HkIwdkl1dMvW9TeV01c3bE.jpg"
curl -fL -o images/icons/governance.svg   "https://framerusercontent.com/images/0d7ZL8Uxv83zsnJus7aGPzM1kYA.svg"
curl -fL -o images/icons/prototype.svg    "https://framerusercontent.com/images/Aj9D1OfKagCqCC1j1U8nbMkIU.svg"

# --- Use-cases (carrousel home) — doublons possibles avec /cas-clients/ mais noms différents ---
curl -fL -o images/use-cases/actheos-logo.png              "https://framerusercontent.com/images/5v0TYABths0G3fh41QsXwrXuB0g.png"
curl -fL -o images/use-cases/actheos.jpg                   "https://framerusercontent.com/images/RwaYsXZlR2Gv9CGtu0IpB4BcTnM.jpg"
curl -fL -o images/use-cases/digitalisation-facturation.jpg "https://framerusercontent.com/images/2GIRxwSdsIjH3y6xJp6afHSWc.jpg"
curl -fL -o images/use-cases/securite-industrielle.png     "https://framerusercontent.com/images/ffIf55mA8WcLmBmRxuant6AgGU.png"
curl -fL -o images/use-cases/recettes-traduction.png       "https://framerusercontent.com/images/QjZHFO973IEt5kY3ELiHfXmmQLU.png"
curl -fL -o images/use-cases/data-ia.webp                  "https://framerusercontent.com/images/6UOyM5drurlDMA7z2hMoY4J0.webp"
curl -fL -o images/use-cases/marketing.svg                 "https://framerusercontent.com/images/T6hsVY06bB4x6gXS2l6kSol7StY.svg"
curl -fL -o images/use-cases/post-processeurs.png          "https://framerusercontent.com/images/d9es18uSpBryYl9W4tAI4jW6Zo.png"

# --- Testimonials (noms canoniques) ---
curl -fL -o images/testimonials/sebastien-weiss.jpg "https://framerusercontent.com/images/kAftuUN9iRKwIt9M6RqZo9NS314.jpg"
curl -fL -o images/testimonials/pierre-ly.jpg       "https://framerusercontent.com/images/7ckekOZAa0J28C2T3IfYTvNDv5U.jpg"

# --- Équipe (page About) ---
curl -fL -o images/team/frederic-ramet.png "https://framerusercontent.com/images/QM7BAJs1nPv6WajCGxBCRq94E5k.png"
curl -fL -o images/team/mazen-alsarem.png  "https://framerusercontent.com/images/dXxkw3jlimZh2bUcucInYCMpciI.png"
curl -fL -o images/team/paul-casado.png    "https://framerusercontent.com/images/v52YNyVaDqCNngHhvuxzE2NMoxc.png"

# --- About (illustrations) ---
curl -fL -o images/about/mission.png  "https://framerusercontent.com/images/brgsnjsDanqbSjrmZST6HzZFWus.png"
curl -fL -o images/about/histoire.png "https://framerusercontent.com/images/lgP5t5vDZPZ500HhFj82L6mqhSU.png"
curl -fL -o images/about/valeurs.png  "https://framerusercontent.com/images/Ebx7pqRkaegaomwmpotHwHSORs.png"

# --- FAQ ---
curl -fL -o images/faq/question-mark.png "https://framerusercontent.com/images/6Zh3JjIkAEJIGnC08NBsfSeTB4.png"

# --- Hero ---
curl -fL -o images/hero/chat-icon.png "https://framerusercontent.com/images/lKaaStgbmdIe8TfrIkFlKzHazV0.png"

# --- Blog (articles historiques à conserver) ---
curl -fL -o images/blog/industrialiser-ia.png "https://framerusercontent.com/images/OpuG30IpGrWoxCo92gb4Mw.png"
curl -fL -o images/blog/bmad.png              "https://framerusercontent.com/images/ucbiFrrbvDNxQnViT5po1fvlLw.png"
curl -fL -o images/blog/techinnov.jpeg        "https://framerusercontent.com/images/HxnliDWtLXnLs3eQOB19ipwXPE.jpeg"
curl -fL -o images/blog/croix-rouge.png       "https://framerusercontent.com/images/0uGznIDV58PutfG2JX5u5pdEw0.png"

echo ""
echo "✅ Téléchargement terminé."
echo "Conversion WebP recommandée (brew install webp) :"
echo '  find public/images -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -exec sh -c '"'"'cwebp -q 85 "$1" -o "${1%.*}.webp"'"'"' _ {} \;'
