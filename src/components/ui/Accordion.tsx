import { Colors } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  initialExpanded?: boolean;
};

export default function Accordion({
  title,
  children,
  initialExpanded = false,
}: AccordionProps) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const toggleAccordion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleAccordion}>
        <HStack justifyContent="space-between">
          <Text style={styles.title}>{title}</Text>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={Colors.text}
          />
        </HStack>
      </Pressable>

      {isExpanded && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    paddingVertical: 5,
  },

  title: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    includeFontPadding: false,
  },
  content: {
    padding: 16,
  },
});
