import Accordion from "@/src/components/ui/Accordion";
import { Fields } from "@/src/constants/localservicedetails";
import { Colors, Typography } from "@/src/constants/styles";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import TeamRow from "./TeamRow";

type ServiceTeamProps = {
  team: Fields[];
};

export default function ServiceTeam({ team }: ServiceTeamProps) {
  return (
    <Accordion title="Our Team">
      <View style={styles.container}>
        {team.map((field, index) => (
          <View key={`team-field-${field.field}`} style={{ gap: 8 }}>
            <Text style={styles.fieldTitle}>{field.field}</Text>
            <TeamRow members={field.members} />
          </View>
        ))}
      </View>
    </Accordion>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    gap: 30,
  },
  fieldTitle: {
    fontSize: 14,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
  },
});
