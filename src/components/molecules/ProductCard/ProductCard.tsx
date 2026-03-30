import clsx from "clsx";
import { Link } from "react-router-dom";
import { Heading, Image, Star, Text } from "@/components/atoms";
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
  const { id, name, thumbnail, thumbnailAlt, rating, pricing } = product;
  const {
    current: currentPrice,
    original: originalPrice,
    currency = "USD",
    discountPercent,
  } = pricing;

  console.log("product in ProductCard:", product); // Debug log to verify product data

  const isInlineLinkMode = linkMode === "inline";
  const productPath = buildProductPath(id);
  const viewProductLabel = `View ${name}`;
  const formattedRating = rating.toFixed(1);

  const hasComparePrice =
    originalPrice !== null &&
    originalPrice !== undefined &&
    originalPrice > currentPrice;

  const cardClassName = clsx("product-card", className);
  const currentPriceLabel = formatPrice(currentPrice, currency);
  const comparePriceLabel = hasComparePrice
    ? formatPrice(originalPrice, currency)
    : null;

  const productImage = (
    <Image
      src={thumbnail}
      alt={thumbnailAlt || name}
      renderWrapper={false}
      imgClassName="product-card__image product-image"
      isLoaded={imageLoaded}
      isError={imageError}
      loadedClassName="product-image--loaded is-loaded"
      errorClassName="product-image--error is-error"
      loading="lazy"
      decoding="async"
      fit="cover"
      onLoad={onImageLoad}
      onError={onImageError}
    />
  );

  const imageContent = isInlineLinkMode ? (
    <Link
      className="product-card__image-link"
      to={productPath}
      aria-label={viewProductLabel}
    >
      {productImage}
    </Link>
  ) : (
    <div className="product-card__image-link" aria-hidden="true">
      {productImage}
    </div>
  );

  const titleContent = isInlineLinkMode ? (
    <Link to={productPath}>{name}</Link>
  ) : (
    name
  );

  return (
    <article className={cardClassName}>
      <div className="product-card__image-wrapper product-image-wrapper">
        {imageContent}
      </div>

      <Heading as="h3" className="product-card__title" noOfLines={2}>
        {titleContent}
      </Heading>

      <div
        className="product-card__rating"
        aria-label={`Rating ${formattedRating} out of 5`}
      >
        <Text as="span" className="product-card__stars">
          <Star
            rating={rating}
            className="product-card__star"
            showEmpty={false}
            size={18}
          />
        </Text>
        <Text as="span">{formattedRating}/5</Text>
      </div>

      <Text as="p" className="product-card__price">
        <Text as="span" className="product-card__price-current">
          {currentPriceLabel}
        </Text>

        {hasComparePrice ? (
          <Text as="span" className="product-card__price-original">
            {comparePriceLabel}
          </Text>
        ) : null}

        {discountPercent ? (
          <Text as="span" className="product-card__price-badge">
            -{discountPercent}%
          </Text>
        ) : null}
      </Text>

      {!isInlineLinkMode ? (
        <Link
          to={productPath}
          className="product-card__overlay-link"
          aria-label={viewProductLabel}
        />
      ) : null}
    </article>
  );
};
