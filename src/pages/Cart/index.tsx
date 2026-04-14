import { useRef, useState } from "react";
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
import { ERROR_MESSAGES, UI_TEXT } from "@/const/messages";
import "./index.scss";

type ProcessingAction = "idle" | "checkout" | "coupon";

const Cart = () => {
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
  const [processingAction, setProcessingAction] =
    useState<ProcessingAction>("idle");
  const isProcessing = processingAction !== "idle";
  const maxQuantityToastByItemRef = useRef<Record<string, number>>({});

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

  const showMaxQuantityToast = (itemKey: string) => {
    const now = Date.now();
    const lastShownAt = maxQuantityToastByItemRef.current[itemKey] ?? 0;
    if (now - lastShownAt < 1200) {
      return;
    }

    maxQuantityToastByItemRef.current[itemKey] = now;
    showToast({
      message: UI_TEXT.CART_MAX_QUANTITY_REACHED,
      variant: "info",
    });
  };

  return (
    <div className="container u-mt-25 cart-page">
      <Breadcrumb
        items={[
          { label: "Home", href: ROUTES.HOME },
          { label: "Cart" },
        ]}
        className="cart-page__breadcrumb"
      />

      <Heading as="h1" className="cart-page__title">
        Your Cart
      </Heading>

      {isLoading && <CartPageSkeleton />}

      {hasError && (
        <RetryState
          message={ERROR_MESSAGES.CART_HYDRATION_LOAD}
          onRetry={retryHydration}
          isRetrying={isRetryingHydration}
        />
      )}

      <CartEmptyState isVisible={isEmpty} />

      {!isLoading && !isEmpty && !hasError && (
        <div className="cart-page__layout">
          <div className="cart-items" aria-busy="false" aria-live="polite">
            {cartItems.map((item) => {
              const itemKey = `${item.id}-${item.color || "none"}-${item.size || "none"}`;
              return (
              <CartItemRow
                key={itemKey}
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
                onReachMaxQuantity={() => {
                  showMaxQuantityToast(itemKey);
                }}
              />
              );
            })}
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
        </div>
      )}
    </div>
  );
};

export default Cart;

