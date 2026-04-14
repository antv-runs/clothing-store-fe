import type { HTMLAttributes } from "react";
import { Text } from "@/components/atoms/Text";
import { TextLink } from "@/components/atoms/TextLink";
import clsx from "clsx";
import "./index.scss";

type CartEmptyStateProps = HTMLAttributes<HTMLDivElement> & {
  isVisible: boolean;
};

/**
 * CartEmptyState - Empty cart message block.
 */
export const CartEmptyState = ({
  isVisible,
  className,
  style,
  ...rest
}: CartEmptyStateProps) => {
  const displayStyle = { display: isVisible ? "flex" : "none", ...style };

  return (
    <div
      className={clsx("cart-empty", className)}
      style={displayStyle}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      {...rest}
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
