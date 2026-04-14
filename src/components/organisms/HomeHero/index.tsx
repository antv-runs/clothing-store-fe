import type { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { Image } from "@/components/atoms/Image";
import clsx from "clsx";
import "./index.scss";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";

const HOME_HERO_STATS = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

type HomeHeroProps = HTMLAttributes<HTMLElement>;

export const HomeHero = ({ className, ...rest }: HomeHeroProps) => {
  return (
    <section className={clsx("home-hero", className)} aria-labelledby="home-hero-title" {...rest}>
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
          {HOME_HERO_STATS.map((item, index) => [
            <div
              key={item.label}
              className={`home-hero__stat home-hero__stat--${index + 1}`}
            >
              <strong className="home-hero__stat-value">{item.value}</strong>
              <Text as="p">{item.label}</Text>
            </div>,
            index < HOME_HERO_STATS.length - 1 ? (
              <span
                key={`${item.label}-divider`}
                className={`home-hero__divider ${index === HOME_HERO_STATS.length - 2
                    ? "home-hero__divider--desktop-only"
                    : ""
                  }`}
                aria-hidden="true"
              />
            ) : null,
          ])}
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
