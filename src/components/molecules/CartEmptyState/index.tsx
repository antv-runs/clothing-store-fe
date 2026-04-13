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
  const displayStyle = { display: isVisible ? "flex" : "none" };

  return (
    <div
      className="cart-empty"
      style={displayStyle}
      role="status"
      aria-live="polite"
      aria-atomic="true"
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
