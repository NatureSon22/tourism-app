import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { PopupOption } from "../components/ui/CustomPopupMenu";
import { Colors } from "./styles";

// TODO: prefer using images instead to avoid loading icons
// TODO: this is currently hard coded with moduleIds for easier integration with the backend, but ideally we should fetch these from the backend instead to allow more flexibility in changing/adding categories without needing app updates
const FORUMS_OPTIONS: PopupOption[] = [
  {
    label: "Tourist Spots & Attractions",
    value: "tourist_spots_and_attractions",
    moduleId: "c2222222-2222-2222-2222-222222222222",
    Icon: <FontAwesome name="bed" size={16} color={Colors.primary} />,
  },
  {
    label: "Food & Dining",
    value: "food_and_dining",
    moduleId: "c3333333-3333-3333-3333-333333333333",
    Icon: (
      <FontAwesome6 name="person-walking" size={16} color={Colors.primary} />
    ),
  },
  {
    label: "Transportation & Directions",
    value: "transportation_and_directions",
    moduleId: "c4444444-4444-4444-4444-444444444444",
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
    moduleId: "c5555555-5555-5555-5555-555555555555",
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
    moduleId: "c6666666-6666-6666-6666-666666666666",
    Icon: <FontAwesome5 name="utensils" size={16} color={Colors.primary} />,
  },
];

export type ForumsOptionValue = {
  
}
export default FORUMS_OPTIONS;
