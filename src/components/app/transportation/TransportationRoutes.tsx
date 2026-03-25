import Accordion from "@/src/components/ui/Accordion";
import { Colors, Typography } from "@/src/constants/styles";
import { TRANSPORTATION_DETAIL } from "@/src/constants/transportationdetail";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function TransportationRoutes() {
  return (
    <Accordion title="Routes">
      <View style={styles.list}>
        {TRANSPORTATION_DETAIL.routes.map((route, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.bullet} />
            <Text style={styles.routeText}>{route}</Text>
          </View>
        ))}
      </View>
    </Accordion>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: Colors.text,
    marginTop: 5,
    flexShrink: 0,
  },
  routeText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Typography.family.regular,
    color: Colors.text,
    lineHeight: 20,
  },
});
