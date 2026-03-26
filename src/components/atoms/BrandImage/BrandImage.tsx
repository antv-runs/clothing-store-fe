import React from 'react';

type BrandImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  width?: number | string;
  height?: number | string;
};

const BrandImage: React.FC<BrandImageProps> = ({
  src,
  alt,
  className,
  imageClassName,
  width,
  height,
}) => {
  return (
    <figure className={className}>
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

export default BrandImage;