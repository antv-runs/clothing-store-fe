import { DEFAULT_QUANTITY } from "@/const/config";

/**
 * Number utilities for mathematical operations and constraints
 */

/**
 * Clamped a value between a minimum and maximum range
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Safely parse a value to a number, with a fallback
 */
export const toNumber = (value: any, fallback: number = 0): number => {
  const parsed = Number(value);
  return isNaN(parsed) ? fallback : parsed;
};

/**
 * Normalizes a quantity value from user input to a valid positive number.
 * Defaults to DEFAULT_QUANTITY (1) if the input is invalid or less than the minimum.
 */
export const normalizeQuantity = (value: number | string): number => {
  const parsed = Number(value);
  return Math.max(
    DEFAULT_QUANTITY,
    Number.isFinite(parsed) ? parsed : DEFAULT_QUANTITY,
  );
};

