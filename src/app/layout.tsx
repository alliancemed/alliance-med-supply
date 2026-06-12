import { Footer } from '@/components/custom/footer';
import { Header } from '@/components/custom/header';
import { contact } from '@/data/contact';
import { IMAGES } from '@/lib/images';
import {
  generateLocalBusinessSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
  jsonLdScriptProps,
  pageSEO,
  siteConfig,
} from '@/lib/seo';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Comprehensive SEO metadata for the entire site
export const metadata: Metadata = {
  // Base metadata
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pageSEO.home.title,
    template: `%s | ${contact.businessName}`,
  },
  description: pageSEO.home.description,
  keywords: pageSEO.home.keywords.join(', '),
  authors: [{ name: contact.businessName, url: siteConfig.url }],
  creator: contact.businessName,
  publisher: contact.businessName,

  // Robots and indexing
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph for social sharing
  openGraph: {
    title: pageSEO.home.title,
    description: pageSEO.home.description,
    url: siteConfig.url,
    siteName: contact.businessName,
    locale: siteConfig.locale,
    type: 'website',
    images: [
      {
        url: IMAGES.ogHome,
        width: 1200,
        height: 630,
        alt: `${contact.businessName} - Medical Equipment Rental & Sales in San Jose Bay Area`,
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: pageSEO.home.title,
    description: pageSEO.home.description,
    images: [IMAGES.ogHome],
  },

  // Canonical and alternates
  alternates: {
    canonical: siteConfig.url,
  },

  // Additional metadata for local SEO
  other: {
    // Geo meta tags for local search
    'geo.region': siteConfig.geo.region,
    'geo.placename': siteConfig.geo.placeName,
    'geo.position': `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
    // Business contact
    'business:contact_data:street_address': `${contact.address.street}, ${contact.address.suite}`,
    'business:contact_data:locality': contact.address.city,
    'business:contact_data:region': contact.address.state,
    'business:contact_data:postal_code': contact.address.zip,
    'business:contact_data:country_name': 'United States',
    'business:contact_data:phone_number': contact.phone.display,
  },

  // App-specific
  applicationName: contact.businessName,
  category: 'Medical Equipment',
  classification: 'Medical Equipment Rental and Sales',

  // Verification (add your codes when available)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

// Generate all structured data schemas
const structuredData = [
  generateLocalBusinessSchema(),
  generateOrganizationSchema(),
  generateWebSiteSchema(),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* LLMs.txt for AI crawlers */}
        <link rel="alternate" type="text/plain" href="/llms.txt" />

        {/* JSON-LD Structured Data for SEO - Critical for "near me" searches */}
        <script {...jsonLdScriptProps(structuredData)} />

        {/* reCAPTCHA */}
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MKKD7MPV');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MKKD7MPV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
