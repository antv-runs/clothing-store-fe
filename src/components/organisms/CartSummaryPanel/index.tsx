import React from "react";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import "./index.scss";

interface CartSummary {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
}

interface CartSummaryPanelProps {
  summary: CartSummary;
  formatPrice: (amount: number, currency?: string) => string;
}

/**
 * CartSummaryPanel - Order summary and checkout action area.
 */
export const CartSummaryPanel: React.FC<CartSummaryPanelProps> = ({
  summary,
  formatPrice,
}) => {
  return (
    <aside
      className="cart-summary js-cart-summary"
      aria-label="Order summary"
      aria-busy="false"
    >
      <Heading as="h2" className="cart-summary__title">
        Order Summary
      </Heading>

      <dl className="cart-summary__rows">
        <div className="cart-summary__row u-mb-28">
          <dt>Subtotal</dt>
          <dd className="js-cart-subtotal">{formatPrice(summary.subtotal)}</dd>
        </div>
        <div className="cart-summary__row u-mb-28">
          <dt>Discount (-20%)</dt>
          <dd className="cart-summary__discount js-cart-discount">
            -{formatPrice(summary.discount)}
          </dd>
        </div>
        <div className="cart-summary__row">
          <dt>Delivery Fee</dt>
          <dd className="js-cart-delivery">{formatPrice(summary.delivery)}</dd>
        </div>
      </dl>

      <div className="cart-summary__total">
        <p>Total</p>
        <p className="js-cart-total">{formatPrice(summary.total)}</p>
      </div>

      <form className="cart-summary__coupon js-cart-promo-form" action="#">
        <div className="coupon-input">
          <figure>
            <img src="/images/icn_promo_code.svg" alt="Promo code" />
          </figure>
          <input
            className="js-cart-coupon-input"
            type="text"
            placeholder="Add promo code"
            aria-label="Promo code"
            disabled
            aria-disabled="true"
          />
        </div>
        <Button
          className="js-cart-coupon-apply"
          type="button"
          disabled
          aria-disabled="true"
          unstyled
        >
          Apply
        </Button>
      </form>
      <p
        className="cart-summary__coupon-msg js-cart-coupon-msg"
        aria-live="polite"
        hidden
      ></p>

      <Button
        className="cart-summary__checkout js-cart-checkout"
        type="button"
        disabled
        aria-disabled="true"
        unstyled
      >
        <span className="cart-summary__checkout-text">Go to Checkout</span>
      </Button>
    </aside>
  );
};
