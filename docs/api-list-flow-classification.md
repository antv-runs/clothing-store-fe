# API List Flow Classification and Wrapper Adoption Rule

Date: 2026-04-07  
Status: Convention only (no runtime behavior changes)

## Purpose

This document defines which list-like flows are true API lists vs derived flows, so a future shared list-state wrapper is applied only where it adds value and does not over-generalize business/UI logic.

## Classification Table

| Flow                          | Primary owner                                                 | Source of truth                                      | Class                 | Wrapper candidate | Notes                                                                                                                                                                      |
| ----------------------------- | ------------------------------------------------------------- | ---------------------------------------------------- | --------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home - New Arrivals           | src/hooks/useHomeData/index.ts                                | Direct API response from `getProducts(page:1)`       | True API list         | Yes               | Standard list lifecycle (loading/error/retry/empty/success).                                                                                                               |
| Home - Top Selling            | src/hooks/useHomeData/index.ts                                | Direct API response from `getProducts(page:2)`       | True API list         | Yes               | Same pattern as New Arrivals.                                                                                                                                              |
| Home - Reviews                | src/hooks/useHomeData/index.ts                                | Direct API response from `getReviewsByProductId`     | True API list         | Yes               | List lifecycle driven by API response array.                                                                                                                               |
| ProductReviews (detail tab)   | src/hooks/useProductReviews/index.ts                          | Direct API response with pagination metadata         | True API list         | Yes               | Supports extras (`hasMore`, `loadMore`, filters/sort). Wrapper should keep extras outside core contract.                                                                   |
| RelatedProducts (detail page) | src/hooks/useProductDetailData/index.ts                       | Direct API response from `getProducts`               | True API list         | Yes               | Depends on product detail readiness; expose invalid state/params separately from API error.                                                                                |
| Cart hydration list           | src/hooks/useCartRows/index.ts                                | API hydration from cart row ids + local storage rows | Hybrid / special-case | Conditional       | Uses API list-like hydration state but output list is merged with local rows and cart identity keys. Use wrapper only for hydration sub-state, not cart domain operations. |
| Checkout summary panel        | src/pages/Checkout/index.tsx + src/hooks/useCartRows/index.ts | Derived from hydrated cart items and pricing rules   | Derived list          | No (default)      | Not a direct API list lifecycle. It is computed business state and should stay outside generic list wrapper by default.                                                    |

## Wrapper Adoption Rule

Use the shared list-state wrapper only when all conditions are true:

1. The rendered collection is directly backed by an API fetch lifecycle.
2. The flow naturally maps to core list state (`data`, `isLoading`, `isRetrying`, `isEmpty`, `error`, `errorKind`, `retry`).
3. Empty state has business meaning distinct from error state.
4. Retry semantics are API-retry semantics (not submit/form recalculation semantics).

Do not use the shared wrapper by default when one or more are true:

1. The list is computed/aggregated from existing app state (derived view model).
2. The flow primarily represents business transforms (totals, discounts, grouping, eligibility) rather than API list lifecycle.
3. The "list" state is a side effect of another domain concern (form submission, checkout orchestration, cart mutation logic).

## Exceptions and Special Cases

1. Cart hydration is allowed as a limited special-case consumer.

- Apply shared wrapper semantics only to hydration sub-state (`loading/error/retry/empty` for hydrated items).
- Keep cart operations (`addItem`, `removeItem`, quantity updates, summary math, storage sync) outside wrapper.

2. ProductReviews keeps list-specific pagination controls.

- Core wrapper state should coexist with extras (`hasMore`, `loadMore`, `isLoadingMore`, filter/sort controls).

3. RelatedProducts depends on product readiness.

- Missing product context should be treated as invalid state/params path, not as API error or empty.

## Practical Migration Guidance

1. Migrate true API lists first: Home sections, ProductReviews, RelatedProducts.
2. Keep checkout summary excluded unless its source-of-truth changes to a direct API list lifecycle.
3. For hybrid flows, wrap only the API-facing slice and leave domain logic local.
