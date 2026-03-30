import type { ApiCategory, Category } from "@custom-types/category";

/**
 * Convert a single ApiCategory to Category (UI model)
 * Maps snake_case field (has_children) to camelCase (hasChildren)
 */
export function mapApiCategoryToCategory(apiCategory: ApiCategory): Category {
  return {
    id: apiCategory.id,
    name: apiCategory.name,
    slug: apiCategory.slug,
    href: apiCategory.href,
    hasChildren: apiCategory.has_children,
    description: "", // Not provided by API
    status: "active", // Default to active
    parentId: null, // Not provided in list endpoint
    childrenCount: 0, // Not provided in list endpoint
    image: undefined,
  };
}

/**
 * Convert an array of ApiCategory to Category[]
 */
export function mapApiCategoriesToCategories(
  apiCategories: ApiCategory[],
): Category[] {
  return apiCategories.map(mapApiCategoryToCategory);
}
