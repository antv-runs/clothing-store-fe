/**
 * Shared carousel measurement helpers.
 * These helpers are pure DOM measurements and do not perform scrolling.
 */

export function getTrackGap(track: HTMLElement | null): number {
  if (!track) {
    return 0;
  }

  const styles = window.getComputedStyle(track);
  const rawGap = styles.gap || styles.columnGap || "0";
  const parsedGap = parseFloat(rawGap);
  return Number.isFinite(parsedGap) ? parsedGap : 0;
}

export function getFirstItemScrollStep(track: HTMLElement | null): number {
  if (!track || !track.firstElementChild) {
    return 0;
  }

  const firstItem = track.firstElementChild as HTMLElement;
  const itemWidth = firstItem.getBoundingClientRect().width;
  return itemWidth + getTrackGap(track);
}
