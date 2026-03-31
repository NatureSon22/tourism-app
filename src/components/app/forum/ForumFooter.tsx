import { Colors } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../../ui/CustomButton";

export const ForumFooter = ({ viewers }: { viewers?: number }) => (
  <View style={footerStyles.container}>
    {/* Interaction Group */}
    <HStack gap={6}>
      <ActionButton icon={<AntDesign name="like" size={12} />} title="123" />
      <ActionButton
        icon={
          <AntDesign
            name="like"
            size={12}
            style={{ transform: [{ scaleY: -1 }] }}
          />
        }
      />
      <ActionButton icon={<AntDesign name="comment" size={12} />} title="12" />
    </HStack>

    {/* Views */}
    <HStack gap={4}>
      <Ionicons name="eye-outline" size={14} color="black" />
      <Text style={footerStyles.statsText}>{viewers}</Text>
    </HStack>

    {/* Utility Group */}
    <HStack gap={6}>
      <ActionButton icon={<MaterialIcons name="bookmark-border" size={14} />} />
      <ActionButton icon={<Feather name="share-2" size={13} />} />
    </HStack>
  </View>
);

const ActionButton = ({ icon, title }: any) => (
  <CustomButton
    prefixIcon={icon}
    title={title}
    gap={title ? 4 : 0}
    textStyle={footerStyles.btnText}
    style={footerStyles.btn}
    onPress={() => {}}
  />
);

const footerStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: Colors.buttonSecondary,
    borderColor: Colors.border,
  },
  btnText: { fontSize: 10, color: Colors.textMuted },
  statsText: { fontSize: 10, color: Colors.text },
});
