import { Typography } from "@/src/constants/styles";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, Text, View } from "react-native";
type Props = {
  selectedValue: string | null;
  onSelect: (value: string) => void;
  options: { label: string; value: string }[];
};

export const CustomRadioGroup = ({
  selectedValue,
  onSelect,
  options,
}: Props) => {
  return (
    <View style={{ gap: 13 }}>
      {options.map((option) => (
        <Pressable
          key={option.value}
          onPress={() => onSelect(option.value)}
          style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <FontAwesome
            name={
              selectedValue === option.value
                ? "circle"
                : "circle-thin"
            }
            size={20}
            color={selectedValue === option.value ? "#2196F3" : "#D9D9D9"}
          />

          <Text style={{ fontSize: 14, fontFamily: Typography.family.regular }}>
            {option.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};
