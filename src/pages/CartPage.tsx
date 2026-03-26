import { FooterForm } from "../components/organisms/Footer";
import { useMemo, useState } from "react";
import { products } from "../data/products";
import { mockCartItems } from "../data/cartItem";
import { Breadcrumb } from "../components/organisms/Breadcrumb/Breadcrumb";
import { CartEmptyState } from "../components/molecules/CartEmptyState/CartEmptyState";
import { CartItemRow } from "../components/organisms/CartItemRow/CartItemRow";
import { CartSummaryPanel } from "../components/organisms/CartSummaryPanel/CartSummaryPanel";
import "./CartPage.scss";

export type CartRow = {
  productId: string;
  quantity: number;
  color: string | null;
  size: string | null;
};

function formatPrice(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function idsMatch(a: string, b: string) {
  if (a === b) {
    return true;
  }

  const na = Number(a);
  const nb = Number(b);
  return Number.isFinite(na) && na === nb;
}

const CartPage: React.FC = () => {
  const [cartRows] = useState<CartRow[]>(() => mockCartItems);

  const cartItems = useMemo(() => {
    return cartRows
      .map((row) => {
        const product = products.find((item) =>
          idsMatch(String(item.id), row.productId),
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

  return (
    <div className="container u-mt-25">
      <main className="cart-page js-cart-page">
        <Breadcrumb
          items={["Home", "Cart"]}
          className="cart-page__breadcrumb"
          id="cart-breadcrumb-list"
        />

        <h1 className="cart-page__title u-mt-30">Your Cart</h1>

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

          <CartSummaryPanel summary={summary} formatPrice={formatPrice} />
        </section>
      </main>

      {/* Footer Form (newsletter) */}
      <FooterForm />
    </div>
  );
};

export default CartPage;
