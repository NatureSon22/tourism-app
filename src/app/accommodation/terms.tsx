import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function TermsConditions() {
  // useQuery to fetch the terms & conditions of the accommodation from the server and display it here

  const handleBackButton = () => {
    // TODO: navigate back
  };

  return (
    <SafeArea edges={["top", "bottom"]}>
      <Screen style={styles.screen}>
        <HStack
          justifyContent="flex-start"
          alignItems="center"
          gap={18}
          style={styles.header}
        >
          <Pressable onPress={handleBackButton} hitSlop={10}>
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={Colors.text}
            />
          </Pressable>
        </HStack>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* General Information */}
          <View>
            <Text style={styles.sectionTitle}>General Information</Text>

            {/* DYNAMIC DATA */}
            {/* local services */}
            <View>
              <Text style={styles.subSectionTitle}>Local Services</Text>
              <View style={styles.listItem}>
                <MaterialCommunityIcons
                  name="hospital-box"
                  size={18}
                  color={Colors.text}
                  style={styles.listIcon}
                />
                <Text style={styles.listText}>
                  Rizal Medical Center: 0917-728-3790
                </Text>
              </View>
              <View style={styles.listItem}>
                <MaterialCommunityIcons
                  name="police-badge"
                  size={18}
                  color={Colors.text}
                  style={styles.listIcon}
                />
                <Text style={styles.listText}>
                  Pasig City Police Station: (63) 917-542-5967
                </Text>
              </View>
            </View>

            {/* branch information */}
            <View>
              <Text style={styles.subSectionTitle}>Branch Information</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Ace Water Spa Pasig City
                  </Text>
                </View>
                <Text style={styles.mutedText}>
                  Monday - Sunday: 06:00 - 22:00
                </Text>
                <Text style={styles.mutedText}>Phone: +63-9175425967</Text>
                <Text style={styles.mutedText}>
                  Email: HelpDesk@acewaterspa.com.ph
                </Text>
              </View>
            </View>

            {/* additional information */}
            <View>
              <Text style={styles.subSectionTitle}>Additional Information</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Spandex-made swimming attire is strictly required to be worn
                    when using the facilities.
                  </Text>
                </View>
                <View style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Cameras and any electronic gadgets are not allowed inside
                    the spa.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* terms & conditions */}
          <View>
            <Text style={styles.sectionTitle}>Terms & Conditions</Text>

            {/* Eligibility */}
            <View>
              <Text style={styles.subSectionTitle}>Eligibility</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletRow}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Children with a height of 151 cm or below will be charged
                    PHP 300/child.
                  </Text>
                </View>
                <Text style={styles.mutedText}>
                  You may book this directly by contacting the operator’s
                  reservation hotline at
                  <Text style={styles.linkText}> +63-9175425967</Text> or send
                  an email at
                  <Text style={styles.linkText}>
                    HelpDesk@acewaterspa.com.ph
                  </Text>
                </Text>
              </View>
            </View>

            {/* Confirmation */}
            <View>
              <Text style={styles.subSectionTitle}>Confirmation</Text>
              <View style={styles.bulletList}>
                <Text style={styles.bulletText}>
                  You’ll get the confirmation within minutes. If you don’t see
                  any confirmation, reach out to our customer support.
                </Text>
              </View>
            </View>

            {/* Cancellation policy */}
            <Text style={styles.subSectionTitle}>Cancellation policy</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletText}>
                To reschedule, please contact the supplier/operator:
                <Text style={styles.linkText}>
                  inquiries@acewaterspa.com.ph
                </Text>
              </Text>
            </View>
          </View>

          <View style={{ height: 50 }} />
        </ScrollView>
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 0,
  },
  header: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  pageTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: Typography.family.semiBold,
    fontSize: 16,
    color: Colors.text,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: Typography.family.bold,
    color: Colors.text,
  },
  subSectionTitle: {
    fontSize: 16,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
    marginTop: 14,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  listIcon: {
    width: 24,
  },
  listText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Typography.family.regular,
    color: Colors.text,
  },
  bulletList: {
    marginBottom: 12,
    gap: 10,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginBottom: 6,
  },
  bullet: {
    fontSize: 14,
    lineHeight: 20,
    color: Colors.text,
  },
  bulletText: {
    flex: 1,
    fontSize: 13,
    fontFamily: Typography.family.regular,
    color: Colors.text,
    lineHeight: 20,
  },
  mutedText: {
    fontSize: 12,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    lineHeight: 18,
    marginBottom: 8,
  },
  linkText: {
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});
