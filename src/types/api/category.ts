/**
 * Category API types
 * Raw API request/response types for category endpoints
 */

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  href: string;
  has_children: boolean;
}

/**
 * Request parameters for GET /api/categories endpoint
 */
export interface GetCategoriesParams {
  search?: string;
  status?: "active" | "inactive";
  parent_id?: string | null;
  has_children?: boolean;
  sort?: string;
  page?: number;
  per_page?: number;
}
