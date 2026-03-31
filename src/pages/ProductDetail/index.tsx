import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "@/components/organisms/Breadcrumb";
import { ProductGallery } from "@/components/organisms/ProductGallery";
import { ProductInfo } from "@/components/organisms/ProductInfo";
import { ProductVariants } from "@/components/organisms/ProductVariants";
import { ProductActions } from "@/components/molecules/ProductActions";
import { ProductTabsSection } from "@/components/organisms/ProductTabsSection";
import { RelatedProductsSection } from "@/components/organisms/RelatedProductsSection";
import { WriteReviewModal } from "@/components/organisms/WriteReviewModal";
import { getProductById, getProducts } from "@/api/Product";
import { getReviewsByProductId } from "@/api/Review";
import type { Product } from "@/types/product";
import type { Review } from "@/types/review";
import { formatPrice } from "@/utils/formatters";
import { Text } from "@/components/atoms/Text";
import "./index.scss";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const normalizedRouteId = String(id || "").trim();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [reviewPage, setReviewPage] = useState(1);
  const [reviewLastPage, setReviewLastPage] = useState(1);
  const [reviewSort, setReviewSort] = useState<"latest" | "oldest" | "highest">(
    "latest",
  );
  const [reviewRatingFilter, setReviewRatingFilter] = useState<string>("All");
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [isLoadingMoreReviews, setIsLoadingMoreReviews] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  // Track selected color and size for add-to-cart functionality
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    if (!normalizedRouteId) {
      setProduct(null);
      setProductReviews([]);
      setIsLoading(false);
      setRelatedProducts([]);
      setRelatedLoading(false);
      return () => {
        abortController.abort();
      };
    }

    async function loadProductDetail() {
      setIsLoading(true);
      setProduct(null);
      setProductReviews([]);
      setRelatedProducts([]);
      setRelatedLoading(false);

      try {
        const productResult = await getProductById(normalizedRouteId);

        if (!productResult) {
          setProduct(null);
          setProductReviews([]);
          setSelectedColorId(null);
          setSelectedSizeId(null);
          return;
        }

        setProduct(productResult);
        // Reset variant selections when product changes
        setSelectedColorId(null);
        setSelectedSizeId(null);
        setProductReviews([]);
        setReviewTotal(0);
        setReviewPage(1);
        setReviewLastPage(1);
        setReviewSort("latest");
        setReviewRatingFilter("All");
        setReviewError(null);

        // Fetch related products
        setRelatedLoading(true);
        try {
          const relatedResult = await getProducts({
            page: 1,
            per_page: 8,
          });
          setRelatedProducts(relatedResult.data);
        } catch (relatedError) {
          console.error("Failed to load related products.", relatedError);
          setRelatedProducts([]);
        } finally {
          setRelatedLoading(false);
        }

        console.log("Fetched product:", productResult); // Debug log to verify fetched product data
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Failed to load product detail data.", error);
        setProduct(null);
        setProductReviews([]);
        setSelectedColorId(null);
        setSelectedSizeId(null);
        setRelatedProducts([]);
        setRelatedLoading(false);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadProductDetail();

    return () => {
      abortController.abort();
    };
  }, [normalizedRouteId]);

  const reviewPerPage = 6;

  const queryRating = (rating: string) => {
    return rating === "All" ? null : Number(rating);
  };

  const loadReviews = async (page: number, append = false) => {
    if (!product?.id) {
      return;
    }

    if (append) {
      setIsLoadingMoreReviews(true);
    } else {
      setIsLoadingReviews(true);
    }

    setReviewError(null);

    try {
      const result = await getReviewsByProductId(product.id, {
        page,
        perPage: reviewPerPage,
        rating: queryRating(reviewRatingFilter),
        sort: reviewSort,
      });

      if (append) {
        setProductReviews((prev) => [...prev, ...result.data]);
      } else {
        setProductReviews(result.data);
      }

      setReviewTotal(result.meta.total);
      setReviewLastPage(result.meta.last_page);
    } catch (error) {
      console.error("Failed to load reviews", error);
      setReviewError("Unable to load reviews. Please try again.");
    } finally {
      setIsLoadingReviews(false);
      setIsLoadingMoreReviews(false);
    }
  };

  const handleLoadMoreReviews = async () => {
    if (!product?.id || reviewPage >= reviewLastPage) {
      return;
    }

    const nextPage = reviewPage + 1;
    await loadReviews(nextPage, true);
    setReviewPage(nextPage);
  };

  const handleReviewRatingChange = (value: string) => {
    setReviewRatingFilter(value);
    setReviewPage(1);
  };

  const handleReviewSortChange = (value: "latest" | "oldest" | "highest") => {
    setReviewSort(value);
    setReviewPage(1);
  };

  useEffect(() => {
    if (!product?.id) {
      return;
    }

    setReviewPage(1);
    loadReviews(1, false);
  }, [product?.id, reviewRatingFilter, reviewSort]);

  const hasMoreReviews = reviewPage < reviewLastPage;

  if (isLoading) {
    return (
      <div className="container u-mt-25">
        <section
          className="product-overview js-product-overview"
          aria-label="Product overview"
        >
          <Text as="p" className="product-overview__description">
            Loading product...
          </Text>
        </section>
      </div>
    );
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
    <div className="container u-mt-25">
      {/* Product Overview Section */}
      <section className="product-overview js-product-overview">
        <Breadcrumb
          items={product.breadcrumb || ["Home", "Shop", product.name]}
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
              selectedColorId={selectedColorId}
              selectedSizeId={selectedSizeId}
            />
          </div>
        </div>
      </section>

      <ProductTabsSection
        details={product.details}
        reviews={productReviews}
        reviewCount={reviewTotal || productReviews.length}
        faqs={product.faqs || []}
        isLoadingReviews={isLoadingReviews}
        isLoadingMoreReviews={isLoadingMoreReviews}
        hasMoreReviews={hasMoreReviews}
        selectedRating={reviewRatingFilter}
        selectedSort={reviewSort}
        onRatingChange={handleReviewRatingChange}
        onSortChange={handleReviewSortChange}
        onLoadMore={handleLoadMoreReviews}
        reviewError={reviewError}
      />

      <RelatedProductsSection
        products={relatedProducts}
        isLoading={relatedLoading}
        formatPrice={formatPrice}
        title="You Might Also Like"
      />

      <WriteReviewModal />

      {/* Screen reader announcer */}
      <div aria-live="polite" className="sr-only js-sr-announcer"></div>
    </div>
  );
};

export default ProductDetail;
