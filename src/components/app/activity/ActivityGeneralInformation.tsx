import React from "react";
import { Text } from "react-native";
import Accordion from "../../ui/Accordion";

export default function ActivityGeneralInformation() {
  return (
    <Accordion title="General Information" initialExpanded={true}>
      <Text>This is general information</Text>
    </Accordion>
  );
}
