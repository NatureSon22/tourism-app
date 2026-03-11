type SortOption = {
  label: string;
  value: string;
};

const SORT_OPTIONS: SortOption[] = [
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

export default SORT_OPTIONS;
