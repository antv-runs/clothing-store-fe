import { Link } from "react-router-dom";
import { Heading } from "@/components/atoms/Heading";
import { ProductCardList } from "@/components/molecules/ProductCardList";
import type { Product } from "@/types/product";
import "./index.scss";

type HomeProductSectionProps = {
  title: string;
  productsList: Product[];
  withTopBorder?: boolean;
  isLoading?: boolean;
  skeletonCount?: number;
};

function formatPrice(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export const HomeProductSection: React.FC<HomeProductSectionProps> = ({
  title,
  productsList,
  withTopBorder = false,
  isLoading = false,
  skeletonCount = 4,
}) => {
  const sectionSlug = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <section
      className={`home-products${withTopBorder ? " home-products--bordered" : ""}`}
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

      <ProductCardList
        products={productsList}
        formatPrice={formatPrice}
        showNavigation={false}
        loading={isLoading}
        skeletonCount={skeletonCount}
      />

      <Link to="/" className="btn btn--light home-products__cta">
        View All
      </Link>
    </section>
  );
};
