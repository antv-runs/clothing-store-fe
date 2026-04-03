import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import { ProductCard } from "@/components/molecules/ProductCard";
import { IconButton } from "@/components/atoms/IconButton";
import { Skeleton } from "@/components/atoms/Skeleton";
import type { Product } from "@/types/product";
import { getFirstItemScrollStep, getTrackGap } from "@/utils/carousel";
import "./index.scss";

interface ProductCardListProps {
  products: Product[];
  formatPrice: (amount: number, currency?: string) => string;

  // Navigation control (for carousel sections like RelatedProducts)
  showNavigation?: boolean;
  loading?: boolean;
  skeletonCount?: number;

  // ProductCard behavior props
  linkMode?: "overlay" | "inline";

  // Image state management (for carousel visibility)
  imageLoaded?: Set<string>;
  imageError?: Set<string>;
  onImageLoad?: (productId: string) => void;
  onImageError?: (productId: string) => void;
}

interface CarouselItem extends Product {
  isClone?: boolean;
  originalId?: string;
  clonePosition?: "head" | "tail";
}

/**
 * ProductCardList - Shared carousel/slider component for rendering product lists.
 *
 * Owns the complete slider structure:
 * - Viewport wrapper with horizontal scroll
 * - Flex list with proper carousel layout
 * - Individual product items with scroll-snap
 * - Optional navigation buttons (prev/next)
 *
 * Styling includes:
 * - Desktop: horizontal flex layout
 * - Mobile: horizontal scroll with scroll-snap
 * - Shared item sizing and hover effects
 *
 * Used by:
 * - HomeProductSection (showNavigation={false})
 * - RelatedProductsSection (showNavigation={true})
 */
