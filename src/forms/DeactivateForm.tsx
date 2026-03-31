import CustomButton from "@/src/components/ui/CustomButton";
import { CustomRadioGroup } from "@/src/components/ui/CustomRadioGroup";
import DEACTIVATION_REASONS from "@/src/constants/deactivateReason";
import React, { useMemo, useState } from "react";
import { Text as RNText, StyleSheet, TextInput, View } from "react-native";
import ModalConfirmation from "../components/app/account/ModalConfirmation";

const reasonOptions = DEACTIVATION_REASONS.map((reason) => ({
  label: reason,
  value: reason,
}));

export default function DeactivateForm() {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReasonText, setOtherReasonText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isOtherSelected = selectedReason === "Other (please specify)";

  const isDeactivateEnabled = useMemo(() => {
    if (!selectedReason) return false;
    return isOtherSelected ? otherReasonText.trim().length > 0 : true;
  }, [selectedReason, isOtherSelected, otherReasonText]);

  const handleConfirm = () => {
    const payload = {
      reason: selectedReason,
      otherReason: isOtherSelected ? otherReasonText.trim() : undefined,
    };
    console.log("Deactivate confirmed", payload);
    setIsModalOpen(false);
    setSelectedReason(null);
    setOtherReasonText("");
  };

  return (
    <View style={styles.container}>
      <RNText style={styles.heading}>
        Why are you deactivating your account?
      </RNText>

      <View style={styles.radioGroupWrapper}>
        <CustomRadioGroup
          options={reasonOptions}
          selectedValue={selectedReason}
          onSelect={(val) => {
            setSelectedReason(val);
            if (val !== "Other (please specify)") setOtherReasonText("");
          }}
        />
      </View>

      {isOtherSelected && (
        <View style={styles.otherReasonWrapper}>
          <RNText style={styles.label}>Please specify</RNText>
          <TextInput
            multiline
            numberOfLines={4}
            style={styles.textArea}
            placeholder="Type your reason"
            value={otherReasonText}
            onChangeText={setOtherReasonText}
          />
        </View>
      )}

      <CustomButton
        title="Deactivate"
        onPress={() => setIsModalOpen(true)}
        disabled={!isDeactivateEnabled}
        style={[styles.button, !isDeactivateEnabled && styles.disabledButton]}
      />

      <ModalConfirmation
        isVisible={isModalOpen}
        title="Confirm Deactivation"
        message="Are you sure you want to deactivate your account?"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16 },
  heading: { fontSize: 16, fontWeight: "600" },
  radioGroupWrapper: { width: "100%" },
  otherReasonWrapper: { width: "100%", gap: 8 },
  label: { fontSize: 12, fontWeight: "500" },
  textArea: {
    width: "100%",
    minHeight: 100,
    borderColor: "#CBD5E1",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    backgroundColor: "white",
  },
  button: { width: "100%" },
  disabledButton: { opacity: 0.5 },
});
