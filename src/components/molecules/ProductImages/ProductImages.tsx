import React, { useState } from "react";
import { Image } from "@/components/atoms";

interface ProductImagesProps {
  images: string[];
  productName: string;
}

/**
 * ProductImages molecule - Image carousel
 * Displays main image and thumbnail carousel
 */
export const ProductImages: React.FC<ProductImagesProps> = ({
  images,
  productName,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="product-images">
      <div className="product-images__main">
        <Image
          src={images[selectedImageIndex]}
          alt={`${productName} - Image ${selectedImageIndex + 1}`}
          imgClassName="product-images__main-image"
          renderWrapper={false}
        />
      </div>
      <div className="product-images__thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            className={`product-images__thumbnail ${
              index === selectedImageIndex ? "active" : ""
            }`}
            onClick={() => setSelectedImageIndex(index)}
            aria-label={`View image ${index + 1}`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              renderWrapper={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
