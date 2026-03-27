import type { CSSProperties, ReactEventHandler } from "react";
import clsx from "clsx";
import "./Image.scss";

type ImageProps = {
  src?: string;
  alt: string;
  id?: string;
  className?: string;
  imgClassName?: string;
  placeholderClassName?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number | string;
  ratio?: number | string;
  fit?: "cover" | "contain";
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
};

function toCssDimension(value?: number | string) {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === "number" ? `${value}px` : value;
}

export function Image({
  src,
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
  loading,
  decoding,
  showPlaceholder = false,
  isLoaded = false,
  isError = false,
  loadedClassName = "is-loaded",
  errorClassName = "is-error",
  renderWrapper = true,
  onLoad,
  onError,
}: ImageProps) {
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
  };

  const bareImgStyle: CSSProperties = {
    width: resolvedWidth,
    height: resolvedHeight,
    aspectRatio: resolvedAspectRatioValue,
    objectFit: fit,
  };

  const resolvedImgClassName = clsx(
    renderWrapper && "ui-image__img",
    imgClassName,
    isLoaded && loadedClassName,
    isError && errorClassName,
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
        src={src || ""}
        alt={alt}
        loading={loading}
        decoding={decoding}
        style={bareImgStyle}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }

  const resolvedWrapperClassName = clsx(
    "ui-image",
    className,
    isLoaded && "ui-image--loaded",
    isError && "ui-image--error",
  );

  return (
    <div className={resolvedWrapperClassName} style={wrapperStyle}>
      <img
        id={id}
        className={resolvedImgClassName}
        src={src || ""}
        alt={alt}
        loading={loading}
        decoding={decoding}
        style={wrappedImgStyle}
        onLoad={onLoad}
        onError={onError}
      />
      {showPlaceholder ? (
        <span className={resolvedPlaceholderClassName} aria-hidden="true" />
      ) : null}
    </div>
  );
}
