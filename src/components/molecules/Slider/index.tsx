import React, { useRef, useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { IconButton } from "@/components/atoms/IconButton";
import { getFirstItemScrollStep } from "@/utils/carousel";
import "./index.scss";

export interface SliderProps {
  children: React.ReactNode;
  /** Optional extra class on the outer wrapper. Base class is "slider". */
  className?: string;
  /** Optional extra class on the scrollable viewport. Base class is "slider__viewport". */
  viewportClassName?: string;
  /**
   * Optional extra class applied to BOTH nav buttons.
   * Base class is "slider__nav". Use prevButtonClassName / nextButtonClassName
   * for per-button overrides.
   */
  navClassName?: string;
  /** Extra class applied only to the prev nav button. */
  prevButtonClassName?: string;
  /** Extra class applied only to the next nav button. */
  nextButtonClassName?: string;
  /** Show prev/next navigation buttons and enable drag + wheel scrolling. */
  showNavigation?: boolean;
  loading?: boolean;
  /**
   * Enable snap-to-nearest-item after drag/wheel/scroll settles.
   * Snapping is calculated from the first child item width + gap.
   * Default: true when showNavigation is true.
   */
  snap?: boolean;
  /**
   * Force both nav buttons to always be enabled.
   * Use this when the list contains clones (infinite-loop carousel) and
   * scrollWidth is intentionally inflated beyond the real content range.
   */
  forceNavigationEnabled?: boolean;
  /**
   * Optional scroll-position callback invoked on every scroll/drag/wheel event.
   * Use this to run side-effects like infinite-loop normalization.
   * Must be a stable reference (useCallback).
   */
  onScroll?: (viewport: HTMLDivElement) => void;
  /**
   * Optional external ref for the viewport div.
   * When provided, Slider uses this ref instead of its internal one.
   * Useful when the caller needs direct access to the viewport's scrollLeft
   * (e.g. for infinite-loop normalization via useInfiniteLoop).
   */
  viewportRef?: React.RefObject<HTMLDivElement | null>;
  /**
   * Called after mount (or after products change) so callers can trigger
   * a button-state refresh when external scroll normalization repositions
   * the viewport (e.g. after useInfiniteLoop sets the initial scrollLeft).
   */
  onReady?: () => void;
}

export const Slider: React.FC<SliderProps> = ({
  children,
  className,
  viewportClassName,
  navClassName,
  prevButtonClassName,
  nextButtonClassName,
  showNavigation = false,
  loading = false,
  snap = true,
  forceNavigationEnabled = false,
  onScroll,
  viewportRef: externalViewportRef,
  onReady,
}) => {
  const internalViewportRef = useRef<HTMLDivElement>(null);

  // When an external ref is provided, sync it with the internal one via a
  // ref callback so React can write to it without TypeScript readonly errors.
  const setViewportRef = useCallback(
    (node: HTMLDivElement | null) => {
      (
        internalViewportRef as React.MutableRefObject<HTMLDivElement | null>
      ).current = node;
      if (externalViewportRef) {
        (
          externalViewportRef as React.MutableRefObject<HTMLDivElement | null>
        ).current = node;
      }
    },
    // externalViewportRef is stable (a ref object), safe to include
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // All internal logic uses internalViewportRef — externalViewportRef is just
  // a mirror so the caller (e.g. useInfiniteLoop) can read the same node.
  const viewportRef = internalViewportRef;
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // ── Interaction refs ────────────────────────────────────────────────────────
  const isMouseDownRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const scrollStartLeftRef = useRef(0);
  const snapTimeoutRef = useRef<number | null>(null);

  // ── Step width helper ───────────────────────────────────────────────────────

  const getStepWidth = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;
    return getFirstItemScrollStep(
      viewport.firstElementChild as HTMLElement | null,
    );
  }, []);

  // ── Button state ─────────────────────────────────────────────────────────────

  const updateButtonStates = useCallback(() => {
    if (loading || !showNavigation) {
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }
    const viewport = viewportRef.current;
    if (!viewport) return;

    // When the caller signals that navigation should always be active
    // (e.g. clone-based infinite-loop carousel where scrollWidth is
    // intentionally inflated), bypass the real boundary check.
    if (forceNavigationEnabled) {
      setCanScrollPrev(true);
      setCanScrollNext(true);
      return;
    }

    const maxScroll = Math.max(viewport.scrollWidth - viewport.clientWidth, 0);
    setCanScrollPrev(viewport.scrollLeft > 0);
    setCanScrollNext(viewport.scrollLeft < maxScroll - 1);
  }, [loading, showNavigation, forceNavigationEnabled, viewportRef]);

  // ── Snap ─────────────────────────────────────────────────────────────────────

  const snapToNearestItem = useCallback(() => {
    if (!snap || !showNavigation || loading || !viewportRef.current) return;
    const viewport = viewportRef.current;
    const step = getStepWidth();
    if (!step) return;
    const nearest = Math.round(viewport.scrollLeft / step) * step;
    if (Math.abs(viewport.scrollLeft - nearest) > 0.5) {
      viewport.scrollBy({
        left: nearest - viewport.scrollLeft,
        behavior: "smooth",
      });
    }
  }, [snap, showNavigation, loading, getStepWidth]);

  const debounceSnap = useCallback(() => {
    if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    snapTimeoutRef.current = window.setTimeout(snapToNearestItem, 150);
  }, [snapToNearestItem]);

  // ── Step scroll (prev / next buttons) ────────────────────────────────────────

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

  const handlePrevClick = useCallback(() => scrollByStep(-1), [scrollByStep]);
  const handleNextClick = useCallback(() => scrollByStep(1), [scrollByStep]);

  // ── Drag handlers ─────────────────────────────────────────────────────────────

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
      )
        return;
      const deltaX = event.clientX - pointerStartXRef.current;
      if (Math.abs(deltaX) > 3) hasDraggedRef.current = true;
      viewportRef.current.scrollLeft = scrollStartLeftRef.current - deltaX;
      onScroll?.(viewportRef.current);
    },
    [loading, showNavigation, onScroll],
  );

  const handleMouseUp = useCallback(() => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    viewportRef.current?.classList.remove("is-dragging");
    if (!loading) snapToNearestItem();
  }, [loading, snapToNearestItem]);

  // ── Click guard (suppress link clicks that follow a drag) ────────────────────

  const handleViewportClick = useCallback((event: React.MouseEvent) => {
    if (!hasDraggedRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    hasDraggedRef.current = false;
  }, []);

  // ── Wheel handler ─────────────────────────────────────────────────────────────

  const handleWheel = useCallback(
    (event: WheelEvent) => {
      if (loading || !showNavigation) return;
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      viewportRef.current?.scrollBy({ left: event.deltaY });
      onScroll?.(viewportRef.current!);
      debounceSnap();
    },
    [loading, showNavigation, onScroll, debounceSnap],
  );

  // ── Event registration ────────────────────────────────────────────────────────

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onScrollEvent = () => {
      if (loading) return;
      onScroll?.(viewport);
      updateButtonStates();
      debounceSnap();
    };

    const onResize = () => updateButtonStates();
    const onMouseDown = (e: MouseEvent) => handleMouseDown(e);
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e);
    const onMouseUp = () => handleMouseUp();
    const onWheel = (e: WheelEvent) => handleWheel(e);

    viewport.addEventListener("scroll", onScrollEvent, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    viewport.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    viewport.addEventListener("wheel", onWheel, { passive: false });

    updateButtonStates();

    return () => {
      viewport.removeEventListener("scroll", onScrollEvent);
      window.removeEventListener("resize", onResize);
      viewport.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      viewport.removeEventListener("wheel", onWheel);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, [
    loading,
    onScroll,
    updateButtonStates,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel,
    debounceSnap,
  ]);

  // Re-run button states after external normalizations (e.g. useInfiniteLoop
  // repositions scrollLeft after mount). A short RAF gives the DOM time to settle.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      updateButtonStates();
      onReady?.();
    });
    return () => cancelAnimationFrame(id);
  }, [loading, showNavigation, updateButtonStates, onReady]);

  return (
    <div
      className={clsx(
        "slider",
        loading && "slider--loading",
        className,
      )}
    >
      {showNavigation && (
        <IconButton
          variant="ghost"
          svgName="icn_back"
          className={clsx(
            "slider__nav",
            "slider__nav--prev",
            navClassName,
            prevButtonClassName,
          )}
          ariaLabel="Previous"
          iconWidth={50}
          iconHeight={50}
          disabled={loading || !canScrollPrev}
          onClick={handlePrevClick}
        />
      )}

      <div
        ref={setViewportRef}
        className={clsx("slider__viewport", viewportClassName)}
        onClick={handleViewportClick}
      >
        {children}
      </div>

      {showNavigation && (
        <IconButton
          variant="ghost"
          svgName="icn_next"
          className={clsx(
            "slider__nav",
            "slider__nav--next",
            navClassName,
            nextButtonClassName,
          )}
          ariaLabel="Next"
          iconWidth={50}
          iconHeight={50}
          disabled={loading || !canScrollNext}
          onClick={handleNextClick}
        />
      )}
    </div>
  );
};
