import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductCategoryPage } from '@/components/custom/ProductCategoryPage';
import { contact } from '@/data/contact';
import { getCategoryBySlug, getCategorySlugs } from '@/lib/categories/utils';
import { img } from '@/lib/images';
import {
  generateBreadcrumbSchema,
  getCategorySEO,
  jsonLdScriptProps,
  siteConfig,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateStaticParams() {
  const categorySlugs = getCategorySlugs();

  return categorySlugs.map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  // Get enhanced SEO data for this category
  const seoData = getCategorySEO(categorySlug);

  return {
    title: seoData.title,
    description: seoData.description,
    keywords: seoData.keywords.join(', '),
    alternates: {
      canonical: `${siteConfig.url}/products/${categorySlug}`,
    },
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      url: `${siteConfig.url}/products/${categorySlug}`,
      siteName: contact.businessName,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: img(category.image),
          width: 1200,
          height: 630,
          alt: `${category.name} - ${contact.businessName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoData.title,
      description: seoData.description,
      images: [img(category.image)],
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  // Generate breadcrumb schema
  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: category.name, url: `/products/${categorySlug}` },
  ]);

  // Generate product list schema for this category
  const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.name} - Medical Equipment`,
    description: category.description,
    url: `${siteConfig.url}/products/${categorySlug}`,
    numberOfItems: category.products?.length || 0,
    itemListElement:
      category.products?.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          description: product.description,
          image: img(product.image),
          category: category.name,
          brand: {
            '@type': 'Brand',
            name: contact.businessName,
          },
          offers: {
            '@type': 'Offer',
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'Organization',
              name: contact.businessName,
            },
          },
        },
      })) || [],
  };

  // Service schema for this category
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${category.name} Rental & Sales`,
    description: category.description,
    provider: {
      '@type': 'LocalBusiness',
      name: contact.businessName,
      telephone: contact.phone.display,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${contact.address.street}, ${contact.address.suite}`,
        addressLocality: contact.address.city,
        addressRegion: contact.address.state,
        postalCode: contact.address.zip,
        addressCountry: 'US',
      },
    },
    areaServed: contact.serviceAreas.primary.map((area) => ({
      '@type': 'City',
      name: area,
    })),
    serviceType: 'Medical Equipment Rental',
  };

  return (
    <>
      <script
        {...jsonLdScriptProps([
          breadcrumbData,
          productListSchema,
          serviceSchema,
        ])}
      />
      <ProductCategoryPage category={category} />
    </>
  );
}
