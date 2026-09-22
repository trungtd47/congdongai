import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { DemoBanner } from '@/components/DemoBanner';
import { JsonLd, websiteJsonLd } from '@/lib/seo';
import { siteConfig } from '@/lib/site';
import './globals.css';

const beVietnam = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bvp',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Cộng Đồng AI — Học Hermes Agent từ số 0',
    template: '%s | Cộng Đồng AI',
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: 'Cộng Đồng AI — Học Hermes Agent từ số 0',
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cộng Đồng AI — Học Hermes Agent từ số 0',
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
};

export const viewport = {
  themeColor: '#0D9488',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body className="font-sans">
        <JsonLd data={websiteJsonLd()} />
        <DemoBanner />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
