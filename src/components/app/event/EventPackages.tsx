import { Package } from "@/src/constants/activitydetail";
import { Colors, Typography } from "@/src/constants/styles";
import { StyleSheet, Text, View } from "react-native";
import DetailSection from "../../ui/DetailsSection";

type EventPackagesProps = {
  packages: Package[];
};

export default function EventPackages({ packages }: EventPackagesProps) {
  return (
    <DetailSection title="Package options">
      <View style={{ gap: 12 }}>
        {packages.map((pkg) => (
          <View key={pkg.id} style={styles.packageCard}>
            <Text style={styles.packageTitle}>{pkg.title}</Text>
            {pkg.subTitle ? (
              <Text style={styles.packageSubTitle}>{pkg.subTitle}</Text>
            ) : null}
            <Text style={styles.packagePrice}>
              ₱{pkg.price.toLocaleString()}
            </Text>
          </View>
        ))}
      </View>
    </DetailSection>
  );
}

export const styles = StyleSheet.create({
  packageCard: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  packageTitle: {
    fontSize: 12,
    fontFamily: Typography.family.medium,
    color: Colors.text,
  },
  packageSubTitle: {
    fontSize: 11,
    fontFamily: Typography.family.regular,
    color: Colors.textMuted,
  },
  packagePrice: {
    fontSize: 14,
    fontFamily: Typography.family.semiBold,
    color: Colors.text,
    marginTop: 6,
  },
});
