import type { AnchorHTMLAttributes, ReactNode } from "react";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "className" | "children"
>;

export const TextLink = ({
  href,
  children,
  className,
  ...anchorProps
}: TextLinkProps) => {
  return (
    <a href={href} className={className} {...anchorProps}>
      {children}
    </a>
  );
};
