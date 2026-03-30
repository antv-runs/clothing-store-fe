import { useMemo } from "react";
import { FooterForm } from "@/components/organisms/Footer/Footer";
import { HomeHero } from "@/components/organisms/HomeHero/HomeHero";
import { HomeBrands } from "@/components/organisms/HomeBrands/HomeBrands";
import { HomeProductSection } from "@/components/organisms/HomeProductSection/HomeProductSection";
import { HomeStyleGrid } from "@/components/organisms/HomeStyleGrid/HomeStyleGrid";
import { HomeReviews } from "@/components/organisms/HomeReviews/HomeReviews";
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
      <main className="home-page" aria-label="Homepage">
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
      </main>

      <FooterForm />
    </div>
  );
};

export default HomePage;
