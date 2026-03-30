import React, { useState, useEffect, useCallback } from "react";
import type { ProductVariants as ProductVariantsData } from "@custom-types/product";
import { Text, Icon } from "@components/atoms";
import "./ProductVariants.scss";

interface ProductVariantsProps {
  variants: ProductVariantsData;
  /** Callback fired when user selects a color. Receives the selected color ID. */
  onColorSelect?: (colorId: string) => void;
  /** Callback fired when user selects a size. Receives the selected size ID. */
  onSizeSelect?: (sizeId: string) => void;
}

/**
 * Determines if a color code represents a light color
 * Uses WCAG 2.1 luminance formula to ensure text contrast
 */
const isLightColor = (colorCode: string): boolean => {
  const parseColor = (
    code: string,
  ): { r: number; g: number; b: number } | null => {
    const normalized = String(code || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");

    // Handle shorthand hex: #fff
    const hexShortPattern = /^#[0-9a-f]{3}$/;
    if (hexShortPattern.test(normalized)) {
      const [r, g, b] = normalized
        .slice(1)
        .split("")
        .map((c) => parseInt(c + c, 16));
      return { r, g, b };
    }

    // Handle full hex: #ffffff
    const hexFullPattern = /^#[0-9a-f]{6}$/;
    if (hexFullPattern.test(normalized)) {
      const r = parseInt(normalized.slice(1, 3), 16);
      const g = parseInt(normalized.slice(3, 5), 16);
      const b = parseInt(normalized.slice(5, 7), 16);
      return { r, g, b };
    }

    // Handle rgb() / rgba()
    const rgbPattern = /^rgba?\((\d+),(\d+),(\d+)/;
    const rgbMatch = normalized.match(rgbPattern);
    if (rgbMatch) {
      return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
    }

    // Fallback: use Canvas API to resolve named CSS colors
    try {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = code;
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        return { r, g, b };
      }
    } catch {
      // Ignore canvas errors
    }

    return null;
  };

  const rgb = parseColor(colorCode);
  if (!rgb) return false;

  // Calculate relative luminance per WCAG 2.1
  const toLinear = (c: number): number => {
    const s = c / 255;
    const SRGB_THRESHOLD = 0.04045;
    const SRGB_DIVISOR = 12.92;
    const GAMMA_OFFSET = 0.055;
    const GAMMA_DIVISOR = 1.055;
    const GAMMA_EXPONENT = 2.4;

    return s <= SRGB_THRESHOLD
      ? s / SRGB_DIVISOR
      : Math.pow((s + GAMMA_OFFSET) / GAMMA_DIVISOR, GAMMA_EXPONENT);
  };

  const luminance =
    0.2126 * toLinear(rgb.r) +
    0.7152 * toLinear(rgb.g) +
    0.0722 * toLinear(rgb.b);

  const LIGHT_COLOR_LUMINANCE_THRESHOLD = 0.179;
  return luminance > LIGHT_COLOR_LUMINANCE_THRESHOLD;
};

/**
 * ProductVariants organism - Color and size selectors
 * Displays available product variants for user selection with interactive state management
 */
export const ProductVariants: React.FC<ProductVariantsProps> = ({
  variants,
  onColorSelect,
  onSizeSelect,
}) => {
  const [selectedColorId, setSelectedColorId] = useState<string | null>(() =>
    variants?.colors?.length ? variants.colors[0]?.id || null : null,
  );
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(() =>
    variants?.sizes?.length ? variants.sizes[0]?.id || null : null,
  );

  // Sync color selection when variant list changes
  useEffect(() => {
    setSelectedColorId((prev) => {
      if (!variants?.colors?.length) return null;
      if (prev && variants.colors.some((c) => c.id === prev)) return prev;
      return variants.colors[0]?.id || null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variants?.colors?.length, variants?.colors?.[0]?.id]);

  // Sync size selection when variant list changes
  useEffect(() => {
    setSelectedSizeId((prev) => {
      if (!variants?.sizes?.length) return null;
      if (prev && variants.sizes.some((s) => s.id === prev)) return prev;
      return variants.sizes[0]?.id || null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variants?.sizes?.length, variants?.sizes?.[0]?.id]);

  const handleColorSelect = useCallback(
    (colorId: string) => {
      setSelectedColorId(colorId);
      onColorSelect?.(colorId);
    },
    [onColorSelect],
  );

  const handleSizeSelect = useCallback(
    (sizeId: string) => {
      setSelectedSizeId(sizeId);
      onSizeSelect?.(sizeId);
    },
    [onSizeSelect],
  );

  return (
    <>
      <div className="product-overview__choose">
        <Text as="p">Select Colors</Text>
        <div
          id="product-color-options"
          className="product-overview__choose-colors"
        >
          {variants?.colors?.length ? (
            variants.colors.map((color) => {
              const isSelected = color.id === selectedColorId;
              const isLight = isLightColor(color.colorCode || "#c5c5c5");
              const checkmarkColor = isLight ? "#000" : "#fff";

              return (
                <button
                  key={color.id}
                  type="button"
                  className={`color-option${isSelected ? " is-active" : ""}${isLight ? " is-light" : ""}`}
                  style={{ backgroundColor: color.colorCode || "#c5c5c5" }}
                  aria-label={color.label}
                  title={color.label}
                  aria-pressed={isSelected}
                  onClick={() => handleColorSelect(color.id)}
                >
                  {isSelected && (
                    <Icon
                      svgName="icn_select_colors_tick"
                      width="13px"
                      color={checkmarkColor}
                    />
                  )}
                </button>
              );
            })
          ) : (
            <Text as="span">No colors available</Text>
          )}
        </div>
      </div>

      <div className="product-overview__size">
        <Text as="p">Choose Size</Text>
        <div
          id="product-size-options"
          className="product-overview__size-options js-product-size-options"
        >
          {variants?.sizes?.length ? (
            variants.sizes.map((size) => (
              <button
                key={size.id}
                type="button"
                className={`size-option js-size-option${size.id === selectedSizeId ? " is-active" : ""}`}
                disabled={size.inStock === false}
                aria-pressed={
                  size.id === selectedSizeId && size.inStock !== false
                }
                onClick={() => handleSizeSelect(size.id)}
              >
                {size.label}
              </button>
            ))
          ) : (
            <Text as="span">No sizes available</Text>
          )}
        </div>
      </div>
    </>
  );
};
