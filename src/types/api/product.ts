/**
 * Product API types
 * Raw API request/response types for product endpoints
 */

export interface ApiProductImage {
  id: string;
  image_url: string;
  is_primary: boolean;
  sort_order: number;
  alt_text: string | null;
}

export interface ApiProductVariantOption {
  id: string;
  label: string;
  in_stock?: boolean;
  color_code?: string;
}

export interface ApiProductVariants {
  colors: ApiProductVariantOption[];
  sizes: ApiProductVariantOption[];
}

export interface ApiProductPricing {
  currency: string;
  current: number;
  original: number | null;
  discountPercent: number | null;
}

export interface ApiProductCategory {
  id: string;
  name: string;
  slug: string;
}

export interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  ratingAvg: number;
  variants: ApiProductVariants;
  pricing: ApiProductPricing;
  thumbnail: string;
  images: ApiProductImage[];
  category: ApiProductCategory;
}

/**
 * Request parameters for GET /api/products endpoint
 */
export interface GetProductsParams {
  search?: string;
  category_id?: string | number | null;
  min_price?: number;
  max_price?: number;
  colors?: string;
  sizes?: string;
  style?: string;
  status?: string;
  page?: number;
  per_page?: number;
}
