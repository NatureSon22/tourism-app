import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

export const StarRatingGroup = ({
  options,
  value,
  onChange,
}: {
  options: number[];
  value: number;
  onChange: (val: number) => void;
}) => (
  <HStack gap={10}>
    {options.map((s) => {
      const active = value === s;
      return (
        <Pressable
          key={s}
          onPress={() => onChange(s)}
          style={{
            flex: 1,
            paddingVertical: 8,
            borderRadius: 8,
            borderWidth: 1,
            backgroundColor: active ? Colors.primary : Colors.surface,
            borderColor: active ? Colors.primary : Colors.border,
          }}
        >
          <HStack gap={4} justifyContent="center" alignItems="center">
            <Text
              style={{
                color: active ? "#fff" : Colors.text,
                fontFamily: Typography.family.medium,
                includeFontPadding: false,
              }}
            >
              {s}
            </Text>
            <Ionicons
              name="star"
              size={14}
              color={active ? "#fff" : "#FBBF24"}
            />
          </HStack>
        </Pressable>
      );
    })}
  </HStack>
);
