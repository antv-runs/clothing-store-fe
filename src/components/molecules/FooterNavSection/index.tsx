import type { HTMLAttributes } from "react";
import clsx from "clsx";
import "./index.scss";
import { TextLink } from "@/components/atoms/TextLink";

type FooterNavLink = {
  label: string;
  href: string;
};

type FooterNavSectionProps = HTMLAttributes<HTMLElement> & {
  title: string;
  links: FooterNavLink[];
};

function getSectionId(title: string) {
  return `footer-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`;
}

export const FooterNavSection = ({
  title,
  links,
  className,
  ...rest
}: FooterNavSectionProps) => {
  const sectionId = getSectionId(title);

  return (
    <section className={clsx("footer-nav-section", className)} aria-labelledby={sectionId} {...rest}>
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
