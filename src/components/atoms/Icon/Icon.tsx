import React from "react";
import { ReactSVG } from "react-svg";
import clsx from "clsx";

export type IconProps = {
  svgName: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  onClick?: React.MouseEventHandler<HTMLElement | SVGSVGElement>;
  className?: string;
};

function Icon({
  color,
  width = 20,
  height = 20,
  svgName,
  className,
  onClick,
}: IconProps) {
  return (
    <ReactSVG
      className={clsx("iconContainer", className)}
      src={`/icons/${svgName}.svg`}
      wrapper="span"
      onClick={onClick}
      style={{
        width,
        height,
        color,
        display: "inline-block",
      }}
      beforeInjection={(svg) => {
        svg.setAttribute("width", String(width));
        svg.setAttribute("height", String(height));

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
}

export default React.memo(Icon);
