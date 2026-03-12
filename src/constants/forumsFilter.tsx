import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { PopupOption } from "../components/ui/CustomPopupMenu";
import { Colors } from "./styles";

// TODO: prefer using images instead to avoid loading icons
const FORUMS_OPTIONS: PopupOption[] = [
  {
    label: "Tourist Spots & Attractions",
    value: "tourist_spots_and_attractions",
    Icon: <FontAwesome name="bed" size={16} color={Colors.primary} />,
  },
  {
    label: "Food & Dining",
    value: "food_and_dining",
    Icon: (
      <FontAwesome6 name="person-walking" size={16} color={Colors.primary} />
    ),
  },
  {
    label: "Transportation & Directions",
    value: "transportation_and_directions",
    Icon: (
      <MaterialCommunityIcons
        name="calendar-star"
        size={16}
        color={Colors.primary}
      />
    ),
  },
  {
    label: "Local Tips & Hidden Gems",
    value: "local_tips_and_hidden_gems",
    Icon: (
      <MaterialCommunityIcons
        name="handshake-outline"
        size={16}
        color={Colors.primary}
      />
    ),
  },
  {
    label: "General Questions & Discussions",
    value: "general_questions_and_discussions",
    Icon: <FontAwesome5 name="utensils" size={16} color={Colors.primary} />,
  },
];

export type ForumsOptionValue = (typeof FORUMS_OPTIONS)[number]["value"];
export default FORUMS_OPTIONS;
