export const siteConfig = {
  name: 'Genie Factory',
  title: 'Genie Factory — La plate-forme IA pour industrialiser vos applications',
  description:
    'Genie Factory transforme vos besoins métier en prototypes IA testables en moins de 24h. Spécifications, génération de code, évaluation et marketplace de composants IA.',
  url: 'https://www.geniefactory.fr',
  email: 'contact@geniefactory.fr',
  linkedin: 'https://www.linkedin.com/company/geniefactory/',
  demoUrl:
    'https://calendar.google.com/calendar/u/0/appointments/schedules/placeholder',
  address: {
    street: '12 avenue des Prés',
    postalCode: '78180',
    city: 'Montigny-le-Bretonneux',
    country: 'France',
  },
} as const;

export type SiteConfig = typeof siteConfig;

export const primaryNav = [
  { label: 'Comment ça marche', href: '/#how-it-works' },
  { label: "Cas d'usages", href: '/#use-cases' },
  { label: 'Fonctionnalités', href: '/#features' },
  { label: 'Blog', href: '/blog' },
  { label: 'À propos', href: '/aboutus' },
] as const;
