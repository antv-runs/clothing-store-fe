import type { HTMLAttributes } from "react";
import { formatPrice as formatPriceUtil } from "@/utils/formatters";
import { DEFAULT_CURRENCY } from "@/const/pricing";
import clsx from "clsx";

type PriceProps = HTMLAttributes<HTMLSpanElement> & {
  amount: number;
  currency?: string;
};

export const Price = ({
  amount,
  currency = DEFAULT_CURRENCY,
  className,
  ...rest
}: PriceProps) => {
  const formatted = formatPriceUtil(amount, currency);

  return (
    <span className={clsx("price", className)} {...rest}>
      {formatted}
    </span>
  );
};
