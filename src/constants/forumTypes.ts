const FORUM_TYPES = [
  "Tourist Spots & Attractions",
  "Food & Dining",
  "Transportation & Travel Tips",
  "Accommodation & Lodging",
  "Local Services",
] as const;

export type ForumType = (typeof FORUM_TYPES)[number];
export default FORUM_TYPES;
