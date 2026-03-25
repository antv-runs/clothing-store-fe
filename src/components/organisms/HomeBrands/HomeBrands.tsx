import { HOME_BRANDS } from "~/data/home";
import "./HomeBrands.scss";

export const HomeBrands: React.FC = () => {
  return (
    <section className="home-brands" aria-label="Partner brands">
      <ul className="home-brands__list">
        {HOME_BRANDS.map((brand) => (
          <li key={brand.name}>
            <img
              src={brand.imagePath}
              alt={`${brand.name} logo`}
              loading="lazy"
              decoding="async"
            />
          </li>
        ))}
      </ul>
    </section>
  );
};