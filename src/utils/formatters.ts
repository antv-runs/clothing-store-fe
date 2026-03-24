/**
 * Shared utility functions for formatting and data manipulation
 */

export function formatPrice(amount: number, currency = "USD"): string {
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

export function isSameProductId(routeId: string, productId: string): boolean {
  if (routeId === productId) {
    return true;
  }

  const routeAsNumber = Number(routeId);
  const productAsNumber = Number(productId);

  return Number.isFinite(routeAsNumber) && routeAsNumber === productAsNumber;
}

export function normalizeId(a: string, b: string): boolean {
  if (a === b) {
    return true;
  }

  const na = Number(a);
  const nb = Number(b);
  return Number.isFinite(na) && na === nb;
}
