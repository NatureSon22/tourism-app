import { Colors, Typography } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import { Checkbox } from "expo-checkbox";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const CheckboxGroup = ({
  title,
  options,
  selectedNames, // Renamed for clarity
  onToggle,
}: {
  title: string;
  options: { id: number | string; name: string }[];
  selectedNames: string[]; // Now accepts an array of strings (names)
  onToggle: (name: string) => void; // Now returns the name string
}) => (
  <VStack gap={10}>
    <Text style={{ fontFamily: Typography.family.semiBold, fontSize: 18 }}>
      {title}
    </Text>
    <View style={{ gap: 10, marginLeft: 10 }}>
      {options.map((opt) => {
        // Check if the current name is in the selected list
        const isSelected = selectedNames.includes(opt.name);

        return (
          <Pressable
            key={opt.name} // Using name as key since it's now our identifier
            onPress={() => onToggle(opt.name)}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Checkbox
              style={{ borderColor: Colors.border, borderRadius: 4 }}
              value={isSelected}
              onValueChange={() => onToggle(opt.name)}
              color={isSelected ? Colors.primary : undefined}
            />
            <Text
              style={{ 
                fontFamily: Typography.family.regular, 
                fontSize: 13.5,
                color: Colors.text 
              }}
            >
              {opt.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  </VStack>
);