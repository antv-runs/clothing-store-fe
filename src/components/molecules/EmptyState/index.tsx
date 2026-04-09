import React from "react";
import "./index.scss";
import { Text } from "@/components/atoms/Text";

type EmptyStateProps = {
  message: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <Text as="p" className={"empty"}>
      {message}
    </Text>
  );
};
