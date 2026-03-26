import React, { useEffect, useState } from "react";
import "./RelatedProductsSection.scss";
import { Star } from "../../atoms/Star/Star";
import IconButton from "../../atoms/IconButton/IconButton";
import { getRelatedProducts } from "../../../services/productService";
import type { Product } from "../../../types/product";

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
        const result = await getRelatedProducts(currentProductId, {
          limit: 8,
          signal: abortController.signal,
        });

        setItems(result);
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
        <h2 className="other-products__title">You Might Also Like</h2>
        <p className="other-products__empty">No related products available.</p>
      </section>
    );
  }

  return (
    <section className="other-products js-related-products">
      <h2 className="other-products__title">You Might Also Like</h2>

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
              <div className="product-image-wrapper js-product-image-wrapper">
                <div className="image-placeholder"></div>
                <img
                  className={`product-item__image product-image js-product-item-image${loadedImageIds.has(String(item.id)) ? " product-image--loaded" : ""}${errorImageIds.has(String(item.id)) ? " product-image--error" : ""}`}
                  src={item.thumbnail}
                  alt={item.thumbnailAlt || item.name}
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(String(item.id))}
                  onError={() => handleImageError(String(item.id))}
                />
              </div>
              <h3 className="product-item__title">{item.name}</h3>
              <div className="product-item__rating">
                <div className="product-item__stars">
                  <Star
                    rating={item.rating}
                    className="product-item__star"
                    showEmpty={false}
                  />
                </div>
                <p className="product-item__rating-text">
                  {item.rating.toFixed(1)}/5
                </p>
              </div>
              <div className="product-item__prices">
                <p className="product-item__prices--discounted">
                  {formatPrice(item.pricing.current, item.pricing.currency)}
                </p>
                {item.pricing.original &&
                item.pricing.original > item.pricing.current ? (
                  <p className="product-item__prices--original">
                    {formatPrice(item.pricing.original, item.pricing.currency)}
                  </p>
                ) : null}
                {item.pricing.discountPercent ? (
                  <p className="product-item__prices--percent">
                    -{item.pricing.discountPercent}%
                  </p>
                ) : null}
              </div>
              <a
                href={`/product/${encodeURIComponent(item.id)}`}
                aria-label={`View ${item.name}`}
              ></a>
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
