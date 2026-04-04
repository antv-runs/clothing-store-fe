import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "@/components/atoms/Heading";
import { products } from "@/const/products";
import { Breadcrumb } from "@/components/organisms/Breadcrumb";
import { CartEmptyState } from "@/components/molecules/CartEmptyState";
import { CartItemRow } from "@/components/organisms/CartItemRow";
import { CartSummaryPanel } from "@/components/organisms/CartSummaryPanel";
import { ROUTES } from "@/routes/paths";
import type { CartRow } from "@/types/cart";
import { formatPrice, normalizeId } from "@/utils/formatters";
import { readStoredCartRows } from "@/utils/cartStorage";
import "./index.scss";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartRows] = useState<CartRow[]>(() => readStoredCartRows());

  const cartItems = useMemo(() => {
    return cartRows
      .map((row) => {
        const product = products.find((item) =>
          normalizeId(String(item.id), row.productId),
        );
        if (!product) {
          return null;
        }

        return {
          ...product,
          quantity: row.quantity,
          color: row.color,
          size: row.size,
        };
      })
      .filter((item) => item !== null);
  }, [cartRows]);

  const summary = useMemo(() => {
    const subtotal = cartItems.reduce((acc, item) => {
      const basePrice =
        item.pricing.original && item.pricing.original > item.pricing.current
          ? item.pricing.original
          : item.pricing.current;
      return acc + basePrice * item.quantity;
    }, 0);

    const discount = cartItems.reduce((acc, item) => {
      const original = item.pricing.original;
      if (!original || original <= item.pricing.current) {
        return acc;
      }

      return acc + (original - item.pricing.current) * item.quantity;
    }, 0);

    const delivery = 0;
    const total = subtotal - discount + delivery;

    return { subtotal, discount, delivery, total };
  }, [cartItems]);

  const isEmpty = cartItems.length === 0;
  const handleCheckout = () => {
    if (isEmpty) {
      return;
    }

    navigate(ROUTES.CHECKOUT);
  };

  return (
    <div className="container u-mt-25">
      <section className="cart-page js-cart-page" aria-label="Shopping cart">
        <Breadcrumb
          items={["Home", "Cart"]}
          id="cart-breadcrumb-list"
          className="cart-page__breadcrumb"
        />

        <Heading as="h1" className="cart-page__title">
          Your Cart
        </Heading>

        <CartEmptyState isVisible={isEmpty} />

        <section
          className="cart-page__layout js-cart-layout"
          aria-label="Cart summary"
          style={{ display: isEmpty ? "none" : "" }}
        >
          <div
            className="cart-items js-cart-items"
            aria-busy="false"
            aria-live="polite"
          >
            {cartItems.map((item) => (
              <CartItemRow
                key={`${item.id}-${item.color || "none"}-${item.size || "none"}`}
                item={item}
                formatPrice={formatPrice}
              />
            ))}
          </div>

          <CartSummaryPanel
            summary={summary}
            formatPrice={formatPrice}
            isCheckoutDisabled={isEmpty}
            onCheckout={handleCheckout}
          />
        </section>
      </section>
    </div>
  );
};

export default Cart;
