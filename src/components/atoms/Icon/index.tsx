import { memo, type MouseEventHandler } from "react";
import { ReactSVG } from "react-svg";
import clsx from "clsx";
import { toCssDimension } from "@/utils/css";
import "./index.scss";

export type IconProps = {
  svgName: string;
  color?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  onClick?: MouseEventHandler<HTMLElement | SVGSVGElement>;
  className?: string;
  id?: string;
};

/**
 * Icon atom - Strict implementation for SVG icons.
 * Loads icons dynamically from /public/images/.
 */
const IconComponent = ({
  color,
  size = "1em",
  width,
  height,
  svgName,
  className,
  onClick,
  id,
}: IconProps) => {
  const finalWidth = width ?? size;
  const finalHeight = height ?? size;
  const resolvedWidth = toCssDimension(finalWidth);
  const resolvedHeight = toCssDimension(finalHeight);

  return (
    <ReactSVG
      id={id}
      className={clsx("icon", className)}
      src={`/images/${svgName}.svg`}
      wrapper="span"
      onClick={onClick}
      style={{
        width: `var(--icon-width, ${resolvedWidth})`,
        height: `var(--icon-height, ${resolvedHeight})`,
        color,
      }}
      beforeInjection={(svg) => {
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("focusable", "false");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");

        svg.querySelectorAll("*").forEach((el) => {
          if (el.getAttribute("fill")) {
            el.setAttribute("fill", "currentColor");
          }

          if (el.getAttribute("stroke")) {
            el.setAttribute("stroke", "currentColor");
          }
        });
      }}
    />
  );
};

export const Icon = memo(IconComponent);
