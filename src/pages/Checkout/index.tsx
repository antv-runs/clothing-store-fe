import { useState } from "react";
import { createOrder } from "@/api/Order";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Breadcrumb } from "@/components/organisms/Breadcrumb";
import type { CreateOrderPayload } from "@/types/api/order";
import { readStoredCartRows, writeStoredCartRows } from "@/utils/cartStorage";
import "./index.scss";

const Checkout: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event,
  ) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const customerName = String(formData.get("fullName") ?? "").trim();
    const customerEmail = String(formData.get("email") ?? "").trim();
    const address = String(formData.get("address") ?? "").trim();

    if (!customerName || !customerEmail || !address) {
      setFeedbackMessage("Please fill in all required checkout fields.");
      return;
    }

    const cartRows = readStoredCartRows();

    if (cartRows.length === 0) {
      setFeedbackMessage("Your cart is empty.");
      return;
    }

    const payload: CreateOrderPayload = {
      customer_name: customerName,
      customer_email: customerEmail,
      address,
      items: cartRows.map((row) => ({
        product_id: row.productId,
        quantity: row.quantity,
      })),
    };

    setIsSubmitting(true);
    setFeedbackMessage("Placing your order...");

    try {
      await createOrder(payload);
      writeStoredCartRows([]);
      form.reset();
      setFeedbackMessage("Order placed successfully.");
    } catch {
      setFeedbackMessage("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="checkout-page__grid">
            <label className="checkout-page__field">
              <span>Full Name</span>
              <Input type="text" name="fullName" autoComplete="name" required />
            </label>

            <label className="checkout-page__field">
              <span>Email</span>
              <Input type="email" name="email" autoComplete="email" required />
            </label>

            <label className="checkout-page__field checkout-page__field--full">
              <span>Address</span>
              <Input
                type="text"
                name="address"
                autoComplete="street-address"
                required
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

        <p
          className="checkout-page__message js-checkout-message"
          aria-live="polite"
          hidden={!feedbackMessage}
        >
          {feedbackMessage}
        </p>
      </section>
    </div>
  );
};

export default Checkout;
