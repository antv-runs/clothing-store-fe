import { FooterForm } from "../components/layout/Footer";
import { useParams } from "react-router-dom";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();

  console.log("Product ID:", id);

  return (
    <div className="container">
      {/* Product Overview Section */}
      <section className="product-overview js-product-overview">
        <nav aria-label="Breadcrumb">
          <ol
            id="breadcrumb-list"
            className="cart-page__breadcrumb product-breadcrumb js-breadcrumb-list u-mb-40"
          ></ol>
        </nav>

        <div className="product-overview__details">
          <div className="product-overview__images">
            <div
              id="product-thumbnails"
              className="product-overview__images-wrapper js-product-thumbnails js-product-gallery"
            >
              <div
                className="product-overview__skeleton-thumb"
                aria-hidden="true"
              ></div>
              <div
                className="product-overview__skeleton-thumb"
                aria-hidden="true"
              ></div>
              <div
                className="product-overview__skeleton-thumb"
                aria-hidden="true"
              ></div>
            </div>

            <div className="image-wrapper-main">
              <img
                id="product-main-image"
                className="product-overview__main-image js-product-main-image"
                alt=""
              />
              <div
                className="product-overview__skeleton-image"
                aria-hidden="true"
              ></div>
            </div>
          </div>

          <div className="product-overview__info">
            <h1 id="product-title" className="js-product-title">
              <span
                className="product-overview__skeleton-line product-overview__skeleton-line--title"
                aria-hidden="true"
              ></span>
              <span
                className="product-overview__skeleton-line product-overview__skeleton-line--title"
                aria-hidden="true"
              ></span>
            </h1>

            <div className="product-overview__rating js-product-rating-section">
              <div id="product-rating-stars" className="js-product-rating-stars">
                <span
                  className="product-overview__skeleton-circle"
                  aria-hidden="true"
                ></span>
                <span
                  className="product-overview__skeleton-circle"
                  aria-hidden="true"
                ></span>
                <span
                  className="product-overview__skeleton-circle"
                  aria-hidden="true"
                ></span>
                <span
                  className="product-overview__skeleton-circle"
                  aria-hidden="true"
                ></span>
                <span
                  className="product-overview__skeleton-circle"
                  aria-hidden="true"
                ></span>
              </div>
              <p
                id="product-rating-text"
                className="product-overview__rating-text js-product-rating-text"
              >
                <span
                  className="product-overview__skeleton-line product-overview__skeleton-line--rating"
                  aria-hidden="true"
                ></span>
              </p>
            </div>

            <div className="product-overview__price">
              <p
                id="product-price-current"
                className="product-overview__price-current js-product-price-current js-product-price"
              >
                <span
                  className="product-overview__skeleton-pill"
                  aria-hidden="true"
                ></span>
              </p>
              <p
                id="product-price-old"
                className="product-overview__price-old js-product-price-old js-product-original-price"
              >
                <span
                  className="product-overview__skeleton-pill"
                  aria-hidden="true"
                ></span>
              </p>
              <p
                id="product-price-discount"
                className="product-overview__price-discount js-product-price-discount js-product-discount"
              >
                <span
                  className="product-overview__skeleton-pill"
                  aria-hidden="true"
                ></span>
              </p>
            </div>

            <p
              id="product-description"
              className="product-overview__description js-product-description"
            >
              <span
                className="product-overview__skeleton-line product-overview__skeleton-line--text"
                aria-hidden="true"
              ></span>
              <span
                className="product-overview__skeleton-line product-overview__skeleton-line--text"
                aria-hidden="true"
              ></span>
              <span
                className="product-overview__skeleton-line product-overview__skeleton-line--text"
                aria-hidden="true"
              ></span>
              <span
                className="product-overview__skeleton-line product-overview__skeleton-line--text"
                aria-hidden="true"
              ></span>
            </p>

            <div className="product-overview__choose">
              <p>Select Colors</p>
              <div
                id="product-color-options"
                className="product-overview__choose-colors js-product-color-options"
              >
                <span
                  className="product-overview__skeleton-circle"
                  aria-hidden="true"
                ></span>
                <span
                  className="product-overview__skeleton-circle"
                  aria-hidden="true"
                ></span>
                <span
                  className="product-overview__skeleton-circle"
                  aria-hidden="true"
                ></span>
                <span
                  className="product-overview__skeleton-circle"
                  aria-hidden="true"
                ></span>
              </div>
            </div>

            <div className="product-overview__size">
              <p>Choose Size</p>
              <div
                id="product-size-options"
                className="product-overview__size-options js-product-size-options"
              >
                <span
                  className="product-overview__skeleton-size"
                  aria-hidden="true"
                ></span>
                <span
                  className="product-overview__skeleton-size"
                  aria-hidden="true"
                ></span>
                <span
                  className="product-overview__skeleton-size"
                  aria-hidden="true"
                ></span>
                <span
                  className="product-overview__skeleton-size"
                  aria-hidden="true"
                ></span>
              </div>
            </div>

            <div className="product-overview__actions">
              <form action="#">
                <button
                  className="quantity-button-minus js-quantity-button-minus"
                  type="button"
                  aria-label="Decrease quantity"
                ></button>
                <input
                  id="quantity-input"
                  className="quantity-input js-quantity-input"
                  type="number"
                  defaultValue={1}
                  min={1}
                  step={1}
                  aria-label="Quantity"
                />
                <button
                  className="quantity-button-plus js-quantity-button-plus"
                  type="button"
                  aria-label="Increase quantity"
                ></button>
              </form>
              <button className="add-to-cart-button js-add-to-cart" type="button">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="products-tabs js-products-tabs">
        <div className="tabs" aria-label="Product tabs">
          <button className="tabs__tab js-tabs__tab" data-tab="tc-details">
            Product Details
          </button>

          <button
            className="tabs__tab js-tabs__tab tabs__tab--active"
            data-tab="tc-reviews"
          >
            Rating &amp; Reviews
          </button>

          <button className="tabs__tab js-tabs__tab" data-tab="tc-faqs">
            FAQs
          </button>
        </div>

        <section
          id="tc-details"
          data-tab-content="tc-details"
          className="products-tabs__content js-products-tabs__content"
        >
          <div id="product-details-content" className="js-product-details-content">
            Product details are loading...
          </div>
        </section>

        <section
          id="tc-reviews"
          data-tab-content="tc-reviews"
          className="reviews products-tabs__content js-products-tabs__content products-tabs__content--active"
        >
          <div className="reviews__header">
            <h2 className="reviews__title">
              All Reviews
              <span id="reviews-count" className="js-reviews-count">
                (0)
              </span>
            </h2>

            <div className="reviews__actions">
              <div className="reviews__filter">
                <button
                  type="button"
                  id="btn-filter-by-stars"
                  className="reviews__action reviews__action--filter js-btn-filter-by-stars"
                  aria-label="Filter reviews by star rating"
                  aria-haspopup="listbox"
                  aria-expanded="false"
                  aria-controls="dropdown-filter-by-stars"
                ></button>

                <div
                  id="dropdown-filter-by-stars"
                  className="reviews__filter-dropdown js-dropdown-filter-by-stars"
                  role="listbox"
                  aria-labelledby="btn-filter-by-stars"
                  tabIndex={-1}
                >
                  <button
                    type="button"
                    className="reviews__filter-option js-reviews__filter-option reviews__filter-option--active"
                    data-stars="All"
                    role="option"
                    aria-selected="true"
                  >
                    <span className="reviews__filter-stars">All Reviews</span>
                  </button>
                  <button
                    type="button"
                    className="reviews__filter-option js-reviews__filter-option"
                    data-stars="5"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="reviews__filter-stars">5 stars</span>
                  </button>
                  <button
                    type="button"
                    className="reviews__filter-option js-reviews__filter-option"
                    data-stars="4.5"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="reviews__filter-stars">4.5 stars</span>
                  </button>
                  <button
                    type="button"
                    className="reviews__filter-option js-reviews__filter-option"
                    data-stars="4"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="reviews__filter-stars">4 stars</span>
                  </button>
                  <button
                    type="button"
                    className="reviews__filter-option js-reviews__filter-option"
                    data-stars="3.5"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="reviews__filter-stars">3.5 stars</span>
                  </button>
                  <button
                    type="button"
                    className="reviews__filter-option js-reviews__filter-option"
                    data-stars="3"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="reviews__filter-stars">3 stars</span>
                  </button>
                  <button
                    type="button"
                    className="reviews__filter-option js-reviews__filter-option"
                    data-stars="2.5"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="reviews__filter-stars">2.5 stars</span>
                  </button>
                  <button
                    type="button"
                    className="reviews__filter-option js-reviews__filter-option"
                    data-stars="2"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="reviews__filter-stars">2 stars</span>
                  </button>
                  <button
                    type="button"
                    className="reviews__filter-option js-reviews__filter-option"
                    data-stars="1.5"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="reviews__filter-stars">1.5 stars</span>
                  </button>
                  <button
                    type="button"
                    className="reviews__filter-option js-reviews__filter-option"
                    data-stars="1"
                    role="option"
                    aria-selected="false"
                  >
                    <span className="reviews__filter-stars">1 star</span>
                  </button>
                </div>
              </div>
              <div className="reviews__action reviews__action--sort">
                <select
                  id="reviews-sort-select"
                  className="reviews__select js-reviews-sort-select"
                  aria-label="Sort reviews"
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest Rating</option>
                </select>
              </div>
              <button
                type="button"
                className="reviews__action reviews__action--write js-write-review-button"
                aria-label="Write a review"
              >
                Write a Review
              </button>
            </div>
          </div>

          {/* Skeleton review cards */}
          <ul id="reviews-list" className="reviews__list js-reviews-list">
            {[0, 1, 2].map((i) => (
              <li
                key={i}
                className="reviews__item review-card reviews__skeleton"
                aria-hidden="true"
              >
                <div className="review-card__meta">
                  <div className="reviews__skeleton-line reviews__skeleton-line--icon"></div>
                  <div className="reviews__skeleton-line reviews__skeleton-line--title"></div>
                  <div className="reviews__skeleton-line reviews__skeleton-line--stars"></div>
                </div>
                <div className="reviews__skeleton-line reviews__skeleton-line--footer"></div>
                <div className="reviews__skeleton-line reviews__skeleton-line--text"></div>
                <div className="reviews__skeleton-line reviews__skeleton-line--text"></div>
                <div className="reviews__skeleton-line reviews__skeleton-line--text reviews__skeleton-line--text-short"></div>
              </li>
            ))}
          </ul>

          <div className="reviews__load-more-wrapper">
            <button
              id="reviews-load-more"
              className="reviews__load-more js-reviews-load-more"
            >
              Load More Reviews
            </button>
          </div>
        </section>

        <section
          id="tc-faqs"
          data-tab-content="tc-faqs"
          className="products-tabs__content js-products-tabs__content"
        >
          <ul id="product-faqs-list" className="faqs js-product-faqs-list">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="faqs__skeleton" aria-hidden="true">
                <span className="faqs__skeleton-line"></span>
                <span className="faqs__skeleton-icon"></span>
              </li>
            ))}
          </ul>
        </section>
      </section>

      {/* Related Products Section */}
      <section className="other-products js-related-products">
        <h2 className="other-products__title">You Might Also Like</h2>

        <button className="other-products__prev js-other-products__prev"></button>

        <div className="other-products__viewport js-related-viewport">
          <ul
            id="other-products-list"
            className="other-products__list js-other-products__list js-related-track"
          >
            {[0, 1, 2, 3].map((i) => (
              <li
                key={i}
                className="other-products__skeleton-card"
                aria-hidden="true"
              >
                <div className="other-products__skeleton-image"></div>
                <div className="other-products__skeleton-line"></div>
                <div className="other-products__skeleton-rating">
                  <span className="other-products__skeleton-circle"></span>
                  <span className="other-products__skeleton-circle"></span>
                  <span className="other-products__skeleton-circle"></span>
                  <span className="other-products__skeleton-circle"></span>
                  <span className="other-products__skeleton-circle"></span>
                  <span className="other-products__skeleton-line other-products__skeleton-line--short"></span>
                </div>
                <div className="other-products__skeleton-pill"></div>
              </li>
            ))}
          </ul>
        </div>

        <button className="other-products__next js-other-products__next"></button>
      </section>

      {/* Footer Form (newsletter) */}
      <FooterForm />

      {/* Write Review Modal */}
      <div
        id="write-review-modal"
        className="review-modal js-review-modal"
        aria-hidden="true"
        role="dialog"
        aria-modal="true"
        aria-labelledby="write-review-title"
      >
        <div className="review-modal__backdrop js-review-modal-close"></div>
        <div className="review-modal__dialog" role="document">
          <div className="review-modal__header">
            <h3 id="write-review-title" className="review-modal__title">
              Write a Review
            </h3>
            <button
              type="button"
              className="review-modal__close js-review-modal-close"
              aria-label="Close review form"
            ></button>
          </div>

          <form className="review-modal__form js-review-modal-form">
            <label className="review-modal__field">
              <span>Username</span>
              <input
                type="text"
                className="js-review-username"
                name="username"
                autoComplete="name"
                disabled
              />
            </label>

            <label className="review-modal__field">
              <span>Comment</span>
              <textarea
                className="js-review-comment"
                name="comment"
                rows={4}
                placeholder="Share your thoughts about this product"
                required
              ></textarea>
            </label>

            <div className="review-modal__field review-modal__field--rating">
              <span>Star Rating</span>
              <div
                className="review-modal__rating-picker js-review-rating-picker"
                aria-label="Select a rating from 1 to 5 stars"
              >
                <div className="review-modal__rating-stars js-review-rating-stars"></div>
                <div
                  className="review-modal__rating-hitzones js-review-rating-hitzones"
                  aria-hidden="false"
                ></div>
              </div>
              <p className="review-modal__rating-value js-review-rating-value">
                5.0/5
              </p>
            </div>

            <div className="review-modal__actions">
              <button
                type="button"
                className="review-modal__button review-modal__button--cancel js-review-modal-close"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="review-modal__button js-review-modal-submit"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Screen reader announcer */}
      <div aria-live="polite" className="sr-only js-sr-announcer"></div>
    </div>
  );
};

export default ProductDetailPage;
