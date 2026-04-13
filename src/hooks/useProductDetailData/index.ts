import { logger } from "@/utils/logger";
import { useEffect, useState, useCallback } from "react";
import { getProducts } from "@/api/Product";
import {
  isRetryableListErrorKind,
  mapApiErrorToListErrorKind,
  mapApiErrorToMessage,
} from "@/utils/apiErrorList";
import type { Product } from "@/types/product";
import {
  LIST_ERROR_KIND,
  type ListCoreState,
  type ListErrorKind,
} from "@/types/listState";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchProductById } from "@/store/product/productThunks";
import { selectProductById, selectProductLoading, selectProductError } from "@/store/product/productSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => selectProductById(state, productId));
  const isLoading = useSelector((state: RootState) => selectProductLoading(state, productId));
  const productError = useSelector((state: RootState) => selectProductError(state, productId));

  const [errorType, setErrorType] = useState<DetailErrorType>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  const [relatedError, setRelatedError] = useState<string | null>(null);
  const [relatedErrorKind, setRelatedErrorKind] =
    useState<ListErrorKind | null>(null);
  const [isRetryingRelated, setIsRetryingRelated] = useState(false);
  const [relatedRetryTrigger, setRelatedRetryTrigger] = useState(0);
  const [relatedRetryProductId, setRelatedRetryProductId] = useState<
    string | number | null
  >(null);

  const retry = useCallback(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

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
    if (!productId) {
      setErrorType("not_found");
      setRelatedProducts([]);
      setRelatedLoading(false);
      setRelatedError(null);
      setRelatedErrorKind(null);
      setIsRetryingRelated(false);
      setRelatedRetryProductId(null);
      return;
    }

    // If product is not in cache, fetch it
    if (!product && !isLoading) {
      dispatch(fetchProductById(productId));
    }

    // Update error type based on Redux error state
    if (productError) {
      // Since productError is a string, we need to infer the error type
      if (productError.includes("404") || productError.includes("not found")) {
        setErrorType("not_found");
      } else if (productError.includes("network") || productError.includes("fetch")) {
        setErrorType("network_error");
      } else {
        setErrorType("system_error");
      }
    } else if (product) {
      setErrorType(null);
    }
  }, [productId, product, isLoading, productError, dispatch]);

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
    product: product || null,
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
