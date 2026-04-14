import clsx from "clsx";
import { Icon } from "@/components/atoms/Icon";
import { ICON_DEFAULT_SIZE } from "@/const/config";
import "./index.scss";

type IconLinkProps = {
  size?: number | string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  href: string;
  label: string;
  iconName: string;
  className?: string;
  iconClassName?: string;
  target?: string;
  rel?: string;
  id?: string;
  title?: string;
};

/**
 * IconLink atom - Strict implementation for icon-only navigation.
 */
export const IconLink = ({
  size = 36,
  iconWidth = ICON_DEFAULT_SIZE,
  iconHeight = ICON_DEFAULT_SIZE,
  href,
  label,
  iconName,
  className,
  iconClassName,
  target,
  rel,
  id,
  title,
}: IconLinkProps) => {
  return (
    <a
      id={id}
      href={href}
      className={clsx("icon-link", className)}
      style={{ width: size, height: size }}
      aria-label={label}
      target={target}
      rel={rel}
      title={title}
    >
      <Icon
        svgName={iconName}
        width={iconWidth}
        height={iconHeight}
        className={iconClassName}
      />
    </a>
  );
};

