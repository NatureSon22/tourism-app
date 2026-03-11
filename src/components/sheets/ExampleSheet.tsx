import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ActionSheet, { SheetProps } from "react-native-actions-sheet";
import { Calendar } from "react-native-calendars";
import PagerView from "react-native-pager-view";

export default function FilterSheet(props: SheetProps) {
  const [activeTab, setActiveTab] = useState(0); // Use index for PagerView
  const pagerRef = useRef<PagerView>(null);
  const tabs = ["Date", "Category", "Price"];

  const onTabPress = (index: number) => {
    setActiveTab(index);
    pagerRef.current?.setPage(index); // This triggers the slide animation
  };

  return (
    <ActionSheet
      id={props.sheetId}
      containerStyle={styles.sheetContainer}
      gestureEnabled={true}
    >
      <View style={styles.container}>
        {/* 1. Tab Bar */}
        <View style={styles.tabBar}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              onPress={() => onTabPress(index)}
              style={[
                styles.tabItem,
                activeTab === index && styles.activeTabItem,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === index && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 2. Sliding Content Area */}
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => setActiveTab(e.nativeEvent.position)}
        >
          {/* Page 1: Date */}
          <View key="1" style={styles.page}>
            <Calendar
              theme={{ calendarBackground: "transparent" }}
              onDayPress={(day) => console.log(day)}
            />
          </View>

          {/* Page 2: Category */}
          <View key="2" style={styles.page}>
            <Text style={styles.placeholderText}>Category Settings</Text>
          </View>

          {/* Page 3: Price */}
          <View key="3" style={styles.page}>
            <Text style={styles.placeholderText}>Price Range Picker</Text>
          </View>
        </PagerView>

        {/* 3. Sticky Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: { borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  container: { height: 600 },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabItem: {
    paddingVertical: 15,
    marginRight: 25,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabItem: { borderBottomColor: "#2563eb" },
  tabText: { fontSize: 16, color: "#6b7280", fontWeight: "600" },
  activeTabText: { color: "#2563eb" },
  pagerView: { flex: 1 },
  page: { flex: 1, padding: 20 },
  placeholderText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#999",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  applyButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  applyButtonText: { color: "white", fontWeight: "700" },
});
