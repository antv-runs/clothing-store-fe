import type { Meta, StoryObj } from "@storybook/react";
import { OfflineBanner } from "./index";

/**
 * OfflineBanner listens to browser online/offline events so it cannot
 * be controlled via props. Each story renders the banner in a specific
 * visual state by rendering the underlying markup directly.
 */

const meta = {
  title: "Organisms/OfflineBanner",
  component: OfflineBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof OfflineBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Live component — banner appears only when the browser is actually offline.
 * Use DevTools → Network → Offline to trigger it.
 */
export const Default: Story = {};

/** Simulated offline state (visual only). */
export const Offline: Story = {
  render: () => (
    <div
      className="offline-banner"
      role="status"
      aria-live="assertive"
      style={{ transform: "translateY(0)" }}
    >
      <span className="offline-banner__icon" aria-hidden="true">⚠</span>
      <span className="offline-banner__text">No internet connection</span>
    </div>
  ),
};

/** Simulated back-online state (visual only). */
export const BackOnline: Story = {
  render: () => (
    <div
      className="offline-banner offline-banner--online"
      role="status"
      aria-live="assertive"
      style={{ transform: "translateY(0)", animation: "none" }}
    >
      <span className="offline-banner__icon" aria-hidden="true">✓</span>
      <span className="offline-banner__text">Back online</span>
    </div>
  ),
};
