import * as Location from "expo-location";
import { Alert, Linking, Platform } from "react-native";

export default async function getLocation() {
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
            onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings() 
          },
        ]
      );
      return null;
    }

    // 3. Fetch Position
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    // 4. Return only the essential coordinates
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    
  } catch (error) {
    console.warn("Error getting location", error);
    Alert.alert("Error", "We couldn't retrieve your location. Please check if your GPS is turned on.");
    return null;
  }
}