import HeaderWithBack from "@/src/components/app/HeaderWithBack";
import Renderer from "@/src/components/app/Renderer";
import Loading from "@/src/components/ui/Loading";
import { Colors, Typography } from "@/src/constants/styles";
import Center from "@/src/layouts/Center";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useAccommodationDetails } from "@/src/services/request/useAccomodation";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function About() {
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams<{ id: string; sectionId?: string }>();
  const idParam = Array.isArray(params.id) ? params.id[0] : params.id;
  const sectionIdParam = Array.isArray(params.sectionId)
    ? params.sectionId[0]
    : params.sectionId;
  const { data: accommodation, isLoading } = useAccommodationDetails({
    id: idParam ?? "",
  });
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [sectionPositions, setSectionPositions] = useState<
    Record<string, number>
  >({});
  const [selectedSectionId, setSelectedSectionId] = useState<
    string | undefined
  >(sectionIdParam);
  const [hasScrolledToSection, setHasScrolledToSection] = useState(false);

  useEffect(() => {
    if (!sectionIdParam || hasScrolledToSection) return;
    const targetY = sectionPositions[sectionIdParam];
    if (typeof targetY === "number") {
      scrollViewRef.current?.scrollTo({ y: targetY, animated: true });
      setSelectedSectionId(sectionIdParam);
      setHasScrolledToSection(true);
    }
  }, [sectionIdParam, sectionPositions, hasScrolledToSection]);

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screen}>
        <HeaderWithBack />

        {isLoading || !accommodation ? (
          <Center>
            <Loading />
          </Center>
        ) : (
          <ScrollView
            ref={scrollViewRef}
            style={styles.contentScroll}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* <AccomodationNavHeader
              sections={accommodation.additional_info.map((info) => ({
                id: info.id,
                title: info.title,
              }))}
              selectedSectionId={selectedSectionId}
              onSelectSection={scrollToSection}
            /> */}

            {accommodation.additional_info.map((info) => (
              <View
                key={info.id}
                style={[
                  styles.sectionContainer,
                  info.id === selectedSectionId ? styles.selectedSection : null,
                ]}
                onLayout={(event) => {
                  const y = event.nativeEvent?.layout?.y;
                  if (typeof y === "number") {
                    setSectionPositions((prev) => ({
                      ...prev,
                      [info.id]: y,
                    }));
                  }
                }}
              >
                {info.title ? (
                  <Text style={styles.sectionTitle}>{info.title}</Text>
                ) : null}

                <Renderer blocks={info.content_blocks} contentWidth={width} />
              </View>
            ))}
          </ScrollView>
        )}
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: 20,
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    gap: 30,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  sectionContainer: {
    gap: 12,
  },
  selectedSection: {},
  sectionTitle: {
    fontSize: 18,
    fontFamily: Typography.family.semiBold,
    color: Colors.textHeading,
    lineHeight: 24,
  },
});
