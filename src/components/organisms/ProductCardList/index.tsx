import type { HTMLAttributes } from "react";
import { useRef, useCallback } from "react";
import { ProductCard } from "@/components/molecules/ProductCard";
import { Skeleton } from "@/components/atoms/Skeleton";
import { Slider } from "@/components/molecules/Slider";
import { SliderList } from "@/components/molecules/Slider/SliderList";
import { useInfiniteLoop } from "@/hooks/useInfiniteLoop";
import type { Product } from "@/types/product";
import { getTrackGap } from "@/utils/carousel";
import clsx from "clsx";
import "./index.scss";

type ProductCardListProps = Omit<HTMLAttributes<HTMLDivElement>, "onScroll"> & {
  products: Product[];
  formatPrice: (amount: number, currency?: string) => string;
  showNavigation?: boolean;
  loading?: boolean;
  skeletonCount?: number;
  linkMode?: "overlay" | "inline";
  imageLoaded?: Set<string>;
  imageError?: Set<string>;
  onImageLoad?: (productId: string) => void;
  onImageError?: (productId: string) => void;
};

type CarouselItem = Product & {
  isClone?: boolean;
  originalId?: string;
  clonePosition?: "head" | "tail";
};

/**
 * ProductCardList — data orchestrator for the product carousel.
 *
 * Prepares item list (originals + clones) and delegates all scroll/drag/snap
 * interaction to <Slider>. Infinite-loop normalization is handled by
 * useInfiniteLoop and passed to Slider via the `onScroll` prop.
 */
export const ProductCardList = ({
  products,
  formatPrice,
  showNavigation = false,
  loading = false,
  skeletonCount = 4,
  linkMode,
  imageLoaded = new Set(),
  imageError = new Set(),
  onImageLoad,
  onImageError,
  className,
  ...rest
}: ProductCardListProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  // ── Clone setup ─────────────────────────────────────────────────────────────

  const cloneCount = showNavigation ? Math.min(4, products.length) : 0;

  const prependedClones: CarouselItem[] = showNavigation
    ? products.slice(-cloneCount).map((p) => ({
      ...p,
      isClone: true,
      originalId: p.id,
      clonePosition: "tail" as const,
    }))
    : [];

  const appendedClones: CarouselItem[] = showNavigation
    ? products.slice(0, cloneCount).map((p) => ({
      ...p,
      isClone: true,
      originalId: p.id,
      clonePosition: "head" as const,
    }))
    : [];

  const allItems: CarouselItem[] = [...prependedClones, ...products, ...appendedClones];
  const skeletonItems = Array.from({ length: Math.max(1, skeletonCount) }, (_, i) => i);

  // ── Loop range (location of real items within the cloned list) ──────────────

  const getLoopRange = useCallback((): { start: number; end: number } | null => {
    if (!trackRef.current) return null;
    const originals = trackRef.current.querySelectorAll<HTMLElement>(
      '[data-is-clone="false"]',
    );
    if (originals.length === 0) return null;
    const first = originals[0];
    const last = originals[originals.length - 1];
    return {
      start: first.offsetLeft,
      end: last.offsetLeft + last.offsetWidth + getTrackGap(trackRef.current),
    };
  }, []);

  // ── Infinite loop hook ──────────────────────────────────────────────────────

  const { normalizeLoopPosition } = useInfiniteLoop({
    viewportRef,
    getLoopRange,
    enabled: showNavigation && !loading,
    itemCount: products.length,
    hasClones: cloneCount > 0,
  });

  // ── onScroll bridge: called by Slider on every scroll/drag/wheel event ─────

  const handleSliderScroll = useCallback(
    () => {
      normalizeLoopPosition();
    },
    [normalizeLoopPosition],
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Slider
      viewportRef={viewportRef}
      showNavigation={showNavigation}
      loading={loading}
      onScroll={showNavigation ? handleSliderScroll : undefined}
      forceNavigationEnabled={showNavigation && cloneCount > 0}
      className={clsx("product-card-list", className)}
      {...rest}
      viewportClassName="product-card-list__viewport"
      navClassName="product-card-list__nav"
      prevButtonClassName="product-card-list__nav--prev"
      nextButtonClassName="product-card-list__nav--next"
    >
      <SliderList
        ref={trackRef}
        className="product-card-list__track"
        aria-live="polite"
        aria-busy={loading}
      >
        {loading
          ? skeletonItems.map((index) => (
            <li
              key={`skeleton-${index}`}
              className="product-card-list__item product-card-list__item--skeleton"
              data-is-clone="false"
            >
              <article className="product-card" aria-hidden="true">
                <div className="product-card__image-wrapper product-image-wrapper">
                  <Skeleton variant="rect" width="100%" height="100%" />
                </div>
                <div className="product-card__title">
                  <Skeleton className="product-card-list__skeleton-title" variant="line" />
                </div>
                <div className="product-card__rating">
                  <span className="product-card__stars" aria-hidden="true">
                    <Skeleton className="product-card-list__skeleton-stars" variant="line" />
                  </span>
                  <Skeleton className="product-card-list__skeleton-rating" variant="line" />
                </div>
                <div className="product-card__price">
                  <span className="product-card__price-current">
                    <Skeleton className="product-card-list__skeleton-price" variant="line" />
                  </span>
                </div>
              </article>
            </li>
          ))
          : allItems.map((item, index) => {
            const displayId = item.originalId || item.id;
            return (
              <li
                key={
                  item.isClone
                    ? `clone-${item.clonePosition}-${item.id}-${index}`
                    : item.id
                }
                className="product-card-list__item"
                data-product-id={displayId}
                data-is-clone={item.isClone ? "true" : "false"}
              >
                <ProductCard
                  product={item}
                  formatPrice={formatPrice}
                  {...(linkMode && { linkMode })}
                  {...(onImageLoad &&
                    onImageError && {
                    imageLoaded: imageLoaded.has(String(displayId)),
                    imageError: imageError.has(String(displayId)),
                    onImageLoad: () => onImageLoad(String(displayId)),
                    onImageError: () => onImageError(String(displayId)),
                  })}
                />
              </li>
            );
          })}
      </SliderList>
    </Slider>
  );
};
