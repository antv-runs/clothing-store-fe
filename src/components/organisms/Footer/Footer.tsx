import "./Footer.scss";
import { Text } from "@/components/atoms";
import {
  FooterNavSection,
  PaymentMethods,
  SocialLinks,
} from "@/components/molecules";

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

const footerSections = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Features", href: "#" },
      { label: "Works", href: "#" },
      { label: "Career", href: "#" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Customer Support", href: "#" },
      { label: "Delivery Details", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "FAQ",
    links: [
      { label: "Account", href: "#" },
      { label: "Manage Deliveries", href: "#" },
      { label: "Orders", href: "#" },
      { label: "Payments", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Free eBooks", href: "#" },
      { label: "Development Tutorial", href: "#" },
      { label: "How to - Blog", href: "#" },
      { label: "Youtube Playlist", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-main">
          <div className="footer-main__content">
            <section
              className="footer-main__info"
              aria-label="Brand information"
            >
              <Text as="p" className="footer-main__logo">
                Shop.co
              </Text>
              <Text as="p" lineClamp={3} className="footer-main__description">
                We have clothes that suits your style and which you're proud to
                wear. From women to men.
              </Text>
              <SocialLinks
                items={socialLinks}
                className="footer-main__socials"
                itemClassName="footer-main__social-item"
              />
            </section>

            <nav className="footer-main__links" aria-label="Footer navigation">
              {footerSections.map((section) => (
                <FooterNavSection
                  key={section.title}
                  title={section.title}
                  links={section.links}
                  sectionClassName="footer-main__section"
                  titleClassName="footer-main__title"
                  listClassName="footer-main__list"
                  linkClassName="footer-main__link"
                />
              ))}
            </nav>
          </div>

          <div className="footer-main__copyright">
            <Text as="p">Shop.co © 2000-2023, All Rights Reserved</Text>
            <PaymentMethods
              items={paymentLogos}
              className="footer-main__copyright-logo"
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
