import forumData, { ForumPost } from "./forum";

type Hotline = {
  landline: string[];
  mobile: string[];
};

type Schedule = {
  route: string;
  time: string;
};

type TranportationDetail = {
  id: string;
  images: string[];
  title: string;
  tags: string[];
  location: string;
  forums: ForumPost[];
  routes: string[];
  hotlines?: Hotline;
  schedule: Schedule[];
};

export const TRANSPORTATION_DETAIL: TranportationDetail = {
  id: "transportation-ph-001",
  images: [
    "https://media.worldnomads.com/explore/philippines/transport-hero-traffic-in-manila.jpg",
    "https://www.globaltranz.com/wp-content/uploads/sites/2/terminology.jpg",
    "https://primeeaglecargoservices.com/wp-content/uploads/2016/11/cars.jpg",
  ],
  title: "Pasig River Ferry Service",
  tags: ["Commuter", "River Transport", "Scenic", "Affordable", "Traffic-Free"],
  location: "Escolta Station, Binondo, Manila",
  forums: forumData,
  hotlines: {
    landline: ["(02) 8527-4354", "(02) 8527-4355"],
    mobile: ["0917-123-4567", "0928-765-4321"],
  },
  routes: [
    "Escolta Station to Intramuros",
    "Intramuros to Mall of Asia",
    "Mall of Asia to Baclaran",
    "Baclaran to Escolta Station",
    "North Harbor to South Harbor",
    "Quirino to Guadalupe",
    "Ayala",
    "Main Station to Lawton",
  ],
  schedule: [
    {
      route: "Escolta to Intramuros",
      time: "6:00 AM - 10:00 PM (every 30 mins)",
    },
    {
      route: "Intramuros to Mall of Asia",
      time: "6:15 AM - 10:15 PM (every 30 mins)",
    },
    {
      route: "Mall of Asia to Baclaran",
      time: "6:30 AM - 10:30 PM (every 30 mins)",
    },
  ],
};
