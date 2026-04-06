import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getProductById, getProducts } from "@/api/Product";
import type { Product } from "@/types/product";

export type DetailErrorType = "not_found" | "network_error" | "system_error" | null;

type UseProductDetailDataResult = {
  product: Product | null;
  isLoading: boolean;
  errorType: DetailErrorType;
  relatedProducts: Product[];
  relatedLoading: boolean;
  retry: () => void;
};

export const useProductDetailData = (
  productId: string,
): UseProductDetailDataResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [errorType, setErrorType] = useState<DetailErrorType>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [retryTrigger, setRetryTrigger] = useState(0);

  const retry = useCallback(() => {
    setRetryTrigger((prev) => prev + 1);
  }, []);

  const isNetworkFailure = (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      return false;
    }

    return (
      !error.response ||
      error.code === "ERR_NETWORK" ||
      error.code === "ECONNABORTED" ||
      error.code === "ETIMEDOUT"
    );
  };

  useEffect(() => {
    let isActive = true;

    if (!productId) {
      setProduct(null);
      setErrorType("not_found");
      setIsLoading(false);
      setRelatedProducts([]);
      setRelatedLoading(false);
      return () => {
        isActive = false;
      };
    }

    const loadProductDetail = async () => {
      setIsLoading(true);
      setErrorType(null);
      setProduct(null);
      setRelatedProducts([]);
      setRelatedLoading(false);

      try {
        const productResult = await getProductById(productId);

        if (!isActive) {
          return;
        }

        if (!productResult) {
          setErrorType("not_found");
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

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setErrorType("not_found");
          } else if (isNetworkFailure(error)) {
            setErrorType("network_error");
          } else {
            setErrorType("system_error");
          }
        } else if (!navigator.onLine) {
          setErrorType("network_error");
        } else {
          setErrorType("system_error");
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
  }, [productId, retryTrigger]);

  return {
    product,
    isLoading,
    errorType,
    relatedProducts,
    relatedLoading,
    retry,
  };
};
