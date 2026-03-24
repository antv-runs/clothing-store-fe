import { FooterForm } from "../components/layout/Footer";
import { useMemo, useState } from "react";
import { products } from "../data/products";
import { Breadcrumb } from "../components/organisms/Breadcrumb/Breadcrumb";
import { CartEmptyState } from "../components/molecules/CartEmptyState/CartEmptyState";
import { CartItemRow } from "../components/organisms/CartItemRow/CartItemRow";
import { CartSummaryPanel } from "../components/organisms/CartSummaryPanel/CartSummaryPanel";

type CartStorageItem = {
  product_id?: string | number;
  productId?: string | number;
  id?: string | number;
  quantity?: string | number;
  color?: string;
  size?: string;
};

type CartRow = {
  productId: string;
  quantity: number;
  color: string | null;
  size: string | null;
};

const CART_STORAGE_KEYS = ["cart", "cartItems", "shoppingCart"];

function formatPrice(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function resolveProductId(item: CartStorageItem) {
  const rawId = item.product_id ?? item.productId ?? item.id ?? "";
  return String(rawId).trim();
}

function parseStoredCart(): CartRow[] {
  for (const key of CART_STORAGE_KEYS) {
    const raw = localStorage.getItem(key);
    if (!raw) {
      continue;
    }

    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        continue;
      }

      return parsed
        .map((item: CartStorageItem) => {
          const productId = resolveProductId(item);
          const quantity = Math.max(1, Number(item.quantity) || 1);

          return {
            productId,
            quantity,
            color: item.color ? String(item.color) : null,
            size: item.size ? String(item.size) : null,
          };
        })
        .filter((item) => item.productId.length > 0);
    } catch {
      continue;
    }
  }

  return [];
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
  const [cartRows] = useState<CartRow[]>(() => parseStoredCart());

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
    <div className="container">
      <main className="cart-page js-cart-page">
        <Breadcrumb
          items={["Home", "Cart"]}
          className="cart-page__breadcrumb"
          id="cart-breadcrumb-list"
        />

        <h1 className="cart-page__title">Your Cart</h1>

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
