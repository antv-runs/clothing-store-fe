import type { HTMLAttributes } from "react";
import { Text } from "@/components/atoms/Text";
import clsx from "clsx";

export type ReviewMetaProps = HTMLAttributes<HTMLParagraphElement> & {
  name: string;
  isVerified?: boolean;
};

/**
 * ReviewMeta molecule - Displays reviewer name with optional verified badge
 */
export const ReviewMeta = ({
  name,
  isVerified = false,
  className,
  ...rest
}: ReviewMetaProps) => {
  const verifiedClass = isVerified ? " review-card__header--verified" : "";

  return (
    <Text as="p" className={clsx(`review-card__header${verifiedClass}`, className)} {...rest}>
      {name}
    </Text>
  );
};
