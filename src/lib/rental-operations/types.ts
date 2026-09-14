export type AssetStatus =
  | 'available'
  | 'rented'
  | 'due-today'
  | 'overdue'
  | 'cleaning'
  | 'repair';

export type RentalAsset = {
  id: string;
  barcode: string;
  ain: string;
  product: string;
  category: string;
  status: AssetStatus;
  customer?: string;
  dueDate?: string;
  invoiceNumber?: string;
};

export type RentalSnapshot = {
  source: 'demo' | 'quickbooks';
  syncedAt: string;
  assets: RentalAsset[];
};
