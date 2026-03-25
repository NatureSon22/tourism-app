import { Colors } from "@/src/constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

type TeamRowProps = {
  members: string[];
};

export default function TeamRow({ members }: TeamRowProps) {
  const ref = useRef<ScrollView>(null);

  const scrollBack = () => {
    ref.current?.scrollTo({ x: 0, animated: true });
  };

  return (
    <View style={styles.rowWrapper}>
      <ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      >
        {members.map((uri, idx) => (
          <View key={idx} style={styles.card}>
            <Image source={{ uri }} style={styles.image} contentFit="cover" />
          </View>
        ))}
      </ScrollView>

      <Pressable onPress={scrollBack} style={styles.scrollBackButton}>
        <Ionicons name="chevron-back" size={16} color={Colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  rowWrapper: {
    position: "relative",
  },
  listContainer: {
    gap: 10,
    paddingHorizontal: 2,
    paddingBottom: 4,
  },
  card: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  scrollBackButton: {
    position: "absolute",
    left: 0,
    top: "50%",
    marginTop: -(28 / 2),
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.92)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
});
