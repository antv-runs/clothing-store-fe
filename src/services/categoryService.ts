import { get } from "./httpClient";
import type { PaginatedApiResponse } from "@custom-types/api";
import type {
  CategoryListResult,
  ApiCategory,
} from "@custom-types/category";
import { mapApiCategoriesToCategories } from "@mappers/categoryMapper";
import { unwrapPaginatedResponse, buildQueryString } from "./apiHelpers";

export interface GetCategoriesParams {
  search?: string;
  status?: "active" | "inactive";
  parent_id?: string | null;
  has_children?: boolean;
  sort?: string;
  page?: number;
  per_page?: number;
}

export async function getCategories(
  params: GetCategoriesParams = {},
): Promise<CategoryListResult> {
  const queryStr = buildQueryString(params).toString();
  const url = `/api/categories${queryStr ? `?${queryStr}` : ""}`;
  const res = await get<PaginatedApiResponse<ApiCategory>>(url);
  const {
    data: apiCategories,
    meta,
    links,
  } = unwrapPaginatedResponse(res, "Failed to fetch categories");
  return {
    data: mapApiCategoriesToCategories(apiCategories),
    meta,
    links,
  };
}
