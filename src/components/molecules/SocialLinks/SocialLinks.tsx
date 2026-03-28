import { IconLink } from "../../atoms";

type SocialLinkItem = {
  label: string;
  iconName: string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  className?: string;
  href?: string;
};

type SocialLinksProps = {
  items: SocialLinkItem[];
  className?: string;
  itemClassName?: string;
};

export const SocialLinks = ({
  items,
  className,
  itemClassName,
}: SocialLinksProps) => {
  return (
    <ul className={className} aria-label="Social links">
      {items.map((item) => (
        <li className={itemClassName} key={item.label}>
          <IconLink
            href={item.href ?? "#"}
            label={item.label}
            iconName={item.iconName}
            className={item.className}
            size={28}
            iconWidth={item.iconWidth}
            iconHeight={item.iconHeight}
          />
        </li>
      ))}
    </ul>
  );
};
