import { logger } from "@/utils/logger";
import { useEffect, useState, useCallback } from "react";
import { getProductById, getProducts } from "@/api/Product";
import {
  isRetryableListErrorKind,
  mapApiErrorToListErrorKind,
  mapApiErrorToMessage,
} from "@/utils/apiErrorList";
import { ApiError } from "@/utils/apiError";
import type { Product } from "@/types/product";
import {
  LIST_ERROR_KIND,
  type ListCoreState,
  type ListErrorKind,
} from "@/types/listState";

export type DetailErrorType = "not_found" | "network_error" | "system_error" | null;

type UseProductDetailDataResult = {
  product: Product | null;
  isLoading: boolean;
  errorType: DetailErrorType;
  relatedProducts: Product[];
  relatedLoading: boolean;
  relatedError: string | null;
  relatedErrorKind: ListErrorKind | null;
  isRetryingRelated: boolean;
  isRetryableRelated: boolean;
  relatedIsEmpty: boolean;
  retryRelatedProducts: () => void;
  relatedList: ListCoreState<Product>;
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
  const [relatedErrorKind, setRelatedErrorKind] =
    useState<ListErrorKind | null>(null);
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
    if (
      !product?.id ||
      isRetryingRelated ||
      !relatedError ||
      !isRetryableListErrorKind(relatedErrorKind)
    ) {
      return;
    }

    setRelatedRetryProductId(product.id);
    setRelatedRetryTrigger((prev) => prev + 1);
  }, [isRetryingRelated, product?.id, relatedError, relatedErrorKind]);

  useEffect(() => {
    let isActive = true;

    if (!productId) {
      setProduct(null);
      setErrorType("not_found");
      setIsLoading(false);
      setRelatedProducts([]);
      setRelatedLoading(false);
      setRelatedError(null);
      setRelatedErrorKind(null);
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
      setRelatedErrorKind(null);
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

        if (error instanceof ApiError) {
          if (error.status === 404) {
            setErrorType("not_found");
          } else if (error.code === "NETWORK_ERROR") {
            setErrorType("network_error");
          } else {
            setErrorType("system_error");
          }
        } else if (!navigator.onLine) {
          setErrorType("network_error");
        } else {
          setErrorType("system_error");
        }

        logger.error("Failed to load product detail data.", error);
        setProduct(null);
        setRelatedProducts([]);
        setRelatedLoading(false);
        setRelatedError(null);
        setRelatedErrorKind(null);
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
      setRelatedErrorKind(null);
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
        setRelatedErrorKind(null);
      } catch (error) {
        if (!isActive) {
          return;
        }

        logger.error("Failed to load related products.", error);
        setRelatedProducts([]);
        setRelatedError(
          mapApiErrorToMessage(error, DEFAULT_RELATED_ERROR_MESSAGE),
        );
        setRelatedErrorKind(mapApiErrorToListErrorKind(error));
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

  const relatedInvalidState = !product?.id
    ? "Related products are unavailable until product detail is loaded."
    : null;
  const resolvedRelatedErrorKind: ListErrorKind | null = relatedInvalidState
    ? LIST_ERROR_KIND.INVALID_STATE
    : relatedErrorKind;
  const isRelatedRetryable = isRetryableListErrorKind(resolvedRelatedErrorKind);
  const relatedIsEmpty =
    Boolean(product?.id) &&
    !relatedLoading &&
    !isRetryingRelated &&
    !relatedError &&
    relatedProducts.length === 0;
  const relatedList: ListCoreState<Product> = {
    data: relatedProducts,
    isLoading: relatedLoading,
    isRetrying: isRetryingRelated,
    isRetryable: isRelatedRetryable,
    isEmpty: relatedIsEmpty,
    error: relatedError,
    errorKind: resolvedRelatedErrorKind,
    retry: retryRelatedProducts,
    invalidState: relatedInvalidState,
  };

  return {
    product,
    isLoading,
    errorType,
    relatedProducts,
    relatedLoading,
    relatedError,
    relatedErrorKind: resolvedRelatedErrorKind,
    isRetryingRelated,
    isRetryableRelated: isRelatedRetryable,
    relatedIsEmpty,
    retryRelatedProducts,
    relatedList,
    retry,
  };
};
