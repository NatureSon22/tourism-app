import { Package } from "@/src/constants/fooddetail";
import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import formatCurrency from "@/src/utils/currency";
import React from "react";
import { Text, View } from "react-native";
import CustomButton from "../ui/CustomButton";

type PackageTabProps = Package;

export default function PackageTab({
  price,
  title,
  subTitle,
}: PackageTabProps) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#E6F4FF",
      }}
    >
      <Text style={{ fontFamily: Typography.family.medium, fontSize: 12.5 }}>
        {title}
      </Text>
      {subTitle && (
        <Text
          style={{
            fontFamily: Typography.family.regular,
            fontSize: 12,
            color: Colors.textMuted,
          }}
        >
          {subTitle}
        </Text>
      )}

      <HStack
        justifyContent="space-between"
        style={{ marginTop: 10, alignItems: "center" }}
      >
        <Text
          style={{
            fontFamily: Typography.family.semiBold,
            fontSize: 14,
          }}
        >
          {formatCurrency(price)}
        </Text>

        <CustomButton
          title="Book"
          style={{ paddingVertical: 6, paddingHorizontal: 16, borderRadius: 6 }}
          textStyle={{ fontSize: 11.5 }}
          onPress={() => {}}
        />
      </HStack>
    </View>
  );
}
