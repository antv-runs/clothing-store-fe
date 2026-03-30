import React from "react";
import { Heading, Text } from "@components/atoms";
import { RatingDisplay } from "@components/molecules/RatingDisplay/RatingDisplay";
import { ProductPrice } from "@components/molecules/ProductPrice/ProductPrice";
import type { Product } from "@custom-types/product";
import "./ProductInfo.scss";

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
      <Heading as="h1">{product.name}</Heading>

      <RatingDisplay rating={product.rating} showEmpty={false} />

      <ProductPrice pricing={product.pricing} />

      <Text as="p" className="product-info__description">
        {product.description}
      </Text>
    </>
  );

  if (!withContainer) {
    return content;
  }

  return <div className="product-info">{content}</div>;
};
