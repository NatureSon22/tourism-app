import PlaceFilterTabs from "@/src/components/app/main/PlaceFilterTabs";
import { PlaceList } from "@/src/constants/placeList";
import { Colors, Typography } from "@/src/constants/styles";
import { useGetPlaces } from "@/src/services/request/usePlace";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import ListEmptyState from "../ListEmptyState";
import ReloadPage from "../ReloadPage";
import PlaceCard from "./PlaceCard";
import PlaceCardSkeleton from "./PlaceCardSkeleton";

type PlaceListProps = {
  searchQuery: string;
};

type FilterType = "Recommended" | "Nearby";

export default function PlaceListing({ searchQuery }: PlaceListProps) {
  const [filter, setFilter] = useState<FilterType>("Recommended");
  const { data, isLoading, isFetched, refetch } = useGetPlaces({
    search: searchQuery,
    filter,
  });
  const { isConnected, isInternetReachable } = useNetInfo();
  const online = isConnected && isInternetReachable;
  const isEmpty = isFetched && !isLoading && data?.data.length === 0;
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  if (!online && !isLoading) {
    return (
      <ReloadPage
        refetch={refetch}
        message="It looks like you're offline. Please check your connection and try again."
      />
    );
  }

  return (
    <View style={styles.container}>
      <PlaceFilterTabs value={filter} onChange={setFilter} />

      <FlatList<Skeleton | PlaceList>
        data={isLoading ? createSkeletons(6) : data?.data || []}
        key="two-column-list"
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          if ("isSkeleton" in item) {
            return (
              <View style={styles.itemWrapper}>
                <PlaceCardSkeleton />
              </View>
            );
          }
          return (
            <View style={styles.itemWrapper}>
              <PlaceCard {...item} />
            </View>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={
          <ListEmptyState
            isLoading={isLoading}
            isConnected={online}
            onRetry={refetch}
            resourceName="events"
            customNoResultsMessage="No events found."
            isEmpty={isEmpty}
            disableOfflineReload={true}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#e5e7eb",
  },
  filterText: {
    fontSize: 16,
    fontFamily: Typography.family.medium,
  },
  filterActive: {
    fontFamily: Typography.family.medium,
    color: Colors.primary,
    textDecorationLine: "underline",
  },
  filterInactive: {
    fontFamily: Typography.family.medium,
    color: Colors.textMuted,
    textDecorationLine: "none",
  },
  columnWrapper: {
    gap: 10,
    marginBottom: 10,
    height: 180,
    justifyContent: "space-between",
  },
  itemWrapper: {
    flex: 1,
    maxWidth: "48%",
    minWidth: 0,
    marginBottom: 10,
  },
  listContent: {
    flexGrow: 1,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
  },
  loadingCard: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    padding: 12,
    justifyContent: "space-between",
  },
  loadingBlock: {
    height: 14,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  },
});
