import PlaceFilterTabs from "@/src/components/app/main/PlaceFilterTabs";
import { Colors, Typography } from "@/src/constants/styles";
import { useOnRefresh } from "@/src/hooks/useOnRefresh";
import { useGetPlaces } from "@/src/services/places";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import NoResourceFound from "../NoResourceFound";
import ReloadPage from "../ReloadPage";
import PlaceCard from "./PlaceCard";
import PlaceCardSkeleton from "./PlaceCardSkeleton";

type PlaceListProps = {
  searchQuery: string;
};

type FilterType = "Recommended" | "Nearby";

export default function PlaceList({ searchQuery }: PlaceListProps) {
  const [filter, setFilter] = useState<FilterType>("Recommended");
  const { data, isLoading } = useGetPlaces(filter, searchQuery);
  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected;
  const { refreshing, onRefresh } = useOnRefresh();

  const notFound = !isLoading && data?.length === 0;

  // TODO: handle filter when only one data is connected

  return (
    <View style={styles.container}>
      <PlaceFilterTabs value={filter} onChange={setFilter} />

      <FlatList
        data={data ?? []}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) =>
          isLoading ? `skeleton-${index}` : item.id.toString()
        }
        renderItem={({ item }) => {
          if (isLoading) {
            return <PlaceCardSkeleton />;
          }
          return <PlaceCard {...item} />;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          !isConnected ? (
            <ReloadPage
              refetch={() => {}}
              message="Listings failed to load. Retry loading the page."
            />
          ) : notFound ? (
            <NoResourceFound
              message="Oh no! There’s no dining option that matches the search or filter criteria."
              onRetry={() => {}}
            />
          ) : (
            <></>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 30,
    padding: 16,
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
