import { Colors, Typography } from "@/src/constants/styles";
import { TRANSPORTATION_DETAIL } from "@/src/constants/transportationdetail";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Accordion from "../../ui/Accordion";

export default function TransportationSchedule() {
  return (
    <Accordion title="Time Schedule">
      <View style={styles.table}>
        {/* Header */}
        <View style={[styles.row, styles.headerRow]}>
          <Text style={[styles.cell, styles.headerText, styles.routeCell]}>
            Route
          </Text>
          <View style={styles.dividerV} />
          <Text style={[styles.cell, styles.headerText, styles.timeCell]}>
            Time / Schedule
          </Text>
        </View>

        {/* Rows */}
        {TRANSPORTATION_DETAIL.schedule.map((item, index) => (
          <React.Fragment key={index}>
            <View style={styles.dividerH} />
            <View style={styles.row}>
              <Text style={[styles.cell, styles.bodyText, styles.routeCell]}>
                {item.route}
              </Text>
              <View style={styles.dividerV} />
              <Text style={[styles.cell, styles.bodyText, styles.timeCell]}>
                {item.time}
              </Text>
            </View>
          </React.Fragment>
        ))}
      </View>
    </Accordion>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    borderRadius: 8,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  headerRow: {
    backgroundColor: "#F0F4F8",
  },
  cell: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  routeCell: {
    flex: 3,
  },
  timeCell: {
    flex: 2,
  },
  headerText: {
    fontSize: 12,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
  bodyText: {
    fontSize: 11.5,
    fontFamily: Typography.family.regular,
    color: Colors.text,
    lineHeight: 18,
  },
  dividerH: {
    height: 1,
    backgroundColor: "#D0D0D0",
  },
  dividerV: {
    width: 1,
    backgroundColor: "#D0D0D0",
  },
});
