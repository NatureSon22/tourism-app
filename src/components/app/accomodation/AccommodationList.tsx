import AccommodationCard from "@/src/components/app/accomodation/AccommodationCard";
import ListEmptyState from "@/src/components/app/ListEmptyState";
import { useAccommodations } from "@/src/services/request/useAccomodation";
import { useFilterStore } from "@/src/stores/filterStore";
import { Accommodation } from "@/src/types/accommodation";
import createSkeletons, { Skeleton } from "@/src/utils/createSkeletons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import AccommodationCardSkeleton from "./AccommodationCardSkeleton";

type AccommodationListProps = {
  search: string;
};

export default function AccommodationList({ search }: AccommodationListProps) {
  const categories = useFilterStore((state) => state.categories);
  const accommodationState = categories.accommodation;
  const { data, isLoading, isFetched, isError, refetch } = useAccommodations({
    search,
    area: accommodationState.options.area,
    sort: accommodationState.options.sort,
    rating: accommodationState.options.filter.rating,
    subtypes: accommodationState.options.filter.type.subtypes,
    amenities: accommodationState.options.filter.amenities,
  });
  const { isConnected, isInternetReachable } = useNetInfo();
  const online = isConnected && isInternetReachable;
  const isEmpty =
    isFetched && !isLoading && (data?.data?.listings?.length ?? 0) === 0;
  const [isRefetching, setIsRefetching] = useState(false);

  const handleRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    console.log("Successful refetch...");
    setIsRefetching(false);
  };

  const renderItem = useCallback<ListRenderItem<Skeleton | Accommodation>>(
    ({ item }) => {
      if ("isSkeleton" in item) {
        return <AccommodationCardSkeleton />;
      }

      return <AccommodationCard {...item} />;
    },
    [],
  );

  return (
    <FlatList<Skeleton | Accommodation>
      data={isLoading ? createSkeletons(6) : data?.data.listings || []}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      windowSize={10}
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
          isConnected={online}
          isError={isError}
          isEmpty={isEmpty}
          resourceName="accommodations"
          customNoResultsMessage="Oh no! There's no accommodation option that matches the search or filter criteria."
          onRetry={refetch}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  separator: {
    height: 20,
  },
});
