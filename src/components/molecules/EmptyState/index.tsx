import type { HTMLAttributes } from "react";
import "./index.scss";
import { Text } from "@/components/atoms/Text";
import clsx from "clsx";

type EmptyStateProps = HTMLAttributes<HTMLParagraphElement | HTMLSpanElement | HTMLDivElement> & {
  message: string;
};

export const EmptyState = ({ message, className, ...rest }: EmptyStateProps) => {
  return (
    <Text as="p" className={clsx("empty", className)} {...rest}>
      {message}
    </Text>
  );
};
