import React from "react";
import { Heading } from "@/components/atoms/Heading";
import { CheckoutItemRow } from "@/components/organisms/CheckoutItemRow";
import type { Product } from "@/types/product";
import "./index.scss";

interface CartSummary {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
}

type CheckoutItemType = Product & {
  quantity: number;
  color: string | null;
  size: string | null;
};

interface CheckoutSummaryPanelProps {
  items: CheckoutItemType[];
  summary: CartSummary;
  formatPrice: (amount: number, currency?: string) => string;
}

/**
 * CheckoutSummaryPanel - Read-only cart summary for the checkout page.
 */
export const CheckoutSummaryPanel: React.FC<CheckoutSummaryPanelProps> = ({
  items,
  summary,
  formatPrice,
}) => {
  return (
    <aside className="checkout-summary" aria-label="Order summary">
      <Heading as="h2" className="checkout-summary__title">
        Order Summary
      </Heading>

      <div className="checkout-summary__items">
        {items.map((item) => (
          <CheckoutItemRow
            key={`${item.id}-${item.color || "none"}-${item.size || "none"}`}
            item={item}
            formatPrice={formatPrice}
          />
        ))}
      </div>

      <dl className="checkout-summary__rows">
        <div className="checkout-summary__row u-mb-28">
          <dt>Subtotal</dt>
          <dd>{formatPrice(summary.subtotal)}</dd>
        </div>
        <div className="checkout-summary__row u-mb-28">
          <dt>Discount</dt>
          <dd className="checkout-summary__discount">
            -{formatPrice(summary.discount)}
          </dd>
        </div>
        <div className="checkout-summary__row">
          <dt>Delivery Fee</dt>
          <dd>{formatPrice(summary.delivery)}</dd>
        </div>
      </dl>

      <div className="checkout-summary__total">
        <p>Total</p>
        <p>{formatPrice(summary.total)}</p>
      </div>
    </aside>
  );
};
