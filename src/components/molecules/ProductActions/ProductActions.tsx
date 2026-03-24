import React from "react";

/**
 * ProductActions - Quantity controls and add-to-cart CTA.
 * Keeps original classes and markup to avoid style regressions.
 */
export const ProductActions: React.FC = () => {
  return (
    <div className="product-overview__actions">
      <form action="#">
        <button
          className="quantity-button-minus js-quantity-button-minus"
          type="button"
          aria-label="Decrease quantity"
        ></button>
        <input
          id="quantity-input"
          className="quantity-input js-quantity-input"
          type="number"
          defaultValue={1}
          min={1}
          step={1}
          aria-label="Quantity"
        />
        <button
          className="quantity-button-plus js-quantity-button-plus"
          type="button"
          aria-label="Increase quantity"
        ></button>
      </form>
      <button className="add-to-cart-button js-add-to-cart" type="button">
        Add to Cart
      </button>
    </div>
  );
};
