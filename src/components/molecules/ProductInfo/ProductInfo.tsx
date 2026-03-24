import React from "react";

interface ProductInfoProps {
  description: string;
  sku: string;
  category: string;
}

/**
 * ProductInfo molecule - Product meta information
 * Displays description, SKU, and category
 */
export const ProductInfo: React.FC<ProductInfoProps> = ({
  description,
  sku,
  category,
}) => {
  return (
    <div className="product-info">
      <p className="product-description">{description}</p>
      <div className="product-meta">
        <div className="meta-item">
          <span className="meta-label">SKU:</span>
          <span className="meta-value">{sku}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Category:</span>
          <span className="meta-value">{category}</span>
        </div>
      </div>
    </div>
  );
};
