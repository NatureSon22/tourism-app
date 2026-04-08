import AccommodationCard from "@/src/components/app/accomodation/AccommodationCard";
import ListEmptyState from "@/src/components/app/ListEmptyState";
import { useAccommodations } from "@/src/services/request/useAccomodation";
import { Accommodation } from "@/src/types/accommodation";
import { QueryParams } from "@/src/types/filter";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import AccommodationCardSkeleton from "./AccommodationCardSkeleton";

type AccommodationListProps = {
  params: QueryParams;
};

export default function AccommodationList({ params }: AccommodationListProps) {
  const {
    data,
    isLoading,
    isFetched,
    isError,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useAccommodations(params);

  const { isConnected, isInternetReachable } = useNetInfo();
  const online = isConnected && isInternetReachable;

  const listings = useMemo(() => {
    return data?.pages.flatMap((page) => page.data.listings) ?? [];
  }, [data]);

  const isEmpty = isFetched && !isLoading && listings?.length === 0;

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const listData = useMemo(
    () => (isLoading ? createSkeletons(6) : listings),
    [isLoading, listings],
  );

  const renderItem = useCallback<ListRenderItem<Skeleton | Accommodation>>(
    ({ item }) => {
      if ("isSkeleton" in item) {
        return <AccommodationCardSkeleton />;
      }

      return <AccommodationCard {...item} />;
    },
    [],
  );

  const refreshControl = useMemo(
    () => (
      <RefreshControl refreshing={isLoading && !!data} onRefresh={refetch} />
    ),
    [isLoading, data, refetch],
  );

  const footerComponent = useMemo(
    () =>
      isFetchingNextPage ? (
        <ActivityIndicator style={styles.footerLoader} color="#000" />
      ) : null,
    [isFetchingNextPage],
  );

  return (
    <FlatList<Skeleton | Accommodation>
      data={listData}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListFooterComponent={footerComponent}
      initialNumToRender={5}
      maxToRenderPerBatch={10}
      windowSize={5}
      removeClippedSubviews={Platform.OS === "android"}
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={Separator}
      showsVerticalScrollIndicator={false}
      refreshControl={refreshControl}
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={online}
          isError={isError}
          isEmpty={isEmpty}
          resourceName="accommodations"
          onRetry={refetch}
        />
      }
    />
  );
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  separator: {
    height: 20,
  },
  footerLoader: {
    marginVertical: 20,
  },
});
