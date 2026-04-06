import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "@/components/atoms/Heading";
import { Breadcrumb } from "@/components/organisms/Breadcrumb";
import { CartEmptyState } from "@/components/molecules/CartEmptyState";
import { CartItemRow } from "@/components/organisms/CartItemRow";
import { CartSummaryPanel } from "@/components/organisms/CartSummaryPanel";
import { CartPageSkeleton } from "@/components/organisms/CartPageSkeleton";
import { useCartRows } from "@/hooks/useCartRows";
import { ROUTES } from "@/routes/paths";
import { formatPrice } from "@/utils/formatters";
import { useToast } from "@/contexts/ToastContext";
import "./index.scss";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { 
    cartItems, 
    summary, 
    isEmpty, 
    isLoading, 
    hasError, 
    retryHydration,
    updateItemQuantity,
    removeItem
  } = useCartRows();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApplyCoupon = () => {
    return new Promise<void>((_, reject) => {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        reject(new Error("Simulated failure"));
      }, 600);
    });
  };

  const handleCheckout = () => {
    if (isEmpty) {
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate(ROUTES.CHECKOUT);
    }, 600);
  };

  return (
    <div className="container u-mt-25">
      <section className="cart-page" aria-label="Shopping cart">
        <Breadcrumb
          items={["Home", "Cart"]}
          className="cart-page__breadcrumb"
        />

        <Heading as="h1" className="cart-page__title">
          Your Cart
        </Heading>

        {isLoading && !hasError && <CartPageSkeleton />}

        {hasError && (
          <div className="cart-page__error cart-fetch-state" role="alert">
            <h2 className="cart-fetch-state__title">Failed to load cart data</h2>
            <p className="cart-fetch-state__description">
              We couldn't securely load your cart data right now.
            </p>
            <button
              onClick={retryHydration}
              className="cart-fetch-state__retry"
              type="button"
            >
              Retry
            </button>
          </div>
        )}

        <CartEmptyState isVisible={isEmpty && !isLoading && !hasError} />

        <section
          className="cart-page__layout"
          aria-label="Cart summary"
          style={{ display: isEmpty || isLoading || hasError ? "none" : "" }}
        >
          <div
            className="cart-items"
            aria-busy="false"
            aria-live="polite"
          >
            {cartItems.map((item) => (
              <CartItemRow
                key={`${item.id}-${item.color || "none"}-${item.size || "none"}`}
                item={item}
                formatPrice={formatPrice}
                isLocked={isProcessing}
                onRemove={() => {
                  removeItem(item.id, item.color, item.size);
                  showToast({ message: "Item removed from cart", variant: "success" });
                }}
                onUpdateQuantity={(newQty) => updateItemQuantity(item.id, item.color, item.size, newQty)}
              />
            ))}
          </div>

          <CartSummaryPanel
            summary={summary}
            formatPrice={formatPrice}
            isCheckoutDisabled={isEmpty}
            isLocked={isProcessing}
            onCheckout={handleCheckout}
            onApplyCoupon={handleApplyCoupon}
          />
        </section>
      </section>
    </div>
  );
};

export default Cart;
