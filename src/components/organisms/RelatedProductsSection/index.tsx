import React, { useState } from "react";
import "./index.scss";
import { ProductCard } from "@/components/molecules/ProductCard";
import { IconButton } from "@/components/atoms/IconButton";
import { Heading } from "@/components/atoms/Heading";
import type { Product } from "@/types/product";

interface RelatedProductsSectionProps {
  products: Product[];
  isLoading: boolean;
  title?: string;
  formatPrice: (amount: number, currency?: string) => string;
}

/**
 * RelatedProductsSection - Product recommendations carousel section.
 * Keeps original classes and rendered structure.
 */
export const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  products,
  isLoading,
  title = "You Might Also Like",
  formatPrice,
}) => {
  const [loadedImageIds, setLoadedImageIds] = useState<Set<string>>(new Set());
  const [errorImageIds, setErrorImageIds] = useState<Set<string>>(new Set());

  const handleImageLoad = (productId: string) => {
    setLoadedImageIds((previous) => {
      const next = new Set(previous);
      next.add(productId);
      return next;
    });
  };

  const handleImageError = (productId: string) => {
    setErrorImageIds((previous) => {
      const next = new Set(previous);
      next.add(productId);
      return next;
    });
  };

  if (!isLoading && products.length === 0) {
    return (
      <section className="other-products js-related-products">
        <Heading as="h2" className="other-products__title">
          {title}
        </Heading>
        <p className="other-products__empty">No related products available.</p>
      </section>
    );
  }

  return (
    <section className="other-products js-related-products u-mb-85">
      <Heading as="h2" className="other-products__title">
        {title}
      </Heading>

      <IconButton
        variant="ghost"
        svgName="icn_back"
        className="other-products__prev js-other-products__prev"
        ariaLabel="Previous related products"
        iconWidth={50}
        iconHeight={50}
      />

      <div className="other-products__viewport js-related-viewport">
        <ul
          id="other-products-list"
          className="other-products__list js-other-products__list js-related-track"
        >
          {products.map((item) => (
            <li
              key={item.id}
              className="other-products__item js-other-products__item js-related-item"
              data-product-id={item.id}
            >
              <ProductCard
                product={item}
                formatPrice={formatPrice}
                linkMode="overlay"
                imageLoaded={loadedImageIds.has(String(item.id))}
                imageError={errorImageIds.has(String(item.id))}
                onImageLoad={() => handleImageLoad(String(item.id))}
                onImageError={() => handleImageError(String(item.id))}
              />
            </li>
          ))}
        </ul>
      </div>

      <IconButton
        variant="ghost"
        svgName="icn_next"
        className="other-products__next js-other-products__next"
        ariaLabel="Next related products"
        iconWidth={50}
        iconHeight={50}
      />
    </section>
  );
};
