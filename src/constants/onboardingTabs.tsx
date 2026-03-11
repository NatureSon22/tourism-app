const TAB1 = require("../assets/images/tab1.png");
const TAB2 = require("../assets/images/tab2.png");
const TAB3 = require("../assets/images/tab3.png");
const TAB4 = require("../assets/images/tab4.png");

export type OnboardingTab = {
  id: number;
  img: string;
  description: string;
};

const ONBOARDINGTABS: OnboardingTab[] = [
  {
    id: 0,
    img: TAB1,
    description: "Anything goes!",
  },
  {
    id: 1,
    img: TAB2,
    description: "Beach Bum",
  },
  {
    id: 2,
    img: TAB3,
    description: "Foodie",
  },
  {
    id: 3,
    img: TAB4,
    description: "Adventure Seeker",
  },
];

export default ONBOARDINGTABS;
