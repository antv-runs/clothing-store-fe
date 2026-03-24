import React from "react";
import { Price } from "../../atoms/Price/Price";
import type { ProductPricing } from "../../../types/product";

interface ProductPriceProps {
  pricing: ProductPricing;
}

/**
 * ProductPrice molecule - Displays product pricing info
 * Shows: current price, original price (if on sale), discount percentage
 */
export const ProductPrice: React.FC<ProductPriceProps> = ({ pricing }) => {
  const isOnSale =
    pricing.original &&
    pricing.original > pricing.current;

  return (
    <div className="product-overview__price">
      <p
        id="product-price-current"
        className="product-overview__price-current js-product-price-current js-product-price"
      >
        <Price amount={pricing.current} currency={pricing.currency} />
      </p>
      <p
        id="product-price-old"
        className="product-overview__price-old js-product-price-old js-product-original-price"
      >
        {isOnSale ? (
          <Price amount={pricing.original!} currency={pricing.currency} />
        ) : null}
      </p>
      <p
        id="product-price-discount"
        className="product-overview__price-discount js-product-price-discount js-product-discount"
      >
        {pricing.discountPercent ? `-${pricing.discountPercent}%` : ""}
      </p>
    </div>
  );
};
