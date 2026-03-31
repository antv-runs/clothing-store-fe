import { Image } from "@/components/atoms/Image";
import "./index.scss";

const HOME_BRANDS_TOP = [
  {
    name: "Versace",
    imagePath: "/images/logo_versace.svg",
    modifier: "versace",
  },
  {
    name: "Zara",
    imagePath: "/images/logo_zara.svg",
    modifier: "zara",
  },
  {
    name: "Gucci",
    imagePath: "/images/logo_gucci.svg",
    modifier: "gucci",
  },
];

const HOME_BRANDS_BOTTOM = [
  {
    name: "Prada",
    imagePath: "/images/logo_prada.svg",
    modifier: "prada",
  },
  {
    name: "Calvin Klein",
    imagePath: "/images/logo_calvin_klein.svg",
    modifier: "calvin-klein",
  },
];

const HOME_BRANDS = [...HOME_BRANDS_TOP, ...HOME_BRANDS_BOTTOM];

export const HomeBrands: React.FC = () => {
  return (
    <section className="home-brands" aria-label="Partner brands">
      <ul className="home-brands__list">
        {HOME_BRANDS.map((brand) => (
          <li
            key={brand.name}
            className={`home-brands__item home-brands__item--${brand.modifier}`}
          >
            <Image
              src={brand.imagePath}
              alt={`${brand.name} logo`}
              loading="lazy"
              decoding="async"
              renderWrapper={false}
              imgClassName="home-brands__logo"
            />
          </li>
        ))}
      </ul>

      <div className="home-brands__mobile" aria-hidden="true">
        <ul className="home-brands__row home-brands__row--top">
          {HOME_BRANDS_TOP.map((brand) => (
            <li
              key={brand.name}
              className={`home-brands__item home-brands__item--${brand.modifier}`}
            >
              <Image
                src={brand.imagePath}
                alt=""
                loading="lazy"
                decoding="async"
                renderWrapper={false}
                imgClassName="home-brands__logo"
              />
            </li>
          ))}
        </ul>

        <ul className="home-brands__row home-brands__row--bottom">
          {HOME_BRANDS_BOTTOM.map((brand) => (
            <li
              key={brand.name}
              className={`home-brands__item home-brands__item--${brand.modifier}`}
            >
              <Image
                src={brand.imagePath}
                alt=""
                loading="lazy"
                decoding="async"
                renderWrapper={false}
                imgClassName="home-brands__logo"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
