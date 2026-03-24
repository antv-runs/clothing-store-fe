import React from "react";

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
    <p className={`review-card__header${verifiedClass}`}>
      {name}
    </p>
  );
};
