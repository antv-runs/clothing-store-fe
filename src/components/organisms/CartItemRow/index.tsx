import React from "react";
import { ProductPrice } from "@/components/molecules/ProductPrice";
import { QuantityStepper } from "@/components/molecules/QuantityStepper";
import "./index.scss";
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
 * Keeps current cart layout and price presentation.
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
          <ProductPrice
            currentAmount={currentPrice}
            originalAmount={lineOriginalPrice}
            discountPercent={item.pricing.discountPercent}
            currency={item.pricing.currency}
            formatPrice={formatPrice}
            className="cart-item__price-wrap"
            currentClassName="cart-item__price"
            originalClassName="cart-item__price-original"
            discountClassName="cart-item__price-discount"
          />

          <QuantityStepper
            className="cart-item__quantity"
            ariaLabel="Quantity controls"
            inputClassName="js-cart-item-qty-input"
            decrementButtonClassName="cart-item__qty-btn js-cart-item-qty-minus"
            incrementButtonClassName="cart-item__qty-btn js-cart-item-qty-plus"
            value={item.quantity}
            min={1}
            readOnly
            disabled
            iconWidth={16}
            iconHeight={16}
          />
        </div>
      </div>
    </article>
  );
};
