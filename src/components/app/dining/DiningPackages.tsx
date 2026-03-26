import { Package } from "@/src/constants/fooddetail";
import React from "react";
import { View } from "react-native";
import DetailSection from "../../ui/DetailsSection";
import PackageTab from "../PackageTab";

type DiningPackagesProps = {
  packages: Package[];
};

export default function DiningPackages({ packages }: DiningPackagesProps) {
  return (
    <DetailSection title="Package options">
      <View style={{ gap: 12 }}>
        {packages.map((pkg, index) => (
          <PackageTab key={index} {...pkg} />
        ))}
      </View>
    </DetailSection>
  );
}
