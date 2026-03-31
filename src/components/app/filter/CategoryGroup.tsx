import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { Pressable, Text, View } from "react-native";

export const CategoryGroup = ({
  types,
  selectedId,
  selectedSubtypes,
  onCategoryChange,
  onSubtypeToggle,
}: {
  types: any[];
  selectedId: number | null;
  selectedSubtypes: number[];
  onCategoryChange: (id: number) => void;
  onSubtypeToggle: (id: number) => void;
}) => {
  const activeCategory = types.find((t) => t.id === selectedId);

  return (
    <VStack gap={12}>
      <HStack gap={10} style={{ flexWrap: "wrap" }} justifyContent="flex-start">
        {types.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => onCategoryChange(cat.id)}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 20,
              borderWidth: 1,
              backgroundColor:
                selectedId === cat.id ? Colors.primary : Colors.surface,
              borderColor:
                selectedId === cat.id ? Colors.primary : Colors.border,
            }}
          >
            <Text
              style={{ color: selectedId === cat.id ? "#fff" : Colors.text }}
            >
              {cat.name}
            </Text>
          </Pressable>
        ))}
      </HStack>

      {activeCategory && activeCategory.subtypes.length > 0 && (
        <View
          style={{
            marginTop: 10,
            padding: 12,
            backgroundColor: "#f9f9f9",
            borderRadius: 12,
          }}
        >
          <Text
            style={{
              marginBottom: 10,
              fontFamily: Typography.family.semiBold,
              fontSize: 18,
            }}
          >
            Sub-categories
          </Text>
          <HStack
            gap={10}
            style={{ flexWrap: "wrap" }}
            justifyContent="flex-start"
          >
            {activeCategory.subtypes.map((sub: any) => (
              <Pressable
                key={sub.id}
                onPress={() => onSubtypeToggle(sub.id)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 8,
                  borderWidth: 1,
                  backgroundColor: selectedSubtypes.includes(sub.id)
                    ? Colors.primary
                    : "#fff",
                  borderColor: selectedSubtypes.includes(sub.id)
                    ? Colors.primary
                    : Colors.border,
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: selectedSubtypes.includes(sub.id)
                      ? "#fff"
                      : Colors.text,
                  }}
                >
                  {sub.name}
                </Text>
              </Pressable>
            ))}
          </HStack>
        </View>
      )}
    </VStack>
  );
};
