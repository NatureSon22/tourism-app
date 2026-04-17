import HeaderWithBack from "@/src/components/app/HeaderWithBack";
import Renderer from "@/src/components/app/Renderer";
import Loading from "@/src/components/ui/Loading";
import { Colors, Typography } from "@/src/constants/styles";
import Center from "@/src/layouts/Center";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { useTransportationDetails } from "@/src/services/request/useTransportation";
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
  const { data: accommodation, isLoading } = useTransportationDetails({
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
  mediaContainer: {
    gap: 12,
    marginVertical: 20,
  },
  mediaItem: {
    width: "100%",
    minHeight: 200,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: Colors.overlay,
  },
  mediaImage: {
    width: "100%",
    height: 180,
  },
  htmlBase: {
    color: Colors.textBody,
    fontFamily: Typography.family.regular,
    fontSize: 14,
    lineHeight: 22,
  },
});
