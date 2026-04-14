import type { HTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { Heading } from "@/components/atoms/Heading";
import { Image } from "@/components/atoms/Image";
import { Text } from "@/components/atoms/Text";
import clsx from "clsx";
import "./index.scss";

const HOME_STYLE_CARDS = [
  {
    title: "Casual",
    imagePath: "/images/pic_style_casual.png",
    cardSize: "small" as const,
    to: "/",
  },
  {
    title: "Formal",
    imagePath: "/images/pic_style_formal.png",
    cardSize: "large" as const,
    to: "/",
  },
  {
    title: "Party",
    imagePath: "/images/pic_style_party.png",
    cardSize: "large" as const,
    to: "/",
  },
  {
    title: "Gym",
    imagePath: "/images/pic_style_gym.png",
    cardSize: "small" as const,
    to: "/",
  },
];

type HomeStyleGridProps = HTMLAttributes<HTMLElement>;

export const HomeStyleGrid = ({ className, ...rest }: HomeStyleGridProps) => {
  return (
    <section className={clsx("home-styles", className)} aria-labelledby="home-styles-title" {...rest}>
      <div className="home-styles__box">
        <Heading as="h2" id="home-styles-title">
          BROWSE BY DRESS STYLE
        </Heading>

        <div className="home-styles__grid">
          {HOME_STYLE_CARDS.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className={`home-style-card home-style-card--${item.cardSize}`}
            >
              <Text as="span">{item.title}</Text>
              <Image
                src={item.imagePath}
                alt={`${item.title} style`}
                loading="lazy"
                decoding="async"
                renderWrapper={false}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
