import type {
  ApiProduct,
  Product,
  ProductPricing,
  ProductImage,
  ProductColorVariant,
  ProductSizeVariant,
  ProductVariants,
  ApiProductPricing,
  ApiProductImage,
  ApiProductVariantOption,
  ApiProductVariants,
} from "@/types/product";

/**
 * Maps common color labels to hex color codes
 * Normalized to lowercase for case-insensitive lookup
 */
const LABEL_TO_COLOR_CODE: Record<string, string> = {
  red: "#FF0000",
  blue: "#0000FF",
  green: "#008000",
  white: "#FFFFFF",
  black: "#000000",
  gray: "#808080",
  grey: "#808080",
  beige: "#F5F5DC",
  yellow: "#FFFF00",
  pink: "#FFC0CB",
  purple: "#800080",
  orange: "#FFA500",
  brown: "#A52A2A",
};

/**
 * Get the hex color code for a given color label
 * Falls back to gray if color label is not found
 */
function getColorCodeForLabel(label: string): string {
  const normalized = label.toLowerCase().trim();
  return LABEL_TO_COLOR_CODE[normalized] ?? "#808080"; // Default to gray
}

/**
 * Convert ApiProductPricing (snake_case) to ProductPricing (camelCase)
 */
function mapApiPricingToProductPricing(
  pricing: ApiProductPricing,
): ProductPricing {
  return {
    currency: pricing.currency,
    current: pricing.current,
    original: pricing.original,
    discountPercent: pricing.discountPercent,
  };
}

/**
 * Convert API product image (snake_case) to ProductImage (camelCase)
 */
function mapApiImageToProductImage(apiImage: ApiProductImage): ProductImage {
  return {
    id: apiImage.id,
    image_url: apiImage.image_url,
    url: apiImage.image_url, // Map image_url to url as well
    alt_text: apiImage.alt_text,
    alt: apiImage.alt_text || "Product image",
    is_primary: apiImage.is_primary,
    sort_order: apiImage.sort_order,
  };
}

/**
 * Convert API product variant option to ProductColorVariant
 * Includes colorCode mapping from label if not provided by API
 */
function mapApiVariantOptionToColorVariant(
  option: ApiProductVariantOption,
): ProductColorVariant {
  return {
    id: option.id,
    label: option.label,
    colorCode: option.color_code || getColorCodeForLabel(option.label),
  };
}

function mapApiVariantOptionToSizeVariant(
  option: ApiProductVariantOption,
): ProductSizeVariant {
  return {
    id: option.id,
    label: option.label,
    inStock: option.in_stock,
  };
}

/**
 * Convert API product variants (snake_case) to ProductVariants (camelCase)
 */
function mapApiVariantsToProductVariants(
  apiVariants: ApiProductVariants,
): ProductVariants {
  return {
    colors: (apiVariants.colors || []).map(mapApiVariantOptionToColorVariant),
    sizes: (apiVariants.sizes || []).map(mapApiVariantOptionToSizeVariant),
  };
}

/**
 * Convert a single ApiProduct to Product (UI model)
 * Maps all snake_case fields to camelCase
 */
export function mapApiProductToProduct(apiProduct: ApiProduct): Product {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    slug: apiProduct.slug || null,
    description: apiProduct.description,
    details: apiProduct.description, // Use description as details
    pricing: mapApiPricingToProductPricing(apiProduct.pricing),
    thumbnail: apiProduct.thumbnail,
    thumbnailAlt: apiProduct.name,
    images: (apiProduct.images || []).map(mapApiImageToProductImage),
    category: apiProduct.category,
    variants: mapApiVariantsToProductVariants(apiProduct.variants),
    rating: apiProduct.ratingAvg || 0,
    breadcrumb: [
      "Home",
      "Shop",
      apiProduct.category?.name || "Products",
      apiProduct.name,
    ],
    faqs: [], // Backend doesn't return FAQs in API
    relatedProductIds: [], // Will be populated from related products endpoint
    stock: {
      inStock: true,
      quantity: 0,
    },
  };
}

/**
 * Convert an array of ApiProduct to Product[]
 */
export function mapApiProductsToProducts(apiProducts: ApiProduct[]): Product[] {
  return apiProducts.map(mapApiProductToProduct);
}
