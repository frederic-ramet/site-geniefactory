import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/lib/site';
import { getSeoFor } from '@/lib/data';
import { JsonLd } from '@/components/ui/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/schema';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['500', '600', '700'],
});

export function generateMetadata(): Metadata {
  const home = getSeoFor('home');
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: home.title,
      template: `%s — ${siteConfig.name}`,
    },
    description: home.description,
    keywords: [
      'transformation agentique',
      'agents IA métier',
      'industrialiser application IA',
      'gouvernance IA',
      'conformité AI Act',
      'PME ETI',
      'GenieFactory',
    ],
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    openGraph: {
      type: 'website',
      locale: 'fr_FR',
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: home.title,
      description: home.description,
      images: [
        {
          url: home.og_image ?? '/images/og-default.svg',
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: home.title,
      description: home.description,
      images: [home.og_image ?? '/images/og-default.svg'],
    },
    alternates: {
      canonical: siteConfig.url,
    },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const home = getSeoFor('home');
  return (
    <html lang="fr" className={`${inter.variable} ${display.variable}`}>
      <body className="min-h-screen bg-white font-sans text-ink-900 antialiased">
        {children}
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema(home.description)} />
      </body>
    </html>
  );
}
