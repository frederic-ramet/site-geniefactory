export type FAQItem = {
  question: string;
  answer: string;
};

export const faq: FAQItem[] = [
  {
    question: 'Que se passe-t-il si le POC est concluant ?',
    answer:
      "Le prototype peut être industrialisé directement sur la plate-forme : durcissement, intégration aux systèmes existants, mise en production. Rien ne se perd entre le POC et le run.",
  },
  {
    question: 'Comment justifier le ROI d\'un POC ?',
    answer:
      "Chaque POC produit des KPIs suivis en continu dès la phase d'évaluation. Vous disposez d'indicateurs d'impact (temps gagné, taux d'adoption, qualité) pour arbitrer en toute transparence.",
  },
  {
    question: 'Combien de temps pour obtenir un prototype ?',
    answer:
      "Moins de 24h entre le brief initial et un prototype testable par les équipes métier — contre 8 à 10 semaines en approche classique.",
  },
  {
    question: 'Est-ce que la solution est sécurisée ?',
    answer:
      "Oui. Conformité by design : RBAC, journalisation, traçabilité, alignement AI Act. Les données restent dans votre périmètre, hébergement souverain possible.",
  },
  {
    question: 'Faut-il une équipe technique ?',
    answer:
      "Non. Genie Factory est pensée pour les équipes métier. Un accompagnement technique est disponible pour les intégrations avancées ou les mises en production.",
  },
  {
    question: 'Peut-on intégrer nos outils existants ?',
    answer:
      "Oui — ERP, GED, API internes, workflows. Les connecteurs sont configurables depuis l'interface, sans développement spécifique dans la majorité des cas.",
  },
  {
    question: "Quels types de cas d'usage ?",
    answer:
      "Automatisation documentaire, assistants métier, copilotes, RAG, analyse augmentée, orchestration multi-agents. Cf. la section Cas d'usage pour des exemples concrets.",
  },
];
