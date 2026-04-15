/**
 * Site-level config that lives OUTSIDE the editorial content.
 * Content (copy, FAQ, testimonials, features, steps, nav, footer) is in
 * /content/data/*.yml and loaded via lib/data.ts.
 *
 * This file only holds technical endpoints (URL, email, calendar link).
 */
export const siteConfig = {
  name: 'Genie Factory',
  url: 'https://www.geniefactory.fr',
  email: 'contact@geniefactory.fr',
  linkedin: 'https://www.linkedin.com/company/geniefactory/',
  demoUrl:
    'https://calendar.google.com/calendar/u/0/appointments/schedules/placeholder',
} as const;

export type SiteConfig = typeof siteConfig;
