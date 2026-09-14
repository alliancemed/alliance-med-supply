import { RentalOperationsDashboard } from '@/app/rental-operations/rental-operations-dashboard';
import { getRentalSnapshot } from '@/lib/rental-operations/db';
import { demoRentalSnapshot } from '@/lib/rental-operations/demo-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rental Operations',
  description:
    'Internal rental check-out and check-in control for Alliance Medical.',
  robots: { index: false, follow: false, nocache: true },
};

export default async function RentalOperationsPage() {
  const snapshot = await getRentalSnapshot().catch(() => demoRentalSnapshot);
  return <RentalOperationsDashboard initialSnapshot={snapshot} />;
}
