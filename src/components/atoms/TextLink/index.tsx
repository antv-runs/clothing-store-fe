import type { AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export const TextLink = ({
  href,
  children,
  className,
  ...anchorProps
}: TextLinkProps) => {
  return (
    <a href={href} className={clsx("text-link", className)} {...anchorProps}>
      {children}
    </a>
  );
};
