import type { HTMLAttributes } from "react";
import { Button } from "@/components/atoms/Button";
import { QuantityStepper } from "@/components/molecules/QuantityStepper";
import clsx from "clsx";
import "./index.scss";

type ProductActionsProps = HTMLAttributes<HTMLDivElement> & {
  selectedColorId?: string | null;
  selectedSizeId?: string | null;
  quantity: number;
  maxQuantity?: number;
  isAddingToCart?: boolean;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onMaxQuantityReached?: () => void;
  onQuantityChange: (value: string) => void;
  onAddToCart: () => void;
};

/**
 * ProductActions - Quantity controls and add-to-cart CTA.
 * Keeps original classes and markup to avoid style regressions.
 */
export const ProductActions = ({
  selectedColorId,
  selectedSizeId,
  quantity,
  maxQuantity,
  isAddingToCart = false,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onMaxQuantityReached,
  onQuantityChange,
  onAddToCart,
  className,
  ...rest
}: ProductActionsProps) => {
  return (
    <div className={clsx("product-overview__actions", className)} {...rest}>
      <QuantityStepper
        action="#"
        inputId="quantity-input"
        inputClassName="quantity-input"
        decrementButtonClassName="quantity-button-minus quantity-button-minus--aligned"
        incrementButtonClassName="quantity-button-plus"
        value={quantity}
        min={1}
        max={maxQuantity}
        step={1}
        iconWidth={20}
        iconHeight={20}
        onDecrease={onDecreaseQuantity}
        onIncrease={onIncreaseQuantity}
        onMaxReached={onMaxQuantityReached}
        onChange={(event) => onQuantityChange(event.target.value)}
      />
      <Button
        variant="primary"
        className="add-to-cart-button"
        type="button"
        data-color-id={selectedColorId}
        data-size-id={selectedSizeId}
        onClick={onAddToCart}
        disabled={isAddingToCart}
        isLoading={isAddingToCart}
      >
        Add to Cart
      </Button>
    </div>
  );
};
