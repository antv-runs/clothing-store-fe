import { useRef, useCallback, useLayoutEffect, useEffect } from "react";
import { getTrackGap } from "@/utils/carousel";

interface UseInfiniteLoopOptions {
  viewportRef: React.RefObject<HTMLDivElement>;
  getLoopRange: () => { start: number; end: number } | null;
  enabled: boolean;
  /** Triggers re-sync when the item list changes (e.g. after data load). */
  itemCount: number;
  hasClones: boolean;
}

/**
 * Handles infinite-loop scroll normalization for a carousel with cloned items.
 *
 * Teleports the scroll position between equivalent positions so the carousel
 * appears to scroll endlessly. This is purely a scroll side-effect and has
 * no UI output — it only manipulates viewport.scrollLeft.
 *
 * Usage: call normalizeLoopPosition() inside any scroll/drag/wheel handler
 * that moves the viewport.
 */
export function useInfiniteLoop({
  viewportRef,
  getLoopRange,
  enabled,
  itemCount,
  hasClones,
}: UseInfiniteLoopOptions) {
  const isAdjustingRef = useRef(false);

  const normalize = useCallback(() => {
    if (!enabled || !viewportRef.current || isAdjustingRef.current) return;

    const range = getLoopRange();
    if (!range) return;

    const { start, end } = range;
    const width = end - start;
    if (width <= 0) return;

    const viewport = viewportRef.current;
    let next = viewport.scrollLeft;

    if (next < start) {
      next += Math.ceil((start - next) / width) * width;
    } else if (next >= end) {
      next -= Math.ceil((next - end + 1) / width) * width;
    }

    if (Math.abs(next - viewport.scrollLeft) < 0.5) return;

    isAdjustingRef.current = true;
    viewport.scrollLeft = next;
    isAdjustingRef.current = false;
  }, [enabled, viewportRef, getLoopRange]);

  // On mount / item list change: jump to the start of the real items
  // (i.e. skip past the prepended clone block).
  useLayoutEffect(() => {
    if (!enabled || !hasClones || !viewportRef.current) return;

    const range = getLoopRange();
    if (!range) return;

    const viewport = viewportRef.current;
    if (Math.abs(viewport.scrollLeft - range.start) < 0.5) return;

    isAdjustingRef.current = true;
    viewport.scrollLeft = range.start;
    isAdjustingRef.current = false;
  }, [enabled, hasClones, itemCount, getLoopRange, viewportRef]);

  return { normalizeLoopPosition: normalize, isAdjustingRef };
}
