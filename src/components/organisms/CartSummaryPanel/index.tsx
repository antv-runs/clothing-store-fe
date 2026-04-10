import React, { useState } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import "./index.scss";
import { Text } from "@/components/atoms/Text";
import { InputWithIcon } from "@/components/molecules/InputWithIcon";

interface CartSummary {
  subtotal: number;
  discount: number;
  discountPercent: number;
  delivery: number;
  total: number;
}

interface CartSummaryPanelProps {
  summary: CartSummary;
  formatPrice: (amount: number, currency?: string) => string;
  isCheckoutDisabled?: boolean;
  isLocked?: boolean;
  isCheckoutLoading?: boolean;
  isCouponLoading?: boolean;
  onCheckout?: () => void;
  onApplyCoupon?: (code: string) => Promise<void> | void;
}

/**
 * CartSummaryPanel - Order summary and checkout action area.
 */
export const CartSummaryPanel: React.FC<CartSummaryPanelProps> = ({
  summary,
  formatPrice,
  isCheckoutDisabled = true,
  isLocked = false,
  isCheckoutLoading = false,
  isCouponLoading = false,
  onCheckout,
  onApplyCoupon,
}) => {
  const [promoCode, setPromoCode] = useState("");
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApply = async () => {
    const trimmedCode = promoCode.trim();
    if (!trimmedCode || isLocked || isCouponLoading) {
      return;
    }

    setCouponError(null);
    if (onApplyCoupon) {
      try {
        await onApplyCoupon(trimmedCode);
      } catch {
        setCouponError("Failed to apply coupon");
      }
    }
  };

  return (
    <aside
      className="cart-summary"
      aria-label="Order summary"
      aria-busy="false"
    >
      <Heading as="h2" className="cart-summary__title">
        Order Summary
      </Heading>

      <dl className="cart-summary__rows">
        <div className="cart-summary__row u-mb-28">
          <dt>Subtotal</dt>
          <dd>{formatPrice(summary.subtotal)}</dd>
        </div>
        <div className="cart-summary__row u-mb-28">
          <dt>Discount (-{summary.discountPercent}%)</dt>
          <dd className="cart-summary__discount">
            -{formatPrice(summary.discount)}
          </dd>
        </div>
        <div className="cart-summary__row">
          <dt>Delivery Fee</dt>
          <dd>{formatPrice(summary.delivery)}</dd>
        </div>
      </dl>

      <div className="cart-summary__total">
        <p>Total</p>
        <p>{formatPrice(summary.total)}</p>
      </div>

      <form className="cart-summary__coupon" action="#">
        <InputWithIcon
          className="coupon-input"
          iconName="icn_promo_code"
          iconPosition="inline-start"
          iconWidth={22}
          iconHeight={22}
          type="text"
          placeholder="Add promo code"
          ariaLabel="Promo code"
          disabled={isLocked}
          value={promoCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPromoCode(e.target.value)}
        />
        <Button
          variant="primary"
          type="button"
          disabled={isLocked || !promoCode.trim()}
          isLoading={isCouponLoading}
          onClick={handleApply}
        >
          Apply
        </Button>
      </form>
      <Text
        as="p"
        className={clsx("cart-summary__coupon-msg", {
          "cart-summary__coupon-msg--error": couponError,
        })}
        aria-live="polite"
        hidden={!couponError}
      >
        {couponError}
      </Text>

      <Button
        variant="primary"
        className="cart-summary__checkout"
        type="button"
        disabled={isCheckoutDisabled || isLocked}
        isLoading={isCheckoutLoading}
        onClick={onCheckout}
      >
        <span className="cart-summary__checkout-text">Go to Checkout</span>
      </Button>
    </aside>
  );
};
