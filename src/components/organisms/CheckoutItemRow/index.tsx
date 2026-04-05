import React from "react";
import { ProductPrice } from "@/components/molecules/ProductPrice";
import "./index.scss";
import type { Product } from "@/types/product";

interface CheckoutItemRowProps {
  item: Product & {
    quantity: number;
    color: string | null;
    size: string | null;
  };
  formatPrice: (amount: number, currency?: string) => string;
}

/**
 * CheckoutItemRow - Lightweight, read-only variant of CartItemRow.
 */
export const CheckoutItemRow: React.FC<CheckoutItemRowProps> = ({
  item,
  formatPrice,
}) => {
  const currentPrice = item.pricing.current * item.quantity;
  const lineOriginalPrice =
    item.pricing.original && item.pricing.original > item.pricing.current
      ? item.pricing.original * item.quantity
      : null;

  return (
    <article className="checkout-item">
      <div className="checkout-item__image-shell">
        <img
          className="checkout-item__image"
          src={item.thumbnail || item.images?.[0]?.url}
          alt={item.thumbnailAlt || item.name}
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="checkout-item__content">
        <h2 className="checkout-item__name">{item.name}</h2>
        {item.size ? (
          <p className="checkout-item__meta">Size: {item.size}</p>
        ) : null}
        {item.color ? (
          <p className="checkout-item__meta">Color: {item.color}</p>
        ) : null}
        <p className="checkout-item__meta">Qty: {item.quantity}</p>

        <ProductPrice
          currentAmount={currentPrice}
          originalAmount={lineOriginalPrice}
          discountPercent={item.pricing.discountPercent}
          currency={item.pricing.currency}
          formatPrice={formatPrice}
          className="checkout-item__price-wrap"
          currentClassName="checkout-item__price"
          originalClassName="checkout-item__price-original"
          discountClassName="checkout-item__price-discount"
        />
      </div>
    </article>
  );
};
