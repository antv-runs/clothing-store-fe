type BrandImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  width?: number | string;
  height?: number | string;
  id?: string;
};

/**
 * BrandImage atom - Strict implementation for brand logos and partner images.
 */
export const BrandImage = ({
  src,
  alt,
  className,
  imageClassName,
  width,
  height,
  id,
}: BrandImageProps) => {
  return (
    <figure id={id} className={className}>
      <img
        src={src}
        alt={alt}
        className={imageClassName}
        width={width}
        height={height}
      />
    </figure>
  );
};
