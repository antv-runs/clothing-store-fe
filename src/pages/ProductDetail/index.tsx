import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "@/components/organisms/Breadcrumb";
import { ProductGallery } from "@/components/organisms/ProductGallery";
import { ProductInfo } from "@/components/organisms/ProductInfo";
import { ProductVariants } from "@/components/organisms/ProductVariants";
import { ProductActions } from "@/components/molecules/ProductActions";
import { ProductTabsSection } from "@/components/organisms/ProductTabsSection";
import { RelatedProductsSection } from "@/components/organisms/RelatedProductsSection";
import { WriteReviewModal } from "@/components/organisms/WriteReviewModal";
import { ErrorBoundary } from "@/components/organisms/ErrorBoundary";
import { ProductDetailSkeleton } from "@/components/organisms/ProductDetailSkeleton";
import { formatPrice } from "@/utils/formatters";
import { ProductNotFound } from "@/components/organisms/ProductNotFound";
import { useCartRows } from "@/hooks/useCartRows";
import { useProductDetailData } from "@/hooks/useProductDetailData";
import { useProductReviews } from "@/hooks/useProductReviews";
import { useReviewSubmit } from "@/hooks/useReviewSubmit";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/atoms/Button";
import { Text } from "@/components/atoms/Text";
import { ROUTES } from "@/routes/paths";
import "./index.scss";

import { ERROR_MESSAGES } from "@/const/errorMessages";
import { UI_TEXT } from "@/const/uiText";
import { TOAST_DEFAULT_DURATION, DEFAULT_QUANTITY } from "@/const/ui";
import { normalizeQuantity } from "@/utils/quantity";

