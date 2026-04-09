import { get } from "@/lib/axios";
import type { PaginatedApiResponse, ApiResponse } from "@/types/pagination";
import type { Product, ProductListResult } from "@/types/product";
import type { ApiProduct, GetProductsParams } from "@/types/api/product";
import {
  mapApiProductToProduct,
  mapApiProductsToProducts,
} from "@/utils/productMapper";
import {
  unwrapApiResponse,
  unwrapPaginatedResponse,
  buildQueryString,
} from "@/utils/apiHelpers";

export async function getProducts(
  params: GetProductsParams = {},
): Promise<ProductListResult> {
  const queryStr = buildQueryString(params).toString();
  const url = `/api/products${queryStr ? `?${queryStr}` : ""}`;
  // Simulate a server error for testing error handling
  // const url = `https://httpbin.org/status/500`;
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

  // simulate empty data to avoid breaking the UI when API is not ready
  // return {
  //   data: [],
  // };
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
