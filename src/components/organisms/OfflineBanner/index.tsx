import type { HTMLAttributes } from "react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import "./index.scss";
import { UI_TEXT } from "@/const/uiText";

type OfflineBannerProps = HTMLAttributes<HTMLDivElement>;

/**
 * OfflineBanner — Shows a non-blocking fixed banner when the browser
 * loses internet connectivity. Automatically hides when back online.
 */
export const OfflineBanner = ({ className, ...rest }: OfflineBannerProps) => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [showBackOnline, setShowBackOnline] = useState(false);

  useEffect(() => {
    const handleOffline = () => {
      setShowBackOnline(false);
      setIsOffline(true);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setShowBackOnline(true);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // Auto-dismiss "Back online" after a short delay
  useEffect(() => {
    if (!showBackOnline) return;

    const timer = setTimeout(() => {
      setShowBackOnline(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [showBackOnline]);

  if (!isOffline && !showBackOnline) return null;

  return (
    <div
      className={clsx("offline-banner", showBackOnline && "offline-banner--online", className)}
      role="status"
      aria-live="assertive"
      {...rest}
    >
      <span className="offline-banner__icon" aria-hidden="true">
        {showBackOnline ? "✓" : "⚠"}
      </span>
      <span className="offline-banner__text">
        {showBackOnline
          ? UI_TEXT.BACK_ONLINE
          : UI_TEXT.NO_INTERNET_CONNECTION}
      </span>
    </div>
  );
};
