import PreferenceList from "@/src/components/app/account/PreferenceList";
import CustomButton from "@/src/components/ui/CustomButton";
import PREFERENCES from "@/src/constants/preference";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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
      <Text style={styles.title}>Choose your preference</Text>

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
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonWrapper: {
    width: "100%",
  },
  button: {
    width: "100%",
  },
  disabledButton: {
    opacity: 0.5,
  },
});
