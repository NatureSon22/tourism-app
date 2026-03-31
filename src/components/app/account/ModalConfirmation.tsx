import React from "react";
import { Modal, StyleSheet, Text as RNText, View } from "react-native";
import CustomButton from "@/src/components/ui/CustomButton";

interface ModalConfirmationProps {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

export default function ModalConfirmation({
  isVisible,
  onCancel,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
}: ModalConfirmationProps) {
  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <RNText style={styles.modalTitle}>{title}</RNText>
          <RNText style={styles.modalText}>{message}</RNText>

          <View style={styles.modalButtonsRow}>
            <CustomButton
              title="Cancel"
              onPress={onCancel}
              variant="outlined"
              style={styles.modalButton}
            />
            <CustomButton
              title="Confirm"
              onPress={onConfirm}
              style={styles.modalButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  modalText: {
    fontSize: 14,
    color: "#4B5563",
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    borderRadius: 8,
  },
});