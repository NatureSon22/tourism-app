import { ImageSourcePropType } from "react-native";

type TabNavigationItem = {
  name: string;
  path: string;
  icon: ImageSourcePropType;
};

const TABNAVIGATION: TabNavigationItem[] = [
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
    path: "/event",
    icon: require("../assets/images/events.png"),
  },
  {
    name: "More",
    path: "/more",
    icon: require("../assets/images/more.png"),
  },
];

export default TABNAVIGATION;
