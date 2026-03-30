import React from "react";
import { Text } from "~/components/atoms";

interface ReviewMetaProps {
  name: string;
  isVerified?: boolean;
}

/**
 * ReviewMeta molecule - Displays reviewer name with optional verified badge
 */
export const ReviewMeta: React.FC<ReviewMetaProps> = ({
  name,
  isVerified = false,
}) => {
  const verifiedClass = isVerified ? " review-card__header--verified" : "";

  return (
    <Text as="p" className={`review-card__header${verifiedClass}`}>
      {name}
    </Text>
  );
};
