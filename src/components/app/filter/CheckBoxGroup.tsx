import { Colors, Typography } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import { Checkbox } from "expo-checkbox";
import React from "react";
import { Pressable, Text } from "react-native";

export const CheckboxGroup = ({
  title,
  options,
  selectedIds,
  onToggle,
}: {
  title: string;
  options: any[];
  selectedIds: number[];
  onToggle: (id: number) => void;
}) => (
  <VStack gap={10}>
    <Text style={{ fontFamily: Typography.family.semiBold, fontSize: 16 }}>
      {title}
    </Text>
    {options.map((opt) => (
      <Pressable
        key={opt.id}
        onPress={() => onToggle(opt.id)}
        style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
      >
        <Checkbox
          value={selectedIds.includes(opt.id)}
          onValueChange={() => onToggle(opt.id)}
          color={selectedIds.includes(opt.id) ? Colors.primary : undefined}
        />
        <Text style={{ fontFamily: Typography.family.regular }}>
          {opt.name}
        </Text>
      </Pressable>
    ))}
  </VStack>
);
