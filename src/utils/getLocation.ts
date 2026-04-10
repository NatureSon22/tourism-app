import * as Location from "expo-location";
import { Alert, Linking, Platform } from "react-native";

export type UserLocation = {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
};

export default async function getLocation(): Promise<UserLocation | null> {
  try {
    // 1. Request Permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    // 2. Handle Denied Permission with an Alert
    if (status !== "granted") {
      Alert.alert(
        "Location Required",
        "To sort by distance, please enable location services in your settings.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Open Settings",
            onPress: () =>
              Platform.OS === "ios"
                ? Linking.openURL("app-settings:")
                : Linking.openSettings(),
          },
        ],
      );
      return null;
    }

    // 3. Fetch Position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    // 4. Reverse geocode to get a human-readable address
    const [addressInfo] = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const addressParts = [
      addressInfo.name,
      addressInfo.street,
      addressInfo.city,
      addressInfo.region,
      addressInfo.postalCode,
      addressInfo.country,
    ]
      .filter(Boolean)
      .join(", ");

    return {
      latitude,
      longitude,
      address: addressParts || undefined,
      city: addressInfo.city ?? undefined,
      region: addressInfo.region ?? undefined,
      country: addressInfo.country ?? undefined,
      postalCode: addressInfo.postalCode ?? undefined,
    };
  } catch (error) {
    console.warn("Error getting location", error);
    Alert.alert(
      "Error",
      "We couldn't retrieve your location. Please check if your GPS is turned on.",
    );
    return null;
  }
}
