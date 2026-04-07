import React, { useState } from "react";
import "./index.scss";
import { ProductCardList } from "@/components/organisms/ProductCardList";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import { Heading } from "@/components/atoms/Heading";
import { RetryState } from "@/components/molecules/RetryState";
import type { Product } from "@/types/product";

interface RelatedProductsSectionProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  isRetrying: boolean;
  onRetry: () => void;
  title?: string;
  formatPrice: (amount: number, currency?: string) => string;
}

/**
 * RelatedProductsSection - Product recommendations carousel section.
 *
 * Handles:
 * - Section wrapper and heading
 * - Image state management for product cards
 * - ProductCardList with navigation enabled
 */
export const RelatedProductsSection: React.FC<RelatedProductsSectionProps> = ({
  products,
  isLoading,
  error,
  isRetrying,
  onRetry,
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

  if (error || isRetrying) {
    return (
      <section className="other-products">
        <Heading as="h2" className="other-products__title">
          {title}
        </Heading>
        <RetryState
          className="other-products__retry-state"
          message={error || "Unable to load related products. Please try again."}
          onRetry={onRetry}
          isRetrying={isRetrying}
          retryingLabel="Retrying..."
        />
      </section>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <section className="other-products">
        <Heading as="h2" className="other-products__title">
          {title}
        </Heading>
        <p className="other-products__empty">No related products available.</p>
      </section>
    );
  }

  return (
    <section className="other-products u-mb-85">
      <Heading as="h2" className="other-products__title">
        {title}
      </Heading>

      <ErrorBoundary
        resetKeys={[products, isLoading]}
        fallback={
          <p className="other-products__fallback" role="status">
            This product list is temporarily unavailable.
          </p>
        }
      >
        <ProductCardList
          products={products}
          formatPrice={formatPrice}
          showNavigation={true}
          loading={isLoading}
          skeletonCount={8}
          linkMode="overlay"
          imageLoaded={loadedImageIds}
          imageError={errorImageIds}
          onImageLoad={handleImageLoad}
          onImageError={handleImageError}
        />
      </ErrorBoundary>
    </section>
  );
};
