import forumData, { ForumPost } from "@/src/constants/forum";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl } from "react-native";

import NoResourceFound from "../NoResourceFound";
import ReloadPage from "../ReloadPage";
import ForumCard from "../forum/ForumCard";

export default function BookmarkForum() {
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
      data={forumData || ([] as ForumPost[])}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingBottom: 10,
      }}
      // ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ForumCard {...item} />}
      //refresh pull to refresh
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
      }
      // for empty data or no internet
      ListEmptyComponent={
        !isConnected ? (
          <ReloadPage
            refetch={() => {}}
            message="Couldn't load forums. Check your connection and try again."
          />
        ) : notFound ? (
          <NoResourceFound
            message="Oh no! There are no found forums."
            onRetry={() => {}}
          />
        ) : (
          <></>
        )
      }
    />
  );
}
