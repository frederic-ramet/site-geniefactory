export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Sébastien Weiss',
    role: 'Head of Innovation',
    company: 'Nexans',
    quote:
      "Genie Factory nous permet d'aller du besoin au prototype en quelques heures. Les équipes métier deviennent moteur de l'innovation IA — elles voient, testent, décident.",
    avatar: '/images/testimonials/weiss.jpg',
  },
  {
    name: 'Pierre Ly',
    role: 'Direction Innovation',
    company: 'Croix-Rouge Française',
    quote:
      "Une plate-forme qui a divisé par dix le temps de preuve de valeur sur nos cas d'usage IA. L'impact opérationnel est immédiat.",
    avatar: '/images/testimonials/ly.jpg',
  },
];
