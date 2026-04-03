import React from "react";
import { Heading } from "@/components/atoms/Heading";
import { Skeleton } from "@/components/atoms/Skeleton";
import "./index.scss";

const BreadcrumbSkeleton: React.FC = () => {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol
        className="breadcrumb__list u-mb-40 breadcrumb__list--truncate"
        aria-hidden="true"
      >
        <li className="breadcrumb__item">
          <Skeleton className="product-detail-skeleton__crumb" variant="line" />
        </li>
        <li className="breadcrumb__item">
          <Skeleton className="product-detail-skeleton__crumb" variant="line" />
        </li>
        <li className="breadcrumb__item breadcrumb__item--active">
          <Skeleton
            className="product-detail-skeleton__crumb product-detail-skeleton__crumb--active"
            variant="line"
          />
        </li>
      </ol>
    </nav>
  );
};

const GallerySkeleton: React.FC = () => {
  return (
    <div className="product-gallery" aria-hidden="true">
      <div className="product-gallery__thumbnails">
        <Skeleton
          className="product-gallery__thumb product-detail-skeleton__thumb"
          variant="rect"
        />
        <Skeleton
          className="product-gallery__thumb product-detail-skeleton__thumb"
          variant="rect"
        />
        <Skeleton
          className="product-gallery__thumb product-detail-skeleton__thumb"
          variant="rect"
        />
      </div>

      <div className="product-gallery__main">
        <div className="product-gallery__main-wrapper">
          <Skeleton className="product-gallery__main-skeleton" variant="rect" />
        </div>
      </div>
    </div>
  );
};

const ProductInfoSkeleton: React.FC = () => {
  return (
    <div className="product-detail-skeleton__info" aria-hidden="true">
      <div className="product-detail-skeleton__title-group">
        <Skeleton
          className="product-info__skeleton-line product-info__skeleton-line--title"
          variant="line"
        />
        <Skeleton
          className="product-info__skeleton-line product-info__skeleton-line--title"
          variant="line"
        />
      </div>

      <div className="product-info__rating">
        <div className="rating-display__stars">
          <Skeleton
            className="product-info__skeleton-circle"
            variant="circle"
          />
          <Skeleton
            className="product-info__skeleton-circle"
            variant="circle"
          />
          <Skeleton
            className="product-info__skeleton-circle"
            variant="circle"
          />
          <Skeleton
            className="product-info__skeleton-circle"
            variant="circle"
          />
          <Skeleton
            className="product-info__skeleton-circle"
            variant="circle"
          />
        </div>
        <Skeleton
          className="product-info__skeleton-line product-info__skeleton-line--rating"
          variant="line"
        />
      </div>

      <div className="product-info__price">
        <Skeleton
          className="product-detail-skeleton__price-current"
          variant="line"
        />
        <Skeleton
          className="product-detail-skeleton__price-old"
          variant="line"
        />
        <Skeleton
          className="product-detail-skeleton__price-discount"
          variant="rect"
        />
      </div>

      <div className="product-info__description">
        <Skeleton
          className="product-info__skeleton-line product-info__skeleton-line--text skeleton-line--text"
          variant="line"
        />
        <Skeleton
          className="product-info__skeleton-line product-info__skeleton-line--text skeleton-line--text"
          variant="line"
        />
        <Skeleton
          className="product-info__skeleton-line product-info__skeleton-line--text skeleton-line--text"
          variant="line"
        />
      </div>
    </div>
  );
};

const ProductVariantsSkeleton: React.FC = () => {
  return (
    <div className="product-detail-skeleton__variants" aria-hidden="true">
      <div className="product-overview__choose">
        <Skeleton className="product-detail-skeleton__label" variant="line" />
        <div className="product-overview__choose-colors">
          <Skeleton
            className="product-overview__skeleton-circle"
            variant="circle"
          />
          <Skeleton
            className="product-overview__skeleton-circle"
            variant="circle"
          />
          <Skeleton
            className="product-overview__skeleton-circle"
            variant="circle"
          />
          <Skeleton
            className="product-overview__skeleton-circle"
            variant="circle"
          />
        </div>
      </div>

      <div className="product-overview__size">
        <Skeleton className="product-detail-skeleton__label" variant="line" />
        <div className="product-overview__size-options">
          <Skeleton
            className="product-overview__skeleton-size"
            variant="rect"
          />
          <Skeleton
            className="product-overview__skeleton-size"
            variant="rect"
          />
          <Skeleton
            className="product-overview__skeleton-size"
            variant="rect"
          />
        </div>
      </div>
    </div>
  );
};

