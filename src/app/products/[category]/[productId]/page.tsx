import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ProductDetailPage } from '@/components/custom/ProductDetailPage';
import { contact } from '@/data/contact';
import {
  getCategories,
  getCategorySlug,
  getProductBySlugInCategory,
  getProductSlug,
} from '@/lib/categories/utils';
import { img } from '@/lib/images';
import {
  generateBreadcrumbSchema,
  generateProductSchema,
  jsonLdScriptProps,
  siteConfig,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{
    category: string;
    productId: string;
  }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  const paths: { category: string; productId: string }[] = [];

  categories.forEach((category) => {
    const categorySlug = getCategorySlug(category.name);
    category.products.forEach((product) => {
      paths.push({
        category: categorySlug,
        productId: getProductSlug(product.name),
      });
    });
  });

  return paths;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category: categorySlug, productId: productSlug } = await params;
  const result = getProductBySlugInCategory(categorySlug, productSlug);

  if (!result) {
    return {
      title: 'Product Not Found',
    };
  }

  const { product, category } = result;
  const url = `${siteConfig.url}/products/${categorySlug}/${productSlug}`;

  return {
    title: `${product.name} | ${category.name} | Alliance Medical Supply`,
    description: `${product.description} Available for rent or purchase in the Bay Area.`,
    keywords: `${product.name}, ${category.name.toLowerCase()}, medical equipment rental, Bay Area, San Jose`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${product.name} | Alliance Medical Supply`,
      description: product.description,
      url,
      siteName: contact.businessName,
      locale: siteConfig.locale,
      type: 'website',
      images: [
        {
          url: img(product.image),
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Alliance Medical Supply`,
      description: product.description,
      images: [img(product.image)],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { category: categorySlug, productId: productSlug } = await params;
  const result = getProductBySlugInCategory(categorySlug, productSlug);

  if (!result) {
    notFound();
  }

  const { product, category } = result;

  const breadcrumbData = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: category.name, url: `/products/${categorySlug}` },
    { name: product.name, url: `/products/${categorySlug}/${productSlug}` },
  ]);

  const productSchema = generateProductSchema({
    name: product.name,
    description: product.description,
    image: product.image,
    category: category.name,
  });

  return (
    <>
      <script {...jsonLdScriptProps([breadcrumbData, productSchema])} />
      <ProductDetailPage product={product} category={category} />
    </>
  );
}
