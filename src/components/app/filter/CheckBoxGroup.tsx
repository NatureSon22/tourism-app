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
  useNameValue = false,
}: {
  title: string;
  options: any[];
  selectedIds: (number | string)[];
  onToggle: (value: number | string) => void;
  useNameValue?: boolean;
}) => (
  <VStack gap={10}>
    <Text style={{ fontFamily: Typography.family.semiBold, fontSize: 16 }}>
      {title}
    </Text>
    {options.map((opt) => {
      const value = useNameValue ? opt.name : opt.id;
      const checked = selectedIds.includes(value);
      return (
        <Pressable
          key={opt.id}
          onPress={() => onToggle(value)}
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <Checkbox
            value={checked}
            onValueChange={() => onToggle(value)}
            color={checked ? Colors.primary : undefined}
          />
          <Text style={{ fontFamily: Typography.family.regular }}>
            {opt.name}
          </Text>
        </Pressable>
      );
    })}
  </VStack>
);
