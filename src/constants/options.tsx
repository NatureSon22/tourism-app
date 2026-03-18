import { ImageSourcePropType } from "react-native";

type TabNavigationItem = {
  name: string;
  path: string;
  icon: ImageSourcePropType;
};

const ALLTABNAVIGATION: TabNavigationItem[] = [
  {
    name: "Hotels & Lodges",
    path: "/accommodation",
    icon: require("../assets/images/hotels.png"),
  },
  {
    name: "Food & Dining",
    path: "/dining",
    icon: require("../assets/images/food.png"),
  },
  {
    name: "General Activities",
    path: "/activity",
    icon: require("../assets/images/general.png"),
  },
  {
    name: "Events & Festivals",
    path:  "/event",
    icon: require("../assets/images/events.png"),
  },
  {
    name: "Local Services",
    path: "/local-services",
    icon: require("../assets/images/local.png"),
  },
  {
    name: "Transportation Information",
    path: "/transportation",
    icon: require("../assets/images/transportation.png"),
  },
];

export default ALLTABNAVIGATION;
