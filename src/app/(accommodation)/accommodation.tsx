import AccommodationCard from "@/src/components/app/AccommodationCard";
import NoResourceFound from "@/src/components/app/NoResourceFound";
import ReloadPage from "@/src/components/app/ReloadPage";
import CustomTextInput from "@/src/components/ui/CustomTextInput";
import type { Accommodation } from "@/src/constants/accomodations";
import accommodations from "@/src/constants/accomodations";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNetInfo } from "@react-native-community/netinfo";
import React, { useRef, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function AccommodationPage() {
  const sheetShownRef = useRef(false);
  const [search, setSearch] = useState("");
  const [notFound, setNotFound] = useState(true);
  // no internet connection
  const netInfo = useNetInfo();
  const isConnected = netInfo.isConnected;
  const [isRefetching, setIsRefetching] = useState(false);

  // useQuery(accomodation, search, filter: { area, filter, sort } )

  const handleAreaPress = (sheet: string) => {
    if (!sheetShownRef.current) {
      SheetManager.show(sheet, {
        onClose(data) {
          sheetShownRef.current = false;
        },
      });
      sheetShownRef.current = true;
    }
  };

  const handleBackButton = () => {
    // handle back button press, e.g. navigate to previous screen
  };

  const onRefresh = () => {
    setIsRefetching(true);

    setTimeout(() => {
      setIsRefetching(false);
    }, 2000);
  };

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={{ gap: 20, paddingBottom: 10 }}>
        <HStack justifyContent="flex-start" alignItems="center" gap={20}>
          <Pressable onPress={handleBackButton}>
            <MaterialIcons name="arrow-back-ios" size={20} color="black" />
          </Pressable>

          <CustomTextInput
            inputStyle={{
              fontSize: 14,
              padding: 0,
              height: 25,
            }}
            value={search}
            onChangeText={setSearch}
            containerStyle={{ height: 40, flex: 1 }}
            placeholder="Search"
            suffixIcon={
              <MaterialIcons name="search" size={20} color={Colors.textMuted} />
            }
          />
        </HStack>
        
        <View style={{ paddingHorizontal: 10 }}>
          <HStack justifyContent="space-around">
            <Pressable onPress={() => handleAreaPress("area-sheet")}>
              <HStack
                gap={5}
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Text
                  style={{
                    fontFamily: Typography.family.semiBold,
                    fontSize: 12.5,
                  }}
                >
                  Area
                </Text>
                <MaterialIcons name="arrow-drop-down" size={17} color="black" />
              </HStack>
            </Pressable>
            <Pressable onPress={() => handleAreaPress("filter-sheet")}>
              <HStack
                gap={5}
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Text
                  style={{
                    fontFamily: Typography.family.semiBold,
                    fontSize: 12.5,
                  }}
                >
                  Filter
                </Text>
                <MaterialIcons name="arrow-drop-down" size={17} color="black" />
              </HStack>
            </Pressable>
            <Pressable onPress={() => handleAreaPress("sort-sheet")}>
              <HStack
                gap={5}
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Text
                  style={{
                    fontFamily: Typography.family.semiBold,
                    fontSize: 12.5,
                  }}
                >
                  Sort
                </Text>
                <MaterialIcons name="arrow-drop-down" size={17} color="black" />
              </HStack>
            </Pressable>
          </HStack>
        </View>

        <FlatList
          data={accommodations || ([] as Accommodation[])}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <AccommodationCard {...item} />}
          //refresh pull to refresh
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
          }
          // for empty data or no internet
          ListEmptyComponent={
            !isConnected ? (
              <ReloadPage
                refetch={() => {}}
                message="Listings failed to load. Retry loading the page."
              />
            ) : notFound ? (
              <NoResourceFound message="Oh no! There’s no accommodation that matches the search or filter criteria." />
            ) : (
              <></>
            )
          }
        />
      </Screen>
    </SafeArea>
  );
}
