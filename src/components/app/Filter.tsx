import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function Filter() {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <View>
      {/* <ButtonGroup>
        <Button
          variant="solid"
          size="sm"
          style={{ alignSelf: "flex-end" }}
          onPress={toggleFilter}
        >
          <MaterialIcons name="filter-alt" size={20} color="white" />
          <Text style={{ color: "white", fontSize: 13 }}>Filter</Text>
        </Button>
      </ButtonGroup>

      <Actionsheet isOpen={showFilter} onClose={toggleFilter}>
        <ActionsheetBackdrop />

        <ActionsheetContent></ActionsheetContent>
      </Actionsheet> */}
    </View>
  );
}
