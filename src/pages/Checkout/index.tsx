import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import type { CreateOrderPayload } from "@/types/api/order";
import { checkoutSchema, type CheckoutFormValues } from "@/types/checkout";
import "./index.scss";

const Checkout: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { getCartRows, clearCart } = useCartRows();

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
    if (isSubmitting) {
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

    setIsSubmitting(true);

    try {
      await createOrder(payload);
      clearCart();
      reset();
      clearErrors();
    } catch (error) {
      const validationErrors = mapApiValidationErrors(error);

      if (validationErrors) {
        Object.entries(validationErrors).forEach(([field, messages]) => {
          setError(field as keyof CheckoutFormValues, {
            type: "server",
            message: messages[0],
          });
        });
      } else if (isApiError(error)) {
        // Global error fallback, do not introduce new UI blocks
        window.alert(
          mapApiErrorToMessage(error, "An unexpected error occurred."),
        );
      }
    } finally {
      setIsSubmitting(false);
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

          <Button
            className="checkout-page__submit js-checkout-submit"
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            isLoading={isSubmitting}
            loadingText="Placing order..."
            unstyled
          >
            Place Order
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Checkout;
