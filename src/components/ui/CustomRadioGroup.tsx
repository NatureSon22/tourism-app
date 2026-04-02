import { Typography } from "@/src/constants/styles";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { 
  Pressable, 
  Text, 
  View, 
  StyleSheet, 
  StyleProp, 
  TextStyle, 
  ViewStyle 
} from "react-native";

type Props = {
  selectedValue: string | null;
  onSelect: (value: string) => void;
  options: { label: string; value: string }[];
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>; 
};

export const CustomRadioGroup = ({
  selectedValue,
  onSelect,
  options,
  textStyle,
  containerStyle,
}: Props) => {
  return (
    <View style={[styles.defaultContainer, containerStyle]}>
      {options.map((option) => {
        const isSelected = selectedValue === option.value;
        
        return (
          <Pressable
            key={option.value}
            onPress={() => onSelect(option.value)}
            style={styles.radioOption}
          >
            <FontAwesome
              name={isSelected ? "circle" : "circle-thin"}
              size={20}
              color={isSelected ? "#2196F3" : "#D9D9D9"}
            />

            <Text 
              style={[
                styles.label, 
                textStyle, 
                isSelected && styles.selectedLabel
              ]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    gap: 13, // Default spacing
  },
  radioOption: {
    flexDirection: "row", 
    alignItems: "center", 
    gap: 10,
    paddingVertical: 4, 
  },
  label: {
    fontSize: 14,
    fontFamily: Typography.family.regular,
    color: "#333",
  },
  selectedLabel: {
    fontFamily: Typography.family.semiBold,
    color: "#2196F3", 
  }
});