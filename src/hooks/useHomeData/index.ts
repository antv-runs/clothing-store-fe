import { useEffect, useState } from "react";
import { getProducts } from "@/api/Product";
import { getReviewsByProductId } from "@/api/Review";
import type { Product } from "@/types/product";
import type { Review } from "@/types/review";

type UseHomeDataResult = {
  newArrivals: Product[];
  topSelling: Product[];
  reviews: Review[];
  isLoading: boolean;
};

export const useHomeData = (): UseHomeDataResult => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [topSelling, setTopSelling] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadHomeData = async () => {
      try {
        setIsLoading(true);
        setNewArrivals([]);
        setTopSelling([]);
        setReviews([]);

        const [newArrivalsResult, topSellingResult, reviewsResult] =
          await Promise.all([
            getProducts({
              page: 1,
              per_page: 4,
            }),
            getProducts({
              page: 2,
              per_page: 4,
            }),
            getReviewsByProductId(180, {
              page: 1,
              perPage: 10,
              sort: "latest",
            }),
          ]);

        if (!isActive) {
          return;
        }

        setNewArrivals(newArrivalsResult.data);
        setTopSelling(topSellingResult.data);
        setReviews(reviewsResult.data);
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error("Failed to load home page data.", error);
        setNewArrivals([]);
        setTopSelling([]);
        setReviews([]);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadHomeData();

    return () => {
      isActive = false;
    };
  }, []);

  return {
    newArrivals,
    topSelling,
    reviews,
    isLoading,
  };
};
