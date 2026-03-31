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
import { getProductById } from "@/api/Product";
import { getReviewsByProductId } from "@/api/Review";
import type { Product } from "@/types/product";
import type { Review } from "@/types/review";
import { formatPrice } from "@/utils/formatters";
import { Text } from "@/components/atoms/Text";
import "./ProductDetailPage.scss";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const normalizedRouteId = String(id || "").trim();

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [reviewCount, setReviewCount] = useState(0);
  // Track selected color and size for add-to-cart functionality
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    if (!normalizedRouteId) {
      setProduct(null);
      setProductReviews([]);
      setReviewCount(0);
      setIsLoading(false);
      return () => {
        abortController.abort();
      };
    }

    async function loadProductDetail() {
      setIsLoading(true);
      setProduct(null);
      setProductReviews([]);
      setReviewCount(0);

      try {
        const productResult = await getProductById(normalizedRouteId);

        if (!productResult) {
          setProduct(null);
          setProductReviews([]);
          setReviewCount(0);
          setSelectedColorId(null);
          setSelectedSizeId(null);
          return;
        }

        setProduct(productResult);
        // Reset variant selections when product changes
        setSelectedColorId(null);
        setSelectedSizeId(null);

        const reviewsResult = await getReviewsByProductId(productResult.id, {
          page: 1,
          perPage: 50,
          sort: "latest",
        });

        setProductReviews(reviewsResult.data);
        setReviewCount(reviewsResult.meta.total);

        console.log("Fetched product:", productResult); // Debug log to verify fetched product data
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Failed to load product detail data.", error);
        setProduct(null);
        setProductReviews([]);
        setReviewCount(0);
        setSelectedColorId(null);
        setSelectedSizeId(null);
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
        reviewCount={productReviews?.length || 0}
        faqs={product.faqs || []}
      />

      <RelatedProductsSection
        currentProductId={String(product.id)}
        formatPrice={formatPrice}
      />

      <WriteReviewModal />

      {/* Screen reader announcer */}
      <div aria-live="polite" className="sr-only js-sr-announcer"></div>
    </div>
  );
};

export default ProductDetailPage;
