import React from "react";
import { Text } from "react-native";
import Accordion from "../../ui/Accordion";

export default function DiningConditions() {
  return (
    <Accordion title="Terms & Conditions" initialExpanded={true}>
      <Text>This is the terms & conditions</Text>
    </Accordion>
  );
}
