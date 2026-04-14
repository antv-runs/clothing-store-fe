import type { CSSProperties } from "react";
import clsx from "clsx";
import "./index.scss";

export type SkeletonVariant = "rect" | "circle" | "line";

type SkeletonProps = {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  radius?: string | number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

/**
 * Skeleton atom - Strict implementation for loading placeholders.
 */
export const Skeleton = ({
  variant = "rect",
  width,
  height,
  radius,
  className,
  style,
  id,
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
      id={id}
      className={clsx("skeleton", `skeleton--${variant}`, className)}
      style={skeletonStyle}
      role="presentation"
      aria-hidden="true"
    />
  );
};
