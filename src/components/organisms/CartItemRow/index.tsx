import React from "react";
import type { Product } from "@/types/product";

interface CartItemRowProps {
  item: Product & {
    quantity: number;
    color: string | null;
    size: string | null;
  };
  formatPrice: (amount: number, currency?: string) => string;
}

/**
 * CartItemRow - Cart row item presentation.
 * Keeps original DOM/class names for current styles and scripts.
 */
export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  formatPrice,
}) => {
  const currentPrice = item.pricing.current * item.quantity;
  const lineOriginalPrice =
    item.pricing.original && item.pricing.original > item.pricing.current
      ? item.pricing.original * item.quantity
      : null;

  return (
    <article
      className="cart-item"
      data-cart-product-id={item.id}
      data-cart-color={item.color || ""}
      data-cart-size={item.size || ""}
    >
      <a
        href={`/product/${encodeURIComponent(item.id)}`}
        className="cart-item__image-link js-cart-item-link"
        aria-label={`View product details for ${item.name}`}
      >
        <div
          className="cart-item__image-shell cart-item__image-shell--loaded js-cart-image-shell"
          aria-busy="false"
        >
          <span
            className="cart-item__image-placeholder cart-skeleton-block"
            aria-hidden="true"
          ></span>
          <img
            className="cart-item__image js-cart-item-image"
            src={item.thumbnail || item.images?.[0]?.url}
            alt={item.thumbnailAlt || item.name}
            loading="lazy"
            decoding="async"
          />
        </div>
      </a>

      <div className="cart-item__content">
        <div className="cart-item__head">
          <h2 className="cart-item__name">
            <a
              className="cart-item__name-link js-cart-item-link"
              href={`/product/${encodeURIComponent(item.id)}`}
            >
              {item.name}
            </a>
          </h2>
          <button
            className="cart-item__remove js-cart-item-remove"
            type="button"
            aria-label="Remove item"
            disabled
          ></button>
        </div>

        {item.size ? (
          <p className="cart-item__meta">Size: {item.size}</p>
        ) : null}
        {item.color ? (
          <p className="cart-item__meta">Color: {item.color}</p>
        ) : null}

        <div className="cart-item__foot">
          <div className="cart-item__price-wrap">
            <p className="cart-item__price js-cart-item-price">
              {formatPrice(currentPrice, item.pricing.currency)}
            </p>
            {lineOriginalPrice ? (
              <p className="cart-item__price-original js-cart-item-price-orig">
                {formatPrice(lineOriginalPrice, item.pricing.currency)}
              </p>
            ) : null}
            {item.pricing.discountPercent ? (
              <p className="cart-item__price-discount">
                -{item.pricing.discountPercent}%
              </p>
            ) : null}
          </div>

          <div className="cart-item__quantity" aria-label="Quantity controls">
            <button
              className="cart-item__qty-btn js-cart-item-qty-minus"
              type="button"
              aria-label="Decrease quantity"
              disabled
            ></button>
            <input
              className="js-cart-item-qty-input"
              type="number"
              min="1"
              value={item.quantity}
              aria-label="Quantity"
              readOnly
            />
            <button
              className="cart-item__qty-btn js-cart-item-qty-plus"
              type="button"
              aria-label="Increase quantity"
              disabled
            ></button>
          </div>
        </div>
      </div>
    </article>
  );
};
