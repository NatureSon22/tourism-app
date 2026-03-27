import VStack from "@/src/layouts/VStack";
import React, { useState } from "react";
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import CustomPopupMenuItem from "./CustomPopupMenuItem";

export type PopupOption = {
  label: string;
  value: any;
  Icon: React.ReactNode;
};

type CustomPopupMenuProps = {
  triggerButton: React.ReactNode;
  options: PopupOption[];
  selectedValue?: any;
  onSelect: (value: any) => void;
  menuStyle?: StyleProp<ViewStyle>;
};

export default function CustomPopupMenu({
  triggerButton,
  options,
  selectedValue,
  onSelect,
  menuStyle,
}: CustomPopupMenuProps) {
  const [visible, setVisible] = useState(false);

  const handleSelect = (value: any) => {
    onSelect(value);
    setVisible(false);
  };

  return (
    // zIndex is crucial here so the menu sits on top of following elements
    <View style={{ zIndex: 50 }}>
      {/* TRIGGER */}
      <Pressable onPress={() => setVisible(!visible)}>
        {triggerButton}
      </Pressable>

      {visible && (
        <>
          {/* THE BACKDROP: Transparent layer to catch taps outside the menu */}
          <Pressable
            style={styles.fullScreenDismiss}
            onPress={() => setVisible(false)}
          />

          {/* THE MENU: Positioned absolutely relative to the parent View */}
          <View style={[styles.menuContainer, menuStyle]}>
            <VStack gap={7}>
              {options.map((option) => (
                <CustomPopupMenuItem
                  key={option.label}
                  label={option.label}
                  Icon={option.Icon}
                  isSelected={selectedValue === option.value}
                  onPress={() => handleSelect(option.value)}
                />
              ))}
            </VStack>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenDismiss: {
    position: "absolute",
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: "transparent",
    zIndex: 99,
  },
  menuContainer: {
    position: "absolute",
    top: "110%",
    right: 0,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    width: 200,
    zIndex: 100,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e5e6ff",
  },
});
