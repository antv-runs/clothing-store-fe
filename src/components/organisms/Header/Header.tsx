import IconButton from "../../atoms/IconButton/IconButton";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <>
      <div className="announcement-bar js-announcement-bar">
        <div className="announcement-bar__container">
          <p className="announcement-bar__text">
            Sign up and get 20% off to your first order.{" "}
            <a href="#" className="announcement-bar__link">
              Sign Up Now
            </a>
          </p>

          <IconButton
            svgName="icn_close"
            className="announcement-bar__close js-announcement-bar__close"
            ariaLabel="Close announcement"
            iconWidth={14}
            iconHeight={14}
          />
        </div>
      </div>

      <header className="site-header">
        <button
          className="header-menu-toggle"
          type="button"
          aria-label="Open menu"
        ></button>
        <p className="logo">SHOP.CO</p>

        <nav className="header-links" aria-label="Main navigation">
          <ul id="nav-categories" className="js-nav-categories">
            <li>
              <a href="#">
                Shop <img src="/images/icn_arrow_down.svg" alt="Expand" />
              </a>
            </li>
            <li>
              <a href="#">On Sale</a>
            </li>
            <li>
              <a href="#">New Arrivals</a>
            </li>
            <li>
              <a href="#">Brands</a>
            </li>
          </ul>
        </nav>

        <form action="#" className="header-search js-search-form">
          <input
            type="text"
            className="js-search-input"
            placeholder="Search for products..."
            aria-label="Search for products"
          />
          <button
            className="header-search__button"
            type="button"
            aria-label="Search products"
          ></button>
        </form>

        <div className="header-icon">
          <button
            className="header-icon__cart js-cart-button"
            type="button"
            aria-label="Cart"
          ></button>
          <button
            className="header-icon__profile"
            type="button"
            aria-label="Profile"
          ></button>
        </div>
      </header>
    </>
  );
};

export default Header;
