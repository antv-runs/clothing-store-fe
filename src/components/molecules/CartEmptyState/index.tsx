import React from "react";
import { Text } from "@/components/atoms/Text";
import { TextLink } from "@/components/atoms/TextLink";
import "./index.scss";

interface CartEmptyStateProps {
  isVisible: boolean;
}

/**
 * CartEmptyState - Empty cart message block.
 */
export const CartEmptyState: React.FC<CartEmptyStateProps> = ({
  isVisible,
}) => {
  return (
    <div
      className="cart-empty js-cart-empty"
      style={{ display: isVisible ? "flex" : "none" }}
      aria-live="polite"
    >
      <div className="cart-empty__inner">
        <Text as="p" className="cart-empty__text">
          Your cart is empty.
        </Text>
        <TextLink href="/" className="cart-empty__cta">
          Continue Shopping
        </TextLink>
      </div>
    </div>
  );
};
