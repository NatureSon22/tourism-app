import React from "react";
import NoResourceFound from "./NoResourceFound";
import ReloadPage from "./ReloadPage";

type ListEmptyStateProps = {
  isLoading: boolean;
  isConnected: boolean | null;
  isError?: boolean;
  onRetry: () => void;
  resourceName?: string;
  customNoResultsMessage?: string;
  isEmpty: boolean;
  disableOfflineReload?: boolean;
};

export default function ListEmptyState({
  isLoading,
  isConnected,
  isError = false,
  onRetry,
  resourceName = "results",
  customNoResultsMessage,
  disableOfflineReload = false,
  isEmpty,
}: ListEmptyStateProps) {
  if (isLoading) {
    return null;
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

  if ((isConnected === false && !disableOfflineReload) || isError) {
    return (
      <ReloadPage
        refetch={onRetry}
        message="It looks like you're offline. Please check your connection and try again."
      />
    );
  }

  return null;
}
