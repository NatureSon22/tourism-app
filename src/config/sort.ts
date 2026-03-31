export type SortOption = {
  label: string;
  value: string;
};

export const ACCOMMODATION_SORT: SortOption[] = [
  {
    label: "Popularity (High to Low)",
    value: "popularity_desc",
  },
  {
    label: "Review (High to Low)",
    value: "review_desc",
  },
  {
    label: "Distance (Near to Far)",
    value: "distance_asc",
  },
];

export const DINING_SORT: SortOption[] = [
  {
    label: "Popularity (High to Low)",
    value: "popularity_desc",
  },
  {
    label: "Review (High to Low)",
    value: "review_desc",
  },
  {
    label: "Distance (Near to Far)",
    value: "distance_asc",
  },
];

export const ACTIVITY_SORT: SortOption[] = [
  {
    label: "Popularity (High to Low)",
    value: "popularity_desc",
  },
  {
    label: "Review (High to Low)",
    value: "review_desc",
  },
  {
    label: "Distance (Near to Far)",
    value: "distance_asc",
  },
];

export const EVENT_SORT: SortOption[] = [
  {
    label: "Most Relevant",
    value: "relevance_desc",
  },
  {
    label: "Recently Added",
    value: "added_desc",
  },
  {
    label: "Ending Soon",
    value: "ending_asc",
  },
  {
    label: "Distance (Near to Far)",
    value: "distance_asc",
  },
];

export const SERVICE_SORT: SortOption[] = [
  {
    label: "Distance (Near to Far)",
    value: "distance_asc",
  },
];

export const TRANSPORTATION_SORT: SortOption[] = [
  {
    label: "Popularity (High to Low)",
    value: "popularity_desc",
  },
  {
    label: "Review (High to Low)",
    value: "review_desc",
  },
  {
    label: "Distance (Near to Far)",
    value: "distance_asc",
  },
];
