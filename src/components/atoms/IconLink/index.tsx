import type { AnchorHTMLAttributes } from "react";
import clsx from "clsx";
import { Icon } from "@/components/atoms/Icon";
import { ICON_DEFAULT_SIZE } from "@/const/ui";
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
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "target" | "rel" | "aria-label">;

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
  ...anchorProps
}: IconLinkProps & { target?: AnchorHTMLAttributes<HTMLAnchorElement>["target"], rel?: AnchorHTMLAttributes<HTMLAnchorElement>["rel"] }) => {
  return (
    <a
      href={href}
      className={clsx("icon-link", className)}
      style={{ width: size, height: size }}
      aria-label={label}
      target={target}
      rel={rel}
      {...anchorProps}
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
