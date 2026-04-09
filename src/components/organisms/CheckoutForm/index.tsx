import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { checkoutSchema, type CheckoutFormValues } from "./index.schema";
import "./index.scss";

export type CheckoutFormProps = {
  onSubmit: (values: CheckoutFormValues) => void;
  isSubmitting: boolean;
  defaultValues?: Partial<CheckoutFormValues>;
  serverErrors?: Record<string, string>;
};

export const CheckoutForm = ({
  onSubmit,
  isSubmitting,
  defaultValues,
  serverErrors,
}: CheckoutFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      ...defaultValues,
    },
  });

  useEffect(() => {
    if (serverErrors && Object.keys(serverErrors).length > 0) {
      Object.entries(serverErrors).forEach(([field, message]) => {
        setError(field as keyof CheckoutFormValues, { type: "server", message });
      });
    } else {
        clearErrors();
    }
  }, [serverErrors, setError, clearErrors]);

  return (
    <form className="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset className="checkout-form__fieldset" disabled={isSubmitting}>
        <div className="checkout-form__grid">
          <label className="checkout-form__field">
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
                  />
                  {errors.fullName?.message && (
                    <p role="alert">{errors.fullName.message}</p>
                  )}
                </>
              )}
            />
          </label>

          <label className="checkout-form__field">
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
                  />
                  {errors.email?.message && (
                    <p role="alert">{errors.email.message}</p>
                  )}
                </>
              )}
            />
          </label>

          <label className="checkout-form__field checkout-form__field--full">
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
                  />
                  {errors.phone?.message && (
                    <p role="alert">{errors.phone.message}</p>
                  )}
                </>
              )}
            />
          </label>

          <label className="checkout-form__field checkout-form__field--full">
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

      <Button
        className="checkout-form__submit"
        type="submit"
        variant="primary"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
        isLoading={isSubmitting}
        loadingText="Placing order..."
      >
        Place Order
      </Button>
    </form>
  );
};
