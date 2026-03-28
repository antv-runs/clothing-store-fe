import { Link } from "react-router-dom";
import { Heading } from "~/components/atoms";
import { ProductCard } from "~/components/molecules/ProductCard/ProductCard";
import type { Product } from "~/types/product";
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
      <div className="home-products__head">
        <Heading as="h2" id={`home-${sectionSlug}-title`}>
          {title}
        </Heading>
      </div>

      <div className="home-products__grid" aria-live="polite" aria-busy="false">
        {productsList.map((item) => (
          <ProductCard key={item.id} product={item} formatPrice={formatPrice} />
        ))}
      </div>

      <div className="home-products__foot">
        <Link to="/" className="btn btn--light btn--cta">
          View All
        </Link>
      </div>
    </section>
  );
};