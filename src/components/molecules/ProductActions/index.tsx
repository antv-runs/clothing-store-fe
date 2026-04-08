import React from "react";
import { Button } from "@/components/atoms/Button";
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
        inputClassName="quantity-input"
        decrementButtonClassName="quantity-button-minus quantity-button-minus--aligned"
        incrementButtonClassName="quantity-button-plus"
        value={quantity}
        min={1}
        step={1}
        iconWidth={20}
        iconHeight={20}
        onDecrease={onDecreaseQuantity}
        onIncrease={onIncreaseQuantity}
        onChange={(event) => onQuantityChange(event.target.value)}
      />
      <Button
        variant="primary"
        className="add-to-cart-button"
        type="button"
        data-color-id={selectedColorId}
        data-size-id={selectedSizeId}
        onClick={onAddToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};
