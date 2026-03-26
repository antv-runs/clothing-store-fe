import { Link } from "react-router-dom";
import { HOME_HERO_STATS } from "~/data/home";
import "./HomeHero.scss";

export const HomeHero: React.FC = () => {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <div className="home-hero__content">
        <h1 id="home-hero-title" className="home-hero__title">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </h1>

        <p className="home-hero__desc">
          Browse through our diverse range of meticulously crafted garments,
          designed to bring out your individuality and cater to your sense of
          style.
        </p>

        <Link to="/" className="home-hero__cta btn btn--primary btn--cta">
          Shop Now
        </Link>

        <div className="home-hero__stats" aria-label="Store achievements">
          {HOME_HERO_STATS.map((item) => (
            <article key={item.label} className="home-hero__stat">
              <h2>{item.value}</h2>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </div>

      <figure className="home-hero__media">
        <img
          src="/images/pic_hero_couple.jpg"
          alt="Fashion models wearing black outfits"
          loading="eager"
          decoding="async"
        />
      </figure>
    </section>
  );
};
