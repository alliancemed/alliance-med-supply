import type { Metadata } from 'next';

import { ShopInventoryCatalog } from './shop-inventory-catalog';

export const metadata: Metadata = {
  title: 'Shop Medical Equipment Inventory',
  description:
    'Browse Alliance Medical Supply medical equipment and supplies currently available to purchase in the Bay Area.',
  alternates: {
    canonical: '/shop-inventory',
  },
};

export default function ShopInventoryPage() {
  return <ShopInventoryCatalog />;
}
