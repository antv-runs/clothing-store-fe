import { DEFAULT_QUANTITY } from "@/const/ui";

/**
 * Normalizes a quantity value from user input to a valid positive number.
 * Handles both numeric and string inputs, defaulting to DEFAULT_QUANTITY (1)
 * if the input is invalid or less than the minimum.
 *
 * @param value - The quantity value (number or string)
 * @returns A valid quantity >= DEFAULT_QUANTITY
 */
export const normalizeQuantity = (value: number | string): number => {
  const parsed = Number(value);
  return Math.max(
    DEFAULT_QUANTITY,
    Number.isFinite(parsed) ? parsed : DEFAULT_QUANTITY,
  );
};
