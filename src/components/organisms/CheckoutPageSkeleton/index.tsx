import type { HTMLAttributes } from "react";
import { Skeleton } from "@/components/atoms/Skeleton";
import clsx from "clsx";

type CheckoutPageSkeletonProps = HTMLAttributes<HTMLDivElement>;

export const CheckoutPageSkeleton = ({ className, ...rest }: CheckoutPageSkeletonProps) => {
  return (
    <div className={clsx("checkout-page__layout", className)} aria-hidden="true" {...rest}>
      <div className="checkout-form">
        <div className="checkout-form__grid">
          <div className="checkout-form__field">
            <Skeleton variant="line" width="30%" height={20} />
            <Skeleton variant="rect" width="100%" height={48} radius={24} />
          </div>
          <div className="checkout-page__field">
            <Skeleton variant="line" width="30%" height={20} />
            <Skeleton variant="rect" width="100%" height={48} radius={24} />
          </div>
          <div className="checkout-form__field checkout-form__field--full">
            <Skeleton variant="line" width="30%" height={20} />
            <Skeleton variant="rect" width="100%" height={48} radius={24} />
          </div>
          <div className="checkout-form__field checkout-form__field--full">
            <Skeleton variant="line" width="15%" height={20} />
            <Skeleton variant="rect" width="100%" height={48} radius={24} />
          </div>
        </div>
        <Skeleton variant="rect" width="100%" height={48} radius={24} style={{ marginTop: 24 }} />
      </div>

      <aside className="checkout-summary" style={{ borderRadius: 20, padding: 24, border: "1px solid rgba(0,0,0,0.1)" }}>
        <Skeleton variant="line" width="60%" height={32} style={{ marginBottom: 24 }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[1, 2].map((i) => (
            <div key={i} style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <Skeleton variant="rect" width={64} height={64} radius={8} />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                <Skeleton variant="line" width="80%" height={20} />
                <Skeleton variant="line" width="40%" height={16} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(0,0,0,0.1)", display: "flex", flexDirection: "column", gap: 16 }}>
          <Skeleton variant="line" width="100%" height={24} />
          <Skeleton variant="line" width="100%" height={24} />
          <Skeleton variant="rect" width="100%" height={56} radius={28} style={{ marginTop: 8 }} />
        </div>
      </aside>
    </div>
  );
};
