import CustomButton from "@/src/components/ui/CustomButton";
import { CustomRadioGroup } from "@/src/components/ui/CustomRadioGroup";
import DEACTIVATION_REASONS from "@/src/constants/deactivateReason";
import React, { useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ModalConfirmation from "../components/app/account/ModalConfirmation";
import { Typography } from "../constants/styles";
import VStack from "../layouts/VStack";

const reasonOptions = DEACTIVATION_REASONS.map((reason) => ({
  label: reason,
  value: reason,
}));

export default function DeactivateForm() {
  const otherInputRef = useRef<TextInput | null>(null);
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
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Scrollable content ── */}
        <View style={styles.body}>
          <VStack gap={0}>
            <Text style={styles.title}>It&apos;s sad to see you go!</Text>
            <Text style={styles.description}>
              You&apos;ll lose access to your profile, saved data, and ongoing
              activities. You can reactivate anytime by signing in again.
            </Text>
          </VStack>

          <View style={styles.radioGroupWrapper}>
            <CustomRadioGroup
              options={reasonOptions}
              selectedValue={selectedReason}
              onSelect={(val) => {
                setSelectedReason(val);
                if (val === "Other (please specify)") {
                  setTimeout(() => otherInputRef.current?.focus(), 100);
                } else {
                  setOtherReasonText("");
                }
              }}
              textStyle={styles.radioText}
            />
          </View>

          {isOtherSelected && (
            <View style={styles.otherReasonWrapper}>
              <Text style={styles.label}>Please specify</Text>
              <TextInput
                ref={otherInputRef}
                multiline
                numberOfLines={4}
                style={styles.textArea}
                placeholder="Type your reason"
                value={otherReasonText}
                onChangeText={setOtherReasonText}
              />
            </View>
          )}
        </View>

        {/* ── Button pinned at the bottom of scroll ── */}
        <View style={styles.footer}>
          <CustomButton
            title="Deactivate"
            onPress={() => setIsModalOpen(true)}
            disabled={!isDeactivateEnabled}
            style={[styles.button, !isDeactivateEnabled && styles.disabledButton]}
            textStyle={styles.buttonStyle}
          />
        </View>
      </ScrollView>

      <ModalConfirmation
        isVisible={isModalOpen}
        title="Confirm Deactivation"
        message="Are you sure you want to deactivate your account?"
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,           // lets the scroll area grow to fill the screen…
    justifyContent: "space-between", // …then pushes footer to the bottom
    padding: 20,
    gap: 16,
  },
  body: {
    gap: 16,
  },
  footer: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  radioGroupWrapper: { width: "100%", marginTop: 20 },
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
  disabledButton: { opacity: 0.5 },
  title: {
    fontSize: 22,
    fontFamily: Typography.family.semiBold,
  },
  description: {
    fontSize: 12,
    fontFamily: Typography.family.regular,
    lineHeight: 22,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
  },
  buttonStyle: {
    fontSize: 13,
  },
  radioText: {
    fontFamily: Typography.family.regular,
    fontSize: 13,
  },
});