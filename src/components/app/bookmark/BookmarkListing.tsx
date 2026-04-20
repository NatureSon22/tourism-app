import { Skeleton as SkeletonComponent } from "@/src/components/ui/Skeleton";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { useBookmarks } from "@/src/services/request/useBookmark";
import { Bookmark } from "@/src/types/bookmark";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import NoResourceFound from "../NoResourceFound";
import ReloadPage from "../ReloadPage";
import BookmarkListingCard from "./BookmarkListingCard";

export default function BookmarkListing() {
  const { isConnected } = useNetInfo();
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useBookmarks({ page: 1 });

  const bookmarks = useMemo(
    () => data?.pages.flatMap((page) => page.bookmarks) ?? [],
    [data],
  );

  const listData = useMemo(
    () =>
      isLoading && bookmarks.length === 0 ? createSkeletons(6) : bookmarks,
    [isLoading, bookmarks],
  );

  const isEmpty = !isLoading && !bookmarks.length;

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderItem = useCallback<ListRenderItem<Skeleton | Bookmark>>(
    ({ item }) => {
      if ("isSkeleton" in item) {
        return <BookmarkListingCardSkeleton />;
      }
      return <BookmarkListingCard {...item} />;
    },
    [],
  );

  const footerComponent = useMemo(
    () =>
      isFetchingNextPage ? (
        <ActivityIndicator style={styles.footerLoader} color="#000" />
      ) : null,
    [isFetchingNextPage],
  );

  return (
    <FlatList<Skeleton | Bookmark>
      data={listData}
      keyExtractor={(item, index) =>
        "id" in item ? String(item.id) : `skeleton-${index}`
      }
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={isFetching && !isLoading}
          onRefresh={onRefresh}
        />
      }
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={footerComponent}
      ListEmptyComponent={
        !isConnected ? (
          <ReloadPage
            refetch={refetch}
            message="Couldn't load bookmarks. Check your connection and try again."
          />
        ) : isError ? (
          <NoResourceFound
            message="Unable to load bookmarks. Try again."
            onRetry={refetch}
          />
        ) : isEmpty ? (
          <NoResourceFound
            message="Oh no! There are no saved bookmarks."
            onRetry={refetch}
          />
        ) : null
      }
    />
  );
}

const BookmarkListingCardSkeleton = () => (
  <View style={styles.card}>
    <HStack alignItems="center" gap={18}>
      <View style={styles.imageWrapper}>
        <SkeletonComponent.Rect width="100%" height="100%" borderRadius={12} />
      </View>

      <VStack gap={10} style={styles.cardContent}>
        <SkeletonComponent.Rect width="70%" height={18} borderRadius={6} />
        <SkeletonComponent.Rect width="50%" height={14} borderRadius={6} />
        <SkeletonComponent.Rect width="40%" height={14} borderRadius={6} />
      </VStack>
    </HStack>
  </View>
);

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  card: {
    borderRadius: 12,
    padding: 16,
  },
  imageWrapper: {
    width: 95,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#E2E8F0",
  },
  cardContent: {
    flex: 1,
  },
  separator: {
    height: 20,
  },
  footerLoader: {
    marginVertical: 20,
  },
  skeletonCard: {
    backgroundColor: "#F1F5F9",
    borderRadius: 12,
    padding: 16,
  },
  skeletonHeader: {
    height: 18,
    width: "60%",
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    marginBottom: 12,
  },
  skeletonLine: {
    height: 12,
    width: "100%",
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    marginBottom: 8,
  },
});
