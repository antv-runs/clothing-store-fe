import React from "react";
import clsx from "clsx";
import Icon from "@/components/atoms/Icon/Icon";
import "./IconLink.scss";

type IconLinkProps = {
  size?: number | string;
  iconWidth?: number | string;
  iconHeight?: number | string;
  href: string;
  label: string;
  iconName: string;
  className?: string;
  iconClassName?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
};

const IconLink: React.FC<IconLinkProps> = ({
  size = 36,
  iconWidth = 20,
  iconHeight = 20,
  href,
  label,
  iconName,
  className,
  iconClassName,
  target,
  rel,
}) => {
  return (
    <a
      href={href}
      className={clsx("icon-link", className)}
      style={{ width: size, height: size }}
      aria-label={label}
      target={target}
      rel={rel}
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

export default IconLink;
