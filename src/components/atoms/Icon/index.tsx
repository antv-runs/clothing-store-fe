import React from "react";
import { ReactSVG } from "react-svg";
import clsx from "clsx";

export type IconProps = {
  svgName: string;
  color?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
  onClick?: React.MouseEventHandler<HTMLElement | SVGSVGElement>;
  className?: string;
};

const IconComponent = ({
  color,
  size = "1em",
  width,
  height,
  svgName,
  className,
  onClick,
}: IconProps) => {
  const finalWidth = width ?? size;
  const finalHeight = height ?? size;

  return (
    <ReactSVG
      className={clsx("icon", className)}
      src={`/images/${svgName}.svg`}
      wrapper="span"
      onClick={onClick}
      style={{
        width: finalWidth,
        height: finalHeight,
        color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
        verticalAlign: "middle",
        position: "relative",
        flexShrink: 0,
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

export const Icon = React.memo(IconComponent);
