import type { HTMLAttributes } from "react";
import { BrandImage } from "@/components/atoms/BrandImage";
import clsx from "clsx";

type PaymentMethodItem = {
  src: string;
  alt: string;
};

type PaymentMethodsProps = HTMLAttributes<HTMLDivElement> & {
  items: PaymentMethodItem[];
};

export const PaymentMethods = ({ items, className, ...rest }: PaymentMethodsProps) => {
  return (
    <div className={clsx(className)} {...rest}>
      {items.map((item) => (
        <BrandImage key={item.alt} src={item.src} alt={item.alt} />
      ))}
    </div>
  );
};
