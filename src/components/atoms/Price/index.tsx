import React from "react";
import { formatPrice as formatPriceUtil } from "@/utils/formatters";

import { DEFAULT_CURRENCY } from "@/const/pricing";

interface PriceProps {
  amount: number;
  currency?: string;
  className?: string;
}

/**
 * Price atom - Displays formatted currency price
 */
export const Price: React.FC<PriceProps> = ({
  amount,
  currency = DEFAULT_CURRENCY,
  className,
}) => {
  const formatted = formatPriceUtil(amount, currency);

  if (className) {
    return <span className={className}>{formatted}</span>;
  }

  return <span>{formatted}</span>;
};
