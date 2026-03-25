import { Link } from "react-router-dom";
import { HOME_STYLE_CARDS } from "~/data/home";
import "./HomeStyleGrid.scss";

export const HomeStyleGrid: React.FC = () => {
  return (
    <section className="home-styles" aria-labelledby="home-styles-title">
      <div className="home-styles__box">
        <h2 id="home-styles-title">BROWSE BY DRESS STYLE</h2>

        <div className="home-styles__grid">
          {HOME_STYLE_CARDS.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className={`home-style-card home-style-card--${item.cardSize}`}
            >
              <span>{item.title}</span>
              <img
                src={item.imagePath}
                alt={`${item.title} style`}
                loading="lazy"
                decoding="async"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};