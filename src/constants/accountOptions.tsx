import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";

type AccountOption = {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
};

const ACCOUNT_OPTIONS: AccountOption[] = [
  {
    title: "Change the preference",
    description: "Chnage the vibe anytime, anywhere!",
    icon: <Octicons name="paintbrush" size={15} color="black" />,
    path: "/account/preference",
  },
  {
    title: "Account Information",
    description: "Access the account information",
    icon: <FontAwesome name="user-o" size={18} color="black" />,
    path: "/account/info",
  },
  {
    title: "Change your password",
    description: "Change your password at any time",
    icon: <Ionicons name="key-outline" size={18} color="black" />,
    path: "/account/password",
  },
  {
    title: "Deactivate your account",
    description: "Already traveled the world? Sad to see you go!",
    icon: (
      <MaterialCommunityIcons
        name="heart-broken-outline"
        size={18}
        color="black"
      />
    ),
    path: "/account/deactivate",
  },
];

export default ACCOUNT_OPTIONS;
