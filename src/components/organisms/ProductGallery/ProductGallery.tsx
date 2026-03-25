import React, { useState } from "react";
import type { ProductImage } from "../../../types/product";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
  thumbnail?: string;
}

/**
 * ProductGallery organism - Main image + thumbnail gallery
 * Displays product images in gallery layout
 */
export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  thumbnail,
}) => {
  const [loadedThumbIds, setLoadedThumbIds] = useState<Set<string>>(new Set());
  const [mainImageLoaded, setMainImageLoaded] = useState(false);

  const handleThumbnailLoad = (imageId: string) => {
    setLoadedThumbIds((prev) => {
      const next = new Set(prev);
      next.add(imageId);
      return next;
    });
  };

  const handleMainImageLoad = () => {
    setMainImageLoaded(true);
  };

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

  // Select primary image, fallback to first image after sorting
  const primaryImage =
    sortedImages.find((img) => img.is_primary) || sortedImages[0];

  const mainImage =
    primaryImage?.url || primaryImage?.image_url || thumbnail || "";

  return (
    <div className="product-overview__images">
      <div
        id="product-thumbnails"
        className="product-overview__images-wrapper js-product-thumbnails js-product-gallery"
      >
        {(sortedImages || []).map((image, index) => {
          const srcUrl = image.url || image.image_url;
          const isLoaded = loadedThumbIds.has(image.id);
          return (
            <div
              className="image-wrapper js-thumbnail-wrapper"
              key={image.id || `${productName}-${index}`}
            >
              <div className="image-placeholder" />
              <img
                className={`product-image js-product-thumbnail ${
                  isLoaded ? "product-image--loaded" : ""
                }`}
                src={srcUrl}
                alt={image.alt || image.alt_text || productName}
                onLoad={() => handleThumbnailLoad(image.id)}
              />
            </div>
          );
        })}
      </div>

      <div className="image-wrapper-main">
        <img
          id="product-main-image"
          className={`product-overview__main-image js-product-main-image ${
            mainImageLoaded ? "is-loaded" : ""
          }`}
          alt={productName}
          src={mainImage}
          onLoad={handleMainImageLoad}
        />
      </div>
    </div>
  );
};
