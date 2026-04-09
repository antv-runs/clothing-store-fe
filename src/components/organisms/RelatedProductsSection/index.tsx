import React, { useState } from "react";
import "./index.scss";
import { ProductCardList } from "@/components/organisms/ProductCardList";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import { Heading } from "@/components/atoms/Heading";
import { ListStateWrapper } from "@/components/molecules/ListStateWrapper";
import { EmptyState } from "@/components/molecules/EmptyState";
import type { ListErrorKind } from "@/types/listState";
import type { Product } from "@/types/product";

interface RelatedProductsSectionProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  errorKind?: ListErrorKind | null;
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
  errorKind,
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
        <ListStateWrapper
          isLoading={isLoading}
          isRetrying={isRetrying}
          isEmpty={!isLoading && !error && products.length === 0}
          error={error}
          errorKind={errorKind || null}
          onRetry={onRetry}
          loadingContent={
            <ProductCardList
              products={products}
              formatPrice={formatPrice}
              showNavigation={true}
              loading={true}
              skeletonCount={8}
              linkMode="overlay"
            />
          }
          emptyContent={<EmptyState message="No related products available." />}
        >
          <ProductCardList
            products={products}
            formatPrice={formatPrice}
            showNavigation={true}
            loading={false}
            skeletonCount={8}
            linkMode="overlay"
            imageLoaded={loadedImageIds}
            imageError={errorImageIds}
            onImageLoad={handleImageLoad}
            onImageError={handleImageError}
          />
        </ListStateWrapper>
      </ErrorBoundary>
    </section>
  );
};
