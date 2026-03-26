import { Colors, Typography } from "@/src/constants/styles";
import { getProvincesByRegion } from "@aivangogh/ph-address";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type RegionTabProps = {
  region: {
    name: string;
    psgcCode: string;
    designation: string;
  };
};

export default function RegionTab({ region }: RegionTabProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);

  const provinces = useMemo(() => {
    return getProvincesByRegion(region.psgcCode);
  }, [region.psgcCode]);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  const toggleProvince = (code: string) => {
    setSelectedProvinces((prev) =>
      prev.includes(code) ? prev.filter((id) => id !== code) : [...prev, code],
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleAccordion} style={styles.header}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.regionName}>{region.name}</Text>

          <Ionicons
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={20}
            color={Colors.textMuted}
          />
        </View>
      </Pressable>

      {/* Collapsible Content */}
      {isOpen && (
        <View style={styles.content}>
          {provinces.map((province) => {
            const isChecked = selectedProvinces.includes(province.psgcCode);
            return (
              <Pressable
                key={province.psgcCode}
                style={styles.provinceRow}
                onPress={() => toggleProvince(province.psgcCode)}
              >
                <View
                  style={[styles.checkbox, isChecked && styles.checkboxChecked]}
                >
                  {isChecked && (
                    <Ionicons name="checkmark" size={12} color="white" />
                  )}
                </View>
                <Text style={styles.provinceText}>{province.name}</Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  fullWidth: {
    width: "100%",
  },
  regionName: {
    fontFamily: Typography.family.regular,
    fontSize: 12.5,
    flex: 1,
  },
  regionSub: {
    fontFamily: Typography.family.regular,
    fontSize: 11.5,
    color: Colors.textMuted,
  },
  content: {
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  provinceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
  },
  provinceText: {
    fontFamily: Typography.family.regular,
    fontSize: 12,
    color: Colors.text,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
});
