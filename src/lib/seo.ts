// Comprehensive SEO Configuration for Alliance Medical Supply & Rental
// This file contains all SEO-related data, structured data generators, and meta tag utilities

import { contact } from '@/data/contact';
import { img } from '@/lib/images';

// =============================================================================
// BUSINESS CONFIGURATION
// =============================================================================

export const siteConfig = {
  name: contact.businessName,
  shortName: contact.businessNameShort,
  description:
    "Alliance Medical Supply & Rental is the Bay Area's trusted provider of medical equipment rentals and sales. Exemplary Provider accredited by The Compliance Team with 20+ years of experience serving San Jose, San Francisco, Oakland, Fremont, Hayward, Berkeley, Palo Alto, Sunnyvale, and surrounding communities. Same-day delivery available.",
  url: 'https://www.alliancemedsupply.com',
  ogImage: img('/seo/home-ogImage.png'),
  locale: 'en_US',
  type: 'website',

  // Geo coordinates for San Jose location (critical for "near me" searches)
  geo: {
    latitude: 37.3861,
    longitude: -121.8905,
    region: 'US-CA',
    placeName: 'San Jose, California',
  },

  // Social profiles
  social: {
    yelp: contact.social.yelp,
    // Add more as business expands
  },

  // Keywords organized by intent and location
  keywords: {
    primary: [
      'medical equipment rental',
      'medical supply store',
      'durable medical equipment',
      'DME supplier',
      'wheelchair rental',
      'hospital bed rental',
      'mobility equipment',
    ],
    localModifiers: [
      'San Jose',
      'San Francisco',
      'Oakland',
      'Bay Area',
      'Fremont',
      'Sunnyvale',
      'Santa Clara',
      'Hayward',
      'Berkeley',
      'Palo Alto',
      'Walnut Creek',
      'San Mateo',
      'near me',
    ],
    products: [
      'wheelchair rental',
      'electric wheelchair',
      'hospital bed rental',
      'mobility scooter',
      'walker rental',
      'rollator',
      'knee scooter',
      'transport chair',
      'patient lift',
      'hoyer lift',
      'CPM machine rental',
      'lift chair',
    ],
    services: [
      'medical equipment delivery',
      'same day medical equipment',
      'home medical equipment',
      'medical equipment setup',
      'DME rental',
      'medical equipment repair',
    ],
  },
};

// =============================================================================
// STRUCTURED DATA GENERATORS (JSON-LD)
// =============================================================================

/**
 * LocalBusiness Schema - Critical for "near me" searches and Google Maps
 * This is the most important schema for local SEO ranking
 */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${siteConfig.url}/#organization`,
    name: contact.businessName,
    alternateName: contact.businessNameShort,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: contact.phone.display,
    faxNumber: contact.fax.display,
    email: contact.email.primary,

    // Address - Critical for local SEO
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${contact.address.street}, ${contact.address.suite}`,
      addressLocality: contact.address.city,
      addressRegion: contact.address.state,
      postalCode: contact.address.zip,
      addressCountry: 'US',
    },

    // Geo coordinates - Essential for "near me" searches
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },

    // Service area - Important for local search radius
    areaServed: contact.serviceAreas.primary.map((area) => ({
      '@type': 'City',
      name: area,
      '@id': `https://en.wikipedia.org/wiki/${area.replace(' ', '_')},_California`,
    })),

    // Business hours
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '11:00',
        closes: '17:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '00:00',
        closes: '00:00',
        description: 'By Appointment Only',
      },
    ],

    // Business attributes
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'Insurance'],
    currenciesAccepted: 'USD',

    // Images
    image: [
      img('/branding/van.png'),
      img('/categories/wheelchair-w-brackes.jpg'),
    ],
    logo: `${siteConfig.url}/logo/Allience-Medical-Full-logo.svg`,

    // Additional business info
    foundingDate: '2004',
    slogan: 'Your Trusted Partner in Medical Equipment & Healthcare Solutions',
    knowsAbout: [
      'Medical Equipment Rental',
      'Durable Medical Equipment',
      'Wheelchair Rental',
      'Hospital Bed Rental',
      'Mobility Equipment',
      'Home Healthcare Equipment',
    ],

    // Accreditation
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Accreditation',
      name: contact.accreditation,
      recognizedBy: {
        '@type': 'Organization',
        name: contact.accreditationOrg,
        url: contact.accreditationUrl,
      },
    },

    // Same as (social profiles)
    sameAs: [contact.social.yelp].filter(Boolean),

    // Contact point for customer service
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contact.phone.display,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English', 'Spanish'],
    },
  };
}

