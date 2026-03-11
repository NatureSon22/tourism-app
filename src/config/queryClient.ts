import { MutationCache, QueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

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
  mutationCache: new MutationCache({
    onError: (error: any, _variables, _context, mutation) => {
      console.error("Mutation error:", error);
      // const shouldShowToast = mutation.meta?.showErrorToast ?? true; // Default to true if not specified

      // if (shouldShowToast) {
      //   Toast.show({
      //     type: "error",
      //     text1: error.message || "An error occurred",
      //   });
      // }
    },
  }),
});

export default queryClient;
