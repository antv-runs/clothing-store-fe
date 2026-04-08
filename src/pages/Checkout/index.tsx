import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "@/api/Order";
import {
  isApiError,
  mapApiErrorToMessage,
  mapApiValidationErrors,
} from "@/utils/apiErrorList";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { Breadcrumb } from "@/components/organisms/Breadcrumb";
import { CheckoutPageSkeleton } from "@/components/organisms/CheckoutPageSkeleton";
import { RetryState } from "@/components/molecules/RetryState";
import { useCartRows } from "@/hooks/useCartRows";
import { CheckoutSummaryPanel } from "@/components/organisms/CheckoutSummaryPanel";
import { CheckoutForm } from "@/components/organisms/CheckoutForm";
import { mapCartToOrderRequest } from "@/utils/orderMapper";
import { ROUTES } from "@/routes/paths";
import { formatPrice } from "@/utils/formatters";
import type { CreateOrderRequest } from "@/types/api/order";
import type { CheckoutFormValues } from "@/components/organisms/CheckoutForm/index.schema";
import "./index.scss";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const Checkout: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  
  const submissionLockRef = useRef(false);
  const {
    getCartRows,
    clearCart,
    cartItems,
    summary,
    isEmpty,
    isLoading,
    isRetryingHydration,
    hasError,
    retryHydration,
  } = useCartRows();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isEmpty &&
      !isLoading &&
      !hasError &&
      submitStatus !== "success" &&
      submitStatus !== "error"
    ) {
      navigate(ROUTES.CART, { replace: true });
    }
  }, [isEmpty, isLoading, hasError, submitStatus, navigate]);

  const handleCheckoutSubmit = async (values: CheckoutFormValues) => {
    if (
      submissionLockRef.current ||
      isSubmittingOrder ||
      isLoading ||
      hasError
    ) {
      return;
    }

    const cartRows = getCartRows();

    if (cartRows.length === 0) {
      return;
    }

    setServerErrors({});
    setErrorMessage("");
    setSuccessMessage("");
    setSubmitStatus("idle");

    let payload: CreateOrderRequest;
    try {
      payload = mapCartToOrderRequest(cartRows, values);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Invalid order data. Please review your information and cart.",
      );
      setSubmitStatus("error");
      return;
    }

    submissionLockRef.current = true;
    setSubmitStatus("submitting");
    setIsSubmittingOrder(true);

    try {
      await createOrder(payload);
      clearCart();
      setServerErrors({});
      setSuccessMessage(
        "Your order has been placed successfully. We will process it shortly.",
      );
      setSubmitStatus("success");
    } catch (error) {
      const validationErrors = mapApiValidationErrors(error);

      if (validationErrors) {
        const newServerErrors: Record<string, string> = {};
        Object.entries(validationErrors).forEach(([field, messages]) => {
          newServerErrors[field] = messages[0];
        });
        setServerErrors(newServerErrors);
        
        setErrorMessage(
          mapApiErrorToMessage(
            error,
            "Please review the highlighted fields and try again.",
          ),
        );
        setSubmitStatus("error");
      } else if (isApiError(error)) {
        setErrorMessage(
          mapApiErrorToMessage(
            error,
            "An unexpected error occurred while placing your order.",
          ),
        );
        setSubmitStatus("error");
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again or contact support.",
        );
        setSubmitStatus("error");
      }
    } finally {
      submissionLockRef.current = false;
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="container u-mt-25">
      <section className="checkout-page" aria-label="Checkout">
        <Breadcrumb
          items={["Home", "Cart", "Checkout"]}
          className="checkout-page__breadcrumb"
        />

        <Heading as="h1" className="checkout-page__title">
          Checkout
        </Heading>

        {submitStatus === "success" ? (
          <div className="checkout-page__status">
            <Heading as="h2" className="checkout-page__status-title">
              Order Placed Successfully!
            </Heading>
            <p
              className="checkout-page__status-message checkout-page__message checkout-page__message--success"
              role="status"
              aria-live="polite"
            >
              {successMessage}
            </p>
            <Button
              className="checkout-page__status-btn"
              onClick={() => navigate(ROUTES.HOME)}
              unstyled
            >
              Back to Home
            </Button>
          </div>
        ) : hasError ? (
          <RetryState
            message="We couldn't securely load your checkout data right now."
            onRetry={retryHydration}
            isRetrying={isRetryingHydration}
          />
        ) : isLoading && !hasError ? (
          <CheckoutPageSkeleton />
        ) : isEmpty ? null : (
          <div className="checkout-page__layout">
            <CheckoutForm 
              onSubmit={handleCheckoutSubmit}
              isSubmitting={isSubmittingOrder}
              serverErrors={serverErrors}
              globalError={submitStatus === "error" ? errorMessage : undefined}
            />

            <CheckoutSummaryPanel
              items={cartItems}
              summary={summary}
              formatPrice={formatPrice}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default Checkout;
