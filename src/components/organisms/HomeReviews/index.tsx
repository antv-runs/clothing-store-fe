import { useEffect, useRef, useState } from "react";
import { IconButton } from "@/components/atoms/IconButton";
import { Heading } from "@/components/atoms/Heading";
import { ReviewCard } from "@/components/molecules/ReviewCard";
import { ListStateWrapper } from "@/components/molecules/ListStateWrapper";
import type { ListErrorKind } from "@/types/listState";
import type { Review } from "@/types/review";
import { getFirstItemScrollStep } from "@/utils/carousel";
import "./index.scss";

interface HomeReviewsProps {
  reviews: Review[];
  isLoading: boolean;
  isRetrying?: boolean;
  error?: string | null;
  errorKind?: ListErrorKind | null;
  onRetry?: () => void;
}

export const HomeReviews: React.FC<HomeReviewsProps> = ({
  reviews,
  isLoading,
  isRetrying = false,
  error = null,
  errorKind,
  onRetry,
}) => {
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

    const step = getFirstItemScrollStep(track);
    const movement = direction === "prev" ? -step : step;

    track.scrollBy({ left: movement, behavior: "smooth" });
  };

  // Add: determine if we have few items (1 or 2)
  const isFew = reviews.length > 0 && reviews.length < 3;
  const viewportStateClass = `${hasOverflow ? " has-overflow" : ""}${canScrollPrev ? " is-not-at-start" : ""}${canScrollNext ? " is-not-at-end" : ""}`;

  const renderReviews = () => {
    return reviews.map((review) => <ReviewCard key={review.id} review={review} />);
  };

  const isEmpty = !isLoading && !error && reviews.length === 0;

  return (
    <section className="home-reviews" aria-labelledby="home-reviews-title">
      <div className="home-reviews__head">
        <Heading as="h2" id="home-reviews-title">
          OUR HAPPY CUSTOMERS
        </Heading>
        <div className="home-reviews__actions">
          <IconButton
            svgName="icn_arrow_left_home"
            className="home-reviews__action"
            ariaLabel="Scroll reviews left"
            color="black"
            onClick={() => handleScrollReviews("prev")}
            disabled={!canScrollPrev}
            iconWidth={24}
            iconHeight={24}
          />
          <IconButton
            svgName="icn_arrow_right_home"
            className="home-reviews__action"
            ariaLabel="Scroll reviews right"
            color="black"
            onClick={() => handleScrollReviews("next")}
            disabled={!canScrollNext}
            iconWidth={24}
            iconHeight={24}
          />
        </div>
      </div>

      <ListStateWrapper
        className="home-reviews__retry"
        isLoading={isLoading}
        isRetrying={isRetrying}
        isEmpty={isEmpty}
        error={error}
        errorKind={errorKind || null}
        onRetry={onRetry}
        loadingContent={
          <div className="home-reviews__state" role="status">
            Loading reviews...
          </div>
        }
        emptyContent={
          <div className="home-reviews__state" role="status">
            No reviews available.
          </div>
        }
      >
        <div className={`home-reviews__viewport${viewportStateClass}`}>
          <ul
            ref={reviewsTrackRef}
            className={`home-reviews__track reviews__list${isFew ? " home-reviews__track--few" : ""}`}
            aria-label="Customer reviews"
            aria-live="polite"
            aria-busy={isLoading}
          >
            {renderReviews()}
          </ul>
        </div>
      </ListStateWrapper>
    </section>
  );
};
