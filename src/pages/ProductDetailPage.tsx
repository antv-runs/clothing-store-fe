import { FooterForm } from "../components/organisms/Footer";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { reviews } from "../data/reviews";
import { Breadcrumb } from "../components/organisms/Breadcrumb/Breadcrumb";
import { ProductGallery } from "../components/organisms/ProductGallery/ProductGallery";
import { ProductInfo } from "../components/organisms/ProductInfo/ProductInfo";
import { ProductVariants } from "../components/organisms/ProductVariants/ProductVariants";
import { ProductActions } from "../components/molecules/ProductActions/ProductActions";
import { ProductTabsSection } from "../components/organisms/ProductTabsSection/ProductTabsSection";
import { RelatedProductsSection } from "../components/organisms/RelatedProductsSection/RelatedProductsSection";
import { WriteReviewModal } from "../components/organisms/WriteReviewModal/WriteReviewModal";
import "./ProductDetailPage.scss";

function formatPrice(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function isSameProductId(routeId: string, productId: string) {
  if (routeId === productId) {
    return true;
  }

  const routeAsNumber = Number(routeId);
  const productAsNumber = Number(productId);

  return Number.isFinite(routeAsNumber) && routeAsNumber === productAsNumber;
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const normalizedRouteId = String(id || "").trim();

  const product = useMemo(() => {
    if (!normalizedRouteId) {
      return null;
    }

    return (
      products.find((item) =>
        isSameProductId(normalizedRouteId, String(item.id)),
      ) || null
    );
  }, [normalizedRouteId]);

  const productReviews = useMemo(() => {
    if (!product) {
      return [];
    }

    return reviews.filter((item) =>
      isSameProductId(String(item.productId), String(product.id)),
    );
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    const relatedFromIds = product.relatedProductIds
      .map((relatedId) =>
        products.find((item) =>
          isSameProductId(String(relatedId), String(item.id)),
        ),
      )
      .filter((item): item is (typeof products)[number] => {
        return item !== undefined && item.id !== product.id;
      });

    if (relatedFromIds.length > 0) {
      return relatedFromIds.slice(0, 4);
    }

    return products.filter((item) => item.id !== product.id).slice(0, 4);
  }, [product]);

  if (!product) {
    console.log("[RENDER] Product is null, showing 'not found' message");
    return (
      <div className="container">
        <main className="product-overview js-product-overview">
          <p className="product-overview__description">Product not found.</p>
        </main>
        <FooterForm />
      </div>
    );
  }

  console.log("[RENDER] Rendering product page for:", product.id, product.name);
  console.log("[RENDER] Props to ProductGallery:", {
    imagesLength: product.images?.length,
    imagesSample: product.images?.[0],
    thumbnail: product.thumbnail,
  });

  return (
    <div className="container">
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

          <div className="product-overview__info">
            <ProductInfo product={product} withContainer={false} />

            <ProductVariants variants={product.variants} />

            <ProductActions />
          </div>
        </div>
      </section>

      <ProductTabsSection
        details={product.details}
        reviews={productReviews}
        reviewCount={productReviews.length || product.reviewCount || 0}
        faqs={product.faqs || []}
      />

      <RelatedProductsSection
        items={relatedProducts}
        formatPrice={formatPrice}
      />

      {/* Footer Form (newsletter) */}
      <FooterForm />

      <WriteReviewModal />

      {/* Screen reader announcer */}
      <div aria-live="polite" className="sr-only js-sr-announcer"></div>
    </div>
  );
};

export default ProductDetailPage;
