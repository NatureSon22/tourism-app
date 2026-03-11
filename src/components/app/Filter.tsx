import React, { useState } from "react";
import { Button, View } from "react-native";
import { SheetManager } from "react-native-actions-sheet";

export default function Filter() {
  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <View>
      <Button
        title="Toggle Filter"
        onPress={() => SheetManager.show("example-sheet")}
      />
    </View>
  );
}
