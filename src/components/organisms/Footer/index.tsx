import "./index.scss";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { InputWithIcon } from "@/components/molecules/InputWithIcon";
import { FooterNavSection } from "@/components/molecules/FooterNavSection";
import { PaymentMethods } from "@/components/molecules/PaymentMethods";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  newsletterSchema,
  type NewsletterFormValues,
} from "@/components/organisms/Footer/index.schema";

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

export const Footer = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    },
  });

  const { ref: emailInputRef, ...emailRegister } = register("email");
  const isEmailInvalid = Boolean(errors.email);

  const handleNewsletterSubmit = () => {
    reset({ email: "" });
  };

  return (
    <>
      {/* Newsletter Section */}
      <section className="footer-form" aria-label="Newsletter signup">
        <Text as="p" className="footer-form__title">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </Text>
        <form className="footer-form__form" onSubmit={handleSubmit(handleNewsletterSubmit)} noValidate>
          <InputWithIcon
            iconName="icn_mail"
            placeholder="Enter your email address"
            type="email"
            ariaLabel="Email address"
            className={
              isEmailInvalid
                ? "footer-form__input input--error"
                : "footer-form__input"
            }
            inputClassName={isEmailInvalid ? "footer-form__input-control--invalid" : undefined}
            ariaInvalid={isEmailInvalid}
            isInvalid={isEmailInvalid}
            inputRef={emailInputRef}
            {...emailRegister}
          />
          <Button className="footer-form__button" type="submit" unstyled>
            Subscribe to Newsletter
          </Button>
        </form>
      </section>

      <footer className="footer">
        {/* Main Footer Content */}
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
