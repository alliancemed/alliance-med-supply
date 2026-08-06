'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { img } from '@/lib/images';
import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { KeyboardEvent } from 'react';

export type ProductCardData = {
  id: number | string;
  name: string;
  image: string;
  description?: string;
  sizes?: string[];
  productCount?: number;
  href: string;
  ctaText?: string;
};

export type ProductCardProps = {
  data: ProductCardData;
  variant?: 'category' | 'product';
  index?: number;
  className?: string;
  id?: string;
  priority?: boolean;
};

export const ProductCard = ({
  data,
  variant = 'product',
  index = 0,
  className,
  id,
  priority = false,
}: ProductCardProps) => {
  const reduce = useReducedMotion();
  const componentName = 'ProductCard';

  const defaultDescription = data.description || '';

  const defaultCtaText =
    variant === 'category' ? 'Browse Products' : 'View Details';

  const ariaLabel =
    variant === 'category'
      ? `Browse ${data.name}`
      : `View details for ${data.name}`;

  const handleKeyDown = (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
      e.currentTarget.click();
    }
  };

  return (
    <motion.div
      id={id}
      data-component={componentName}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: reduce ? 0 : 0.1 + index * 0.05 }}
      className={className}
    >
      <Link
        href={data.href}
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
        className="block h-full rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card
          className="group h-full flex flex-col overflow-hidden border-0 rounded-3xl transition-all duration-500 hover:shadow-md hover:-translate-y-1 cursor-pointer pt-0 gap-4"
          style={{
            background:
              'linear-gradient(145deg, hsl(0 0% 100%) 0%, hsl(45 35% 96%) 100%)',
          }}
        >
          {/* Hero Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* Product Count Badge (Category variant only) */}
            {variant === 'category' &&
              typeof data.productCount === 'number' && (
                <div className="absolute top-0 left-0 z-10">
                  <Badge className="bg-accent text-accent-foreground font-semibold px-4 py-2 text-base rounded-none rounded-br-2xl shadow-md hover:bg-accent/90">
                    {data.productCount} Product
                    {data.productCount !== 1 ? 's' : ''}
                  </Badge>
                </div>
              )}
            <Image
              src={img(data.image)}
              alt={data.name}
              fill
              priority={priority}
              className={cn(
                'object-cover transition-transform duration-500 group-hover:scale-105',
                data.name === 'Bathroom Aids' && 'object-[center_35%]'
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          {/* Content Below Image */}
          <div className="flex flex-col flex-1 px-6 pt-0">
            <h3
              className={cn(
                'font-bold mb-2 text-text-primary leading-tight',
                variant === 'category'
                  ? 'text-xl md:text-2xl'
                  : 'text-lg md:text-xl'
              )}
            >
              {data.name}
            </h3>

            {/* Sizes (Product variant only) */}
            {variant === 'product' && data.sizes && data.sizes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {data.sizes.map((size) => (
                  <Badge
                    key={size}
                    variant="outline"
                    className="text-xs text-text-secondary"
                  >
                    {size}
                  </Badge>
                ))}
              </div>
            )}

            <p
              className={cn(
                'text-text-muted leading-relaxed mb-4 line-clamp-3 flex-1',
                variant === 'category' ? 'text-sm md:text-base' : 'text-sm'
              )}
            >
              {defaultDescription}
            </p>

            {/* CTA — decorative only; the entire card is the interactive link */}
            <Button
              className="w-full mt-auto pointer-events-none"
              size="lg"
              tabIndex={-1}
              aria-hidden="true"
            >
              {data.ctaText || defaultCtaText}
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
