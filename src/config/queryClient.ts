import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Don't refetch on window focus to prevent unnecessary network requests in a mobile environment
      refetchOnWindowFocus: false,
      // Data is considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Keep data in cache for 24 hours to allow for quick access without refetching
      gcTime: 24 * 60 * 60 * 1000,
      // Retry failed requests up to 3 times with a delay of 1 second between retries
      retry: 3,
      retryDelay: 1000,
      throwOnError: true,
    },
  },
});

export default queryClient;
