type Listing = "accommodation" | "activity" | "event";

export const RADIUS: Record<Listing, number> = {
  accommodation: 5000, // 5 km
  activity: 10000, // 10 km
  event: 15000, // 15 km
};
