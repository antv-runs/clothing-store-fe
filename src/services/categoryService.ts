import { categories } from "../data/categories";
import type { Category } from "../types/category";

const MOCK_DELAY_MS = 120;

interface Pagination {
  page: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface CategoryListResult {
  categories: Category[];
  pagination: Pagination;
  links: Record<string, string>;
}

export interface GetCategoriesParams {
  search?: string;
  status?: "active" | "inactive";
  parent_id?: string | null;
  has_children?: boolean;
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

function cloneCategory(category: Category): Category {
  return { ...category };
}

export async function getCategories(
  params: GetCategoriesParams = {},
  options: ServiceOptions = {},
): Promise<CategoryListResult> {
  await delay(MOCK_DELAY_MS, options.signal);

  const normalizedSearch = String(params.search || "")
    .trim()
    .toLowerCase();
  const filtered = categories
    .filter((category) => {
      const matchesSearch =
        !normalizedSearch ||
        String(category.name || "")
          .toLowerCase()
          .includes(normalizedSearch);
      const matchesStatus = !params.status || category.status === params.status;
      const matchesParent =
        params.parent_id === undefined
          ? true
          : String(category.parentId) === String(params.parent_id);
      const matchesChildren =
        params.has_children === undefined ||
        category.hasChildren === params.has_children;

      return matchesSearch && matchesStatus && matchesParent && matchesChildren;
    })
    .map(cloneCategory);

  const page = Math.max(1, Number(params.page) || 1);
  const perPage = Math.max(1, Number(params.per_page) || filtered.length || 15);
  const total = filtered.length;
  const lastPage = total === 0 ? 1 : Math.ceil(total / perPage);
  const startIndex = (page - 1) * perPage;

  return {
    categories: filtered.slice(startIndex, startIndex + perPage),
    pagination: {
      page,
      lastPage,
      perPage,
      total,
    },
    links: {},
  };
}
