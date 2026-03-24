import React from "react";
import "./ProductTabsSection.scss";
import type { Review } from "../../../types/review";
import type { ProductFaq } from "../../../types/product";
import { ReviewCard } from "../ReviewCard/ReviewCard";

interface ProductTabsSectionProps {
  details: string;
  faqs: ProductFaq[];
  reviews: Review[];
  reviewCount: number;
}

/**
 * ProductTabsSection - Product details/reviews/faqs tabs content.
 * Preserves current tab markup and classes.
 */
export const ProductTabsSection: React.FC<ProductTabsSectionProps> = ({
  details,
  faqs,
  reviews,
  reviewCount,
}) => {
  return (
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
        <div
          id="product-details-content"
          className="js-product-details-content"
        >
          {details}
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
              ({reviewCount})
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

        <ul id="reviews-list" className="reviews__list js-reviews-list">
          {reviews.length === 0 ? (
            <li className="reviews__item review-card">
              <p className="review-card__content">No reviews yet.</p>
            </li>
          ) : (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
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
          {faqs.length ? (
            faqs.map((faq, index) => (
              <li key={`${faq.question}-${index}`}>
                <strong>{faq.question}</strong>
                <p>{faq.answer}</p>
              </li>
            ))
          ) : (
            <li>No FAQs available.</li>
          )}
        </ul>
      </section>
    </section>
  );
};
