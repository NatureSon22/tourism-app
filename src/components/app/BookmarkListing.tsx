import { Listing, listings } from "@/src/constants/listings";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import BookmarkListingCard from "./BookmarkListingCard";
import NoResourceFound from "./NoResourceFound";
import ReloadPage from "./ReloadPage";

export default function BookmarkListing() {
  const [isRefetching, setIsRefetching] = useState(false);
  // useQuery for fetching bookmarked accommodations
  const [notFound, setNotFound] = useState(true);
  const { isConnected } = useNetInfo();

  const onRefresh = useCallback(() => {
    setIsRefetching(true);

    setTimeout(() => {
      setIsRefetching(false);
    }, 2000);
  }, []);

  return (
    <FlatList
      data={listings || ([] as Listing[])}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 10,
      }}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <BookmarkListingCard {...item} />}
      //refresh pull to refresh
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
      }
      // for empty data or no internet
      ListEmptyComponent={
        !isConnected ? (
          <ReloadPage
            refetch={() => {}}
            message="Couldn't load bookmarks. Check your connection and try again."
          />
        ) : notFound ? (
          <NoResourceFound
            message="Oh no! There are no saved bookmarks."
            onRetry={() => {}}
          />
        ) : (
          <></>
        )
      }
    />
  );
}
