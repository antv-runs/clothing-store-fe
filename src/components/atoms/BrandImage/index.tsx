import type { ImgHTMLAttributes } from "react";

type BrandImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  width?: number | string;
  height?: number | string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "width" | "height" | "className">;

export const BrandImage = ({
  src,
  alt,
  className,
  imageClassName,
  width,
  height,
  ...imgProps
}: BrandImageProps) => {
  return (
    <figure className={className}>
      <img
        src={src}
        alt={alt}
        className={imageClassName}
        width={width}
        height={height}
        {...imgProps}
      />
    </figure>
  );
};
