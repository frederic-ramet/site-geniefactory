export type UseCase = {
  slug: string;
  title: string;
  client: string;
  category: string;
  excerpt: string;
};

export const useCases: UseCase[] = [
  {
    slug: 'actheos-rapprochement-transactions',
    title: 'Rapprochement automatique des transactions',
    client: 'Actheos',
    category: 'Finance',
    excerpt:
      "Détection et réconciliation des écarts en temps réel sur des volumes massifs de transactions.",
  },
  {
    slug: 'digitalisation-facturation',
    title: 'Digitalisation de la facturation fournisseurs',
    client: 'Industriel',
    category: 'Back-office',
    excerpt:
      "Extraction, contrôle et routage intelligent des factures via un agent documentaire.",
  },
  {
    slug: 'securite-industrielle',
    title: "Assistant sécurité industrielle",
    client: 'Energie',
    category: 'HSE',
    excerpt:
      "Copilote terrain pour le respect des procédures et l'analyse des incidents.",
  },
  {
    slug: 'tests-de-feu',
    title: "Automatisation des tests de feu",
    client: 'Matériaux',
    category: 'Qualité',
    excerpt:
      "Analyse automatique des campagnes de tests et génération des rapports réglementaires.",
  },
  {
    slug: 'recettes-traduction',
    title: 'Recettes et traduction multilingue',
    client: 'Agroalimentaire',
    category: 'R&D',
    excerpt:
      "Conversion des fiches recettes et traduction cohérente pour le déploiement international.",
  },
  {
    slug: 'data-ia',
    title: 'Data & IA — exploration augmentée',
    client: 'Assurance',
    category: 'Data',
    excerpt:
      "Interrogation en langage naturel des entrepôts de données et génération de visualisations.",
  },
  {
    slug: 'marketing-conversationnel',
    title: 'Marketing conversationnel',
    client: 'Retail',
    category: 'Marketing',
    excerpt:
      "Agents conversationnels qualifiant les leads et relayant vers les équipes commerciales.",
  },
  {
    slug: 'post-processeurs',
    title: 'Générateur de post-processeurs',
    client: 'Manufacturing',
    category: 'CAO/FAO',
    excerpt:
      "Création assistée de post-processeurs pour les machines-outils à partir de specs constructeurs.",
  },
  {
    slug: 'copilote-rh',
    title: 'Copilote RH pour les managers',
    client: 'Services',
    category: 'RH',
    excerpt:
      "Réponses instantanées aux questions RH avec sources et traçabilité des décisions.",
  },
];
