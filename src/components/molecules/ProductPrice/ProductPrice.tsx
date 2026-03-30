import React from "react";
import { Price } from "@/components/atoms/Price/Price";
import type { ProductPricing } from "@/types/product";
import { Text } from "@/components/atoms";
import "./ProductPrice.scss";

interface ProductPriceProps {
  pricing: ProductPricing;
}

/**
 * ProductPrice molecule - Displays product pricing info
 * Shows: current price, original price (if on sale), discount percentage
 */
export const ProductPrice: React.FC<ProductPriceProps> = ({ pricing }) => {
  const isOnSale = pricing.original && pricing.original > pricing.current;

  return (
    <div className="product-info__price">
      <Text as="p" className="product-info__price-current">
        <Price amount={pricing.current} currency={pricing.currency} />
      </Text>
      <Text as="p" className="product-info__price-old">
        {isOnSale ? (
          <Price amount={pricing.original!} currency={pricing.currency} />
        ) : null}
      </Text>
      <Text as="p" className="product-info__price-discount">
        {pricing.discountPercent ? `-${pricing.discountPercent}%` : ""}
      </Text>
    </div>
  );
};
