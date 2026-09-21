'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { contact } from '@/data/contact';
import {
  shopInventory,
  shopInventoryCategories,
  type ShopInventoryItem,
} from '@/data/shopInventory';
import { shopInventoryImages } from '@/data/shopInventoryImages';
import { Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const PAGE_SIZE = 24;

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

function InventoryCard({ item }: { item: ShopInventoryItem }) {
  const brand = item.brand === 'Needs review' ? null : item.brand;
  const image = shopInventoryImages[item.id];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={image.src}
            alt={`${item.name} product image`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-contain p-3"
          />
        </div>
      ) : (
        <div
          className="aspect-[4/3] bg-slate-100"
          aria-label={`Product image unavailable for ${item.name}`}
          role="img"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-teal-700">
          {item.category}
        </p>
        <h2 className="mt-2 text-lg font-bold leading-6 text-slate-900">
          {item.name}
        </h2>
        <div className="mt-3 space-y-1 text-sm text-slate-600">
          {brand && <p>{brand}</p>}
          <p>Model: {item.model}</p>
        </div>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-xl font-bold text-slate-900">
              {formatPrice(item.price)}
            </p>
            <p className="text-xs text-slate-500">per {item.unit}</p>
          </div>
          <span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
            In stock
          </span>
        </div>
      </div>
    </article>
  );
}

export function ShopInventoryCatalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All categories');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return shopInventory.filter((item) => {
      const matchesCategory =
        category === 'All categories' || item.category === category;
      const searchable =
        `${item.name} ${item.brand} ${item.model} ${item.category}`.toLowerCase();
      return (
        matchesCategory &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      );
    });
  }, [category, query]);

  const visibleItems = filteredItems.slice(0, visibleCount);

  function updateCategory(nextCategory: string) {
    setCategory(nextCategory);
    setVisibleCount(PAGE_SIZE);
  }

  function updateQuery(nextQuery: string) {
    setQuery(nextQuery);
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-20">
      <section className="border-b border-teal-100 bg-teal-50">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-teal-700">
            Shop inventory
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Medical supplies and equipment available to purchase.
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Browse items currently marked in stock. Please call before you
                visit so our team can confirm availability and help with the
                right fit.
              </p>
            </div>
            <div className="rounded-xl border border-teal-200 bg-white px-5 py-4 text-sm text-slate-700 shadow-sm">
              <p className="font-bold text-slate-900">
                {shopInventory.length} items listed
              </p>
              <p className="mt-1">Purchase inventory, separate from rentals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-8 md:px-6 lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_280px_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">Search shop inventory</span>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <Input
                value={query}
                onChange={(event) => updateQuery(event.target.value)}
                className="h-11 pl-10"
                placeholder="Search by product, brand, or model"
              />
            </label>
            <label>
              <span className="sr-only">Filter by category</span>
              <select
                value={category}
                onChange={(event) => updateCategory(event.target.value)}
                className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-slate-900 focus-visible:outline-none focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option>All categories</option>
                {shopInventoryCategories.map((inventoryCategory) => (
                  <option key={inventoryCategory}>{inventoryCategory}</option>
                ))}
              </select>
            </label>
            <p className="text-sm font-medium text-slate-600 lg:text-right">
              {filteredItems.length}{' '}
              {filteredItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        {visibleItems.length > 0 ? (
          <>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleItems.map((item) => (
                <InventoryCard key={item.id} item={item} />
              ))}
            </div>
            {visibleCount < filteredItems.length && (
              <div className="mt-10 flex justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                >
                  Show more items
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <ShoppingBag
              className="mx-auto h-8 w-8 text-teal-700"
              aria-hidden="true"
            />
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No matching items
            </h2>
            <p className="mt-2 text-slate-600">
              Try a different search or category, or call us for help finding
              what you need.
            </p>
          </div>
        )}

        <div className="mt-14 rounded-xl bg-slate-900 px-6 py-8 text-white md:flex md:items-center md:justify-between md:gap-8 md:px-8">
          <div>
            <h2 className="text-2xl font-bold">Need help choosing an item?</h2>
            <p className="mt-2 max-w-2xl text-slate-300">
              Call our San Jose team to confirm availability, compare options,
              or ask about delivery.
            </p>
          </div>
          <Button asChild variant="accent" size="lg" className="mt-5 md:mt-0">
            <Link href={contact.phone.href}>Call {contact.phone.display}</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
