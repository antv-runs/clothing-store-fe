import type { HTMLAttributes } from "react";
import { Skeleton } from "@/components/atoms/Skeleton";
import clsx from "clsx";

type CartPageSkeletonProps = HTMLAttributes<HTMLElement>;

export const CartPageSkeleton = ({ className, ...rest }: CartPageSkeletonProps) => {
  return (
    <section className={clsx("cart-page__layout", className)} aria-hidden="true" {...rest}>
      <div className="cart-items">
        {[1, 2].map((i) => (
          <article
            key={i}
            className="cart-item"
            style={{ padding: "24px 0", borderBottom: i === 1 ? "1px solid var(--color-border, #f0f0f0)" : "none" }}
          >
            <div className="cart-item__image-shell" style={{ width: 124, height: 124, flexShrink: 0 }}>
              <Skeleton variant="rect" width="100%" height="100%" radius={8} />
            </div>
            
            <div className="cart-item__content" style={{ display: "flex", flexDirection: "column", width: "100%", gap: 8 }}>
              <div className="cart-item__head" style={{ justifyContent: "space-between" }}>
                <Skeleton variant="line" width="60%" height={24} />
                <Skeleton variant="circle" width={24} height={24} />
              </div>
              
              <Skeleton variant="line" width="30%" height={16} />
              <Skeleton variant="line" width="30%" height={16} />
              
              <div className="cart-item__foot" style={{ marginTop: "auto", justifyContent: "space-between", alignItems: "center" }}>
                <Skeleton variant="line" width="25%" height={28} />
                <Skeleton variant="rect" width={100} height={36} radius={18} />
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="cart-summary">
        <Skeleton variant="line" width="80%" height={32} className="u-mb-28" />
        <Skeleton variant="line" width="100%" height={24} className="u-mb-28" />
        <Skeleton variant="line" width="100%" height={24} className="u-mb-28" />
        <Skeleton variant="line" width="100%" height={24} className="u-mb-28" />
        <Skeleton variant="rect" width="100%" height={56} radius={28} />
      </aside>
    </section>
  );
};
