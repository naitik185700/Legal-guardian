import type { Metadata } from 'next';
import './globals.css';
import { FIRM_CONFIG } from '@/lib/config/firm';

export const metadata: Metadata = {
  title: {
    default: `${FIRM_CONFIG.legalName} | Advocates & Legal Consultants`,
    template: `%s | ${FIRM_CONFIG.legalName}`,
  },
  description: FIRM_CONFIG.subheadline,
  metadataBase: new URL(FIRM_CONFIG.domain),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.png', sizes: '64x64', type: 'image/png' },
    ],
    apple: [{ url: '/brand/guardian-emblem.png' }],
  },
  openGraph: {
    title: `${FIRM_CONFIG.legalName} | Advocates & Legal Consultants`,
    description: FIRM_CONFIG.subheadline,
    url: FIRM_CONFIG.domain,
    siteName: FIRM_CONFIG.legalName,
    images: [
      {
        url: '/brand/guardian-legal-logo.png',
        width: 1200,
        height: 630,
        alt: `${FIRM_CONFIG.legalName} Official Brand Emblem`,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#F8F6F1] text-legal-body antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
