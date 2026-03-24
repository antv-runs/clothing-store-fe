import { FooterForm } from "../components/layout/Footer";

const CartPage: React.FC = () => {
  return (
    <div className="container">
      <main className="cart-page js-cart-page">
        <ol className="cart-page__breadcrumb" aria-label="Breadcrumb">
          <li>
            <a href="#">Home</a>
          </li>
          <li aria-current="page">Cart</li>
        </ol>

        <h1 className="cart-page__title">Your Cart</h1>

        <div
          className="cart-empty js-cart-empty"
          style={{ display: "none" }}
          aria-live="polite"
        >
          <div className="cart-empty__inner">
            <p className="cart-empty__text">Your cart is empty.</p>
            <a href="/" className="cart-empty__cta">
              Continue Shopping
            </a>
          </div>
        </div>

        <section
          className="cart-page__layout js-cart-layout"
          aria-label="Cart summary"
        >
          <div
            className="cart-items js-cart-items"
            aria-busy="true"
            aria-live="polite"
          >
            {/* Skeleton cart items */}
            {[0, 1].map((i) => (
              <article
                key={i}
                className="cart-item cart-item--skeleton"
                aria-hidden="true"
              >
                <div className="cart-item__image cart-skeleton-block"></div>
                <div className="cart-item__content">
                  <div className="cart-item__head">
                    <div className="cart-skeleton-block cart-skeleton-block--title"></div>
                    <div className="cart-skeleton-block cart-skeleton-block--icon"></div>
                  </div>
                  <div className="cart-skeleton-block cart-skeleton-block--meta"></div>
                  <div className="cart-skeleton-block cart-skeleton-block--meta cart-skeleton-block--meta-short"></div>
                  <div className="cart-item__foot">
                    <div className="cart-skeleton-block cart-skeleton-block--price"></div>
                    <div className="cart-item__quantity cart-item__quantity--skeleton">
                      <div className="cart-skeleton-block cart-skeleton-block--qty-icon"></div>
                      <div className="cart-skeleton-block cart-skeleton-block--qty-value"></div>
                      <div className="cart-skeleton-block cart-skeleton-block--qty-icon"></div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside
            className="cart-summary js-cart-summary"
            aria-label="Order summary"
            aria-busy="true"
          >
            <h2 className="cart-summary__title">Order Summary</h2>

            <dl className="cart-summary__rows">
              <div className="cart-summary__row u-mb-28">
                <dt>Subtotal</dt>
                <dd className="js-cart-subtotal">
                  <span className="cart-skeleton-block cart-skeleton-block--summary"></span>
                </dd>
              </div>
              <div className="cart-summary__row u-mb-28">
                <dt>Discount (-20%)</dt>
                <dd className="cart-summary__discount js-cart-discount">
                  <span className="cart-skeleton-block cart-skeleton-block--summary"></span>
                </dd>
              </div>
              <div className="cart-summary__row">
                <dt>Delivery Fee</dt>
                <dd className="js-cart-delivery">
                  <span className="cart-skeleton-block cart-skeleton-block--summary"></span>
                </dd>
              </div>
            </dl>

            <div className="cart-summary__total">
              <p>Total</p>
              <p className="js-cart-total">
                <span className="cart-skeleton-block cart-skeleton-block--summary cart-skeleton-block--summary-total"></span>
              </p>
            </div>

            <form
              className="cart-summary__coupon js-cart-promo-form"
              action="#"
            >
              <div className="coupon-input">
                <figure>
                  <img src="/images/icn_promo_code.svg" alt="Promo code" />
                </figure>
                <input
                  className="js-cart-coupon-input"
                  type="text"
                  placeholder="Add promo code"
                  aria-label="Promo code"
                  disabled
                  aria-disabled="true"
                />
              </div>
              <button
                className="js-cart-coupon-apply"
                type="button"
                disabled
                aria-disabled="true"
              >
                Apply
              </button>
            </form>
            <p
              className="cart-summary__coupon-msg js-cart-coupon-msg"
              aria-live="polite"
              hidden
            ></p>

            <button
              className="cart-summary__checkout js-cart-checkout"
              type="button"
              disabled
              aria-disabled="true"
            >
              <span className="cart-summary__checkout-text">
                Go to Checkout
              </span>
            </button>
          </aside>
        </section>
      </main>

      {/* Footer Form (newsletter) */}
      <FooterForm />
    </div>
  );
};

export default CartPage;
