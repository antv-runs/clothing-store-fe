import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "@/components/atoms/Heading";
import { Breadcrumb } from "@/components/organisms/Breadcrumb";
import { CartEmptyState } from "@/components/molecules/CartEmptyState";
import { CartItemRow } from "@/components/organisms/CartItemRow";
import { CartSummaryPanel } from "@/components/organisms/CartSummaryPanel";
import { CartPageSkeleton } from "@/components/organisms/CartPageSkeleton";
import { RetryState } from "@/components/molecules/RetryState";
import { useCartRows } from "@/hooks/useCartRows";
import { ROUTES } from "@/routes/paths";
import { formatPrice } from "@/utils/formatters";
import { useToast } from "@/hooks/useToast";
import "./index.scss";

export type ProcessingAction = "idle" | "checkout" | "coupon";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    cartItems,
    summary,
    isEmpty,
    isLoading,
    isRetryingHydration,
    hasError,
    retryHydration,
    updateItemQuantity,
    removeItem,
  } = useCartRows();
  const [processingAction, setProcessingAction] = useState<ProcessingAction>("idle");
  const isProcessing = processingAction !== "idle";

  const handleApplyCoupon = () => {
    if (isProcessing) return Promise.resolve();

    return new Promise<void>((_, reject) => {
      setProcessingAction("coupon");
      setTimeout(() => {
        setProcessingAction("idle");
        reject(new Error("Simulated failure"));
      }, 1000);
    }).catch(() => {
      setProcessingAction("idle");
      showToast({
        message: "Unable to apply coupon. Please try again.",
        variant: "error",
        duration: 5000,
      });
    });
  };

  const handleCheckout = () => {
    if (isProcessing || isEmpty) {
      return;
    }

    setProcessingAction("checkout");
    setTimeout(() => {
      setProcessingAction("idle");
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

        {/* Classification boundary: Cart is a hybrid hydration + domain flow,
            so it must keep local skeleton/retry rendering and not use ListStateWrapper. */}
        {isLoading && !hasError && <CartPageSkeleton />}

        {hasError && (
          <RetryState
            message="We couldn't securely load your cart data right now."
            onRetry={retryHydration}
            isRetrying={isRetryingHydration}
          />
        )}

        <CartEmptyState isVisible={isEmpty && !isLoading && !hasError} />

        <section
          className="cart-page__layout"
          aria-label="Cart summary"
          // Keep the layout mounted during retry to prevent skeleton flash/flicker.
          style={{ display: isEmpty || isLoading || hasError ? "none" : "" }}
        >
          <div className="cart-items" aria-busy="false" aria-live="polite">
            {cartItems.map((item) => (
              <CartItemRow
                key={`${item.id}-${item.color || "none"}-${item.size || "none"}`}
                item={item}
                formatPrice={formatPrice}
                isLocked={isProcessing}
                onRemove={() => {
                  removeItem(item.id, item.color, item.size);
                  showToast({
                    message: "Item removed from cart",
                    variant: "success",
                  });
                }}
                onUpdateQuantity={(newQty) => {
                  if (newQty <= 0) {
                    removeItem(item.id, item.color, item.size);
                    showToast({
                      message: "Item removed from cart",
                      variant: "success",
                    });
                  } else {
                    updateItemQuantity(item.id, item.color, item.size, newQty);
                  }
                }}
              />
            ))}
          </div>

          <CartSummaryPanel
            summary={summary}
            formatPrice={formatPrice}
            isCheckoutDisabled={isEmpty}
            isLocked={isProcessing}
            isCheckoutLoading={processingAction === "checkout"}
            isCouponLoading={processingAction === "coupon"}
            onCheckout={handleCheckout}
            onApplyCoupon={handleApplyCoupon}
          />
        </section>
      </section>
    </div>
  );
};

export default Cart;
