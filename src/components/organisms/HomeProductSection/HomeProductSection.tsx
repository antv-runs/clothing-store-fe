import { Link } from "react-router-dom";
import { Star } from "~/components/atoms/Star/Star";
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
        <h2 id={`home-${sectionSlug}-title`}>{title}</h2>
      </div>

      <div className="home-products__grid" aria-live="polite" aria-busy="false">
        {productsList.map((item) => {
          const hasComparePrice =
            item.pricing.original !== null &&
            item.pricing.original > item.pricing.current;

          return (
            <article key={item.id} className="product-tile">
              <Link
                className="product-tile__image-link"
                to={`/product/${encodeURIComponent(item.id)}`}
                aria-label={`View ${item.name}`}
              >
                <img
                  className="product-tile__image"
                  src={item.thumbnail}
                  alt={item.thumbnailAlt || item.name}
                  loading="lazy"
                  decoding="async"
                />
              </Link>

              <h3 className="product-tile__title">
                <Link to={`/product/${encodeURIComponent(item.id)}`}>
                  {item.name}
                </Link>
              </h3>

              <div
                className="product-tile__rating"
                aria-label={`Rating ${item.rating.toFixed(1)} out of 5`}
              >
                <span className="home-product-card__stars">
                  <Star
                    rating={item.rating}
                    className="home-product-card__star"
                    showEmpty={false}
                  />
                </span>
                <span>{item.rating.toFixed(1)}/5</span>
              </div>

              <p className="product-tile__price">
                <span className="product-tile__price-current">
                  {formatPrice(item.pricing.current, item.pricing.currency)}
                </span>

                {hasComparePrice ? (
                  <span className="product-tile__price-original">
                    {formatPrice(item.pricing.original || 0, item.pricing.currency)}
                  </span>
                ) : null}

                {item.pricing.discountPercent ? (
                  <span className="product-tile__price-badge">
                    -{item.pricing.discountPercent}%
                  </span>
                ) : null}
              </p>
            </article>
          );
        })}
      </div>

      <div className="home-products__foot">
        <Link to="/" className="btn btn--light btn--cta">
          View All
        </Link>
      </div>
    </section>
  );
};