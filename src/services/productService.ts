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

export interface GetRelatedProductsOptions extends ServiceOptions {
  limit?: number;
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

function resolveImageUrl(product: Product): string {
  const primaryImage =
    product.images.find((image) => image.is_primary) || product.images[0];

  return (
    String(product.thumbnail || "").trim() ||
    String(primaryImage?.url || "").trim() ||
    String(primaryImage?.image_url || "").trim() ||
    ""
  );
}

function resolveImageAlt(product: Product): string {
  const primaryImage =
    product.images.find((image) => image.is_primary) || product.images[0];

  return (
    String(product.thumbnailAlt || "").trim() ||
    String(primaryImage?.alt || "").trim() ||
    String(primaryImage?.alt_text || "").trim() ||
    product.name
  );
}

function normalizeProduct(product: Product): Product {
  const cloned = cloneProduct(product);
  const normalizedImages = cloned.images.map((image, index) => {
    const resolvedUrl =
      String(image.url || "").trim() || String(image.image_url || "").trim();

    return {
      ...image,
      id: String(image.id || `${cloned.id}-image-${index + 1}`),
      url: resolvedUrl,
      image_url: resolvedUrl,
      alt: String(image.alt || "").trim() || cloned.name,
      alt_text: image.alt_text,
    };
  });

  cloned.images = normalizedImages;
  cloned.thumbnail = resolveImageUrl(cloned);
  cloned.thumbnailAlt = resolveImageAlt(cloned);

  return cloned;
}

function getNormalizedProductList(): Product[] {
  return products.map((product) => normalizeProduct(product));
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

  return getNormalizedProductList()
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

  const matchedProduct = getNormalizedProductList().find((product) => {
    return (
      isSameProductId(normalizedId, String(product.id)) ||
      product.slug === normalizedId
    );
  });

  return matchedProduct ? cloneProduct(matchedProduct) : null;
}

export async function getRelatedProducts(
  productId: string | number,
  { limit = 8, signal }: GetRelatedProductsOptions = {},
): Promise<Product[]> {
  const normalizedProductId = String(productId || "").trim();
  const normalizedLimit = Math.max(1, Number(limit) || 8);

  await delay(MOCK_DELAY_MS, signal);

  const allProducts = getNormalizedProductList();
  const currentProduct = allProducts.find((product) => {
    return isSameProductId(normalizedProductId, String(product.id));
  });

  if (!currentProduct) {
    return allProducts.slice(0, normalizedLimit).map(cloneProduct);
  }

  const pickedIds = new Set<string>();
  const relatedByIds: Product[] = [];

  currentProduct.relatedProductIds.forEach((relatedId) => {
    const matched = allProducts.find((product) => {
      return isSameProductId(String(relatedId), String(product.id));
    });

    if (!matched || isSameProductId(String(matched.id), normalizedProductId)) {
      return;
    }

    if (pickedIds.has(String(matched.id))) {
      return;
    }

    pickedIds.add(String(matched.id));
    relatedByIds.push(matched);
  });

  if (relatedByIds.length < normalizedLimit) {
    allProducts.forEach((product) => {
      if (relatedByIds.length >= normalizedLimit) {
        return;
      }

      if (isSameProductId(String(product.id), normalizedProductId)) {
        return;
      }

      if (pickedIds.has(String(product.id))) {
        return;
      }

      pickedIds.add(String(product.id));
      relatedByIds.push(product);
    });
  }

  return relatedByIds.slice(0, normalizedLimit).map(cloneProduct);
}
