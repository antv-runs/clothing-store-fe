import { useNavigate } from "react-router-dom";
import { Heading } from "@/components/atoms/Heading";
import { Breadcrumb } from "@/components/organisms/Breadcrumb";
import { CartEmptyState } from "@/components/molecules/CartEmptyState";
import { CartItemRow } from "@/components/organisms/CartItemRow";
import { CartSummaryPanel } from "@/components/organisms/CartSummaryPanel";
import { useCartRows } from "@/hooks/useCartRows";
import { ROUTES } from "@/routes/paths";
import { formatPrice } from "@/utils/formatters";
import "./index.scss";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, summary, isEmpty } = useCartRows();

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