/**
 * Organization Schema - For brand recognition
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: contact.businessName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo/Allience-Medical-Full-logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contact.phone.display,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: ['English'],
    },
    sameAs: [contact.social.yelp].filter(Boolean),
  };
}

/**
 * WebSite Schema - For site search and brand
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: contact.businessName,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    inLanguage: 'en-US',
  };
}

/**
 * Product Schema Generator - For individual products
 */
export function generateProductSchema(product: {
  name: string;
  description: string;
  image: string;
  category: string;
  sku?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: img(product.image),
    sku: product.sku || product.name.toLowerCase().replace(/\s+/g, '-'),
    brand: {
      '@type': 'Brand',
      name: contact.businessName,
    },
    category: product.category,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: {
        '@id': `${siteConfig.url}/#organization`,
      },
    },
  };
}

/**
 * Service Schema Generator - For services offered
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  serviceType: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    serviceType: service.serviceType,
    provider: {
      '@id': `${siteConfig.url}/#organization`,
    },
    areaServed: {
      '@type': 'State',
      name: 'California',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Medical Equipment Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
          },
        },
      ],
    },
  };
}

/**
 * BreadcrumbList Schema Generator
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * FAQ Schema Generator - Great for featured snippets
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Review/Rating Schema - For aggregate ratings
 */
export function generateAggregateRatingSchema(rating: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: contact.businessName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.ratingValue,
      reviewCount: rating.reviewCount,
      bestRating: rating.bestRating || 5,
      worstRating: rating.worstRating || 1,
    },
  };
}

// =============================================================================
// META TAG GENERATORS
// =============================================================================

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata({
  title,
  description,
  keywords,
  path = '',
  image,
  type = 'website',
  noIndex = false,
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
}) {
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.ogImage;

  // Combine with local keywords for better local SEO
  const allKeywords = [
    ...(keywords || []),
    ...siteConfig.keywords.localModifiers.slice(0, 5),
  ];

  return {
    title,
    description,
    keywords: allKeywords.join(', '),
    authors: [{ name: contact.businessName }],
    creator: contact.businessName,
    publisher: contact.businessName,

    // Robots
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },

    // Canonical URL
    alternates: {
      canonical: url,
    },

    // Open Graph
    openGraph: {
      title,
      description,
      url,
      siteName: contact.businessName,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },

    // Verification (add your actual verification codes)
    verification: {
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },

    // Other meta tags
    other: {
      'geo.region': siteConfig.geo.region,
      'geo.placename': siteConfig.geo.placeName,
      'geo.position': `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
      ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
    },
  };
}

// =============================================================================
// PAGE-SPECIFIC SEO DATA
// =============================================================================

export const pageSEO = {
  home: {
    title: `${contact.businessName} | Medical Equipment Rental & Sales in San Jose, Bay Area`,
    description: `Bay Area's trusted medical equipment rental and sales. Wheelchairs, hospital beds, mobility scooters, walkers & more. Exemplary Provider accredited. Same-day delivery in San Jose, San Francisco, Oakland, Fremont, Hayward, Berkeley. Call ${contact.phone.display}.`,
    keywords: [
      'medical equipment rental San Jose',
      'wheelchair rental near me',
      'hospital bed rental Bay Area',
      'wheelchair rental San Francisco',
      'hospital bed rental Oakland',
      'medical equipment rental Fremont',
      'DME supplier San Jose',
      'medical supply store near me',
      'mobility equipment rental',
      'Exemplary Provider accredited medical supplier',
    ],
  },

  about: {
    title: `About Us | ${contact.businessName} - 20+ Years Serving Bay Area`,
    description: `Learn about ${contact.businessName}, the Bay Area's trusted Exemplary Provider accredited medical equipment provider. 20+ years of experience serving San Jose, Santa Clara County, and Silicon Valley communities.`,
    keywords: [
      'about Alliance Medical Supply',
      'Exemplary Provider accredited medical supplier',
      'Bay Area medical equipment company',
      'San Jose DME provider',
      'trusted medical supply store',
    ],
  },

  contact: {
    title: `Contact Us | ${contact.businessName} - San Jose, CA ${contact.phone.display}`,
    description: `Contact ${contact.businessName} for medical equipment rentals and sales. Located at ${contact.address.full}. Call ${contact.phone.display}. Same-day delivery available throughout the Bay Area.`,
    keywords: [
      'contact medical equipment supplier',
      'medical supply store San Jose',
      'wheelchair rental near me',
      'hospital bed delivery Bay Area',
    ],
  },

  products: {
    title: `Medical Equipment Rental & Sales | ${contact.businessName}`,
    description: `Browse our complete selection of medical equipment for rent or purchase. Wheelchairs, hospital beds, mobility scooters, walkers, patient lifts & more. Serving San Jose and Bay Area.`,
    keywords: [
      'medical equipment for rent',
      'buy medical equipment',
      'wheelchair rental',
      'hospital bed rental',
      'mobility scooter',
      'walker rental',
      'DME equipment',
    ],
  },

  reviews: {
    title: `Customer Reviews | ${contact.businessName} - 4.9★ Rating`,
    description: `See what customers say about ${contact.businessName}. 4.9-star rating with 100+ verified reviews. Trusted by San Jose, Bay Area families and healthcare providers.`,
    keywords: [
      'Alliance Medical Supply reviews',
      'medical equipment rental reviews',
      'San Jose DME reviews',
      'best medical supply store Bay Area',
    ],
  },
};

