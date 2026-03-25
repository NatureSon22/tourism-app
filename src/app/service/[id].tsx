import ServiceForum from "@/src/components/app/service/ServiceForums";
import ServiceGeneralInformation from "@/src/components/app/service/ServiceGeneralInformation";
import ServiceHeader from "@/src/components/app/service/ServiceHeader";
import ServiceHotlines from "@/src/components/app/service/ServiceHotlines";
import ServiceImages from "@/src/components/app/service/ServiceImages";
import ServiceTeam from "@/src/components/app/service/ServiceTeam";
import { LOCALSERVICE_DETAIL } from "@/src/constants/localservicedetails";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function ServiceDetailsPage() {
  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screenContainer}>
        <ScrollView
          style={styles.scrollView}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <ServiceImages images={LOCALSERVICE_DETAIL.images} />

          <View style={styles.contentContainer}>
            <ServiceHeader
              title={LOCALSERVICE_DETAIL.title}
              tags={LOCALSERVICE_DETAIL.tags}
              location={LOCALSERVICE_DETAIL.location}
            />

            <ServiceHotlines hotlines={LOCALSERVICE_DETAIL.hotlines} />

            <View style={styles.divider} />

            <ServiceGeneralInformation />

            <View style={styles.divider} />

            <ServiceTeam team={LOCALSERVICE_DETAIL.team} />

            <View style={styles.divider} />

            <ServiceForum forums={LOCALSERVICE_DETAIL.forums} />
          </View>
        </ScrollView>
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: 10,
    paddingTop: 0,
    paddingHorizontal: 0,
    overflow: "hidden",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    marginTop: -20,
    padding: 15,
    paddingTop: 15,
    backgroundColor: "white",
    gap: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
});