const ProductActionsSkeleton: React.FC = () => {
  return (
    <div className="product-overview__actions" aria-hidden="true">
      <Skeleton className="product-detail-skeleton__quantity" variant="rect" />
      <Skeleton className="product-detail-skeleton__cta" variant="rect" />
    </div>
  );
};

const ReviewCardShell: React.FC = () => {
  return (
    <li className="reviews__item review-card">
      <Skeleton
        className="product-detail-skeleton__review-card"
        variant="rect"
      />
    </li>
  );
};

type RelatedProductCardShellProps = {
  mobileHidden?: boolean;
};

const RelatedProductCardShell: React.FC<RelatedProductCardShellProps> = ({
  mobileHidden = false,
}) => {
  return (
    <li
      className={`product-card-list__item other-products__skeleton-card${mobileHidden ? " product-detail-skeleton__related-card--mobile-hidden" : ""}`}
    >
      <Skeleton className="other-products__skeleton-image" variant="rect" />
      <Skeleton className="other-products__skeleton-line" variant="line" />
      <div className="other-products__skeleton-rating">
        <Skeleton
          className="other-products__skeleton-circle"
          variant="circle"
        />
        <Skeleton
          className="other-products__skeleton-line other-products__skeleton-line--short"
          variant="line"
        />
      </div>
      <Skeleton className="other-products__skeleton-pill" variant="rect" />
    </li>
  );
};

const ProductTabsSkeleton: React.FC = () => {
  return (
    <section
      className="products-tabs products-tabs--loading"
      aria-label="Product tabs loading"
      aria-hidden="true"
    >
      <div className="tabs product-detail-skeleton__tabs">
        <Skeleton className="product-detail-skeleton__tab" variant="line" />
        <Skeleton className="product-detail-skeleton__tab" variant="line" />
        <Skeleton className="product-detail-skeleton__tab" variant="line" />
      </div>

      <div className="products-tabs__content products-tabs__content--active">
        <div className="reviews__header">
          <Skeleton
            className="product-detail-skeleton__reviews-title"
            variant="line"
          />
          <div className="product-detail-skeleton__reviews-controls">
            <Skeleton
              className="product-detail-skeleton__filter"
              variant="rect"
            />
            <Skeleton
              className="product-detail-skeleton__sort"
              variant="rect"
            />
          </div>
        </div>

        <ul className="reviews__list">
          <ReviewCardShell />
          <ReviewCardShell />
        </ul>
      </div>
    </section>
  );
};

const RelatedProductsSkeleton: React.FC = () => {
  return (
    <section
      className="other-products u-mb-85"
      aria-label="Related products loading"
      aria-hidden="true"
    >
      <Heading as="h2" className="other-products__title">
        <Skeleton
          className="product-detail-skeleton__related-title"
          variant="line"
        />
      </Heading>

      <div className="product-card-list product-detail-skeleton__related-list">
        <div className="product-card-list__viewport">
          <ul className="product-card-list__track">
            <RelatedProductCardShell />
            <RelatedProductCardShell />
            <RelatedProductCardShell mobileHidden />
          </ul>
        </div>
      </div>
    </section>
  );
};

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="container u-mt-25 product-detail-page product-detail-skeleton">
      <section
        className="product-overview js-product-overview"
        aria-label="Product overview loading"
      >
        <BreadcrumbSkeleton />

        <div className="product-overview__details">
          <GallerySkeleton />

          <div className="product-info">
            <ProductInfoSkeleton />
            <ProductVariantsSkeleton />
            <ProductActionsSkeleton />
          </div>
        </div>
      </section>

      <ProductTabsSkeleton />
      <RelatedProductsSkeleton />
    </div>
  );
};
