import React from "react";
import { Heading } from "../../atoms";
import { RatingDisplay } from "../../molecules/RatingDisplay/RatingDisplay";
import { ProductPrice } from "../../molecules/ProductPrice/ProductPrice";
import type { Product } from "../../../types/product";

interface ProductInfoProps {
  product: Product;
  withContainer?: boolean;
}

/**
 * ProductInfo organism - Product title, description, category, and pricing
 * Core product information display
 */
export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  withContainer = true,
}) => {
  const content = (
    <>
      <Heading
        as="h1"
        noOfLines={2}
        id="product-title"
        className="js-product-title"
      >
        {product.name}
      </Heading>

      <RatingDisplay rating={product.rating} showEmpty={false} />

      <ProductPrice pricing={product.pricing} />

      <p
        id="product-description"
        className="product-overview__description js-product-description"
      >
        {product.description}
      </p>
    </>
  );

  if (!withContainer) {
    return content;
  }

  return <div className="product-overview__info">{content}</div>;
};
