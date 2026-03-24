import React from "react";
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
  const mainImage =
    images?.[0]?.url ||
    images?.[0]?.image_url ||
    thumbnail ||
    "";

  return (
    <div className="product-overview__images">
      <div
        id="product-thumbnails"
        className="product-overview__images-wrapper js-product-thumbnails js-product-gallery"
      >
        {(images || []).map((image, index) => (
          <div
            className="image-wrapper js-thumbnail-wrapper"
            key={image.id || `${productName}-${index}`}
          >
            <div className="image-placeholder" />
            <img
              className="product-image js-product-thumbnail"
              src={image.url || image.image_url}
              alt={image.alt || image.alt_text || productName}
            />
          </div>
        ))}
      </div>

      <div className="image-wrapper-main">
        <img
          id="product-main-image"
          className="product-overview__main-image js-product-main-image"
          alt={productName}
          src={mainImage}
        />
      </div>
    </div>
  );
};
