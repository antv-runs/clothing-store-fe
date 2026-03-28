import { HOME_BRANDS } from "~/data/home";
import { Image } from "../../atoms";
import "./HomeBrands.scss";

export const HomeBrands: React.FC = () => {
  return (
    <section className="home-brands" aria-label="Partner brands">
      <ul className="home-brands__list">
        {HOME_BRANDS.map((brand) => (
          <li key={brand.name}>
            <Image
              src={brand.imagePath}
              alt={`${brand.name} logo`}
              loading="lazy"
              decoding="async"
              renderWrapper={false}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};