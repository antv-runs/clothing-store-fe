import React from "react";
import { QuantityStepper } from "@/components/molecules/QuantityStepper";
import "./index.scss";

interface ProductActionsProps {
  selectedColorId?: string | null;
  selectedSizeId?: string | null;
  quantity: number;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onQuantityChange: (value: string) => void;
  onAddToCart: () => void;
}

/**
 * ProductActions - Quantity controls and add-to-cart CTA.
 * Keeps original classes and markup to avoid style regressions.
 */
export const ProductActions: React.FC<ProductActionsProps> = ({
  selectedColorId,
  selectedSizeId,
  quantity,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onQuantityChange,
  onAddToCart,
}) => {
  return (
    <div className="product-overview__actions">
      <QuantityStepper
        action="#"
        inputId="quantity-input"
        inputClassName="quantity-input js-quantity-input"
        decrementButtonClassName="quantity-button-minus quantity-button-minus--aligned js-quantity-button-minus"
        incrementButtonClassName="quantity-button-plus js-quantity-button-plus"
        value={quantity}
        min={1}
        step={1}
        iconWidth={20}
        iconHeight={20}
        onDecrease={onDecreaseQuantity}
        onIncrease={onIncreaseQuantity}
        onChange={(event) => onQuantityChange(event.target.value)}
      />
      <button
        className="add-to-cart-button js-add-to-cart"
        type="button"
        data-color-id={selectedColorId}
        data-size-id={selectedSizeId}
        onClick={onAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};
