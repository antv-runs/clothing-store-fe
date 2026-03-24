import React from "react";

interface AddToCartProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  isInStock: boolean;
  isLoading?: boolean;
}

/**
 * AddToCart molecule - Quantity selector and add to cart button
 * Handles quantity selection and cart addition
 */
export const AddToCart: React.FC<AddToCartProps> = ({
  quantity,
  onQuantityChange,
  onAddToCart,
  isInStock,
  isLoading = false,
}) => {
  const handleDecrement = () => {
    if (quantity > 1) onQuantityChange(quantity - 1);
  };

  const handleIncrement = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="add-to-cart">
      <div className="quantity-selector">
        <label htmlFor="quantity">Quantity:</label>
        <div className="quantity-controls">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) =>
              onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))
            }
            min="1"
            readOnly
          />
          <button
            type="button"
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        className="btn-add-to-cart"
        onClick={onAddToCart}
        disabled={!isInStock || isLoading}
        aria-label="Add to cart"
      >
        {isLoading ? "Adding..." : isInStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
};
