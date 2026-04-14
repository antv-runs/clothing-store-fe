import { Link, type LinkProps } from "react-router-dom";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  Partial<LinkProps> & {
    href: string;
    children: ReactNode;
  };

/**
 * Check if a URL is internal (client-side route) or external
 */
const isInternal = (href: string) => {
  if (!href) return false;
  return href.startsWith("/") && !href.startsWith("//");
};

/**
 * TextLink component: Smart link that switches between 
 * React Router's <Link> for internal paths and standard <a> for external ones.
 */
export const TextLink = ({
  href,
  children,
  className,
  to: _to, // Omit 'to' from rest to prevent duplication with href
  ...rest
}: TextLinkProps) => {
  const internal = isInternal(href);

  if (internal) {
    // For internal links, use React Router <Link>
    // Note: We map 'href' to 'to' and omit 'href' from rest
    return (
      <Link
        to={href}
        className={clsx("text-link", className)}
        {...(rest as LinkProps)}
      >
        {children}
      </Link>
    );
  }

  // Fallback to standard <a> for external links, mailto, tel, etc.
  return (
    <a
      href={href}
      className={clsx("text-link", className)}
      {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
    >
      {children}
    </a>
  );
};
