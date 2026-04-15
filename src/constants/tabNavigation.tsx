import { ImageSourcePropType } from "react-native";

type TabNavigationItem = {
  name: string;
  path: string;
  icon: ImageSourcePropType;
  moduleId?: string;
};

const TABNAVIGATION: TabNavigationItem[] = [
  {
    name: "Hotels & Lodges",
    path: "/accommodation",
    icon: require("../assets/images/hotels.png"),
    moduleId: "d2222222-2222-2222-2222-222222222222",
  },
  {
    name: "Food & Dining",
    path: "/dining",
    icon: require("../assets/images/food.png"),
    moduleId: "d6666666-6666-6666-6666-666666666666",
  },
  {
    name: "General Activities",
    path: "/activity",
    icon: require("../assets/images/general.png"),
    moduleId: "d3333333-3333-3333-3333-333333333333",
  },
  {
    name: "Events & Festivals",
    path: "/event",
    icon: require("../assets/images/events.png"),
    moduleId: "d4444444-4444-4444-4444-444444444444",
  },
  {
    name: "More",
    path: "/more",
    icon: require("../assets/images/more.png"),
  },
];

export default TABNAVIGATION;
