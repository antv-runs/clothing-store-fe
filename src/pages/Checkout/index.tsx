import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "@/api/Order";
import { useToast } from "@/hooks/useToast";
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
import { ERROR_MESSAGES } from "@/const/errorMessages";
import { UI_TEXT } from "@/const/uiText";
import { TOAST_DEFAULT_DURATION } from "@/const/ui";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const Checkout: React.FC = () => {
  const { showToast } = useToast();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
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
    setSuccessMessage("");
    setSubmitStatus("idle");

    let payload: CreateOrderRequest;
    try {
      payload = mapCartToOrderRequest(cartRows, values);
    } catch (error) {
      const errorMsg =
        error instanceof Error
          ? error.message
          : ERROR_MESSAGES.INVALID_ORDER_DATA;
      setSubmitStatus("error");
      showToast({
        message: errorMsg,
        variant: "error",
        duration: TOAST_DEFAULT_DURATION,
      });
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
        UI_TEXT.ORDER_PLACED_SUCCESS_LONG,
      );
      setSubmitStatus("success");
      showToast({
        message: UI_TEXT.ORDER_PLACED_SUCCESS,
        variant: "success",
        duration: TOAST_DEFAULT_DURATION,
      });
    } catch (error: unknown) {
      const validationErrors = mapApiValidationErrors(error);

      if (validationErrors) {
        const newServerErrors: Record<string, string> = {};
        Object.entries(validationErrors).forEach(([field, messages]) => {
          newServerErrors[field] = messages[0];
        });

        setServerErrors(newServerErrors);

        const errorMsg = mapApiErrorToMessage(
          error,
          ERROR_MESSAGES.CHECKOUT_VALIDATION,
        );

        setSubmitStatus("error");

        showToast({
          message: errorMsg,
          variant: "error",
          duration: TOAST_DEFAULT_DURATION,
        });
      } else if (isApiError(error)) {
        const errorMsg = mapApiErrorToMessage(
          error,
          ERROR_MESSAGES.CHECKOUT_UNEXPECTED,
        );

        setSubmitStatus("error");

        const status = error.status;
        const isServerError = typeof status === "number" && status >= 500;
        const isNetworkError = status === undefined;

        if (!isServerError && !isNetworkError) {
          showToast({
            message: errorMsg,
            variant: "error",
            duration: TOAST_DEFAULT_DURATION,
          });
        }
      } else {
        const errorMsg = ERROR_MESSAGES.CHECKOUT_GENERIC;

        setSubmitStatus("error");

        showToast({
          message: errorMsg,
          variant: "error",
          duration: TOAST_DEFAULT_DURATION,
        });
      }
    } finally {
      submissionLockRef.current = false;
      setIsSubmittingOrder(false);
    }
  };

  return (
    <div className="container u-mt-25">
      <div className="checkout-page">
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
              type="button"
              variant="primary"
              onClick={() => navigate(ROUTES.HOME)}
            >
              {UI_TEXT.BACK_TO_HOME}
            </Button>
          </div>
        ) : hasError ? (
          <RetryState
            message={ERROR_MESSAGES.CHECKOUT_LOAD}
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
            />

            <CheckoutSummaryPanel
              items={cartItems}
              summary={summary}
              formatPrice={formatPrice}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
