import type { PaginationMeta, PaginationLinks } from "./api";

/**
 * Raw API object from /api/categories endpoint
 * Backend returns snake_case fields
 */
export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  has_children: boolean;
}

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
