import React from "react";
import type { ProductVariants as ProductVariantsData } from "@custom-types/product";
import { Text } from "@components/atoms";

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
        <Text as="p">Select Colors</Text>
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
            <Text as="span">No colors</Text>
          )}
        </div>
      </div>

      <div className="product-overview__size">
        <Text as="p">Choose Size</Text>
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
            <Text as="span">No sizes</Text>
          )}
        </div>
      </div>
    </>
  );
};
