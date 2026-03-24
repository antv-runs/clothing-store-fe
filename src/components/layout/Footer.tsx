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

const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-main__content">
            <section className="footer-main__info" aria-label="Brand information">
              <p className="footer-main__logo">SHOP.CO</p>
              <p className="footer-main__description">
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </p>
              <ul className="footer-main__socials" aria-label="Social links">
                <li className="footer-main__social-item">
                  <a
                    href="#"
                    className="footer-main__social-link"
                    aria-label="Twitter"
                  >
                    <img
                      src="/images/icn_twiter.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li className="footer-main__social-item">
                  <a
                    href="#"
                    className="footer-main__social-link icon-fb"
                    aria-label="Facebook"
                  >
                    <img
                      src="/images/icn_fb.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li className="footer-main__social-item">
                  <a
                    href="#"
                    className="footer-main__social-link"
                    aria-label="Instagram"
                  >
                    <img
                      src="/images/icn_instagram.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li className="footer-main__social-item">
                  <a
                    href="#"
                    className="footer-main__social-link"
                    aria-label="Github"
                  >
                    <img
                      src="/images/icn_github.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </a>
                </li>
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
                    <a href="#" className="footer-main__link">About</a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">Features</a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">Works</a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">Career</a>
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
                    <a href="#" className="footer-main__link">Customer Support</a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">Delivery Details</a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">Privacy Policy</a>
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
                    <a href="#" className="footer-main__link">Account</a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Manage Deliveries
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">Orders</a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">Payments</a>
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
                    <a href="#" className="footer-main__link">Free eBooks</a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">
                      Development Tutorial
                    </a>
                  </li>
                  <li>
                    <a href="#" className="footer-main__link">How to - Blog</a>
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
              <figure>
                <img src="/images/icn_visa.svg" alt="Visa" />
              </figure>
              <figure>
                <img src="/images/icn_mastercard.svg" alt="Mastercard" />
              </figure>
              <figure>
                <img src="/images/icn_paypal.svg" alt="PayPal" />
              </figure>
              <figure>
                <img src="/images/icn_apay.svg" alt="Apple Pay" />
              </figure>
              <figure>
                <img src="/images/icn_gpay.svg" alt="Google Pay" />
              </figure>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export { FooterForm };
export default Footer;
