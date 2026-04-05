import React from "react";
import clsx from "clsx";
import { Price } from "@/components/atoms/Price";
import type { ProductPricing } from "@/types/product";
import { Text } from "@/components/atoms/Text";
import { DEFAULT_CURRENCY } from "@/const/pricing";
import "./index.scss";

interface ProductPriceProps {
  pricing?: ProductPricing;
  currentAmount?: number;
  originalAmount?: number | null;
  discountPercent?: number | null;
  currency?: string;
  formatPrice?: (amount: number, currency?: string) => string;
  className?: string;
  currentClassName?: string;
  originalClassName?: string;
  discountClassName?: string;
}

/**
 * ProductPrice molecule - Displays product pricing info
 * Shows: current price, original price (if on sale), discount percentage
 */
export const ProductPrice: React.FC<ProductPriceProps> = ({
  pricing,
  currentAmount,
  originalAmount,
  discountPercent,
  currency,
  formatPrice,
  className,
  currentClassName,
  originalClassName,
  discountClassName,
}) => {
  const isLegacyMode = Boolean(pricing);
  const resolvedCurrent = currentAmount ?? pricing?.current;

  if (resolvedCurrent === undefined) {
    return null;
  }

  const resolvedCurrency = currency ?? pricing?.currency ?? DEFAULT_CURRENCY;
  const resolvedOriginal = originalAmount ?? pricing?.original;
  const resolvedDiscount = discountPercent ?? pricing?.discountPercent;
  const isOnSale = Boolean(
    resolvedOriginal !== null &&
    resolvedOriginal !== undefined &&
    resolvedOriginal > resolvedCurrent,
  );

  const renderPrice = (amount: number) => {
    if (formatPrice) {
      return formatPrice(amount, resolvedCurrency);
    }

    return <Price amount={amount} currency={resolvedCurrency} />;
  };

  return (
    <div
      className={clsx(
        "product-price",
        isLegacyMode && "product-info__price",
        className,
      )}
    >
      <Text
        as="p"
        className={clsx(
          "product-price__current",
          isLegacyMode && "product-info__price-current",
          currentClassName,
        )}
      >
        {renderPrice(resolvedCurrent)}
      </Text>

      {isLegacyMode || isOnSale ? (
        <Text
          as="p"
          className={clsx(
            "product-price__original",
            isLegacyMode && "product-info__price-old",
            originalClassName,
          )}
        >
          {isOnSale &&
          resolvedOriginal !== null &&
          resolvedOriginal !== undefined
            ? renderPrice(resolvedOriginal)
            : null}
        </Text>
      ) : null}

      {isLegacyMode || resolvedDiscount ? (
        <Text
          as="p"
          className={clsx(
            "product-price__discount",
            isLegacyMode && "product-info__price-discount",
            discountClassName,
          )}
        >
          {resolvedDiscount ? `-${resolvedDiscount}%` : ""}
        </Text>
      ) : null}
    </div>
  );
};
