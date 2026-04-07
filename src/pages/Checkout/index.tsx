import { useState, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { createOrder } from "@/api/Order";
import {
  isApiError,
  mapApiErrorToMessage,
  mapApiValidationErrors,
} from "@/utils/apiErrorList";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Breadcrumb } from "@/components/organisms/Breadcrumb";
import { CheckoutPageSkeleton } from "@/components/organisms/CheckoutPageSkeleton";
import { RetryState } from "@/components/molecules/RetryState";
import { useCartRows } from "@/hooks/useCartRows";
import { CheckoutSummaryPanel } from "@/components/organisms/CheckoutSummaryPanel";
import { mapCartToOrderRequest } from "@/utils/orderMapper";
import { ROUTES } from "@/routes/paths";
import { formatPrice } from "@/utils/formatters";
import type { CreateOrderRequest } from "@/types/api/order";
import { checkoutSchema, type CheckoutFormValues } from "@/types/checkout";
import "./index.scss";

type SubmitStatus = "idle" | "submitting" | "success" | "error";
const Checkout: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setError,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
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

    clearErrors();
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
      reset();
      clearErrors();
      setSuccessMessage(
        "Your order has been placed successfully. We will process it shortly.",
      );
      setSubmitStatus("success");
    } catch (error) {
      const validationErrors = mapApiValidationErrors(error);

      if (validationErrors) {
        Object.entries(validationErrors).forEach(([field, messages]) => {
          setError(field as keyof CheckoutFormValues, {
            type: "server",
            message: messages[0],
          });
        });
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

  // throw new Error("Test boundary");

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
            <form
              className="checkout-page__form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <fieldset
                className="checkout-page__fieldset"
                disabled={isSubmittingOrder}
              >
                <div className="checkout-page__grid">
                  <label className="checkout-page__field">
                    <span>Full Name</span>
                    <Controller
                      name="fullName"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Input
                            {...field}
                            type="text"
                            autoComplete="name"
                            required
                            aria-invalid={Boolean(errors.fullName)}
                            onChange={(event) => {
                              field.onChange(event);
                            }}
                          />
                          {errors.fullName?.message && (
                            <p role="alert">{errors.fullName.message}</p>
                          )}
                        </>
                      )}
                    />
                  </label>

                  <label className="checkout-page__field">
                    <span>Email</span>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Input
                            {...field}
                            type="email"
                            autoComplete="email"
                            required
                            aria-invalid={Boolean(errors.email)}
                            onChange={(event) => {
                              field.onChange(event);
                            }}
                          />
                          {errors.email?.message && (
                            <p role="alert">{errors.email.message}</p>
                          )}
                        </>
                      )}
                    />
                  </label>

                  <label className="checkout-page__field checkout-page__field--full">
                    <span>Phone</span>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Input
                            {...field}
                            type="tel"
                            autoComplete="tel"
                            required
                            aria-invalid={Boolean(errors.phone)}
                            onChange={(event) => {
                              field.onChange(event);
                            }}
                          />
                          {errors.phone?.message && (
                            <p role="alert">{errors.phone.message}</p>
                          )}
                        </>
                      )}
                    />
                  </label>

                  <label className="checkout-page__field checkout-page__field--full">
                    <span>Address</span>
                    <Controller
                      name="address"
                      control={control}
                      render={({ field }) => (
                        <>
                          <Input
                            {...field}
                            type="text"
                            autoComplete="street-address"
                            required
                            aria-invalid={Boolean(errors.address)}
                            onChange={(event) => {
                              field.onChange(event);
                            }}
                          />
                          {errors.address?.message && (
                            <p role="alert">{errors.address.message}</p>
                          )}
                        </>
                      )}
                    />
                  </label>
                </div>
              </fieldset>

              {submitStatus === "error" && errorMessage && (
                <div
                  className="checkout-page__message checkout-page__message--error"
                  aria-live="polite"
                  role="alert"
                >
                  {errorMessage}
                </div>
              )}

              <Button
                className="checkout-page__submit"
                type="submit"
                disabled={isSubmittingOrder}
                aria-disabled={isSubmittingOrder}
                isLoading={isSubmittingOrder}
                loadingText="Placing order..."
                unstyled
              >
                Place Order
              </Button>
            </form>

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
