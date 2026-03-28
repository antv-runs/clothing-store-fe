import { BrandImage } from "../../atoms";

type PaymentMethodItem = {
  src: string;
  alt: string;
};

type PaymentMethodsProps = {
  items: PaymentMethodItem[];
  className?: string;
};

export const PaymentMethods = ({ items, className }: PaymentMethodsProps) => {
  return (
    <div className={className}>
      {items.map((item) => (
        <BrandImage key={item.alt} src={item.src} alt={item.alt} />
      ))}
    </div>
  );
};
