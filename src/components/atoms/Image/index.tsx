import type { CSSProperties, ImgHTMLAttributes, ReactEventHandler } from "react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import "./Image.scss";

type BaseImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height" | "src" | "alt" | "onLoad" | "onError" | "onClick">;

type ImageProps = BaseImageProps & {
  src?: string;
  fallbackSrc?: string;
  alt: string;
  id?: string;
  className?: string;
  imgClassName?: string;
  placeholderClassName?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number | string;
  ratio?: number | string;
  fit?: CSSProperties["objectFit"];
  objectPosition?: CSSProperties["objectPosition"];
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  showPlaceholder?: boolean;
  isLoaded?: boolean;
  isError?: boolean;
  loadedClassName?: string;
  errorClassName?: string;
  renderWrapper?: boolean;
  onLoad?: ReactEventHandler<HTMLImageElement>;
  onError?: ReactEventHandler<HTMLImageElement>;
  onClick?: ReactEventHandler<HTMLImageElement>;
};

function toCssDimension(value?: number | string) {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === "number" ? `${value}px` : value;
}

export const Image = ({
  src,
  fallbackSrc,
  alt,
  id,
  className,
  imgClassName,
  placeholderClassName,
  width,
  height,
  aspectRatio,
  ratio,
  fit = "cover",
  objectPosition,
  loading,
  decoding,
  showPlaceholder = false,
  isLoaded: externalIsLoaded,
  isError: externalIsError,
  loadedClassName = "is-loaded",
  errorClassName = "is-error",
  renderWrapper = true,
  onLoad,
  onError,
  onClick,
  ...rest
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [internalIsLoaded, setInternalIsLoaded] = useState(false);
  const [internalIsError, setInternalIsError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setInternalIsLoaded(false);
    setInternalIsError(false);
  }, [src]);

  const handleLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    setInternalIsLoaded(true);
    onLoad?.(e);
  };

  const handleError: ReactEventHandler<HTMLImageElement> = (e) => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setInternalIsError(false);
    } else {
      setInternalIsError(true);
    }
    onError?.(e);
  };

  const finalIsLoaded = externalIsLoaded ?? internalIsLoaded;
  const finalIsError = externalIsError ?? internalIsError;

  const resolvedAspectRatio = aspectRatio ?? ratio;
  const resolvedWidth = toCssDimension(width);
  const resolvedHeight = toCssDimension(height);
  const resolvedAspectRatioValue =
    resolvedAspectRatio !== undefined ? String(resolvedAspectRatio) : undefined;

  const wrapperStyle: CSSProperties = {
    width: resolvedWidth,
    height: resolvedHeight,
    aspectRatio: resolvedAspectRatioValue,
  };

  const wrappedImgStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: fit,
    objectPosition,
  };

  const bareImgStyle: CSSProperties = {
    width: resolvedWidth,
    height: resolvedHeight,
    aspectRatio: resolvedAspectRatioValue,
    objectFit: fit,
    objectPosition,
  };

  const resolvedImgClassName = clsx(
    renderWrapper && "ui-image__img",
    imgClassName,
    finalIsLoaded && loadedClassName,
    finalIsError && errorClassName,
  );

  const resolvedPlaceholderClassName = clsx(
    "ui-image__placeholder",
    placeholderClassName,
  );

  if (!renderWrapper) {
    return (
      <img
        id={id}
        className={resolvedImgClassName}
        src={imgSrc || ""}
        alt={alt}
        loading={loading}
        decoding={decoding}
        style={bareImgStyle}
        onLoad={handleLoad}
        onClick={onClick}
        onError={handleError}
        {...rest}
      />
    );
  }

  const resolvedWrapperClassName = clsx(
    "ui-image",
    className,
    finalIsLoaded && "ui-image--loaded",
    finalIsError && "ui-image--error",
  );

  return (
    <div className={resolvedWrapperClassName} style={wrapperStyle}>
      <img
        id={id}
        className={resolvedImgClassName}
        src={imgSrc || ""}
        alt={alt}
        loading={loading}
        decoding={decoding}
        style={wrappedImgStyle}
        onLoad={handleLoad}
        onClick={onClick}
        onError={handleError}
        {...rest}
      />
      {showPlaceholder ? (
        <span className={resolvedPlaceholderClassName} aria-hidden="true" />
      ) : null}
    </div>
  );
};
