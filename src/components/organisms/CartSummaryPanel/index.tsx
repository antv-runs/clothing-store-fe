import type { HTMLAttributes } from "react";
import { useState } from "react";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import "./index.scss";
import { Text } from "@/components/atoms/Text";
import { InputWithIcon } from "@/components/molecules/InputWithIcon";
import { ERROR_MESSAGES } from "@/const/errorMessages";
import { UI_TEXT } from "@/const/uiText";

type CartSummary = {
  subtotal: number;
  discount: number;
  discountPercent: number;
  delivery: number;
  total: number;
};

type CartSummaryPanelProps = HTMLAttributes<HTMLElement> & {
  summary: CartSummary;
  formatPrice: (amount: number, currency?: string) => string;
  isCheckoutDisabled?: boolean;
  isLocked?: boolean;
  isCheckoutLoading?: boolean;
  isCouponLoading?: boolean;
  onCheckout?: () => void;
  onApplyCoupon?: (code: string) => Promise<void> | void;
};

/**
 * CartSummaryPanel - Order summary and checkout action area.
 */
export const CartSummaryPanel = ({
  summary,
  formatPrice,
  isCheckoutDisabled = true,
  isLocked = false,
  isCheckoutLoading = false,
  isCouponLoading = false,
  onCheckout,
  onApplyCoupon,
  className,
  ...rest
}: CartSummaryPanelProps) => {
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
        setCouponError(ERROR_MESSAGES.COUPON_APPLY_FAILED);
      }
    }
  };

  return (
    <aside
      className={clsx("cart-summary", className)}
      aria-label={UI_TEXT.ORDER_SUMMARY}
      aria-busy="false"
      {...rest}
    >
      <Heading as="h2" className="cart-summary__title">
        {UI_TEXT.ORDER_SUMMARY}
      </Heading>

      <dl className="cart-summary__rows">
        <div className="cart-summary__row u-mb-28">
          <dt>{UI_TEXT.SUBTOTAL}</dt>
          <dd>{formatPrice(summary.subtotal)}</dd>
        </div>
        <div className="cart-summary__row u-mb-28">
          <dt>{UI_TEXT.DISCOUNT} (-{summary.discountPercent}%)</dt>
          <dd className="cart-summary__discount">
            -{formatPrice(summary.discount)}
          </dd>
        </div>
        <div className="cart-summary__row">
          <dt>{UI_TEXT.DELIVERY_FEE}</dt>
          <dd>{formatPrice(summary.delivery)}</dd>
        </div>
      </dl>

      <div className="cart-summary__total">
        <p>{UI_TEXT.TOTAL}</p>
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
        <span className="cart-summary__checkout-text">{UI_TEXT.GO_TO_CHECKOUT}</span>
      </Button>
    </aside>
  );
};
