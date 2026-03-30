import { Link } from "react-router-dom";
import { Heading } from "@/components/atoms";
import { ProductCard } from "@/components/molecules/ProductCard/ProductCard";
import type { Product } from "@/types/product";
import "./HomeProductSection.scss";

type HomeProductSectionProps = {
  title: string;
  productsList: Product[];
  withTopBorder?: boolean;
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
      >
        {title}
      </Heading>

      <ul className="home-products__list" aria-live="polite" aria-busy="false">
        {productsList.map((item) => (
          <li key={item.id} className="home-products__list-item">
            <ProductCard product={item} formatPrice={formatPrice} />
          </li>
        ))}
      </ul>

      <Link to="/" className="btn btn--light home-products__cta">
        View All
      </Link>
    </section>
  );
};
