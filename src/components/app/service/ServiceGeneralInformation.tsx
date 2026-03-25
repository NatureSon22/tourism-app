import Accordion from "@/src/components/ui/Accordion";
import { Typography } from "@/src/constants/styles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ServiceGeneralInformation() {
  return (
    <Accordion title="Routes">
      <View style={{ gap: 10 }}>
        <View style={{ gap: 8 }}>
          <Text style={styles.header}>About Binangonan Lakeview Hospital</Text>
          <Text style={styles.text}>
            Binangonan Lakeview Hospital, is a private corporation founded and
            registered with the Securities and Exchange Commission (SEC) in
            November 2011. A core group of doctors had envisioned a healthcare
            facility that would provide quality medical services to the local
            community and nearby towns.
          </Text>

          <Text style={styles.text}>
            The hospital is located in Binangonan, Rizal, a town known for its
            scenic views of Laguna de Bay. The location was strategically chosen
            to serve the healthcare needs of the residents of Binangonan and its
            neighboring municipalities.
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Text style={styles.header}>Mission</Text>
          <Text style={styles.text}>
            Our mission is to provide world-class holistic, quality, and safe
            patient care to all Rizaleños and nearby provinces. and we envision
            to be the gold standard of healthcare services in the region.
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Text style={styles.header}>Vision</Text>
          <Text style={styles.text}>
            Binangonan Lakeview Hospital will be the model of Gold Standard
            Health care service in the region.
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Text style={styles.header}>Core Values</Text>
          <Text style={styles.text}>
            Our core values are Social Responsibility, Professionalism,
            Innovation, Integrity and Diversity.
          </Text>
        </View>
      </View>
    </Accordion>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: Typography.family.medium,
  },
  text: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: Typography.family.regular,
  },
});
