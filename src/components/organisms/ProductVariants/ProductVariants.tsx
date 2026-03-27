import React from "react";
import type { ProductVariants as ProductVariantsData } from "../../../types/product";

interface ProductVariantsProps {
  variants: ProductVariantsData;
}

/**
 * ProductVariants organism - Color and size selectors
 * Displays available product variants for user selection
 */
export const ProductVariants: React.FC<ProductVariantsProps> = ({
  variants,
}) => {
  return (
    <>
      <div className="product-overview__choose">
        <p>Select Colors</p>
        <div
          id="product-color-options"
          className="product-overview__choose-colors js-product-color-options"
        >
          {variants?.colors?.length ? (
            variants.colors.map((color) => (
              <button
                key={color.id}
                type="button"
                className="color-option js-color-option"
                style={{ backgroundColor: color.colorCode || "#c5c5c5" }}
                aria-label={color.label}
                title={color.label}
              />
            ))
          ) : (
            <span>No colors</span>
          )}
        </div>
      </div>

      <div className="product-overview__size">
        <p>Choose Size</p>
        <div
          id="product-size-options"
          className="product-overview__size-options js-product-size-options"
        >
          {variants?.sizes?.length ? (
            variants.sizes.map((size) => (
              <button
                key={size.id}
                className="size-option js-size-option"
                type="button"
                disabled={size.inStock === false}
              >
                {size.label}
              </button>
            ))
          ) : (
            <span>No sizes</span>
          )}
        </div>
      </div>
    </>
  );
};
