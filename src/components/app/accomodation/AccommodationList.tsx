import AccommodationCard from "@/src/components/app/accomodation/AccommodationCard";
import ListEmptyState from "@/src/components/app/ListEmptyState";
import { Accommodation } from "@/src/constants/accomodations";
import { useAccommodation } from "@/src/hooks/accommodation/useAccommodation";
import { useOnRefresh } from "@/src/hooks/useOnRefresh";
import { getSkeletonCount } from "@/src/utils/getSkeletonCount";
import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import AccommodationCardSkeleton from "./AccommodationCardSkeleton";

type AccommodationListProps = {
  search: string;
};

function AccommodationList({ search }: AccommodationListProps) {
  const {
    data = [],
    isLoading,
    isFetched,
    refetch,
  } = useAccommodation({
    search,
  });
  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected;
  const { refreshing, onRefresh } = useOnRefresh();
  const isEmpty = isFetched && !isLoading && data?.length === 0;

  return (
    <FlatList
      data={
        isLoading ? (getSkeletonCount() as unknown as Accommodation[]) : data
      }
      keyExtractor={(item, index) =>
        isLoading ? `place-skel-${index}` : item.id.toString()
      }
      contentContainerStyle={styles.content}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => {
        if (isLoading) {
          return <AccommodationCardSkeleton />;
        }
        return <AccommodationCard {...item} />;
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={
        <ListEmptyState
          isLoading={isLoading}
          isConnected={isConnected}
          isEmpty={isEmpty}
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
