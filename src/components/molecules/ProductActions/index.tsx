import React from "react";
import { IconButton } from "@/components/atoms/IconButton";
import "./index.scss";

interface ProductActionsProps {
  selectedColorId?: string | null;
  selectedSizeId?: string | null;
}

/**
 * ProductActions - Quantity controls and add-to-cart CTA.
 * Keeps original classes and markup to avoid style regressions.
 */
export const ProductActions: React.FC<ProductActionsProps> = ({
  selectedColorId,
  selectedSizeId,
}) => {
  return (
    <div className="product-overview__actions">
      <form action="#">
        <IconButton
          svgName="icn_minus"
          className="quantity-button-minus quantity-button-minus--aligned js-quantity-button-minus"
          ariaLabel="Decrease quantity"
          iconWidth={20}
          iconHeight={20}
        />
        <input
          id="quantity-input"
          className="quantity-input js-quantity-input"
          type="number"
          defaultValue={1}
          min={1}
          step={1}
          aria-label="Quantity"
        />
        <IconButton
          svgName="icn_plus"
          className="quantity-button-plus js-quantity-button-plus"
          ariaLabel="Increase quantity"
          iconWidth={20}
          iconHeight={20}
        />
      </form>
      <button
        className="add-to-cart-button js-add-to-cart"
        type="button"
        data-color-id={selectedColorId}
        data-size-id={selectedSizeId}
      >
        Add to Cart
      </button>
    </div>
  );
};
