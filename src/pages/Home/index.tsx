import { HomeHero } from "@/components/organisms/HomeHero";
import { HomeBrands } from "@/components/organisms/HomeBrands";
import { HomeProductSection } from "@/components/organisms/HomeProductSection";
import { HomeStyleGrid } from "@/components/organisms/HomeStyleGrid";
import { HomeReviews } from "@/components/organisms/HomeReviews";
import { useHomeData } from "@/hooks/useHomeData";
import "./index.scss";

const Home: React.FC = () => {
  const { newArrivals, topSelling, reviews, isLoading } = useHomeData();

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
