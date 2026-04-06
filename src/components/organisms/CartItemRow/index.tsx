import React, { useState, useEffect } from "react";
import { ProductPrice } from "@/components/molecules/ProductPrice";
import { QuantityStepper } from "@/components/molecules/QuantityStepper";
import { Button } from "@/components/atoms/Button";
import { ConfirmModal } from "@/components/organisms/ConfirmModal";
import "./index.scss";
import type { Product } from "@/types/product";

interface CartItemRowProps {
  item: Product & {
    quantity: number;
    color: string | null;
    size: string | null;
  };
  formatPrice: (amount: number, currency?: string) => string;
  isLocked?: boolean;
  onRemove?: () => void;
  onUpdateQuantity?: (val: number) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  formatPrice,
  isLocked = false,
  onRemove,
  onUpdateQuantity,
}) => {
  const [inputValue, setInputValue] = useState(String(item.quantity));
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setInputValue(String(item.quantity));
  }, [item.quantity]);

  const commitQuantity = () => {
    let parsed = parseInt(inputValue, 10);
    if (isNaN(parsed) || parsed < 1) {
      parsed = 1;
    }
    setInputValue(String(parsed));
    if (parsed !== item.quantity) {
      onUpdateQuantity?.(parsed);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const currentPrice = item.pricing.current * item.quantity;
  const lineOriginalPrice =
    item.pricing.original && item.pricing.original > item.pricing.current
      ? item.pricing.original * item.quantity
      : null;

  return (
    <article
      className="cart-item"
      data-cart-product-id={item.id}
      data-cart-color={item.color || ""}
      data-cart-size={item.size || ""}
    >
      <a
        href={`/product/${encodeURIComponent(item.id)}`}
        className="cart-item__image-link"
        aria-label={`View product details for ${item.name}`}
      >
        <div
          className="cart-item__image-shell cart-item__image-shell--loaded"
          aria-busy="false"
        >
          <span
            className="cart-item__image-placeholder cart-skeleton-block"
            aria-hidden="true"
          ></span>
          <img
            className="cart-item__image"
            src={item.thumbnail || item.images?.[0]?.url}
            alt={item.thumbnailAlt || item.name}
            loading="lazy"
            decoding="async"
          />
        </div>
      </a>

      <div className="cart-item__content">
        <div className="cart-item__head">
          <h2 className="cart-item__name">
            <a
              className="cart-item__name-link"
              href={`/product/${encodeURIComponent(item.id)}`}
            >
              {item.name}
            </a>
          </h2>
          <Button
            unstyled
            className="cart-item__remove"
            type="button"
            aria-label="Remove item"
            disabled={isLocked}
            onClick={() => setIsModalOpen(true)}
          >
            <span className="u-sr-only"></span>
          </Button>
        </div>

        {item.size ? (
          <p className="cart-item__meta">Size: {item.size}</p>
        ) : null}
        {item.color ? (
          <p className="cart-item__meta">Color: {item.color}</p>
        ) : null}

        <div className="cart-item__foot">
          <ProductPrice
            currentAmount={currentPrice}
            originalAmount={lineOriginalPrice}
            discountPercent={item.pricing.discountPercent}
            currency={item.pricing.currency}
            formatPrice={formatPrice}
            className="cart-item__price-wrap"
            currentClassName="cart-item__price"
            originalClassName="cart-item__price-original"
            discountClassName="cart-item__price-discount"
          />

          <QuantityStepper
            className="cart-item__quantity"
            ariaLabel="Quantity controls"
            decrementButtonClassName="cart-item__qty-btn"
            incrementButtonClassName="cart-item__qty-btn"
            value={inputValue as unknown as number}
            min={1}
            disabled={isLocked}
            onChange={handleInputChange}
            onBlur={commitQuantity}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commitQuantity();
              }
            }}
            onDecrease={() => onUpdateQuantity?.(item.quantity - 1)}
            onIncrease={() => onUpdateQuantity?.(item.quantity + 1)}
            iconWidth={16}
            iconHeight={16}
          />
        </div>
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          onRemove?.();
        }}
        title="Remove item?"
        message={`Are you sure you want to remove "${item.name}" from your cart?`}
        confirmText="Remove"
      />
    </article>
  );
};
