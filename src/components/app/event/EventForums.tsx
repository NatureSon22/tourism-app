import { ForumPost } from "@/src/constants/forum";
import { Colors, Typography } from "@/src/constants/styles";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";
import CustomButton from "../../ui/CustomButton";
import DetailSection from "../../ui/DetailsSection";
import ForumPreviewCard from "../ForumPreviewCard";

type EventForumsProps = {
  forums: ForumPost[];
};

export default function EventForums({ forums }: EventForumsProps) {
  const router = useRouter();
  const handleSeeAllPress = () => router.push("/forum");

  return (
    <DetailSection title="From community forums">
      <View style={styles.container}>
        <FlatList
          data={forums}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <ForumPreviewCard forum={item} />}
          ItemSeparatorComponent={() => <View style={styles.forumSeparator} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />

        <CustomButton
          title="See all connected forums"
          variant="outlined"
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={handleSeeAllPress}
        />
      </View>
    </DetailSection>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  pagination: {
    width: 12,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 0.8,
    borderColor: Colors.secondary,
  },
  buttonText: {
    fontSize: 11,
    fontFamily: Typography.family.light,
    color: Colors.text,
  },
  forumSeparator: {
    width: 12,
  },
});
