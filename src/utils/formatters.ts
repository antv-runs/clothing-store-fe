/**
 * Shared utility functions for formatting and data manipulation
 */

import { DEFAULT_CURRENCY } from "@/const/pricing";

export function formatPrice(amount: number, currency = DEFAULT_CURRENCY): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateValue: string): string {
  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) {
    return dateValue;
  }

  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function normalizeId(a: string, b: string): boolean {
  if (a === b) {
    return true;
  }

  const na = Number(a);
  const nb = Number(b);
  return Number.isFinite(na) && na === nb;
}
