import { Colors, Typography } from "@/src/constants/styles";
import HStack from "@/src/layouts/HStack";
import VStack from "@/src/layouts/VStack";
import { Pressable, Text, View } from "react-native";

export const CategoryGroup = ({
  types,
  selectedName, // Changed from selectedId
  selectedSubnames, // Changed from selectedSubtypes
  onCategoryChange,
  onSubnameToggle,
}: {
  types: any[];
  selectedName: string | null;
  selectedSubnames: string[];
  onCategoryChange: (name: string) => void;
  onSubnameToggle: (name: string) => void;
}) => {
  // Find the active category by name
  const activeCategory = types.find((t) => t.name === selectedName);

  return (
    <VStack gap={12}>
      {/* Category Pills */}
      <HStack gap={10} style={{ flexWrap: "wrap" }} justifyContent="flex-start">
        {types.map((cat) => {
          const isCatSelected = selectedName === cat.name;
          
          return (
            <Pressable
              key={cat.name}
              onPress={() => onCategoryChange(cat.name)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 20,
                borderWidth: 1,
                backgroundColor: isCatSelected ? Colors.primary : Colors.surface,
                borderColor: isCatSelected ? Colors.primary : Colors.border,
              }}
            >
              <Text
                style={{ 
                  color: isCatSelected ? "#fff" : Colors.text,
                  fontFamily: Typography.family.medium 
                }}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </HStack>

      {/* Sub-category Container */}
      {activeCategory && activeCategory.subtypes?.length > 0 && (
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
              fontSize: 16,
            }}
          >
            Sub-categories
          </Text>
          <HStack
            gap={10}
            style={{ flexWrap: "wrap" }}
            justifyContent="flex-start"
          >
            {activeCategory.subtypes.map((sub: any) => {
              const isSubSelected = selectedSubnames.includes(sub.name);

              return (
                <Pressable
                  key={sub.name}
                  onPress={() => onSubnameToggle(sub.name)}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 8,
                    borderWidth: 1,
                    backgroundColor: isSubSelected ? Colors.primary : "#fff",
                    borderColor: isSubSelected ? Colors.primary : Colors.border,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      color: isSubSelected ? "#fff" : Colors.text,
                    }}
                  >
                    {sub.name}
                  </Text>
                </Pressable>
              );
            })}
          </HStack>
        </View>
      )}
    </VStack>
  );
};