import { useMemo } from "react";
import { HomeHero } from "@/components/organisms/HomeHero";
import { HomeBrands } from "@/components/organisms/HomeBrands";
import { HomeProductSection } from "@/components/organisms/HomeProductSection";
import { HomeStyleGrid } from "@/components/organisms/HomeStyleGrid";
import { HomeReviews } from "@/components/organisms/HomeReviews";
import { products } from "@/data/products";
import "./HomePage.scss";

const HomePage: React.FC = () => {
  const newArrivals = useMemo(() => products.slice(0, 4), []);

  const topSelling = useMemo(() => {
    return [...products]
      .sort((firstItem, secondItem) => secondItem.rating - firstItem.rating)
      .slice(0, 4);
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
        <HomeReviews />
      </section>
    </div>
  );
};

export default HomePage;
