import { useEffect, useRef, useState } from "react";
import IconButton from "@/components/atoms/IconButton/IconButton";
import { Heading } from "@/components/atoms";
import { ReviewCard } from "@/components/organisms/ReviewCard/ReviewCard";
import { getReviewsByProductId } from "@/api/Review";
import type { Review } from "@/types/review";
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
  // On mobile, always scroll by 1 card
  if (window.innerWidth <= 768) {
    return cardWidth + (Number.isFinite(gap) ? gap : 0);
  }
  // On desktop, scroll by 1 card (default)
  return cardWidth + (Number.isFinite(gap) ? gap : 0);
}

export const HomeReviews: React.FC = () => {
  const reviewsTrackRef = useRef<HTMLUListElement | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Fetch reviews on mount
  useEffect(() => {
    let isMounted = true;

    const fetchReviews = async () => {
      try {
        setIsLoading(true);
        const result = await getReviewsByProductId(180, {
          perPage: 10,
          sort: "latest",
        });
        if (isMounted) {
          setReviews(result.data);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch reviews:", err);
          setReviews([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchReviews();

    return () => {
      isMounted = false;
    };
  }, []);

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

  // Add: determine if we have few items (1 or 2)
  const isFew = reviews.length > 0 && reviews.length < 3;
  const viewportStateClass = `${hasOverflow ? " has-overflow" : ""}${canScrollPrev ? " is-not-at-start" : ""}${canScrollNext ? " is-not-at-end" : ""}`;

  const renderReviews = () => {
    if (isLoading) {
      return (
        <li className="reviews__item review-card" style={{ opacity: 0.5 }}>
          <p>Loading reviews...</p>
        </li>
      );
    }

    if (reviews.length === 0) {
      return (
        <li className="reviews__item review-card" style={{ opacity: 0.6 }}>
          <p>No reviews available</p>
        </li>
      );
    }

    return reviews.map((review) => (
      <ReviewCard key={review.id} review={review} />
    ));
  };

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
    </section>
  );
};
