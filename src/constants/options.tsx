import { ImageSourcePropType } from "react-native";

type TabNavigationItem = {
  name: string;
  path: string;
  module: string;
  icon: ImageSourcePropType;
  moduleId?: string;
};

const ALLTABNAVIGATION: TabNavigationItem[] = [
  {
    name: "Hotels & Lodges",
    path: "/accommodation",
    module: "Accommodation",
    icon: require("../assets/images/hotels.png"),
    moduleId: "d2222222-2222-2222-2222-222222222222",
  },
  {
    name: "Food & Dining",
    path: "/dining",
    module: "Food & Dining",
    icon: require("../assets/images/food.png"),
    moduleId: "d6666666-6666-6666-6666-666666666666",
  },
  {
    name: "General Activities",
    path: "/activity",
    module: "General Activities",
    icon: require("../assets/images/general.png"),
    moduleId: "d3333333-3333-3333-3333-333333333333",
  },
  {
    name: "Events & Festivals",
    path: "/event",
    module: "Events & Festivals",
    icon: require("../assets/images/events.png"),
    moduleId: "d4444444-4444-4444-4444-444444444444",
  },
  {
    name: "Local Services",
    path: "/service",
    module: "Local Services",
    icon: require("../assets/images/local.png"),
    moduleId: "d5555555-5555-5555-5555-555555555555",
  },
  {
    name: "Transportation Information",
    path: "/transportation",
    module: "Transportation",
    icon: require("../assets/images/transportation.png"),
    moduleId: "d7777777-7777-7777-7777-777777777777",
  },
];

export default ALLTABNAVIGATION;
