import { renderHook, act, waitFor } from "@testing-library/react";
import { useReviewSubmit } from "./index";
import { submitReview } from "@/api/Review";
import { ApiError } from "@/utils/apiError";

jest.mock("@/api/Review", () => ({
  submitReview: jest.fn(),
}));

const mockedSubmitReview = submitReview as jest.MockedFunction<typeof submitReview>;

describe("useReviewSubmit", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it("resets submitting state after 500 ApiError", async () => {
    mockedSubmitReview.mockRejectedValueOnce(
      new ApiError({
        message: "Request failed",
        uiMessage: "Server error. Please try again later.",
        status: 500,
      }),
    );

    const { result } = renderHook(() => useReviewSubmit({ productId: "1" }));

    await act(async () => {
      await result.current.handleReviewSubmit({
        username: "Guest",
        comment: "Great",
        stars: 5,
      });
    });

    expect(result.current.isSubmittingReview).toBe(false);
    expect(result.current.reviewStatusMessage).toBe(
      "Server error. Please try again later.",
    );
  });

  it("resets submitting state after network/non-Api error", async () => {
    mockedSubmitReview.mockRejectedValueOnce(new Error("Network down"));

    const { result } = renderHook(() => useReviewSubmit({ productId: "1" }));

    await act(async () => {
      await result.current.handleReviewSubmit({
        username: "Guest",
        comment: "Great",
        stars: 5,
      });
    });

    expect(result.current.isSubmittingReview).toBe(false);
    expect(result.current.reviewStatusMessage).toBe(
      "Failed to submit review. Please try again.",
    );
  });

  it("handles 422 validation error response and unlocks form", async () => {
    mockedSubmitReview.mockRejectedValueOnce(
      new ApiError({
        message: "Validation failed",
        uiMessage: "Please check your input.",
        status: 422,
        validationErrors: {
          comment: ["Comment is too short."],
        },
      }),
    );

    const { result } = renderHook(() => useReviewSubmit({ productId: "1" }));

    await act(async () => {
      await result.current.handleReviewSubmit({
        username: "Guest",
        comment: "x",
        stars: 5,
      });
    });

    expect(result.current.isSubmittingReview).toBe(false);
    expect(result.current.reviewStatusMessage).toBe("Please check your input.");
  });

  it("completes success path and unlocks form", async () => {
    const onSuccess = jest.fn().mockResolvedValue(undefined);
    mockedSubmitReview.mockResolvedValueOnce({ id: "r-1" } as never);

    const { result } = renderHook(() =>
      useReviewSubmit({ productId: "1", onSuccess }),
    );

    await act(async () => {
      await result.current.handleReviewSubmit({
        username: "Guest",
        comment: "Great",
        stars: 5,
      });
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
    expect(result.current.isSubmittingReview).toBe(false);
    expect(result.current.reviewStatusMessage).toBe("Review submitted successfully.");
  });

  it("unlocks form when onSuccess throws", async () => {
    const onSuccess = jest.fn().mockRejectedValue(new Error("reload failed"));
    mockedSubmitReview.mockResolvedValueOnce({ id: "r-2" } as never);

    const { result } = renderHook(() =>
      useReviewSubmit({ productId: "1", onSuccess }),
    );

    await act(async () => {
      await result.current.handleReviewSubmit({
        username: "Guest",
        comment: "Great",
        stars: 5,
      });
    });

    await waitFor(() => {
      expect(result.current.isSubmittingReview).toBe(false);
    });
    expect(result.current.reviewStatusMessage).toBe(
      "Failed to submit review. Please try again.",
    );
  });
});
