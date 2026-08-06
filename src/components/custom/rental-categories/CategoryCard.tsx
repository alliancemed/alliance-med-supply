'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { getCategorySlug } from '@/lib/categories/utils';
import { img } from '@/lib/images';
import { cn } from '@/lib/utils';

export type CategoryCardProps = {
  id?: string;
  categoryId: number;
  name: string;
  image: string;
  productCount?: number;
  rating?: number;
  showRating?: boolean;
  className?: string;
};

export const CategoryCard = ({
  id,
  categoryId,
  name,
  image,
  productCount,
  rating,
  showRating = false,
  className,
}: CategoryCardProps) => {
  const componentName = 'CategoryCard';
  const categoryUrl = `/products/${getCategorySlug(name)}`;
  const rootId = id ?? `${componentName}-${categoryId}`;

  return (
    <Link
      href={categoryUrl}
      className="block w-full"
      aria-label={`View ${name} category with ${productCount || 'available'} products`}
      onKeyDown={(e) => {
        if (e.key === ' ') {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
    >
      <Card
        data-component={componentName}
        id={rootId}
        className={cn(
          'group flex h-full w-full flex-col overflow-hidden border border-transparent p-0 shadow-md transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20 cursor-pointer',
          className
        )}
      >
        {/* Image Container with Badge - No wrapper, directly in Card */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          {/* Product Count Badge */}
          {productCount && productCount > 1 && (
            <div className="absolute left-0 top-0 z-10">
              <div className="bg-accent text-accent-foreground px-3 py-1.5 text-xs font-medium rounded-br-lg">
                {productCount} Products
              </div>
            </div>
          )}

          <Image
            src={img(image)}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              'object-cover transition-transform duration-300 group-hover:scale-105',
              name === 'Bathroom Aids' && 'object-[center_35%]'
            )}
            priority={false}
          />

          {/* Subtle gradient scrim on bottom-right to reduce watermark visibility */}
          <div className="absolute bottom-0 right-0 h-12 w-28 bg-gradient-to-tl from-black/30 to-transparent pointer-events-none" />
        </div>

        {/* Content area with flex-grow to push button down */}
        <div className="flex flex-1 flex-col">
          <CardContent className="flex-1 px-4 pb-2 pt-0">
            <CardTitle className="flex min-h-[2.5rem] items-start text-base font-semibold leading-tight text-text-primary">
              {name}
            </CardTitle>

            {/* Optional Rating */}
            {showRating && rating && (
              <div className="mt-2 flex items-center gap-1">
                <Star className="h-4 w-4 fill-star text-star" />
                <span className="text-sm font-medium text-text-secondary">
                  {rating}
                </span>
              </div>
            )}
          </CardContent>

          <CardFooter className="mt-auto px-4 pb-4 pt-2">
            <Button asChild className="w-full" tabIndex={-1}>
              <span>View Products</span>
            </Button>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};
