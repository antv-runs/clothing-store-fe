import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { createOrder } from "@/api/Order";
import {
  isApiError,
  mapApiErrorToMessage,
  mapApiValidationErrors,
} from "@/utils/apiErrorMapper";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Breadcrumb } from "@/components/organisms/Breadcrumb";
import { useCartRows } from "@/hooks/useCartRows";
import { CheckoutSummaryPanel } from "@/components/organisms/CheckoutSummaryPanel";
import { ROUTES } from "@/routes/paths";
import { formatPrice } from "@/utils/formatters";
import type { CreateOrderPayload } from "@/types/api/order";
import { checkoutSchema, type CheckoutFormValues } from "@/types/checkout";
import "./index.scss";

type SubmitStatus = "idle" | "submitting" | "success" | "error";
const Checkout: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { getCartRows, clearCart, cartItems, summary, isEmpty } = useCartRows();
  const navigate = useNavigate();

  useEffect(() => {
    if (isEmpty && submitStatus !== "success" && submitStatus !== "error") {
      navigate(ROUTES.CART, { replace: true });
    }
  }, [isEmpty, submitStatus, navigate]);

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
      address: "",
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    if (submitStatus === "submitting") {
      return;
    }

    const cartRows = getCartRows();

    if (cartRows.length === 0) {
      return;
    }

    const payload: CreateOrderPayload = {
      customer_name: values.fullName,
      customer_email: values.email,
      address: values.address,
      items: cartRows.map((row) => ({
        product_id: row.productId,
        quantity: row.quantity,
      })),
    };

    setSubmitStatus("submitting");
    setErrorMessage("");

    try {
      await createOrder(payload);
      clearCart();
      reset();
      clearErrors();
      setSubmitStatus("success");
    } catch (error) {
      const validationErrors = mapApiValidationErrors(error);

      if (validationErrors) {
        setSubmitStatus("idle");
        Object.entries(validationErrors).forEach(([field, messages]) => {
          setError(field as keyof CheckoutFormValues, {
            type: "server",
            message: messages[0],
          });
        });
      } else if (isApiError(error)) {
        const msg = mapApiErrorToMessage(
          error,
          "An unexpected error occurred while placing your order."
        );
        setErrorMessage(msg);
        setSubmitStatus("error");
      } else {
        setErrorMessage(
          "An unexpected error occurred. Please try again or contact support."
        );
        setSubmitStatus("error");
      }
    }
  };

  // throw new Error("Test boundary");

  return (
    <div className="container u-mt-25">
      <section className="checkout-page js-checkout-page" aria-label="Checkout">
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
            <p className="checkout-page__status-message">
              Thank you for your purchase. Your order has been placed and is being processed.
            </p>
            <Button
              className="checkout-page__status-btn"
              onClick={() => navigate(ROUTES.HOME)}
              unstyled
            >
              Back to Home
            </Button>
          </div>
        ) : isEmpty ? null : (
          <div className="checkout-page__layout">
            <form
          className="checkout-page__form js-checkout-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
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

          {submitStatus === "error" && errorMessage && (
            <div
              className="checkout-page__message checkout-page__message--error js-checkout-error"
              aria-live="polite"
              role="alert"
            >
              {errorMessage}
            </div>
          )}

          <Button
            className="checkout-page__submit js-checkout-submit"
            type="submit"
            disabled={submitStatus === "submitting"}
            aria-disabled={submitStatus === "submitting"}
            isLoading={submitStatus === "submitting"}
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
