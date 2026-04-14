import { formatPrice as formatPriceUtil } from "@/utils/formatters";
import { DEFAULT_CURRENCY } from "@/const/config";
import clsx from "clsx";

type PriceProps = {
  amount: number;
  currency?: string;
  className?: string;
  id?: string;
};

/**
 * Price atom - Strict implementation for rendering formatted monetary values.
 */
export const Price = ({
  amount,
  currency = DEFAULT_CURRENCY,
  className,
  id,
}: PriceProps) => {
  const formatted = formatPriceUtil(amount, currency);

  return (
    <span id={id} className={clsx("price", className)}>
      {formatted}
    </span>
  );
};

