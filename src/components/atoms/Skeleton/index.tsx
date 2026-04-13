import type { CSSProperties, HTMLAttributes } from "react";
import clsx from "clsx";
import "./index.scss";

export type SkeletonVariant = "rect" | "circle" | "line";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
}

export const Skeleton = ({
  variant = "rect",
  width,
  height,
  radius,
  className,
  style,
  ...rest
}: SkeletonProps) => {
  const skeletonStyle: CSSProperties = { ...style };

  if (width !== undefined) {
    skeletonStyle.width = width;
  }

  if (height !== undefined) {
    skeletonStyle.height = height;
  }

  if (radius !== undefined) {
    skeletonStyle.borderRadius = radius;
  }

  return (
    <div
      className={clsx("skeleton", `skeleton--${variant}`, className)}
      style={skeletonStyle}
      role="presentation"
      aria-hidden="true"
      {...rest}
    />
  );
};