const ProductDetail = () => {
  const { id } = useParams();
  const normalizedRouteId = String(id || "").trim();

  const {
    product,
    isLoading,
    errorType,
    relatedProducts,
    relatedLoading,
    relatedError,
    relatedErrorKind,
    isRetryingRelated,
    retryRelatedProducts,
    retry,
  } = useProductDetailData(normalizedRouteId);

  // Track selected color and size for add-to-cart functionality
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(DEFAULT_QUANTITY);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [isWriteReviewModalOpen, setIsWriteReviewModalOpen] =
    useState<boolean>(false);

  const {
    reviews,
    reviewCount,
    selectedRating,
    selectedSort,
    hasMore,
    isLoading: isLoadingReviews,
    isLoadingMore: isLoadingMoreReviews,
    isRetrying: isRetryingReviews,
    error: reviewError,
    errorKind: reviewErrorKind,
    setFilter,
    setSort,
    loadMore,
    reloadReviews,
  } = useProductReviews(product?.id);
  const { addItem } = useCartRows();
  const { showToast } = useToast();

  const handleReviewSubmitSuccess = useCallback(async () => {
    setIsWriteReviewModalOpen(false);
    showToast({
      message: UI_TEXT.REVIEW_SUBMIT_SUCCESS_TOAST,
      variant: "success",
      duration: TOAST_DEFAULT_DURATION,
    });
    await reloadReviews();
  }, [reloadReviews, showToast]);

  const {
    isSubmittingReview,
    reviewStatusMessage,
    clearReviewStatusMessage,
    handleReviewSubmit,
  } = useReviewSubmit({
    productId: product?.id,
    onSuccess: handleReviewSubmitSuccess,
  });

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const resetSelectionTimeout = window.setTimeout(() => {
      setSelectedColorId(null);
      setSelectedSizeId(null);
      setQuantity(DEFAULT_QUANTITY);
    }, 0);

    return () => {
      window.clearTimeout(resetSelectionTimeout);
    };
  }, [isLoading, normalizedRouteId]);

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

    clearReviewStatusMessage();
    setIsWriteReviewModalOpen(true);
  }, [clearReviewStatusMessage, isSubmittingReview]);

  const handleCloseReviewModal = useCallback(() => {
    if (isSubmittingReview) {
      return;
    }

    setIsWriteReviewModalOpen(false);
  }, [isSubmittingReview]);

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
    if (isAddingToCart) {
      return;
    }

    if (!product?.id) {
      showToast({
        message: ERROR_MESSAGES.CART_ADD_ERROR,
        variant: "error",
      });
      return;
    }

    const safeColorId = getSafeSelectedColorId();
    const safeSizeId = getSafeSelectedSizeId();
    const safeQuantity = normalizeQuantity(quantity);

    setIsAddingToCart(true);

    try {
      addItem({
        productId: String(product.id),
        quantity: safeQuantity,
        color: safeColorId,
        size: safeSizeId,
      });

      showToast({
        message: UI_TEXT.ITEM_ADDED_TO_CART,
        variant: "success",
      });
    } catch {
      showToast({
        message: ERROR_MESSAGES.CART_ADD_ERROR,
        variant: "error",
      });
    } finally {
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 300);
    }
  };

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (errorType === "network_error" || errorType === "system_error") {
    const message =
      errorType === "network_error"
        ? ERROR_MESSAGES.PRODUCT_LOAD_NETWORK
        : ERROR_MESSAGES.PRODUCT_LOAD_SYSTEM;

    return (
      <div className="container u-mt-25">
        <div className="product-overview product-not-found">
          <Text as="p" className="product-overview__description">
            {message}
          </Text>
          <Button
            variant="primary"
            className="product-not-found__action"
            onClick={retry}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!product || errorType === "not_found") {
    return <ProductNotFound />;
  }

  return (
    <div className="container u-mt-25 product-detail-page">
      {/* Product Overview Section */}
      <section className="product-overview">
        <Breadcrumb
          items={
            product.breadcrumb || [
              { label: "Home", href: ROUTES.HOME },
              { label: "Shop", href: ROUTES.HOME },
              { label: product.name },
            ]
          }
          className="u-mb-40"
        />

        <div className="product-overview__details">
          <ErrorBoundary
            resetKeys={[product.id, product.images, product.thumbnail]}
            fallback={
              <div
                className="product-gallery product-gallery--fallback"
                aria-label="Product gallery unavailable"
              >
                <div className="product-gallery__thumbnails product-gallery__thumbnails--empty" />
                <div className="product-gallery__main">
                  <div className="product-gallery__main-wrapper">
                    <div
                      className="product-detail-page__local-fallback"
                      role="status"
                    >
                      Product gallery is temporarily unavailable.
                    </div>
                  </div>
                </div>
              </div>
            }
          >
            <ProductGallery
              images={product.images || []}
              productName={product.name}
              thumbnail={product.thumbnail}
            />
          </ErrorBoundary>

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
              isAddingToCart={isAddingToCart}
              onDecreaseQuantity={handleDecreaseQuantity}
              onIncreaseQuantity={handleIncreaseQuantity}
              onQuantityChange={handleQuantityChange}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </section>

      <ErrorBoundary
        resetKeys={[product.id]}
        fallback={
          <div className="product-detail-page__tabs-fallback" role="status">
            Product details and reviews are temporarily unavailable.
          </div>
        }
      >
        <ProductTabsSection
          details={product.details}
          reviews={reviews}
          reviewCount={reviewCount}
          faqs={product.faqs || []}
          isLoadingReviews={isLoadingReviews}
          isLoadingMoreReviews={isLoadingMoreReviews}
          isRetrying={isRetryingReviews}
          hasMoreReviews={hasMore}
          selectedRating={selectedRating}
          selectedSort={selectedSort}
          onRatingChange={setFilter}
          onSortChange={setSort}
          onLoadMore={loadMore}
          onRetry={reloadReviews}
          reviewError={reviewError}
          reviewErrorKind={reviewErrorKind}
          onWriteReview={handleOpenReviewModal}
        />
      </ErrorBoundary>

      <RelatedProductsSection
        products={relatedProducts}
        isLoading={relatedLoading}
        error={relatedError}
        errorKind={relatedErrorKind}
        isRetrying={isRetryingRelated}
        onRetry={retryRelatedProducts}
        formatPrice={formatPrice}
        title="You Might Also Like"
      />

      <ErrorBoundary
        resetKeys={[isWriteReviewModalOpen, product.id]}
        fallback={
          <p className="product-detail-page__modal-fallback" role="status">
            Review form is temporarily unavailable.
          </p>
        }
      >
        <WriteReviewModal
          key={
            isWriteReviewModalOpen ? "write-review-open" : "write-review-closed"
          }
          isOpen={isWriteReviewModalOpen}
          isSubmitting={isSubmittingReview}
          onClose={handleCloseReviewModal}
          onSubmit={handleReviewSubmit}
        />
      </ErrorBoundary>

      {/* Screen reader announcer */}
      <div aria-live="polite" className="sr-only">
        {reviewStatusMessage}
      </div>
    </div>
  );
};

export default ProductDetail;
