import React, { useEffect, useState } from "react";
import "./index.scss";
import { ProductCard } from "@/components/molecules/ProductCard";
import { IconButton } from "@/components/atoms/IconButton";
import { Heading } from "@/components/atoms/Heading";
import { getProducts } from "@/api/Product";
import type { Product } from "@/types/product";

interface RelatedProductsSectionProps {
  currentProductId: string;
  formatPrice: (amount: number, currency?: string) => string;
}

/**
 * RelatedProductsSection - Product recommendations carousel section.
 * Keeps original classes and rendered structure.
 */
export const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  currentProductId,
  formatPrice,
}) => {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedImageIds, setLoadedImageIds] = useState<Set<string>>(new Set());
  const [errorImageIds, setErrorImageIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const abortController = new AbortController();

    async function loadRelatedItems() {
      if (!currentProductId) {
        setItems([]);
        return;
      }

      setIsLoading(true);
      setLoadedImageIds(new Set());
      setErrorImageIds(new Set());

      try {
        const result = await getProducts({
          page: 1,
          per_page: 8,
        });

        setItems(result.data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Failed to load related products.", error);
        setItems([]);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadRelatedItems();

    return () => {
      abortController.abort();
    };
  }, [currentProductId]);

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

  if (!isLoading && items.length === 0) {
    return (
      <section className="other-products js-related-products">
        <Heading as="h2" className="other-products__title">
          You Might Also Like
        </Heading>
        <p className="other-products__empty">No related products available.</p>
      </section>
    );
  }

  return (
    <section className="other-products js-related-products u-mb-85">
      <Heading as="h2" className="other-products__title">
        You Might Also Like
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
          {items.map((item) => (
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
