import CustomButton from "@/src/components/ui/CustomButton";
import { Colors, Typography } from "@/src/constants/styles";
import VStack from "@/src/layouts/VStack";
import formatCurrency from "@/src/utils/currency";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";

type StickyFooterProps = {
  price: number;
  discountText?: string;
  buttonTitle?: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function StickyFooter({
  price,
  discountText,
  buttonTitle = "Book Now",
  onPress,
  style,
}: StickyFooterProps) {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("/bookmark");
    }
  };

  return (
    <View style={[styles.stickyFooter, style]}>
      <VStack gap={0}>
        <Text style={styles.startsAtLabel}>Starts at</Text>
        <Text style={styles.priceText}>{formatCurrency(price)}</Text>
        {discountText && (
          <Text style={styles.discountText}>{discountText}</Text>
        )}
      </VStack>

      <CustomButton
        title={buttonTitle}
        textStyle={{ fontSize: 12 }}
        onPress={handlePress}
        variant="solid"
        style={{
          paddingHorizontal: 24,
          paddingVertical: 12,
          borderRadius: 8,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stickyFooter: {
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
  },
  startsAtLabel: {
    fontSize: 10,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
    includeFontPadding: false,
  },
  priceText: {
    fontSize: 20,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
    includeFontPadding: false,
  },
  discountText: {
    fontSize: 11,
    fontFamily: Typography.family.semiBold,
    color: "#EF4444",
    includeFontPadding: false,
  },
});
