import { Hotline } from "@/src/constants/localservicedetails";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

type ServiceHotlinesProps = {
  hotlines: Hotline;
};

export default function ServiceHotlines({ hotlines }: ServiceHotlinesProps) {
  const renderHotlineItem = ({ item }: { item: string }) => (
    <Text style={styles.valueText}>{item}</Text>
  );

  return (
    <VStack style={styles.sectionContainer}>
      <HStack gap={8} style={styles.sectionHeader}>
        <View style={styles.sectionIndicator} />
        <Text style={styles.sectionTitle}>Hotlines</Text>
      </HStack>

      <VStack gap={10}>
        <HStack gap={5}>
          <Text style={styles.labelText}>Landline: </Text>
          <FlatList
            data={hotlines.landline || []}
            keyExtractor={(item, index) => `landline-${index}`}
            ItemSeparatorComponent={() => (
              <Text style={styles.valueText}>|</Text>
            )}
            renderItem={renderHotlineItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </HStack>

        <HStack gap={5}>
          <Text style={styles.labelText}>Telephone: </Text>
          <FlatList
            data={hotlines.mobile || []}
            keyExtractor={(item, index) => `telephone-${index}`}
            ItemSeparatorComponent={() => (
              <Text style={styles.valueText}>|</Text>
            )}
            renderItem={renderHotlineItem}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </HStack>
      </VStack>
    </VStack>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    alignSelf: "stretch",
    gap: 5,
    paddingVertical: 10,
  },
  sectionHeader: {
    justifyContent: "flex-start",
    gap: 10,
  },
  sectionIndicator: {
    width: 4,
    height: "100%",
    borderRadius: 10,
    backgroundColor: Colors.primary,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
  labelText: {
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
    fontSize: 11,
  },
  valueText: {
    fontFamily: Typography.family.regular,
    color: Colors.text,
    marginRight: 8,
    fontSize: 11,
  },
});
