import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://your-domain.com'),
  title: {
    default: 'Ethereal Realms | Epic Fantasy Adventure Game',
    template: '%s | Ethereal Realms'
  },
  description: "Explore vast worlds, battle legendary creatures, and forge your own destiny in this epic fantasy adventure game.",
  keywords: ["game", "fantasy", "rpg", "adventure", "open world", "multiplayer"],
  authors: [{ name: 'Ethereal Realms Team' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Ethereal Realms',
    description: 'Epic Fantasy Adventure Game',
    type: 'website',
    siteName: 'Ethereal Realms',
    locale: 'en',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ethereal Realms',
    description: 'Epic Fantasy Adventure Game',
    creator: '@EtherealRealms',
  },
  alternates: {
    languages: {
      'en': '/en',
      'vi': '/vi'
    }
  },
  manifest: '/manifest.json',
};

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html 
      lang={locale} 
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen flex flex-col bg-[#030014] text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}