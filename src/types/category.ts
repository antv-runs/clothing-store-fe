import type { PaginationMeta, PaginationLinks } from "./pagination";

/**
 * Frontend/Domain category types
 * Normalized UI models after mapping from API responses
 */

/**
 * UI model consumed by components after normalization/mapping
 */
export interface Category {
  id: string;
  name: string;
  slug: string;
  href: string;
  hasChildren: boolean;
  description: string;
  status: "active" | "inactive";
  parentId: string | null;
  childrenCount: number;
  image?: string;
}

/**
 * Paginated list result from /api/categories endpoint
 * Contains normalized Category objects (UI models) with pagination metadata
 */
export interface CategoryListResult {
  data: Category[];
  meta: PaginationMeta;
  links?: PaginationLinks;
}
