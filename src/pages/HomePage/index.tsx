import { useEffect, useMemo, useState } from "react";
import { HomeHero } from "@/components/organisms/HomeHero";
import { HomeBrands } from "@/components/organisms/HomeBrands";
import { HomeProductSection } from "@/components/organisms/HomeProductSection";
import { HomeStyleGrid } from "@/components/organisms/HomeStyleGrid";
import { HomeReviews } from "@/components/organisms/HomeReviews";
import { getReviewsByProductId } from "@/api/Review";
import type { Review } from "@/types/review";
import { products } from "@/data/products";
import "./index.scss";

const HomePage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const newArrivals = useMemo(() => products.slice(0, 4), []);

  const topSelling = useMemo(() => {
    return [...products]
      .sort((firstItem, secondItem) => secondItem.rating - firstItem.rating)
      .slice(0, 4);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const result = await getReviewsByProductId(180, {
          perPage: 10,
          sort: "latest",
        });
        if (isMounted) {
          setReviews(result.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch reviews:", err);
          setReviews([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container">
      <section className="home-page" aria-label="Homepage">
        <HomeHero />
        <HomeBrands />

        <HomeProductSection title="NEW ARRIVALS" productsList={newArrivals} />
        <HomeProductSection
          title="TOP SELLING"
          productsList={topSelling}
          withTopBorder
        />

        <HomeStyleGrid />
        <HomeReviews reviews={reviews} isLoading={isLoading} />
      </section>
    </div>
  );
};

export default HomePage;
