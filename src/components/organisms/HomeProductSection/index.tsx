import { useState } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { ProductCardList } from "@/components/organisms/ProductCardList";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import type { Product } from "@/types/product";
import type { ListErrorKind } from "@/types/listState";
import { formatPrice } from "@/utils/formatters";
import { ListStateWrapper } from "@/components/molecules/ListStateWrapper";
import "./index.scss";
import { EmptyState } from "@/components/molecules/EmptyState";

type HomeProductSectionProps = {
  title: string;
  productsList: Product[];
  className?: string;
  withTopBorder?: boolean;
  isLoading?: boolean;
  isEmpty?: boolean;
  isRetrying?: boolean;
  error?: string | null;
  errorKind?: ListErrorKind | null;
  onRetry?: () => void;
  emptyMessage?: string;
  skeletonCount?: number;
};

export const HomeProductSection: React.FC<HomeProductSectionProps> = ({
  title,
  productsList,
  className,
  withTopBorder = false,
  isLoading = false,
  isEmpty = false,
  isRetrying = false,
  error = null,
  errorKind = null,
  onRetry,
  emptyMessage = "No products available in this section.",
  skeletonCount = 4,
}) => {
  const sectionSlug = title.toLowerCase().replace(/\s+/g, "-");
  const hasRetryState = Boolean(error) || isRetrying;

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
    <section
      className={clsx(
        "home-products",
        withTopBorder && "home-products--bordered",
        className,
      )}
      aria-labelledby={`home-${sectionSlug}-title`}
    >
      <Heading
        as="h2"
        id={`home-${sectionSlug}-title`}
        className="home-products__title"
        noOfLines={2}
      >
        {title}
      </Heading>

      <ErrorBoundary
        resetKeys={[title, productsList, isLoading]}
        fallback={
          <div className="home-products__list-fallback" role="status">
            This product list is temporarily unavailable.
          </div>
        }
      >
        <ListStateWrapper
          isLoading={isLoading}
          isRetrying={isRetrying}
          isEmpty={isEmpty}
          error={error}
          errorKind={errorKind}
          onRetry={onRetry}
          loadingContent={
            <ProductCardList
              products={productsList}
              formatPrice={formatPrice}
              showNavigation={false}
              loading={true}
              skeletonCount={skeletonCount}
            />
          }
          emptyContent={<EmptyState message={emptyMessage} />}
        >
          <ProductCardList
            products={productsList}
            formatPrice={formatPrice}
            showNavigation={false}
            loading={false}
            skeletonCount={skeletonCount}
            imageLoaded={loadedImageIds}
            imageError={errorImageIds}
            onImageLoad={handleImageLoad}
            onImageError={handleImageError}
          />
        </ListStateWrapper>
      </ErrorBoundary>

      {!isEmpty && !hasRetryState && (
        <Link
          to="/"
          className={clsx(
            "btn btn--light home-products__cta",
            isLoading && "home-products__cta--disabled",
          )}
          aria-disabled={isLoading || undefined}
          tabIndex={isLoading ? -1 : undefined}
          onClick={isLoading ? (e) => e.preventDefault() : undefined}
        >
          View All
        </Link>
      )}
    </section>
  );
};
