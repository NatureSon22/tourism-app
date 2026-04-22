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
    value: "d2222222-2222-2222-2222-222222222222",
    moduleId: "d2222222-2222-2222-2222-222222222222",
    Icon: <FontAwesome name="bed" size={16} color={Colors.primary} />,
  },
  {
    label: "General Activities",
    value: "d3333333-3333-3333-3333-333333333333",
    moduleId: "d3333333-3333-3333-3333-333333333333",
    Icon: (
      <FontAwesome6 name="person-walking" size={16} color={Colors.primary} />
    ),
  },
  {
    label: "Events and Festivals",
    value: "d4444444-4444-4444-4444-444444444444",
    moduleId: "d4444444-4444-4444-4444-444444444444",
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
    value: "d5555555-5555-5555-5555-555555555555",
    moduleId: "d5555555-5555-5555-5555-555555555555",
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
    value: "d6666666-6666-6666-6666-666666666666",
    moduleId: "d6666666-6666-6666-6666-666666666666",
    Icon: <FontAwesome5 name="utensils" size={16} color={Colors.primary} />,
  },
  {
    label: "Transportation Information",
    value: "d7777777-7777-7777-7777-777777777777",
    moduleId: "d7777777-7777-7777-7777-777777777777",
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
