import React from "react";
import { formatPrice as formatPriceUtil } from "../../../utils/formatters";

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
  currency = "USD",
  className,
}) => {
  const formatted = formatPriceUtil(amount, currency);

  if (className) {
    return <span className={className}>{formatted}</span>;
  }

  return <span>{formatted}</span>;
};
