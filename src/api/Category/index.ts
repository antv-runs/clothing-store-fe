import { get } from "@/lib/axios";
import type { PaginatedApiResponse } from "@/types/pagination";
import type { CategoryListResult } from "@/types/category";
import type { ApiCategory, GetCategoriesParams } from "@/types/api/category";
import { mapApiCategoriesToCategories } from "@/utils/categoryMapper";
import { unwrapPaginatedResponse, buildQueryString } from "@/utils/apiHelpers";

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
