import { products } from "../data/products";
import type { Product } from "../types/product";
import { isSameProductId } from "../utils/formatters";

const MOCK_DELAY_MS = 120;

interface Pagination {
  page: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface ProductListResult {
  products: Product[];
  pagination: Pagination;
  links: Record<string, string>;
}

export interface GetProductsParams {
  search?: string;
  category_id?: string | number | null;
  page?: number;
  per_page?: number;
}

interface ServiceOptions {
  signal?: AbortSignal;
}

function createAbortError(): Error {
  return new DOMException("The operation was aborted.", "AbortError");
}

function delay(ms: number, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) {
    return Promise.reject(createAbortError());
  }

  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    function onAbort() {
      window.clearTimeout(timeoutId);
      signal?.removeEventListener("abort", onAbort);
      reject(createAbortError());
    }

    signal?.addEventListener("abort", onAbort);
  });
}

function normalizeSearch(search: string | undefined): string {
  return String(search || "")
    .trim()
    .toLowerCase();
}

function cloneProduct(product: Product): Product {
  return {
    ...product,
    images: [...product.images],
    breadcrumb: [...product.breadcrumb],
    faqs: [...product.faqs],
    relatedProductIds: [...product.relatedProductIds],
    variants: {
      colors: [...product.variants.colors],
      sizes: [...product.variants.sizes],
    },
    pricing: { ...product.pricing },
    category: { ...product.category },
    stock: product.stock ? { ...product.stock } : undefined,
  };
}

function paginateProducts(
  items: Product[],
  params: GetProductsParams,
): ProductListResult {
  const page = Math.max(1, Number(params.page) || 1);
  const perPage = Math.max(1, Number(params.per_page) || items.length || 15);
  const startIndex = (page - 1) * perPage;
  const total = items.length;
  const lastPage = total === 0 ? 1 : Math.ceil(total / perPage);

  return {
    products: items.slice(startIndex, startIndex + perPage),
    pagination: {
      page,
      lastPage,
      perPage,
      total,
    },
    links: {},
  };
}

function filterProducts(params: GetProductsParams): Product[] {
  const normalizedSearch = normalizeSearch(params.search);
  const normalizedCategoryId =
    params.category_id === undefined || params.category_id === null
      ? null
      : String(params.category_id);

  return products
    .filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        String(product.name || "")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesCategory =
        !normalizedCategoryId ||
        String(product.category?.id || "") === normalizedCategoryId;

      return matchesSearch && matchesCategory;
    })
    .map(cloneProduct);
}

export async function getProducts(
  params: GetProductsParams = {},
  options: ServiceOptions = {},
): Promise<ProductListResult> {
  await delay(MOCK_DELAY_MS, options.signal);
  return paginateProducts(filterProducts(params), params);
}

export async function getCatalogProducts(
  searchTerm = "",
  options: ServiceOptions = {},
): Promise<Product[]> {
  const result = await getProducts({ search: searchTerm }, options);
  return result.products;
}

export async function getProductById(
  id: string | number,
  options: ServiceOptions = {},
): Promise<Product | null> {
  const normalizedId = String(id || "").trim();

  if (!normalizedId) {
    return null;
  }

  await delay(MOCK_DELAY_MS, options.signal);

  const matchedProduct = products.find((product) => {
    return (
      isSameProductId(normalizedId, String(product.id)) ||
      product.slug === normalizedId
    );
  });

  return matchedProduct ? cloneProduct(matchedProduct) : null;
}
