import { useFilterStore } from "@/src/stores/filterStore";
import React from "react";
import { Text, View } from "react-native";

type ServiceListProps = {
  search: string;
};

export default function ServiceList({ search }: ServiceListProps) {
  const categories = useFilterStore((state) => state.categories);

  return (
    <View>
      <Text>ServiceList</Text>
    </View>
  );
}
