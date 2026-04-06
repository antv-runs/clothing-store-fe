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
  skeletonCount?: number;
};

export const HomeProductSection: React.FC<HomeProductSectionProps> = ({
  title,
  productsList,
  className,
  withTopBorder = false,
  isLoading = false,
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
        <ProductCardList
          products={productsList}
          formatPrice={formatPrice}
          showNavigation={false}
          loading={isLoading}
          skeletonCount={skeletonCount}
        />
      </ErrorBoundary>

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
    </section>
  );
};
