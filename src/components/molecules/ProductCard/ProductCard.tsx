import { Link } from "react-router-dom";
import { Star } from "../../atoms/Star/Star";
import "./ProductCard.scss";

type ProductCardData = {
  id: string | number;
  name: string;
  thumbnail: string;
  thumbnailAlt?: string | null;
  rating: number;
  pricing: {
    current: number;
    original?: number | null;
    currency?: string;
    discountPercent?: number | null;
  };
};

type ProductCardProps = {
  product: ProductCardData;
  formatPrice: (amount: number, currency?: string) => string;
  className?: string;
  linkMode?: "inline" | "overlay";
  imageLoaded?: boolean;
  imageError?: boolean;
  onImageLoad?: () => void;
  onImageError?: () => void;
};

function buildProductPath(productId: string | number) {
  return `/product/${encodeURIComponent(String(productId))}`;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  formatPrice,
  className,
  linkMode = "inline",
  imageLoaded = true,
  imageError = false,
  onImageLoad,
  onImageError,
}) => {
  const hasComparePrice =
    product.pricing.original !== null &&
    product.pricing.original !== undefined &&
    product.pricing.original > product.pricing.current;

  const cardClassName = ["product-card", className].filter(Boolean).join(" ");
  const productPath = buildProductPath(product.id);

  return (
    <article className={cardClassName}>
      <div className="product-card__image-wrapper product-image-wrapper js-product-image-wrapper">
        {linkMode === "inline" ? (
          <Link
            className="product-card__image-link"
            to={productPath}
            aria-label={`View ${product.name}`}
          >
            <img
              className={`product-card__image product-image js-product-item-image${imageLoaded ? " product-image--loaded is-loaded" : ""}${imageError ? " product-image--error is-error" : ""}`}
              src={product.thumbnail}
              alt={product.thumbnailAlt || product.name}
              loading="lazy"
              decoding="async"
              onLoad={onImageLoad}
              onError={onImageError}
            />
            <span className="product-card__image-placeholder image-placeholder" aria-hidden="true" />
          </Link>
        ) : (
          <div className="product-card__image-link" aria-hidden="true">
            <img
              className={`product-card__image product-image js-product-item-image${imageLoaded ? " product-image--loaded is-loaded" : ""}${imageError ? " product-image--error is-error" : ""}`}
              src={product.thumbnail}
              alt={product.thumbnailAlt || product.name}
              loading="lazy"
              decoding="async"
              onLoad={onImageLoad}
              onError={onImageError}
            />
            <span className="product-card__image-placeholder image-placeholder" aria-hidden="true" />
          </div>
        )}
      </div>

      <h3 className="product-card__title">
        {linkMode === "inline" ? <Link to={productPath}>{product.name}</Link> : product.name}
      </h3>

      <div
        className="product-card__rating"
        aria-label={`Rating ${product.rating.toFixed(1)} out of 5`}
      >
        <span className="product-card__stars">
          <Star
            rating={product.rating}
            className="product-card__star"
            showEmpty={false}
          />
        </span>
        <span>{product.rating.toFixed(1)}/5</span>
      </div>

      <p className="product-card__price">
        <span className="product-card__price-current">
          {formatPrice(product.pricing.current, product.pricing.currency || "USD")}
        </span>

        {hasComparePrice ? (
          <span className="product-card__price-original">
            {formatPrice(product.pricing.original || 0, product.pricing.currency || "USD")}
          </span>
        ) : null}

        {product.pricing.discountPercent ? (
          <span className="product-card__price-badge">
            -{product.pricing.discountPercent}%
          </span>
        ) : null}
      </p>

      {linkMode === "overlay" ? (
        <Link
          to={productPath}
          className="product-card__overlay-link"
          aria-label={`View ${product.name}`}
        />
      ) : null}
    </article>
  );
};
