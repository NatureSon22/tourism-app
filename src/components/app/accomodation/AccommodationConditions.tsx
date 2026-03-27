import React from "react";
import { Text } from "react-native";
import Accordion from "../../ui/Accordion";

export default function AccommodationConditions() {
  return (
    <Accordion title="Terms & Conditions" initialExpanded={true}>
      <Text>This is general information</Text>
    </Accordion>
  );
}