// =============================================================================
// CATEGORY-SPECIFIC SEO DATA
// =============================================================================

export const categorySEO: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  wheelchairs: {
    title:
      'Wheelchair Rental & Sales San Jose | Manual & Pediatric Wheelchairs',
    description:
      'Rent or buy wheelchairs in San Jose Bay Area. Standard, pediatric, bariatric & reclining wheelchairs. Same-day delivery. Exemplary Provider accredited. Call (408) 942-9000.',
    keywords: [
      'wheelchair rental San Jose',
      'wheelchair rental near me',
      'pediatric wheelchair',
      'bariatric wheelchair',
      'buy wheelchair Bay Area',
    ],
  },
  'electric-wheelchairs': {
    title: 'Electric Wheelchair Rental San Jose | Power Chairs Bay Area',
    description:
      'Rent electric wheelchairs and power chairs in San Jose. Collapsible & full-featured power wheelchairs. Delivery available. Call (408) 942-9000.',
    keywords: [
      'electric wheelchair rental',
      'power chair rental San Jose',
      'motorized wheelchair Bay Area',
      'electric wheelchair near me',
    ],
  },
  'transport-chairs': {
    title: 'Transport Chair Rental San Jose | Lightweight Travel Wheelchairs',
    description:
      'Rent lightweight transport chairs in San Jose Bay Area. Easy-fold designs for travel. Same-day delivery available. Call (408) 942-9000.',
    keywords: [
      'transport chair rental',
      'lightweight wheelchair',
      'travel wheelchair San Jose',
      'companion wheelchair',
    ],
  },
  'knee-scooters': {
    title: 'Knee Scooter Rental San Jose | Knee Walker Bay Area',
    description:
      'Rent knee scooters and knee walkers in San Jose. Perfect for foot/ankle injuries. Same-day delivery. Call (408) 942-9000.',
    keywords: [
      'knee scooter rental',
      'knee walker rental San Jose',
      'knee scooter near me',
      'foot injury mobility aid',
    ],
  },
  rollators: {
    title: 'Rollator Walker Rental San Jose | Rolling Walkers Bay Area',
    description:
      'Rent rollators and rolling walkers in San Jose Bay Area. Standard & bariatric options with seats. Same-day delivery. Call (408) 942-9000.',
    keywords: [
      'rollator rental San Jose',
      'rolling walker rental',
      'walker with seat',
      'rollator near me',
    ],
  },
  'electric-hospital-beds-and-mattresses': {
    title: 'Hospital Bed Rental San Jose | Electric Beds & Mattresses Bay Area',
    description:
      'Rent hospital beds in San Jose Bay Area. Full electric, semi-electric & bariatric beds. Gel foam & low air loss mattresses. Delivery & setup included. Call (408) 942-9000.',
    keywords: [
      'hospital bed rental San Jose',
      'electric hospital bed',
      'hospital bed near me',
      'medical bed rental Bay Area',
      'adjustable bed rental',
    ],
  },
  'stand-assists-and-lifts': {
    title:
      'Patient Lift Rental San Jose | Hoyer Lifts & Stand Assists Bay Area',
    description:
      'Rent patient lifts and stand assists in San Jose. Manual & electric Hoyer lifts. Safe patient transfers. Delivery available. Call (408) 942-9000.',
    keywords: [
      'patient lift rental',
      'Hoyer lift rental San Jose',
      'stand assist rental',
      'patient transfer equipment',
    ],
  },
  'mobility-scooters': {
    title: 'Mobility Scooter Rental San Jose | Electric Scooters Bay Area',
    description:
      'Rent mobility scooters in San Jose Bay Area. Compact travel scooters to heavy-duty models. Same-day delivery. Call (408) 942-9000.',
    keywords: [
      'mobility scooter rental',
      'electric scooter rental San Jose',
      'mobility scooter near me',
      'power scooter Bay Area',
    ],
  },
  'cpm-machine': {
    title: 'CPM Machine Rental San Jose | Knee Therapy Equipment Bay Area',
    description:
      'Rent CPM machines for post-surgery knee rehabilitation in San Jose. Continuous Passive Motion therapy. Same-day delivery. Call (408) 942-9000.',
    keywords: [
      'CPM machine rental',
      'continuous passive motion',
      'knee surgery recovery',
      'CPM rental San Jose',
    ],
  },
  'lift-chair': {
    title: 'Lift Chair Rental San Jose | Power Recliner Chairs Bay Area',
    description:
      'Rent lift chairs and power recliners in San Jose Bay Area. Easy sit-to-stand assistance. Delivery & setup available. Call (408) 942-9000.',
    keywords: [
      'lift chair rental',
      'power recliner rental San Jose',
      'lift chair near me',
      'rise recliner',
    ],
  },
  purewick: {
    title: 'PureWick System Rental San Jose | External Catheter Bay Area',
    description:
      'Rent PureWick external catheter systems in San Jose. Non-invasive urine management for female patients. Discreet delivery. Call (408) 942-9000.',
    keywords: [
      'PureWick rental',
      'external catheter system',
      'female catheter San Jose',
      'PureWick system',
    ],
  },
  'bathroom-aids': {
    title: 'Bathroom Aids San Jose | Tub Transfer Benches Bay Area',
    description:
      'Rent or purchase bathroom safety equipment in San Jose and the Bay Area. Browse tub transfer benches for safer, more comfortable bathing. Call (408) 942-9000.',
    keywords: [
      'bathroom aids San Jose',
      'tub transfer bench',
      'bathroom safety equipment',
      'shower bench Bay Area',
      'bathroom mobility aids',
    ],
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get SEO data for a category by slug
 */
export function getCategorySEO(slug: string) {
  return (
    categorySEO[slug] || {
      title: `${slug.replace(/-/g, ' ')} | ${contact.businessName}`,
      description: `Browse our ${slug.replace(/-/g, ' ')} available for rent or purchase in San Jose Bay Area.`,
      keywords: [
        slug.replace(/-/g, ' '),
        'medical equipment',
        'San Jose',
        'Bay Area',
      ],
    }
  );
}

/**
 * Generate JSON-LD script tag content
 */
export function jsonLdScriptProps(data: object | object[]) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data),
    },
  };
}
