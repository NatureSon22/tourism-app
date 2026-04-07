import PreferenceList from "@/src/components/app/account/PreferenceList";
import CustomButton from "@/src/components/ui/CustomButton";
import PREFERENCES from "@/src/constants/preference";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Typography } from "../constants/styles";

const options = PREFERENCES.map((item) => ({ label: item, value: item }));

export default function PreferenceForm() {
  const [selectedPreference, setSelectedPreference] = useState<string | null>(
    null,
  );

  const isContinueEnabled = useMemo(
    () => selectedPreference !== null,
    [selectedPreference],
  );

  const handleContinue = () => {
    if (!isContinueEnabled) return;
    console.log("Selected preference:", selectedPreference);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What&apos;s the mood?</Text>

      <PreferenceList
        options={options}
        selectedValue={selectedPreference}
        onChange={(value) => setSelectedPreference(value)}
      />

      <View style={styles.buttonWrapper}>
        <CustomButton
          title="Continue"
          onPress={handleContinue}
          disabled={!isContinueEnabled}
          style={[styles.button, !isContinueEnabled && styles.disabledButton]}
          textStyle={styles.buttonStyle}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: Typography.family.medium,
  },
  buttonWrapper: {
    width: "100%",
  },
  button: {
    width: "100%",
    paddingVertical: 12,
  },
  disabledButton: {
    opacity: 0.5,
  },
  saveButton: {
    width: "100%",
    paddingVertical: 12,
  },
  buttonStyle: {
    fontSize: 13,
  },
});
