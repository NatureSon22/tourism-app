import VStack from "@/src/layouts/VStack";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import CustomPopupMenuItem from "./CustomPopupMenuItem";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const MENU_VERTICAL_OFFSET = 8;
const OVERLAY_EDGE_BUFFER = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 2;

export type PopupOption = {
  label: string;
  value: any;
  Icon: React.ReactNode;
  moduleId?: string;
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
    <View style={{ zIndex: 50 }}>
      <Pressable onPress={() => setVisible(!visible)}>
        {triggerButton}
      </Pressable>

      {visible && (
        <>
          <Pressable
            style={styles.fullScreenDismiss}
            onPress={() => setVisible(false)}
          />

          <View style={[styles.menuContainer, menuStyle]}>
            <VStack gap={7}>
              {options.map((option) => (
                <CustomPopupMenuItem
                  key={option.label}
                  label={option.label}
                  Icon={option.Icon}
                  isSelected={
                    selectedValue === option.value ||
                    selectedValue === option.moduleId
                  }
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
    top: -OVERLAY_EDGE_BUFFER,
    left: -OVERLAY_EDGE_BUFFER,
    right: -OVERLAY_EDGE_BUFFER,
    bottom: -OVERLAY_EDGE_BUFFER,
    backgroundColor: "transparent",
    zIndex: 99,
  },
  menuContainer: {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: MENU_VERTICAL_OFFSET,
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
