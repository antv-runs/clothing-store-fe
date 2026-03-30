import { Link } from "react-router-dom";
import { Image } from "@/components/atoms/Image/Image";
import "./HomeHero.scss";
import { Heading, Icon, Text } from "@/components/atoms";

const HOME_HERO_STATS = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

export const HomeHero: React.FC = () => {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__content">
        <Heading as="h1" className="home-hero__title">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </Heading>

        <Text as="p" className="home-hero__desc">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </Text>

        <Link to="/" className="home-hero__cta btn btn--primary btn--cta">
          Shop Now
        </Link>

        <div className="home-hero__stats" aria-label="Store achievements">
          {HOME_HERO_STATS.map((item) => (
            <article key={item.label} className="home-hero__stat">
              <Heading as="h2">{item.value}</Heading>
              <Text as="p">{item.label}</Text>
            </article>
          ))}
        </div>
      </div>

      <div className="home-hero__media">
        <span
          className="home-hero__sparkle home-hero__sparkle--left"
          aria-hidden="true"
        >
          <Icon svgName="icn_glitter" height="100%" width="100%" color="#000" />
        </span>

        <span
          className="home-hero__sparkle home-hero__sparkle--right"
          aria-hidden="true"
        >
          <Icon svgName="icn_glitter" height="100%" width="100%" color="#000" />
        </span>

        <div className="home-hero__image-crop">
          <Image
            src="/images/pic_hero_couple.jpg"
            alt="Fashion models wearing black outfits"
            loading="eager"
            decoding="async"
            renderWrapper={false}
            imgClassName="home-hero__image"
          />
        </div>
      </div>
    </section>
  );
};
