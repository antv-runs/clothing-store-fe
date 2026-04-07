import { Link } from "react-router-dom";
import clsx from "clsx";
import { Heading } from "@/components/atoms/Heading";
import { ProductCardList } from "@/components/organisms/ProductCardList";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatters";
import "./index.scss";

type HomeProductSectionProps = {
  title: string;
  productsList: Product[];
  className?: string;
  withTopBorder?: boolean;
  isLoading?: boolean;
  isEmpty?: boolean;
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
  emptyMessage = "No products available in this section.",
  skeletonCount = 4,
}) => {
  const sectionSlug = title.toLowerCase().replace(/\s+/g, "-");

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
        {isEmpty ? (
          <p className="home-products__empty" role="status">
            {emptyMessage}
          </p>
        ) : (
          <ProductCardList
            products={productsList}
            formatPrice={formatPrice}
            showNavigation={false}
            loading={isLoading}
            skeletonCount={skeletonCount}
          />
        )}
      </ErrorBoundary>

      {!isEmpty && (
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
