import { useEffect, useState } from "react";
import { HomeHero } from "@/components/organisms/HomeHero";
import { HomeBrands } from "@/components/organisms/HomeBrands";
import { HomeProductSection } from "@/components/organisms/HomeProductSection";
import { HomeStyleGrid } from "@/components/organisms/HomeStyleGrid";
import { HomeReviews } from "@/components/organisms/HomeReviews";
import { getProducts } from "@/api/Product";
import { getReviewsByProductId } from "@/api/Review";
import type { Product } from "@/types/product";
import type { Review } from "@/types/review";
import "./index.scss";

const Home: React.FC = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [topSelling, setTopSelling] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        setNewArrivals([]);
        setTopSelling([]);
        setReviews([]);

        const [newArrivalsResult, topSellingResult, reviewsResult] =
          await Promise.all([
            getProducts({
              page: 1,
              per_page: 4,
            }),
            getProducts({
              page: 2,
              per_page: 4,
            }),
            getReviewsByProductId(180, {
              page: 1,
              perPage: 10,
              sort: "latest",
            }),
          ]);

        if (!isActive) {
          return;
        }

        setNewArrivals(newArrivalsResult.data);
        setTopSelling(topSellingResult.data);
        setReviews(reviewsResult.data);
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error("Failed to load home page data.", error);
        setNewArrivals([]);
        setTopSelling([]);
        setReviews([]);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    loadHomeData();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="container">
      <section className="home-page" aria-label="Homepage">
        <HomeHero />
        <HomeBrands />

        <HomeProductSection
          title="NEW ARRIVALS"
          productsList={newArrivals}
          className="home-page__product-section home-page__product-section--new-arrivals"
          isLoading={isLoading}
          skeletonCount={4}
        />
        <HomeProductSection
          title="TOP SELLING"
          productsList={topSelling}
          className="home-page__product-section home-page__product-section--top-selling"
          withTopBorder
          isLoading={isLoading}
          skeletonCount={4}
        />

        <HomeStyleGrid />
        <HomeReviews reviews={reviews} isLoading={isLoading} />
      </section>
    </div>
  );
};

export default Home;
