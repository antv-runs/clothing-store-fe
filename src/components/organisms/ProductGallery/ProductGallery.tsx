import React, { useState } from "react";
import { Image } from "../../atoms/Image/Image";
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
              <Image
                src={srcUrl}
                alt={image.alt || image.alt_text || productName}
                renderWrapper={false}
                imgClassName="product-image js-product-thumbnail"
                isLoaded={isLoaded}
                loadedClassName="product-image--loaded"
                fit="cover"
                onLoad={() => handleThumbnailLoad(image.id)}
              />
            </div>
          );
        })}
      </div>

      <div className="image-wrapper-main">
        <Image
          id="product-main-image"
          src={mainImage}
          alt={productName}
          renderWrapper={false}
          imgClassName="product-overview__main-image js-product-main-image"
          isLoaded={mainImageLoaded}
          loadedClassName="is-loaded"
          fit="cover"
          onLoad={handleMainImageLoad}
        />
      </div>
    </div>
  );
};
