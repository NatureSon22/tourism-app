import React from "react";
import NoResourceFound from "./NoResourceFound";
import ReloadPage from "./ReloadPage";

type ListEmptyStateProps = {
  isLoading: boolean;
  isConnected: boolean | null;
  onRetry: () => void;
  resourceName?: string;
  customNoResultsMessage?: string;
  isEmpty: boolean;
};

export default function ListEmptyState({
  isLoading,
  isConnected,
  onRetry,
  resourceName = "results",
  customNoResultsMessage,

  isEmpty,
}: ListEmptyStateProps) {
  if (isLoading) {
    return null;
  }

  if (isConnected === false) {
    return (
      <ReloadPage
        refetch={onRetry}
        message="It looks like you're offline. Please check your connection and try again."
      />
    );
  }

  if (isEmpty) {
    const defaultMessage = `We couldn't find any ${resourceName} matching your request.`;
    return (
      <NoResourceFound
        message={customNoResultsMessage || defaultMessage}
        onRetry={onRetry}
      />
    );
  }

  return null;
}
