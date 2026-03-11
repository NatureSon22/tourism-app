import PreferenceTab from "@/src/components/app/PreferenceTab";
import CustomButton from "@/src/components/ui/CustomButton";
import ONBOARDINGTABS from "@/src/constants/onboardingTabs";
import { Typography } from "@/src/constants/styles";
import Center from "@/src/layouts/Center";
import SafeArea from "@/src/layouts/SafeArea";
import Screen from "@/src/layouts/Screen";
import useAuthStore from "@/src/stores/authStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function OnBoarding() {
  const [selectedPreference, setSelectedPreference] = useState<number | null>(
    null,
  );
  const completeOnBoarding = useAuthStore((data) => data.completeOnBoarding);
  const router = useRouter();

  const handleSelection = (id: number) => {
    setSelectedPreference(id);
  };

  const handleContinue = () => {
    completeOnBoarding();
    router.replace("/(main)");
  };

  return (
    <SafeArea>
      <Screen>
        <Center>
          <View style={{ width: "85%", gap: 25 }}>
            <Text
              style={{
                fontFamily: Typography.family.bold,
                fontSize: 17,
                textAlign: "center",
              }}
            >
              What&apos;s the mood?
            </Text>

            <FlatList
              data={ONBOARDINGTABS}
              contentContainerStyle={{ gap: 8 }}
              keyExtractor={(item) => item.id.toString()}
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
              style={{ paddingVertical: 10, borderRadius: 8 }}
              disabled={selectedPreference === null}
              textStyle={{
                fontSize: 12,
                fontFamily: Typography.family.regular,
              }}
            />
          </View>
        </Center>
      </Screen>
    </SafeArea>
  );
}
