import React from "react";
import { QuantityStepper } from "@/components/molecules/QuantityStepper";
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
      <QuantityStepper
        action="#"
        inputId="quantity-input"
        inputClassName="quantity-input js-quantity-input"
        decrementButtonClassName="quantity-button-minus quantity-button-minus--aligned js-quantity-button-minus"
        incrementButtonClassName="quantity-button-plus js-quantity-button-plus"
        defaultValue={1}
        min={1}
        step={1}
        iconWidth={20}
        iconHeight={20}
      />
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
