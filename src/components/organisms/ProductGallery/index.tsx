import React, { useState, useRef, useCallback } from "react";
import clsx from "clsx";
import { Image } from "@/components/atoms/Image";
import type { ProductImage } from "@/types/product";
import "./index.scss";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  thumbnail?: string;
}

/**
 * Creates a safe fallback placeholder image as an SVG data URL.
 * Used when no image is available to prevent broken layout.
 */
function createFallbackPlaceholder(productName: string): string {
  const safeName = String(productName || "Product").trim() || "Product";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" role="img" aria-label="${safeName}">
    <rect width="320" height="320" fill="#f2f0f1"/>
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="24">
      ${safeName}
    </text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  thumbnail,
}) => {
  // Thumbnail loading state
  const [loadedThumbIds, setLoadedThumbIds] = useState<Set<string>>(new Set());
  const [erroredThumbIds, setErroredThumbIds] = useState<Set<string>>(
    new Set(),
  );

  // Main image state management
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);
  const [mainImageError, setMainImageError] = useState(false);
  const [mainImageSrc, setMainImageSrc] = useState("");
  const [mainImageFallbackApplied, setMainImageFallbackApplied] =
    useState(false);

  // Scroll fade state
  const [hasScrollTop, setHasScrollTop] = useState(false);
  const [hasScrollBottom, setHasScrollBottom] = useState(false);
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null);

  // Get fallback placeholder
  const fallbackPlaceholder = React.useMemo(
    () => createFallbackPlaceholder(productName),
    [productName],
  );

  // Sort images by sort_order to ensure consistent display
  const sortedImages = React.useMemo(() => {
    if (!images || images.length === 0) {
      return [];
    }
    const sorted = [...images].sort((a, b) => {
      const orderA = a.sort_order ?? Infinity;
      const orderB = b.sort_order ?? Infinity;
      return orderA - orderB;
    });
    return sorted;
  }, [images]);

  // Select main image based on active index, thumbnail, or fallback
  const activeImage = sortedImages[activeImageIndex];
  const mainImageUrl =
    activeImage?.url ||
    activeImage?.image_url ||
    thumbnail ||
    fallbackPlaceholder;

  const gallerySignature = React.useMemo(
    () =>
      sortedImages
        .map(
          (image, index) =>
            `${image.id || index}:${image.url || image.image_url || ""}`,
        )
        .join("|"),
    [sortedImages],
  );

  React.useEffect(() => {
    setLoadedThumbIds(new Set());
    setErroredThumbIds(new Set());
    setActiveImageIndex(0);
  }, [gallerySignature]);

  React.useEffect(() => {
    setMainImageSrc(mainImageUrl);
    setMainImageLoaded(false);
    setMainImageError(false);
    setMainImageFallbackApplied(false);
  }, [mainImageUrl]);

  /**
   * Handle thumbnail load completion
   */
  const handleThumbnailLoad = useCallback((imageId: string) => {
    setLoadedThumbIds((prev) => {
      const next = new Set(prev);
      next.add(imageId);
      return next;
    });
  }, []);

  const handleThumbnailError = useCallback(
    (imageId: string) => {
      setErroredThumbIds((prev) => {
        const next = new Set(prev);
        next.add(imageId);
        return next;
      });
      handleThumbnailLoad(imageId);
    },
    [handleThumbnailLoad],
  );

  /**
   * Handle main image load completion
   */
  const handleMainImageLoad = useCallback(() => {
    setMainImageLoaded(true);
    setMainImageError(false);
  }, []);

  /**
   * Handle main image load error
   * Falls back to placeholder once before marking error
   */
  const handleMainImageError = useCallback(() => {
    if (!mainImageFallbackApplied && mainImageSrc !== fallbackPlaceholder) {
      setMainImageFallbackApplied(true);
      setMainImageSrc(fallbackPlaceholder);
      setMainImageLoaded(false);
      setMainImageError(false);
      return;
    }

    setMainImageLoaded(false);
    setMainImageError(true);
  }, [fallbackPlaceholder, mainImageFallbackApplied, mainImageSrc]);

  /**
   * Handle thumbnail click to switch main image
   */
  const handleThumbnailClick = useCallback(
    (index: number) => {
      if (index === activeImageIndex) {
        return;
      }

      // Update active index
      setActiveImageIndex(index);

      // Reset main image state for next image loading cycle
      setMainImageLoaded(false);
      setMainImageError(false);
    },
    [activeImageIndex],
  );

  /**
   * Update scroll fade state for thumbnail gallery
   */
  const updateScrollState = useCallback(() => {
    const container = thumbnailsContainerRef.current;
    if (!container) return;

    const canScrollUp = container.scrollTop > 0;
    const canScrollDown =
      container.scrollTop + container.clientHeight < container.scrollHeight - 1;

    setHasScrollTop(canScrollUp);
    setHasScrollBottom(canScrollDown);
  }, []);

  /**
   * Handle scroll events on thumbnail container
   */
  const handleThumbnailScroll = useCallback(() => {
    updateScrollState();
  }, [updateScrollState]);

  // Initialize scroll state on mount and when images change
  React.useEffect(() => {
    updateScrollState();
  }, [sortedImages, updateScrollState]);

  /**
   * Render empty/no-images state
   * Maintains stable layout with fallback placeholder
   */
  const renderEmptyState = () => (
    <div className="product-gallery">
      <div className="product-gallery__thumbnails product-gallery__thumbnails--empty" />

      <div className="product-gallery__main">
        <div className="product-gallery__main-wrapper">
          <Image
            src={fallbackPlaceholder}
            alt={productName}
            renderWrapper={false}
            imgClassName="product-gallery__main-image"
            isLoaded={true}
            fit="cover"
          />
        </div>
      </div>
    </div>
  );

  /**
   * Render gallery with images
   */
  const renderGalleryWithImages = () => (
    <div className="product-gallery">
      {/* Thumbnail Gallery */}
      <div
        ref={thumbnailsContainerRef}
        className={clsx(
          "product-gallery__thumbnails",
          { "product-gallery__thumbnails--scroll-top": hasScrollTop },
          { "product-gallery__thumbnails--scroll-bottom": hasScrollBottom },
        )}
        onScroll={handleThumbnailScroll}
        role="region"
        aria-label="Product thumbnails"
      >
        {sortedImages.map((image, index) => {
          const srcUrl = image.url || image.image_url;
          const thumbLoadKey = image.id || `${productName}-${index}`;
          const isLoaded = loadedThumbIds.has(thumbLoadKey);
          const isError = erroredThumbIds.has(thumbLoadKey);
          const isActive = index === activeImageIndex;

          return (
            <button
              key={image.id || `${productName}-${index}`}
              className={clsx("product-gallery__thumb", {
                "product-gallery__thumb--active": isActive,
              })}
              onClick={() => handleThumbnailClick(index)}
              aria-pressed={isActive}
              aria-label={`View image ${index + 1}`}
              type="button"
            >
              {/* Placeholder skeleton effect */}
              <div
                className={clsx("product-gallery__placeholder", {
                  "product-gallery__placeholder--hidden": isLoaded,
                })}
                aria-hidden="true"
              />

              {/* Thumbnail Image with lazy loading */}
              <Image
                src={srcUrl}
                alt={image.alt || image.alt_text || productName}
                renderWrapper={false}
                imgClassName="product-gallery__image product-gallery__image--thumb"
                isLoaded={isLoaded}
                isError={isError}
                loadedClassName="product-gallery__image--loaded"
                errorClassName="product-gallery__image--error"
                loading="lazy"
                fit="cover"
                onLoad={() => handleThumbnailLoad(thumbLoadKey)}
                onError={() => handleThumbnailError(thumbLoadKey)}
              />
            </button>
          );
        })}
      </div>

      {/* Main Image */}
      <div className="product-gallery__main">
        <div className="product-gallery__main-wrapper">
          {/* Skeleton placeholder while loading */}
          {!mainImageLoaded && !mainImageError && (
            <div
              className="product-gallery__main-skeleton"
              aria-hidden="true"
              role="status"
              aria-label="Loading image"
            />
          )}

          <Image
            src={mainImageSrc || fallbackPlaceholder}
            alt={
              mainImageError
                ? `${productName} image unavailable`
                : activeImage?.alt || activeImage?.alt_text || productName
            }
            renderWrapper={false}
            imgClassName="product-gallery__main-image"
            isLoaded={mainImageLoaded}
            isError={mainImageError}
            loadedClassName="product-gallery__main-image--loaded"
            errorClassName="product-gallery__main-image--error"
            loading="eager"
            fit="cover"
            onLoad={handleMainImageLoad}
            onError={handleMainImageError}
          />
        </div>
      </div>
    </div>
  );

  // Render appropriate state
  if (sortedImages.length === 0) {
    return renderEmptyState();
  }

  return renderGalleryWithImages();
};
