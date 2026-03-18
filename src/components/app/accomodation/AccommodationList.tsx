import AccommodationCard from "@/src/components/app/accomodation/AccommodationCard";
import ListEmptyState from "@/src/components/app/ListEmptyState";
import { Accommodation } from "@/src/constants/accomodations";
import { useAccommodations } from "@/src/services/request/useAccomodation";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useState, useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet, View, ListRenderItem } from "react-native";
import AccommodationCardSkeleton from "./AccommodationCardSkeleton";

type AccommodationListProps = {
  search: string;
};

function AccommodationList({ search }: AccommodationListProps) {
  const { data, isLoading, isFetched, refetch } = useAccommodations({
    search,
  });
  const { isConnected } = useNetInfo();
  const isEmpty = isFetched && !isLoading && data?.data.length === 0;
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  const renderItem = useCallback<ListRenderItem<Skeleton | Accommodation>>(({ item }) => {
    if ("isSkeleton" in item) {
      return <AccommodationCardSkeleton />;
    }
    return <AccommodationCard {...item} />;
  }, []);

  return (
    <FlatList<Skeleton | Accommodation>
      data={isLoading ? createSkeletons(6) : data?.data || []}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      initialNumToRender={6}
      maxToRenderPerBatch={8}
      windowSize={9}
      removeClippedSubviews
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={isConnected}
          isEmpty={isEmpty}
          resourceName="accommodations"
          customNoResultsMessage="Oh no! There's no accommodation option that matches the search or filter criteria."
          onRetry={refetch}
        />
      }
    />
  );
}

export default AccommodationList;

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  separator: {
    height: 20,
  },
});
