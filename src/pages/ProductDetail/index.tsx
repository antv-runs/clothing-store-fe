import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { submitReview } from "@/api/Review";
import { ApiError } from "@/utils/apiError";
import { Breadcrumb } from "@/components/organisms/Breadcrumb";
import { ProductGallery } from "@/components/organisms/ProductGallery";
import { ProductInfo } from "@/components/organisms/ProductInfo";
import { ProductVariants } from "@/components/organisms/ProductVariants";
import { ProductActions } from "@/components/molecules/ProductActions";
import { ProductTabsSection } from "@/components/organisms/ProductTabsSection";
import { RelatedProductsSection } from "@/components/organisms/RelatedProductsSection";
import { WriteReviewModal } from "@/components/organisms/WriteReviewModal";
import { ProductDetailSkeleton } from "@/components/organisms/ProductDetailSkeleton";
import { getProductById, getProducts } from "@/api/Product";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatters";
import { Text } from "@/components/atoms/Text";
import { useCartRows } from "@/hooks/useCartRows";
import { useProductReviews } from "@/hooks/useProductReviews";
import "./index.scss";

const DEFAULT_QUANTITY = 1;

const normalizeQuantity = (value: number | string): number => {
  const parsed = Number(value);
  return Math.max(
    DEFAULT_QUANTITY,
    Number.isFinite(parsed) ? parsed : DEFAULT_QUANTITY,
  );
};

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const normalizedRouteId = String(id || "").trim();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  // Track selected color and size for add-to-cart functionality
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(DEFAULT_QUANTITY);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] =
    useState<boolean>(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewStatusMessage, setReviewStatusMessage] = useState("");
  const reviewSubmitRequestIdRef = useRef(0);
  const isMountedRef = useRef(true);

  const {
    reviews,
    reviewCount,
    selectedRating,
    selectedSort,
    hasMore,
    isLoading: isLoadingReviews,
    isLoadingMore: isLoadingMoreReviews,
    error: reviewError,
    setFilter,
    setSort,
    loadMore,
    reloadReviews,
  } = useProductReviews(product?.id);
  const { addItem } = useCartRows();

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let isActive = true;

    if (!normalizedRouteId) {
      setProduct(null);
      setIsLoading(false);
      setRelatedProducts([]);
      setRelatedLoading(false);
      return () => {
        isActive = false;
      };
    }

    async function loadProductDetail() {
      setIsLoading(true);
      setProduct(null);
      setRelatedProducts([]);
      setRelatedLoading(false);

      try {
        const productResult = await getProductById(normalizedRouteId);

        if (!isActive) {
          return;
        }

        if (!productResult) {
          setProduct(null);
          setSelectedColorId(null);
          setSelectedSizeId(null);
          setQuantity(DEFAULT_QUANTITY);
          return;
        }

        setProduct(productResult);
        // Reset variant selections when product changes
        setSelectedColorId(null);
        setSelectedSizeId(null);
        setQuantity(DEFAULT_QUANTITY);

        // Fetch related products
        setRelatedLoading(true);
        try {
          const relatedResult = await getProducts({
            page: 1,
            per_page: 8,
          });

          if (!isActive) {
            return;
          }

          setRelatedProducts(relatedResult.data);
        } catch (relatedError) {
          if (!isActive) {
            return;
          }

          console.error("Failed to load related products.", relatedError);
          setRelatedProducts([]);
        } finally {
          if (isActive) {
            setRelatedLoading(false);
          }
        }
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error("Failed to load product detail data.", error);
        setProduct(null);
        setSelectedColorId(null);
        setSelectedSizeId(null);
        setQuantity(DEFAULT_QUANTITY);
        setRelatedProducts([]);
        setRelatedLoading(false);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    }

    loadProductDetail();

    return () => {
      isActive = false;
    };
  }, [normalizedRouteId]);

  useEffect(() => {
    if (isWriteReviewModalOpen) {
      document.body.classList.add("review-modal-open");
    } else {
      document.body.classList.remove("review-modal-open");
    }

    return () => {
      document.body.classList.remove("review-modal-open");
    };
  }, [isWriteReviewModalOpen]);

  useEffect(() => {
    if (!isWriteReviewModalOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsWriteReviewModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isWriteReviewModalOpen]);

  const handleOpenReviewModal = useCallback(() => {
    if (isSubmittingReview) {
      return;
    }

    setReviewStatusMessage("");
    setIsWriteReviewModalOpen(true);
  }, [isSubmittingReview]);

  const handleCloseReviewModal = useCallback(() => {
    if (isSubmittingReview) {
      return;
    }

    setIsWriteReviewModalOpen(false);
  }, [isSubmittingReview]);

  const handleReviewSubmit = useCallback(
    async ({
      username,
      comment,
      stars,
    }: {
      username: string;
      comment: string;
      stars: number;
    }) => {
      if (!product?.id || isSubmittingReview) {
        return;
      }

      const normalizedUsername = String(username || "Guest").trim() || "Guest";
      const normalizedComment = String(comment || "").trim();
      const normalizedStars = Math.max(1, Math.min(5, Number(stars) || 5));

      if (!normalizedComment) {
        setReviewStatusMessage("Please write a comment before submitting.");
        return;
      }

      const requestId = ++reviewSubmitRequestIdRef.current;
      setIsSubmittingReview(true);
      setReviewStatusMessage("Submitting review...");

      try {
        await submitReview(product.id, {
          username: normalizedUsername,
          comment: normalizedComment,
          stars: normalizedStars,
        });

        if (
          !isMountedRef.current ||
          requestId !== reviewSubmitRequestIdRef.current
        ) {
          return;
        }

        setIsWriteReviewModalOpen(false);
        setReviewStatusMessage("Review submitted successfully.");
        await reloadReviews();
      } catch (error) {
        if (
          !isMountedRef.current ||
          requestId !== reviewSubmitRequestIdRef.current
        ) {
          return;
        }

        console.error("Failed to submit review.", error);
        setReviewStatusMessage(
          error instanceof ApiError
            ? error.uiMessage
            : "Failed to submit review. Please try again.",
        );
      } finally {
        if (
          isMountedRef.current &&
          requestId === reviewSubmitRequestIdRef.current
        ) {
          setIsSubmittingReview(false);
        }
      }
    },
    [isSubmittingReview, product?.id, reloadReviews],
  );

  const getSafeSelectedColorId = () => {
    if (selectedColorId) {
      return selectedColorId;
    }

    return product?.variants?.colors?.[0]?.id ?? null;
  };

  const getSafeSelectedSizeId = () => {
    if (selectedSizeId) {
      return selectedSizeId;
    }

    return product?.variants?.sizes?.[0]?.id ?? null;
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prev) => Math.max(DEFAULT_QUANTITY, prev - 1));
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityChange = (value: string) => {
    const sanitized = value.replace(/[^0-9]/g, "");
    setQuantity(normalizeQuantity(sanitized || DEFAULT_QUANTITY));
  };

  const handleAddToCart = () => {
    if (!product?.id) {
      return;
    }

    const safeColorId = getSafeSelectedColorId();
    const safeSizeId = getSafeSelectedSizeId();
    const safeQuantity = normalizeQuantity(quantity);

    addItem({
      productId: String(product.id),
      quantity: safeQuantity,
      color: safeColorId,
      size: safeSizeId,
    });
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="container u-mt-25">
        <section
          className="product-overview js-product-overview"
          aria-label="Product overview"
        >
          <Text as="p" className="product-overview__description">
            Product not found.
          </Text>
        </section>
      </div>
    );
  }

  return (
    <div className="container u-mt-25 product-detail-page">
      {/* Product Overview Section */}
      <section className="product-overview js-product-overview">
        <Breadcrumb
          items={product.breadcrumb || ["Home", "Shop", product.name]}
          className="u-mb-40 breadcrumb__list--truncate"
        />

        <div className="product-overview__details">
          <ProductGallery
            images={product.images || []}
            productName={product.name}
            thumbnail={product.thumbnail}
          />

          <div className="product-info">
            <ProductInfo product={product} />

            <ProductVariants
              variants={product.variants}
              onColorSelect={setSelectedColorId}
              onSizeSelect={setSelectedSizeId}
            />

            <ProductActions
              selectedColorId={getSafeSelectedColorId()}
              selectedSizeId={getSafeSelectedSizeId()}
              quantity={quantity}
              onDecreaseQuantity={handleDecreaseQuantity}
              onIncreaseQuantity={handleIncreaseQuantity}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </section>

      <ProductTabsSection
        details={product.details}
        reviews={reviews}
        reviewCount={reviewCount}
        faqs={product.faqs || []}
        isLoadingReviews={isLoadingReviews}
        isLoadingMoreReviews={isLoadingMoreReviews}
        hasMoreReviews={hasMore}
        selectedRating={selectedRating}
        selectedSort={selectedSort}
        onRatingChange={setFilter}
        onSortChange={setSort}
        onLoadMore={loadMore}
        reviewError={reviewError}
        onWriteReview={handleOpenReviewModal}
      />

      <RelatedProductsSection
        products={relatedProducts}
        isLoading={relatedLoading}
        formatPrice={formatPrice}
        title="You Might Also Like"
      />

      <WriteReviewModal
        key={
          isWriteReviewModalOpen ? "write-review-open" : "write-review-closed"
        }
        isOpen={isWriteReviewModalOpen}
        isSubmitting={isSubmittingReview}
        onClose={handleCloseReviewModal}
        onSubmit={handleReviewSubmit}
      />

      {/* Screen reader announcer */}
      <div aria-live="polite" className="sr-only js-sr-announcer">
        {reviewStatusMessage}
      </div>
    </div>
  );
};

export default ProductDetail;
