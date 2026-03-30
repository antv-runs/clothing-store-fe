import { get } from "./httpClient";
import type { PaginatedApiResponse, ApiResponse } from "@custom-types/api";
import type {
  Product,
  ProductListResult,
  ApiProduct,
} from "@custom-types/product";
import {
  mapApiProductToProduct,
  mapApiProductsToProducts,
} from "@custom-mappers/productMapper";
import {
  unwrapApiResponse,
  unwrapPaginatedResponse,
  buildQueryString,
} from "./apiHelpers";

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

export async function getProducts(
  params: GetProductsParams = {},
): Promise<ProductListResult> {
  const queryStr = buildQueryString(params).toString();
  const url = `/api/products${queryStr ? `?${queryStr}` : ""}`;
  const res = await get<PaginatedApiResponse<ApiProduct>>(url);
  const {
    data: apiProducts,
    meta,
    links,
  } = unwrapPaginatedResponse(res, "Failed to fetch products");
  return {
    data: mapApiProductsToProducts(apiProducts),
    meta,
    links,
  };
}

export async function getCatalogProducts(searchTerm = ""): Promise<Product[]> {
  return (await getProducts({ search: searchTerm })).data;
}

export async function getProductById(
  id: string | number,
): Promise<Product | null> {
  if (!id) return null;
  const url = `/api/products/${encodeURIComponent(String(id))}`;
  const res = await get<ApiResponse<ApiProduct>>(url);
  const apiProduct = unwrapApiResponse(res, "Failed to fetch product");
  return mapApiProductToProduct(apiProduct);
}
