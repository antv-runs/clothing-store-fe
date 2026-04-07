import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getProductById, getProducts } from "@/api/Product";
import { mapApiErrorToMessage } from "@/utils/apiErrorMapper";
import type { Product } from "@/types/product";

export type DetailErrorType = "not_found" | "network_error" | "system_error" | null;

type UseProductDetailDataResult = {
  product: Product | null;
  isLoading: boolean;
  errorType: DetailErrorType;
  relatedProducts: Product[];
  relatedLoading: boolean;
  relatedError: string | null;
  isRetryingRelated: boolean;
  retryRelatedProducts: () => void;
  retry: () => void;
};

const DEFAULT_RELATED_ERROR_MESSAGE =
  "Unable to load related products. Please try again.";

export const useProductDetailData = (
  productId: string,
): UseProductDetailDataResult => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [errorType, setErrorType] = useState<DetailErrorType>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedError, setRelatedError] = useState<string | null>(null);
  const [isRetryingRelated, setIsRetryingRelated] = useState(false);
  const [retryTrigger, setRetryTrigger] = useState(0);
  const [relatedRetryTrigger, setRelatedRetryTrigger] = useState(0);
  const [relatedRetryProductId, setRelatedRetryProductId] = useState<
    string | number | null
  >(null);

  const retry = useCallback(() => {
    setRetryTrigger((prev) => prev + 1);
  }, []);

  const retryRelatedProducts = useCallback(() => {
    if (!product?.id) {
      return;
    }

    setRelatedRetryProductId(product.id);
    setRelatedRetryTrigger((prev) => prev + 1);
  }, [product?.id]);

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
      setRelatedError(null);
      setIsRetryingRelated(false);
      setRelatedRetryProductId(null);
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
      setRelatedError(null);
      setIsRetryingRelated(false);
      setRelatedRetryProductId(null);

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
        setRelatedError(null);
        setIsRetryingRelated(false);
        setRelatedRetryProductId(null);
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

  useEffect(() => {
    let isActive = true;

    if (!product?.id) {
      setRelatedProducts([]);
      setRelatedLoading(false);
      setRelatedError(null);
      setIsRetryingRelated(false);
      setRelatedRetryProductId(null);
      return () => {
        isActive = false;
      };
    }

    const isRetryRequest =
      relatedRetryTrigger > 0 && relatedRetryProductId === product.id;

    if (isRetryRequest) {
      setIsRetryingRelated(true);
    } else {
      setRelatedLoading(true);
    }

    const loadRelatedProducts = async () => {
      try {
        const relatedResult = await getProducts({
          page: 1,
          per_page: 8,
        });

        if (!isActive) {
          return;
        }

        setRelatedProducts(relatedResult.data);
        setRelatedError(null);
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error("Failed to load related products.", error);
        setRelatedProducts([]);
        setRelatedError(
          mapApiErrorToMessage(error, DEFAULT_RELATED_ERROR_MESSAGE),
        );
      } finally {
        if (isActive) {
          setRelatedLoading(false);
          setIsRetryingRelated(false);
        }
      }
    };

    void loadRelatedProducts();

    return () => {
      isActive = false;
    };
  }, [product?.id, relatedRetryProductId, relatedRetryTrigger]);

  return {
    product,
    isLoading,
    errorType,
    relatedProducts,
    relatedLoading,
    relatedError,
    isRetryingRelated,
    retryRelatedProducts,
    retry,
  };
};
