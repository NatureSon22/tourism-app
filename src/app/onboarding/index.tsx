import PreferenceTab from "@/src/components/app/preference/PreferenceTab";
import CustomButton from "@/src/components/ui/CustomButton";
import ONBOARDINGTABS from "@/src/constants/onboardingTabs";
import { Typography } from "@/src/constants/styles";
import Center from "@/src/layouts/Center";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import useAuthStore from "@/src/stores/authStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function OnBoarding() {
  const [selectedPreference, setSelectedPreference] = useState<number | null>(null);
  const completeOnBoarding = useAuthStore((data) => data.completeOnBoarding);
  const router = useRouter();

  const handleSelection = (id: number) => {
    setSelectedPreference(id);
  };

  const handleContinue = () => {
    completeOnBoarding();
    router.replace("/(tabs)");
  };

  return (
    <SafeArea>
      <Screen>
        <Center>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>What&apos;s the mood?</Text>

            <FlatList
              data={ONBOARDINGTABS}
              contentContainerStyle={styles.listContent}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <PreferenceTab
                  {...item}
                  selectedPreference={selectedPreference}
                  handleSelection={handleSelection}
                />
              )}
            />

            <CustomButton
              title="Continue"
              onPress={handleContinue}
              style={styles.button}
              disabled={selectedPreference === null}
              textStyle={styles.buttonText}
            />
          </View>
        </Center>
      </Screen>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: "85%",
    gap: 25,
    maxHeight: "80%", 
  },
  title: {
    fontFamily: Typography.family.bold,
    fontSize: 17,
    textAlign: "center",
  },
  listContent: {
    gap: 8,
    paddingBottom: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 12,
    fontFamily: Typography.family.regular,
  },
});