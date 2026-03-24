import React from "react";

interface CartEmptyStateProps {
  isVisible: boolean;
}

/**
 * CartEmptyState - Empty cart message block.
 */
export const CartEmptyState: React.FC<CartEmptyStateProps> = ({
  isVisible,
}) => {
  return (
    <div
      className="cart-empty js-cart-empty"
      style={{ display: isVisible ? "flex" : "none" }}
      aria-live="polite"
    >
      <div className="cart-empty__inner">
        <p className="cart-empty__text">Your cart is empty.</p>
        <a href="/" className="cart-empty__cta">
          Continue Shopping
        </a>
      </div>
    </div>
  );
};
