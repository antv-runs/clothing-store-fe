import { useEffect, useRef, useState } from "react";
import IconButton from "~/components/atoms/IconButton/IconButton";
import { ReviewCard } from "~/components/organisms/ReviewCard/ReviewCard";
import { HOME_REVIEWS } from "~/data/home";
import "./HomeReviews.scss";

function getReviewScrollStep(track: HTMLUListElement | null) {
  if (!track || !track.firstElementChild) {
    return 0;
  }

  const firstCard = track.firstElementChild as HTMLElement;
  const cardWidth = firstCard.getBoundingClientRect().width;
  const trackStyles = window.getComputedStyle(track);
  const gap = Number.parseFloat(
    trackStyles.columnGap || trackStyles.gap || "0",
  );

  return cardWidth + (Number.isFinite(gap) ? gap : 0);
}

export const HomeReviews: React.FC = () => {
  const reviewsTrackRef = useRef<HTMLUListElement | null>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const track = reviewsTrackRef.current;
    if (!track) {
      return undefined;
    }

    const syncReviewState = () => {
      const maxScrollLeft = Math.max(track.scrollWidth - track.clientWidth, 0);
      const currentScrollLeft = Math.max(track.scrollLeft, 0);

      setHasOverflow(maxScrollLeft > 1);
      setCanScrollPrev(currentScrollLeft > 0);
      setCanScrollNext(currentScrollLeft < maxScrollLeft - 1);
    };

    syncReviewState();
    track.addEventListener("scroll", syncReviewState, { passive: true });
    window.addEventListener("resize", syncReviewState);

    return () => {
      track.removeEventListener("scroll", syncReviewState);
      window.removeEventListener("resize", syncReviewState);
    };
  }, []);

  const handleScrollReviews = (direction: "prev" | "next") => {
    const track = reviewsTrackRef.current;
    if (!track) {
      return;
    }

    const step = getReviewScrollStep(track);
    const movement = direction === "prev" ? -step : step;

    track.scrollBy({ left: movement, behavior: "smooth" });
  };

  const viewportStateClass = `${hasOverflow ? " has-overflow" : ""}${canScrollPrev ? " is-not-at-start" : ""}${canScrollNext ? " is-not-at-end" : ""}`;

  return (
    <section className="home-reviews" aria-labelledby="home-reviews-title">
      <div className="home-reviews__head">
        <h2 id="home-reviews-title">OUR HAPPY CUSTOMERS</h2>
        <div className="home-reviews__actions">
          <IconButton
            svgName="icn_arrow_left_home"
            className="home-reviews__action"
            ariaLabel="Scroll reviews left"
            onClick={() => handleScrollReviews("prev")}
            disabled={!canScrollPrev}
            iconWidth={18}
            iconHeight={18}
          />
          <IconButton
            svgName="icn_arrow_right_home"
            className="home-reviews__action"
            ariaLabel="Scroll reviews right"
            onClick={() => handleScrollReviews("next")}
            disabled={!canScrollNext}
            iconWidth={18}
            iconHeight={18}
          />
        </div>
      </div>

      <div className={`home-reviews__viewport${viewportStateClass}`}>
        <ul
          ref={reviewsTrackRef}
          className="home-reviews__track reviews__list"
          aria-label="Customer reviews"
          aria-live="polite"
          aria-busy="false"
        >
          {HOME_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </ul>
      </div>
    </section>
  );
};
