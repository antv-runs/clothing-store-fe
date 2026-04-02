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
import { ProductDetailSkeleton } from "@/components/organisms/ProductDetailSkeleton";
import { getProductById, getProducts } from "@/api/Product";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatters";
import { Text } from "@/components/atoms/Text";
import { useProductReviews } from "@/hooks/useProductReviews";
import "./index.scss";

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const normalizedRouteId = String(id || "").trim();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  // Track selected color and size for add-to-cart functionality
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

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
  } = useProductReviews(product?.id);

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
          return;
        }

        setProduct(productResult);
        // Reset variant selections when product changes
        setSelectedColorId(null);
        setSelectedSizeId(null);

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

        console.log("Fetched product:", productResult); // Debug log to verify fetched product data
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error("Failed to load product detail data.", error);
        setProduct(null);
        setSelectedColorId(null);
        setSelectedSizeId(null);
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
              selectedColorId={selectedColorId}
              selectedSizeId={selectedSizeId}
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
