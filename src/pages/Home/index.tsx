import { HomeHero } from "@/components/organisms/HomeHero";
import { HomeBrands } from "@/components/organisms/HomeBrands";
import { HomeProductSection } from "@/components/organisms/HomeProductSection";
import { HomeStyleGrid } from "@/components/organisms/HomeStyleGrid";
import { HomeReviews } from "@/components/organisms/HomeReviews";
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
    newArrivalsErrorKind,
    topSellingErrorKind,
    reviewsErrorKind,
    isNewArrivalsEmpty,
    isTopSellingEmpty,
    retryNewArrivals,
    retryTopSelling,
    retryReviews,
  } = useHomeData();

  return (
    <div className="container">
      <section className="home-page" aria-label="Homepage">
        <HomeHero />
        <HomeBrands />

        <HomeProductSection
          title="NEW ARRIVALS"
          productsList={newArrivals}
          className="home-page__product-section home-page__product-section--new-arrivals"
          isLoading={isNewArrivalsLoading}
          isRetrying={isRetryingNewArrivals}
          isEmpty={isNewArrivalsEmpty}
          error={newArrivalsError}
          errorKind={newArrivalsErrorKind}
          onRetry={retryNewArrivals}
          emptyMessage="No new arrivals available right now."
          skeletonCount={4}
        />

        <HomeProductSection
          title="TOP SELLING"
          productsList={topSelling}
          className="home-page__product-section home-page__product-section--top-selling"
          withTopBorder
          isLoading={isTopSellingLoading}
          isRetrying={isRetryingTopSelling}
          isEmpty={isTopSellingEmpty}
          error={topSellingError}
          errorKind={topSellingErrorKind}
          onRetry={retryTopSelling}
          emptyMessage="No top selling products available right now."
          skeletonCount={4}
        />

        <HomeStyleGrid />
        <HomeReviews
          reviews={reviews}
          isLoading={isReviewsLoading}
          isRetrying={isRetryingReviews}
          error={reviewsError}
          errorKind={reviewsErrorKind}
          onRetry={retryReviews}
        />
      </section>
    </div>
  );
};

export default Home;
