import type { PaginationMeta, PaginationLinks } from "./api";

/**
 * UI model: Pricing with camelCase fields
 */
export interface ProductPricing {
  currency: string;
  current: number;
  original: number | null;
  discountPercent: number | null;
}

/**
 * Paginated list result from /api/products endpoint
 * Contains normalized Product objects (UI models) with pagination metadata
 */
export interface ProductListResult {
  data: Product[];
  meta: PaginationMeta;
  links?: PaginationLinks;
}

export interface ProductCategorySummary {
  id: string;
  name: string;
  slug: string;
}

export interface ProductImage {
  id: string;
  image_url: string;
  url: string;
  alt_text: string | null;
  alt: string;
  is_primary?: boolean;
  sort_order?: number;
}

export interface ProductColorVariant {
  id: string;
  label: string;
  colorCode?: string;
}

export interface ProductSizeVariant {
  id: string;
  label: string;
  inStock?: boolean;
}

export interface ProductVariants {
  colors: ProductColorVariant[];
  sizes: ProductSizeVariant[];
}

export interface ProductFaq {
  question: string;
  answer: string;
}

export interface ProductStock {
  inStock: boolean;
  quantity: number;
}

/**
 * Raw API objects from /api/products and /api/products/{id}
 * Backend returns snake_case fields
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

// UI model consumed by components after normalization/mapping.
export interface Product {
  id: string;
  name: string;
  slug: string | null;
  description: string;
  details: string;
  pricing: ProductPricing;
  thumbnail: string;
  thumbnailAlt: string;
  images: ProductImage[];
  category: ProductCategorySummary;
  variants: ProductVariants;
  rating: number;
  breadcrumb: string[];
  faqs: ProductFaq[];
  relatedProductIds: string[];
  stock?: ProductStock;
}

export interface ProductDetail extends Product {}
