import { useEffect, useState } from "react";
import { getProductById, getProducts } from "@/api/Product";
import type { Product } from "@/types/product";

type UseProductDetailDataResult = {
  product: Product | null;
  isLoading: boolean;
  relatedProducts: Product[];
  relatedLoading: boolean;
};

export const useProductDetailData = (
  productId: string,
): UseProductDetailDataResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  useEffect(() => {
    let isActive = true;

    if (!productId) {
      setProduct(null);
      setIsLoading(false);
      setRelatedProducts([]);
      setRelatedLoading(false);
      return () => {
        isActive = false;
      };
    }

    const loadProductDetail = async () => {
      setIsLoading(true);
      setProduct(null);
      setRelatedProducts([]);
      setRelatedLoading(false);

      try {
        const productResult = await getProductById(productId);

        if (!isActive) {
          return;
        }

        if (!productResult) {
          setProduct(null);
          return;
        }

        setProduct(productResult);

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
        setRelatedProducts([]);
        setRelatedLoading(false);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadProductDetail();

    return () => {
      isActive = false;
    };
  }, [productId]);

  return {
    product,
    isLoading,
    relatedProducts,
    relatedLoading,
  };
};
