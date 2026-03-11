import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PopupOption } from "../components/ui/CustomPopupMenu";
import { Colors } from "./styles";

const LISTING_OPTIONS: PopupOption[] = [
  {
    label: "Accommodation",
    value: "accommodation",
    Icon: <FontAwesome name="bed" size={16} color={Colors.primary} />,
  },
  {
    label: "General Activities",
    value: "general_activities",
    Icon: (
      <FontAwesome6 name="person-walking" size={16} color={Colors.primary} />
    ),
  },
  {
    label: "Events and Festivals",
    value: "events_and_festivals",
    Icon: (
      <MaterialCommunityIcons
        name="calendar-star"
        size={16}
        color={Colors.primary}
      />
    ),
  },
  {
    label: "Local Services",
    value: "local_services",
    Icon: (
      <MaterialCommunityIcons
        name="handshake-outline"
        size={16}
        color={Colors.primary}
      />
    ),
  },
  {
    label: "Food and Dining",
    value: "food_and_dining",
    Icon: <FontAwesome5 name="utensils" size={16} color={Colors.primary} />,
  },
  {
    label: "Transportation Information",
    value: "transportation_information",
    Icon: (
      <MaterialIcons
        name="emoji-transportation"
        size={16}
        color={Colors.primary}
      />
    ),
  },
];

export type ListingOptionValue = (typeof LISTING_OPTIONS)[number]["value"];
export default LISTING_OPTIONS;
