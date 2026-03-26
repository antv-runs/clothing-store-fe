import "./Footer.scss";
import IconLink from "../../atoms/IconLink";
import BrandImage from "../../atoms/BrandImage";

const FooterForm: React.FC = () => {
  return (
    <div className="footer-form">
      <p>STAY UPTO DATE ABOUT OUR LATEST OFFERS</p>
      <form action="#">
        <div className="footer-form__input">
          <figure>
            <img src="/images/icn_mail.svg" alt="Mail" />
          </figure>
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
          />
        </div>
        <button className="footer-form__button" type="button">
          Subscribe to Newsletter
        </button>
      </form>
    </div>
  );
};

const socialLinks = [
  {
    label: "Twitter",
    iconName: "icn_twiter",
    iconWidth: 11.2,
    iconHeight: 9,
    className: "footer-main__social-link",
  },
  {
    label: "Facebook",
    iconName: "icn_fb",
    iconWidth: 6.3,
    iconHeight: 12,
    className: "footer-main__social-link icon-fb",
  },
  {
    label: "Instagram",
    iconName: "icn_instagram",
    iconWidth: 14,
    iconHeight: 14,
    className: "footer-main__social-link",
  },
  {
    label: "Github",
    iconName: "icn_github",
    iconWidth: 13,
    iconHeight: 13,
    className: "footer-main__social-link",
  },
];

const paymentLogos = [
  { src: "/images/icn_visa.svg", alt: "Visa" },
  { src: "/images/icn_mastercard.svg", alt: "Mastercard" },
  { src: "/images/icn_paypal.svg", alt: "PayPal" },
  { src: "/images/icn_apay.svg", alt: "Apple Pay" },
  { src: "/images/icn_gpay.svg", alt: "Google Pay" },
];

const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-main__content">
            <section
              className="footer-main__info"
              aria-label="Brand information"
            >
              <p className="footer-main__logo">SHOP.CO</p>
              <p className="footer-main__description">
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </p>
              <ul className="footer-main__socials" aria-label="Social links">
                {socialLinks.map((link) => (
                  <li className="footer-main__social-item" key={link.label}>
                    <IconLink
                      href="#"
                      label={link.label}
                      iconName={link.iconName}
                      className={link.className}
                      size={28}
                      iconWidth={link.iconWidth}
                      iconHeight={link.iconHeight}
                    />
                  </li>
                ))}
              </ul>
            </section>

            <nav className="footer-main__links" aria-label="Footer navigation">
              <section
                className="footer-main__section"
                aria-labelledby="footer-company-title"
              >
                <h4 id="footer-company-title" className="footer-main__title">
                  Company
                </h4>
                <ul className="footer-main__list">
                  <li>
                    <a href="#" className="footer-main__link">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Works
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Career
                    </a>
                  </li>
                </ul>
              </section>

              <section
                className="footer-main__section"
                aria-labelledby="footer-help-title"
              >
                <h4 id="footer-help-title" className="footer-main__title">
                  Help
                </h4>
                <ul className="footer-main__list">
                  <li>
                    <a href="#" className="footer-main__link">
                      Customer Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Delivery Details
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </section>

              <section
                className="footer-main__section"
                aria-labelledby="footer-faq-title"
              >
                <h4 id="footer-faq-title" className="footer-main__title">
                  FAQ
                </h4>
                <ul className="footer-main__list">
                  <li>
                    <a href="#" className="footer-main__link">
                      Account
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Manage Deliveries
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Orders
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Payments
                    </a>
                  </li>
                </ul>
              </section>

              <section
                className="footer-main__section"
                aria-labelledby="footer-resources-title"
              >
                <h4 id="footer-resources-title" className="footer-main__title">
                  Resources
                </h4>
                <ul className="footer-main__list">
                  <li>
                    <a href="#" className="footer-main__link">
                      Free eBooks
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Development Tutorial
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      How to - Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Youtube Playlist
                    </a>
                  </li>
                </ul>
              </section>
            </nav>
          </div>

          <div className="footer-main__copyright">
            <p>Shop.co © 2000-2023, All Rights Reserved</p>
            <div className="footer-main__copyright-logo">
              {paymentLogos.map((item) => (
                <BrandImage key={item.alt} src={item.src} alt={item.alt} />
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export { FooterForm };
export default Footer;
