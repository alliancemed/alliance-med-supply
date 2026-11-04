'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { KeyboardEvent } from 'react';

import { PhoneLink } from '@/components/custom/PhoneLink';
import { ProductCard } from '@/components/custom/ProductCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { contact } from '@/data/contact';
import { getCategorySlug, getProductSlug } from '@/lib/categories/utils';
import { img } from '@/lib/images';
import { cn } from '@/lib/utils';
import type { Category, Product } from '@/types/categories';

export type ProductDetailPageProps = {
  product: Product;
  category: Category;
  className?: string;
};

export const ProductDetailPage = ({
  product,
  category,
  className,
}: ProductDetailPageProps) => {
  const reduce = useReducedMotion();

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  return (
    <div
      id="ProductDetailPage"
      data-component="ProductDetailPage"
      className={cn(
        'min-h-screen bg-background pt-24 pb-12 md:pt-28 lg:pt-32',
        className
      )}
    >
      <div className="mx-auto w-full max-w-screen-xl px-4 md:px-6">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          aria-label="Breadcrumb"
          className="mb-6 md:mb-8"
        >
          <ol className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
            <li>
              <Link
                href="/products"
                onKeyDown={handleKeyDown}
                className="hover:text-text-primary transition-colors"
              >
                Products
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/products/${getCategorySlug(category.name)}`}
                onKeyDown={handleKeyDown}
                className="hover:text-text-primary transition-colors"
              >
                {category.name}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-text-primary font-medium">{product.name}</li>
          </ol>
        </motion.nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          {/* Product Image */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: reduce ? 0 : 0.1 }}
            className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50/50 to-cyan-50/30 border border-gray-100"
          >
            <Image
              src={img(product.image)}
              alt={product.name}
              fill
              className={product.name === 'Bariatric Bed' ? 'object-contain' : 'object-cover'}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </motion.div>

          {/* Product Information */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: reduce ? 0 : 0.2 }}
            className="flex flex-col space-y-6 md:space-y-8"
          >
            {/* Availability Pills */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-50 px-3 py-1.5 text-xs font-medium">
                Rental Available
              </Badge>
              <Badge className="bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-50 px-3 py-1.5 text-xs font-medium">
                Purchase Available
              </Badge>
            </div>

            {/* Product Title */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl lg:text-5xl">
                {product.name}
              </h1>
            </div>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-text-primary md:text-xl">
                  Available Sizes
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Badge
                      key={size}
                      variant="outline"
                      className="px-4 py-2 text-sm font-medium border-2 border-gray-200 text-text-secondary hover:border-primary hover:bg-teal-50 transition-colors"
                    >
                      {size}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-text-primary md:text-xl">
                Description
              </h2>
              <p className="text-base text-text-muted leading-relaxed md:text-lg">
                {product.description}
              </p>
            </div>

            {/* Call to Action */}
            <div className="space-y-4 pt-2">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <PhoneLink onKeyDown={handleKeyDown}>
                  <Phone className="mr-2 h-5 w-5" />
                  Call {contact.phone.display} for Quote
                </PhoneLink>
              </Button>
            </div>

            {/* Professional Medical Equipment Rental Banner */}
            <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100 md:p-8">
              <div className="space-y-3 text-center">
                <h3 className="text-xl font-bold text-teal-800 md:text-2xl">
                  Professional Medical Equipment Rental
                </h3>
                <p className="text-base text-teal-700 md:text-lg">
                  Same-day delivery available in the Bay Area
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {category.products.filter((p) => p.id !== product.id).length > 0 && (
          <motion.section
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: reduce ? 0 : 0.3 }}
            className="mt-16 md:mt-20 lg:mt-24"
          >
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between md:mb-8">
              <h2 className="text-2xl font-bold text-text-primary md:text-3xl">
                More {category.name}
              </h2>
              <Button variant="secondary" asChild>
                <Link
                  href={`/products/${getCategorySlug(category.name)}`}
                  onKeyDown={handleKeyDown}
                >
                  View All
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {category.products
                .filter((p) => p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct, index) => (
                  <ProductCard
                    key={relatedProduct.id}
                    variant="product"
                    index={index}
                    data={{
                      id: relatedProduct.id,
                      name: relatedProduct.name,
                      image: relatedProduct.image,
                      description: relatedProduct.description,
                      sizes: relatedProduct.sizes,
                      href: `/products/${getCategorySlug(category.name)}/${getProductSlug(relatedProduct.name)}`,
                      ctaText: 'View Details',
                    }}
                  />
                ))}
            </div>
          </motion.section>
        )}

        {/* Back to Category */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: reduce ? 0 : 0.4 }}
          className="mt-12 text-center md:mt-16"
        >
          <Button variant="ghost" asChild>
            <Link
              href={`/products/${getCategorySlug(category.name)}`}
              onKeyDown={handleKeyDown}
              className="inline-flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {category.name}
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};
