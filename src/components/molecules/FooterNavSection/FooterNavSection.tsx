import { TextLink } from "@/components/atoms";

type FooterNavLink = {
  label: string;
  href: string;
};

type FooterNavSectionProps = {
  title: string;
  links: FooterNavLink[];
  sectionClassName?: string;
  titleClassName?: string;
  listClassName?: string;
  linkClassName?: string;
};

function getSectionId(title: string) {
  return `footer-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`;
}

export const FooterNavSection = ({
  title,
  links,
  sectionClassName,
  titleClassName,
  listClassName,
  linkClassName,
}: FooterNavSectionProps) => {
  const sectionId = getSectionId(title);

  return (
    <section className={sectionClassName} aria-labelledby={sectionId}>
      <h4 id={sectionId} className={titleClassName}>
        {title}
      </h4>
      <ul className={listClassName}>
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <TextLink href={link.href} className={linkClassName}>
              {link.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </section>
  );
};
