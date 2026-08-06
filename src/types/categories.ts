/**
 * Product interface representing individual medical equipment products
 */
export interface Product {
  id: number;
  name: string;
  sizes?: string[];
  description: string;
  image: string;
}

/**
 * Category interface representing product categories
 */
export interface Category {
  id: number;
  name: string;
  image: string;
  description?: string;
  products: Product[];
}

/**
 * API response structure for categories
 */
export interface CategoriesResponse {
  categories: Category[];
}

/**
 * Filter options for searching products and categories
 */
export interface CategoryFilters {
  categoryId?: number;
  productName?: string;
  hasSize?: boolean;
  searchTerm?: string;
}

/**
 * Utility type for category names as union type
 */
export type CategoryName =
  | 'Wheelchairs'
  | 'Electric Wheelchairs'
  | 'Transport Chairs'
  | 'Knee Scooters'
  | 'Rollators'
  | 'Electric Beds'
  | 'Stand Assists & Lifts'
  | 'Mobility Scooters'
  | 'CPM Machine'
  | 'Lift Chair'
  | 'PureWick'
  | 'Bathroom Aids'
  | 'Mattresses';
