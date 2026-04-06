import { HomeHero } from "@/components/organisms/HomeHero";
import { HomeBrands } from "@/components/organisms/HomeBrands";
import { HomeProductSection } from "@/components/organisms/HomeProductSection";
import { HomeStyleGrid } from "@/components/organisms/HomeStyleGrid";
import { HomeReviews } from "@/components/organisms/HomeReviews";
import { RetryState } from "@/components/molecules/RetryState";
import { useHomeData } from "@/hooks/useHomeData";
import "./index.scss";

const Home: React.FC = () => {
  const {
    newArrivals,
    topSelling,
    reviews,
    isNewArrivalsLoading,
    isTopSellingLoading,
    isReviewsLoading,
    isRetryingNewArrivals,
    isRetryingTopSelling,
    isRetryingReviews,
    newArrivalsError,
    topSellingError,
    reviewsError,
    retryNewArrivals,
    retryTopSelling,
    retryReviews,
  } = useHomeData();

  return (
    <div className="container">
      <section className="home-page" aria-label="Homepage">
        <HomeHero />
        <HomeBrands />

        {newArrivalsError ? (
          <section
            className="home-products home-page__product-section home-page__product-section--new-arrivals"
            aria-labelledby="home-new-arrivals-title"
          >
            <h2 id="home-new-arrivals-title" className="home-products__title">
              NEW ARRIVALS
            </h2>
            <RetryState
              message={newArrivalsError}
              onRetry={retryNewArrivals}
              isRetrying={isRetryingNewArrivals}
            />
          </section>
        ) : (
          <HomeProductSection
            title="NEW ARRIVALS"
            productsList={newArrivals}
            className="home-page__product-section home-page__product-section--new-arrivals"
            isLoading={isNewArrivalsLoading}
            skeletonCount={4}
          />
        )}

        {topSellingError ? (
          <section
            className="home-products home-products--bordered home-page__product-section home-page__product-section--top-selling"
            aria-labelledby="home-top-selling-title"
          >
            <h2 id="home-top-selling-title" className="home-products__title">
              TOP SELLING
            </h2>
            <RetryState
              message={topSellingError}
              onRetry={retryTopSelling}
              isRetrying={isRetryingTopSelling}
            />
          </section>
        ) : (
          <HomeProductSection
            title="TOP SELLING"
            productsList={topSelling}
            className="home-page__product-section home-page__product-section--top-selling"
            withTopBorder
            isLoading={isTopSellingLoading}
            skeletonCount={4}
          />
        )}

        <HomeStyleGrid />
        {reviewsError ? (
          <section
            className="home-reviews"
            aria-labelledby="home-reviews-title"
          >
            <div className="home-reviews__head">
              <h2 id="home-reviews-title">OUR HAPPY CUSTOMERS</h2>
            </div>
            <RetryState
              message={reviewsError}
              onRetry={retryReviews}
              isRetrying={isRetryingReviews}
            />
          </section>
        ) : (
          <HomeReviews reviews={reviews} isLoading={isReviewsLoading} />
        )}
      </section>
    </div>
  );
};

export default Home;
