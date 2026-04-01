import "./index.scss";
import { TextLink } from "@/components/atoms/TextLink";

type FooterNavLink = {
  label: string;
  href: string;
};

type FooterNavSectionProps = {
  title: string;
  links: FooterNavLink[];
  className?: string;
};

function getSectionId(title: string) {
  return `footer-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`;
}

export const FooterNavSection = ({
  title,
  links,
  className,
}: FooterNavSectionProps) => {
  const sectionId = getSectionId(title);
  const sectionClassName = className
    ? `footer-nav-section ${className}`
    : "footer-nav-section";

  return (
    <section className={sectionClassName} aria-labelledby={sectionId}>
      <h4 id={sectionId} className="footer-nav-section__title">
        {title}
      </h4>
      <ul className="footer-nav-section__list">
        {links.map((link) => (
          <li
            key={`${title}-${link.label}`}
            className="footer-nav-section__item"
          >
            <TextLink href={link.href} className="footer-nav-section__link">
              {link.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </section>
  );
};
