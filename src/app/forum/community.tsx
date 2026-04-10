import HeaderWithBack from "@/src/components/app/HeaderWithBack";
import CustomTextInput from "@/src/components/ui/CustomTextInput";
import { Colors, Typography } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useCommunities } from "@/src/services/request/useCommunity";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Community() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { data, isLoading, isFetching } = useCommunities({
    search: debouncedSearch,
  });

  const communities = useMemo(() => data?.data ?? [], [data]);

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screen}>
        <HeaderWithBack title="Community" />

        <View style={styles.wrapper}>
          <CustomTextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search communities"
            suffixIcon={
              <MaterialIcons name="search" size={20} color={Colors.textMuted} />
            }
            containerStyle={styles.searchInputContainer}
            inputStyle={styles.searchInput}
          />

          <View style={styles.content}>
            {isLoading ? (
              <ActivityIndicator size="large" color={Colors.primary} />
            ) : communities.length > 0 ? (
              <FlatList
                data={communities}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={() => (
                  <View style={styles.listSeparator} />
                )}
                renderItem={({ item }) => (
                  <View style={styles.communityCard}>
                    <Text style={styles.communityName}>{item.name}</Text>
                  </View>
                )}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>No communities found</Text>
                <Text style={styles.emptyMessage}>
                  We couldn&apos;t find any communities matching your search.
                </Text>
              </View>
            )}

            {!isLoading && isFetching && (
              <Text style={styles.fetchingText}>Refreshing results…</Text>
            )}
          </View>
        </View>
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: 20,
  },
  pageTitle: {
    fontFamily: Typography.family.semiBold,
    fontSize: 24,
    color: Colors.text,
    marginBottom: 16,
  },
  wrapper: {
    paddingHorizontal: 5,
    flex: 1,
    gap: 10,
  },
  searchInputContainer: {
    marginBottom: 20,
    backgroundColor: "#EEEEEE",
    borderWidth: 0,
  },
  searchInput: {
    fontSize: 13,
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 24,
  },
  listSeparator: {
    height: 12,
  },
  communityCard: {
    paddingHorizontal: 10,
  },
  communityName: {
    fontFamily: Typography.family.medium,
    fontSize: 14,
    color: Colors.text,
    marginBottom: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontFamily: Typography.family.semiBold,
    fontSize: 18,
    color: Colors.text,
    marginBottom: 8,
  },
  emptyMessage: {
    fontFamily: Typography.family.regular,
    fontSize: 14,
    color: Colors.textMuted,
    textAlign: "center",
    lineHeight: 20,
  },
  fetchingText: {
    marginTop: 12,
    textAlign: "center",
    color: Colors.textMuted,
    fontFamily: Typography.family.regular,
    fontSize: 12,
  },
});
