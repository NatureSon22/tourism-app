import HeaderWithBack from "@/src/components/app/HeaderWithBack";
import ListEmptyState from "@/src/components/app/ListEmptyState";
import CustomTextInput from "@/src/components/ui/CustomTextInput";
import { Colors, Typography } from "@/src/constants/styles";
import useDebounce from "@/src/hooks/useDebounce";
import HStack from "@/src/layouts/HStack";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import VStack from "@/src/layouts/VStack";
import { useLocations } from "@/src/services/request/useLocation";
import { Location } from "@/src/types/forum";
import getLocation from "@/src/utils/getLocation";
import { MaterialIcons } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function LocationPage() {
  const [search, setSearch] = useState("");
  const [myLocation, setMyLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isFindingLocation, setIsFindingLocation] = useState(false);

  const debouncedSearch = useDebounce(search);
  const { data, isLoading, isSuccess, isError, refetch } = useLocations({
    search: debouncedSearch,
  });
  const { isConnected } = useNetInfo();

  const locations = useMemo(() => data?.data ?? [], [data]);
  const isEmpty = isSuccess && !isLoading && locations.length === 0;

  const handleMyLocationPress = async () => {
    setIsFindingLocation(true);
    const coords = await getLocation();
    setIsFindingLocation(false);

    if (coords) {
      setMyLocation(coords);
    }
  };

  const renderLocationItem = ({ item }: { item: Location }) => (
    <View style={styles.locationCard}>
      <Text style={styles.locationName}>{item.name}</Text>
      <Text style={styles.locationAddress}>{item.address}</Text>
    </View>
  );

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screen}>
        <HeaderWithBack title="Location" />

        <View style={styles.wrapper}>
          <CustomTextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search locations"
            suffixIcon={
              <MaterialIcons name="search" size={20} color={Colors.textMuted} />
            }
            containerStyle={styles.searchInputContainer}
            inputStyle={styles.searchInput}
          />

          <Pressable
            style={styles.myLocationCard}
            onPress={handleMyLocationPress}
            disabled={isFindingLocation}
          >
            <HStack
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <VStack gap={4}>
                <Text style={styles.myLocationTitle}>My Location</Text>
                <Text style={styles.myLocationStatus}>
                  {isFindingLocation
                    ? "Detecting..."
                    : myLocation
                      ? "Current location set"
                      : "Tap to use current location"}
                </Text>
              </VStack>

              <MaterialIcons name="my-location" size={24} color="black" />
            </HStack>

            {/* <View style={styles.myLocationHeader}>
              <Text style={styles.myLocationTitle}>My Location</Text>
              <Text style={styles.myLocationStatus}>
                {isFindingLocation
                  ? "Detecting..."
                  : myLocation
                    ? "Current location set"
                    : "Tap to use current location"}
              </Text>
            </View>
            <Text style={styles.myLocationText} numberOfLines={2}>
              {myLocation
                ? `${myLocation.latitude.toFixed(5)}, ${myLocation.longitude.toFixed(5)}`
                : "Use your device GPS to find nearby places."}
            </Text> */}
          </Pressable>

          {isLoading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            <FlatList<Location>
              data={locations}
              keyExtractor={(item) => item.id}
              renderItem={renderLocationItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              contentContainerStyle={
                locations.length === 0
                  ? styles.emptyContainer
                  : styles.listContent
              }
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <ListEmptyState
                  isLoading={isLoading}
                  isConnected={isConnected}
                  isError={isError}
                  onRetry={refetch}
                  resourceName="locations"
                  customNoResultsMessage="No matching locations were found."
                  isEmpty={isEmpty}
                />
              }
            />
          )}
        </View>
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    gap: 16,
  },
  searchInputContainer: {
    backgroundColor: "#F3F4F6",
    borderWidth: 0,
    marginBottom: 4,
  },
  wrapper: {
    paddingHorizontal: 10,
    flex: 1,
    gap: 15,
  },
  searchInput: {
    fontSize: 14,
  },
  myLocationCard: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  myLocationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  myLocationTitle: {
    fontFamily: Typography.family.semiBold,
    fontSize: 16,
    color: Colors.text,
  },
  myLocationStatus: {
    fontFamily: Typography.family.regular,
    fontSize: 12,
    color: Colors.textMuted,
  },
  myLocationText: {
    fontFamily: Typography.family.regular,
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  locationCard: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  locationName: {
    fontFamily: Typography.family.semiBold,
    fontSize: 15,
    color: Colors.text,
    marginBottom: 4,
  },
  locationAddress: {
    fontFamily: Typography.family.regular,
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 20,
  },
  separator: {
    height: 12,
  },
});
