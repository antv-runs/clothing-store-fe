import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
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
 * 
 * Strict implementation: only allows essential navigation and styling props.
 */
export const TextLink = ({
  href,
  children,
  className,
  target,
  rel,
}: TextLinkProps) => {
  const internal = isInternal(href);
  const combinedClassName = clsx("text-link", className);

  if (internal) {
    return (
      <Link
        to={href}
        className={combinedClassName}
        target={target}
        rel={rel}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={combinedClassName}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
};
