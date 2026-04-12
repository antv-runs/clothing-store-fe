import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./index";
import { SliderList } from "./SliderList";

/**
 * Slider is a generic horizontal scrolling molecule.
 * It handles drag, wheel-to-scroll, snap, and prev/next navigation.
 *
 * It is NOT tied to ProductCardList — these stories use plain content
 * to demonstrate that Slider works with any list of items.
 */
const meta = {
  title: "Molecules/Slider",
  component: Slider,
  tags: ["autodocs"],
  argTypes: {
    showNavigation: { control: "boolean" },
    loading: { control: "boolean" },
    snap: { control: "boolean" },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Shared demo content ─────────────────────────────────────────────────────
// Inline styles keep the story self-contained without leaking into production.

const CARD_COLORS = [
  "#4f46e5",
  "#0891b2",
  "#059669",
  "#d97706",
  "#dc2626",
  "#7c3aed",
  "#db2777",
  "#ea580c",
];

const demoCards = CARD_COLORS.map((color, i) => (
  <li
    key={i}
    style={{
      flex: "0 0 200px",
      width: 200,
      height: 140,
      borderRadius: 8,
      background: color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontFamily: "sans-serif",
      fontSize: 16,
      fontWeight: 600,
      userSelect: "none",
    }}
  >
    Card {i + 1}
  </li>
));

// ── Stories ─────────────────────────────────────────────────────────────────

export const WithNavigation: Story = {
  args: {
    showNavigation: true,
    loading: false,
    snap: true,
    className: "sb-slider-demo",
    navClassName: "sb-slider-demo__nav",
    prevButtonClassName: "sb-slider-demo__nav--prev",
    nextButtonClassName: "sb-slider-demo__nav--next",
  },
  render: (args) => (
    <div style={{ padding: "20px 60px" }}>
      <Slider {...args}>
        <SliderList
          className="sb-slider-demo__track"
          style={{ display: "flex", gap: 16, listStyle: "none", padding: 0, margin: 0 }}
        >
          {demoCards}
        </SliderList>
      </Slider>

      {/* Story-only nav positioning — keeps the story independent */}
      <style>{`
        .sb-slider-demo__nav { padding: 4px; opacity: 0.7; }
        .sb-slider-demo__nav:hover { opacity: 1; }
        .sb-slider-demo__nav:disabled { opacity: 0.2; }
        .sb-slider-demo__nav--prev { left: 0; }
        .sb-slider-demo__nav--next { right: 0; }
      `}</style>
    </div>
  ),
};

export const NoNavigation: Story = {
  args: {
    showNavigation: false,
    loading: false,
    snap: false,
  },
  render: (args) => (
    <div style={{ padding: "20px" }}>
      <Slider {...args}>
        <SliderList
          className="sb-slider-demo__track"
          style={{ display: "flex", gap: 16, listStyle: "none", padding: 0, margin: 0 }}
        >
          {demoCards}
        </SliderList>
      </Slider>
    </div>
  ),
};

export const LoadingState: Story = {
  args: {
    showNavigation: true,
    loading: true,
    snap: true,
    className: "sb-slider-demo",
    navClassName: "sb-slider-demo__nav",
    prevButtonClassName: "sb-slider-demo__nav--prev",
    nextButtonClassName: "sb-slider-demo__nav--next",
  },
  render: (args) => (
    <div style={{ padding: "20px 60px" }}>
      <Slider {...args}>
        <SliderList
          className="sb-slider-demo__track"
          style={{ display: "flex", gap: 16, listStyle: "none", padding: 0, margin: 0 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <li
              key={i}
              style={{
                flex: "0 0 200px",
                width: 200,
                height: 140,
                borderRadius: 8,
                background: "#e5e7eb",
              }}
            />
          ))}
        </SliderList>
      </Slider>

      <style>{`
        .sb-slider-demo__nav { padding: 4px; opacity: 0.7; }
        .sb-slider-demo__nav--prev { left: 0; }
        .sb-slider-demo__nav--next { right: 0; }
      `}</style>
    </div>
  ),
};
