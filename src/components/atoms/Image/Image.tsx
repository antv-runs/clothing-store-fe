import type { CSSProperties, ReactEventHandler } from "react";
import "./Image.scss";

type ImageProps = {
  src?: string;
  alt: string;
  id?: string;
  className?: string;
  wrapperClassName?: string;
  imgClassName?: string;
  imageClassName?: string;
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
  wrapperClassName,
  imgClassName,
  imageClassName,
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

  const wrapperStyle: CSSProperties = {
    width: toCssDimension(width),
    height: toCssDimension(height),
    aspectRatio:
      resolvedAspectRatio !== undefined
        ? String(resolvedAspectRatio)
        : undefined,
  };

  const imgStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: fit,
  };

  const resolvedImgClassName = [
    renderWrapper ? "ui-image__img" : "",
    imgClassName || imageClassName,
    isLoaded ? loadedClassName : "",
    isError ? errorClassName : "",
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedPlaceholderClassName = [
    renderWrapper ? "ui-image__placeholder" : "",
    placeholderClassName,
  ]
    .filter(Boolean)
    .join(" ");

  if (!renderWrapper) {
    return (
      <>
        <img
          id={id}
          className={resolvedImgClassName}
          src={src || ""}
          alt={alt}
          loading={loading}
          decoding={decoding}
          style={imgStyle}
          onLoad={onLoad}
          onError={onError}
        />
        {showPlaceholder ? (
          <span className={resolvedPlaceholderClassName} aria-hidden="true" />
        ) : null}
      </>
    );
  }

  const resolvedWrapperClassName = [
    "ui-image",
    className,
    wrapperClassName,
    isLoaded ? "ui-image--loaded" : "",
    isError ? "ui-image--error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={resolvedWrapperClassName} style={wrapperStyle}>
      <img
        id={id}
        className={resolvedImgClassName}
        src={src || ""}
        alt={alt}
        loading={loading}
        decoding={decoding}
        style={imgStyle}
        onLoad={onLoad}
        onError={onError}
      />
      {showPlaceholder ? (
        <span className={resolvedPlaceholderClassName} aria-hidden="true" />
      ) : null}
    </div>
  );
}
