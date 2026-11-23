import { contact } from '@/data/contact';
import { IMAGES } from '@/lib/images';
import {
  generateBreadcrumbSchema,
  jsonLdScriptProps,
  pageSEO,
  siteConfig,
} from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: pageSEO.contact.title,
  description: pageSEO.contact.description,
  keywords: pageSEO.contact.keywords.join(', '),
  alternates: {
    canonical: `${siteConfig.url}/contact-us`,
  },
  openGraph: {
    title: pageSEO.contact.title,
    description: pageSEO.contact.description,
    url: `${siteConfig.url}/contact-us`,
    siteName: contact.businessName,
    locale: siteConfig.locale,
    type: 'website',
    images: [
      {
        url: IMAGES.ogHome,
        width: 1200,
        height: 630,
        alt: `Contact ${contact.businessName}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageSEO.contact.title,
    description: pageSEO.contact.description,
  },
};

// Breadcrumb structured data
const breadcrumbData = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Contact Us', url: '/contact-us' },
]);

// Contact page specific structured data
const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: `Contact ${contact.businessName}`,
  description: pageSEO.contact.description,
  url: `${siteConfig.url}/contact-us`,
  mainEntity: {
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/#organization`,
    name: contact.businessName,
    telephone: contact.phone.display,
    faxNumber: contact.fax.display,
    email: contact.email.primary,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${contact.address.street}, ${contact.address.suite}`,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.zip,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '16:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '14:00',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contact.phone.display,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
    },
  },
};

export default function ContactUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbData, contactPageSchema])} />
      {children}
    </>
  );
}