export const ProductCardList: React.FC<ProductCardListProps> = ({
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
}) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const isAdjustingLoopRef = useRef(false);
  const isMouseDownRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const scrollStartLeftRef = useRef(0);

  // Clone items for infinite loop (only when navigation is enabled)
  const cloneCount = showNavigation ? Math.min(4, products.length) : 0;
  const prependedClonedItems: CarouselItem[] = showNavigation
    ? products.slice(-cloneCount).map((product) => ({
        ...product,
        isClone: true,
        originalId: product.id,
        clonePosition: "tail",
      }))
    : [];
  const appendedClonedItems: CarouselItem[] = showNavigation
    ? products.slice(0, cloneCount).map((product) => ({
        ...product,
        isClone: true,
        originalId: product.id,
        clonePosition: "head",
      }))
    : [];

  const allItems: CarouselItem[] = [
    ...prependedClonedItems,
    ...products,
    ...appendedClonedItems,
  ];
  const skeletonItems = Array.from(
    { length: Math.max(1, skeletonCount) },
    (_, index) => index,
  );

  const getStepWidth = useCallback(() => {
    return getFirstItemScrollStep(trackRef.current);
  }, []);

  const getRealItemsRange = useCallback(() => {
    if (!trackRef.current) return null;

    const originalItems = trackRef.current.querySelectorAll(
      '[data-is-clone="false"]',
    );

    if (originalItems.length === 0) return null;

    const firstOriginal = originalItems[0] as HTMLElement;
    const lastOriginal = originalItems[originalItems.length - 1] as HTMLElement;
    const start = firstOriginal.offsetLeft;
    const end =
      lastOriginal.offsetLeft +
      lastOriginal.offsetWidth +
      getTrackGap(trackRef.current);

    return { start, end };
  }, []);

  const snapTimeoutRef = useRef<number | null>(null);

  const normalizeLoopPosition = useCallback(() => {
    if (
      loading ||
      !showNavigation ||
      !viewportRef.current ||
      isAdjustingLoopRef.current
    )
      return;

    const realItemsRange = getRealItemsRange();
    if (!realItemsRange) return;

    const { start, end } = realItemsRange;
    const realWidth = end - start;
    if (realWidth <= 0) return;

    const viewport = viewportRef.current;
    let nextScrollLeft = viewport.scrollLeft;

    if (nextScrollLeft < start) {
      const distance = start - nextScrollLeft;
      const wraps = Math.ceil(distance / realWidth);
      nextScrollLeft += wraps * realWidth;
    } else if (nextScrollLeft >= end) {
      const distance = nextScrollLeft - end + 1;
      const wraps = Math.ceil(distance / realWidth);
      nextScrollLeft -= wraps * realWidth;
    }

    if (Math.abs(nextScrollLeft - viewport.scrollLeft) < 0.5) return;

    // Teleport instantly between equivalent positions to avoid visual flicker.
    if (snapTimeoutRef.current) {
      clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = null;
    }

    isAdjustingLoopRef.current = true;
    viewport.scrollLeft = nextScrollLeft;
    isAdjustingLoopRef.current = false;
  }, [loading, showNavigation, getRealItemsRange]);

  useLayoutEffect(() => {
    if (
      loading ||
      !showNavigation ||
      !viewportRef.current ||
      cloneCount === 0
    ) {
      return;
    }

    const realItemsRange = getRealItemsRange();
    if (!realItemsRange) return;

    const viewport = viewportRef.current;
    if (Math.abs(viewport.scrollLeft - realItemsRange.start) < 0.5) return;

    isAdjustingLoopRef.current = true;
    viewport.scrollLeft = realItemsRange.start;
    isAdjustingLoopRef.current = false;
  }, [loading, showNavigation, cloneCount, products, getRealItemsRange]);

  const updateButtonStates = useCallback(() => {
    if (loading) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    // With infinite loop, buttons are always enabled
    setCanScrollPrev(true);
    setCanScrollNext(true);
  }, [loading]);

  const scrollByStep = useCallback(
    (direction: number) => {
      if (loading || !viewportRef.current) return;

      const step = getStepWidth();
      if (!step) return;

      viewportRef.current.scrollBy({
        left: direction * step,
        behavior: "smooth",
      });
    },
    [loading, getStepWidth],
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (loading || event.button !== 0 || !showNavigation) return;

      isMouseDownRef.current = true;
      hasDraggedRef.current = false;
      pointerStartXRef.current = event.clientX;
      scrollStartLeftRef.current = viewportRef.current?.scrollLeft || 0;
      viewportRef.current?.classList.add("is-dragging");
    },
    [loading, showNavigation],
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (
        loading ||
        !isMouseDownRef.current ||
        !viewportRef.current ||
        !showNavigation
      ) {
        return;
      }

      const deltaX = event.clientX - pointerStartXRef.current;
      if (Math.abs(deltaX) > 3) {
        hasDraggedRef.current = true;
      }

      viewportRef.current.scrollLeft = scrollStartLeftRef.current - deltaX;
      normalizeLoopPosition();
    },
    [loading, showNavigation, normalizeLoopPosition],
  );

  const snapToNearestItem = useCallback(() => {
    if (loading || !viewportRef.current || !showNavigation) return;

    const viewport = viewportRef.current;
    const step = getStepWidth();
    const realItemsRange = getRealItemsRange();
    if (!step || step === 0 || !realItemsRange) return;

    const currentScroll = viewport.scrollLeft;
    const relativeScroll = currentScroll - realItemsRange.start;
    const nearestItemIndex = Math.round(relativeScroll / step);
    const targetScroll = realItemsRange.start + nearestItemIndex * step;

    // Avoid snapping if already very close to target
    if (Math.abs(currentScroll - targetScroll) > 0.5) {
      viewport.scrollBy({
        left: targetScroll - currentScroll,
        behavior: "smooth",
      });
    }
  }, [loading, getStepWidth, showNavigation, getRealItemsRange]);

  const debounceSnap = useCallback(() => {
    if (snapTimeoutRef.current) {
      clearTimeout(snapTimeoutRef.current);
    }

    snapTimeoutRef.current = window.setTimeout(() => {
      snapToNearestItem();
    }, 150);
  }, [snapToNearestItem]);

  const handleTrackClick = useCallback((event: React.MouseEvent) => {
    if (!hasDraggedRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    hasDraggedRef.current = false;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isMouseDownRef.current) return;

    isMouseDownRef.current = false;
    viewportRef.current?.classList.remove("is-dragging");

    if (loading) {
      return;
    }

    // Snap to nearest item after drag ends
    snapToNearestItem();
  }, [loading, snapToNearestItem]);

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (loading || !showNavigation) return;

      // Only handle vertical wheel (ignore horizontal)
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;

      event.preventDefault();
      if (viewportRef.current) {
        viewportRef.current.scrollBy({
          left: event.deltaY,
        });
        normalizeLoopPosition();
        // Debounce snap after wheel scrolling settles
        debounceSnap();
      }
    },
    [loading, showNavigation, normalizeLoopPosition, debounceSnap],
  );

  const handlePrevClick = useCallback(() => {
    scrollByStep(-1);
  }, [scrollByStep]);

  const handleNextClick = useCallback(() => {
    scrollByStep(1);
  }, [scrollByStep]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleScroll = () => {
      if (loading) {
        return;
      }

      if (!isAdjustingLoopRef.current) {
        normalizeLoopPosition();
        updateButtonStates();
        // Debounce snap after any scroll (handles touch scrolling too)
        debounceSnap();
      }
    };

    const handleResize = () => {
      updateButtonStates();
    };

    const handleMouseDownBound = (e: MouseEvent) => handleMouseDown(e);
    const handleMouseMoveBound = (e: MouseEvent) => handleMouseMove(e);
    const handleMouseUpBound = () => handleMouseUp();
    const handleWheelBound = (e: WheelEvent) => handleWheel(e);

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    viewport.addEventListener("mousedown", handleMouseDownBound);
    window.addEventListener("mousemove", handleMouseMoveBound);
    window.addEventListener("mouseup", handleMouseUpBound);
    viewport.addEventListener("wheel", handleWheelBound, { passive: false });

    // Initial state update
    updateButtonStates();

    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      viewport.removeEventListener("mousedown", handleMouseDownBound);
      window.removeEventListener("mousemove", handleMouseMoveBound);
      window.removeEventListener("mouseup", handleMouseUpBound);
      viewport.removeEventListener("wheel", handleWheelBound);
      // Cleanup debounce timeout
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, [
    loading,
    normalizeLoopPosition,
    updateButtonStates,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    debounceSnap,
  ]);

  // Update button states when products change
  useEffect(() => {
    updateButtonStates();
  }, [products, loading, updateButtonStates]);

  return (
    <div
      className={`product-card-list${loading ? " product-card-list--loading" : ""}`}
    >
      {showNavigation && (
        <IconButton
          variant="ghost"
          svgName="icn_back"
          className="product-card-list__nav product-card-list__nav--prev js-other-products__prev"
          ariaLabel="Previous products"
          iconWidth={50}
          iconHeight={50}
          disabled={loading || !canScrollPrev}
          onClick={handlePrevClick}
        />
      )}

      <div
        ref={viewportRef}
        className="product-card-list__viewport js-related-viewport"
      >
        <ul
          ref={trackRef}
          id="product-card-list"
          className="product-card-list__track js-other-products__list js-related-track"
          aria-live="polite"
          aria-busy={loading}
          onClick={handleTrackClick}
        >
          {loading
            ? skeletonItems.map((index) => (
                <li
                  key={`skeleton-${index}`}
                  className="product-card-list__item product-card-list__item--skeleton js-other-products__item js-related-item"
                  data-is-clone="false"
                >
                  <article className="product-card" aria-hidden="true">
                    <div className="product-card__image-wrapper product-image-wrapper">
                      <Skeleton variant="rect" width="100%" height="100%" />
                    </div>

                    <div className="product-card__title">
                      <Skeleton
                        className="product-card-list__skeleton-title"
                        variant="line"
                      />
                    </div>

                    <div className="product-card__rating">
                      <span className="product-card__stars" aria-hidden="true">
                        <Skeleton
                          className="product-card-list__skeleton-stars"
                          variant="line"
                        />
                      </span>
                      <Skeleton
                        className="product-card-list__skeleton-rating"
                        variant="line"
                      />
                    </div>

                    <div className="product-card__price">
                      <span className="product-card__price-current">
                        <Skeleton
                          className="product-card-list__skeleton-price"
                          variant="line"
                        />
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
                    className="product-card-list__item js-other-products__item js-related-item"
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
        </ul>
      </div>

      {showNavigation && (
        <IconButton
          variant="ghost"
          svgName="icn_next"
          className="product-card-list__nav product-card-list__nav--next js-other-products__next"
          ariaLabel="Next products"
          iconWidth={50}
          iconHeight={50}
          disabled={loading || !canScrollNext}
          onClick={handleNextClick}
        />
      )}
    </div>
  );
};
