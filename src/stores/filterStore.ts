import { create } from "zustand";

type Category =
  | "accommodation"
  | "dining"
  | "activity"
  | "event"
  | "services"
  | "transportation";

type BaseFilter = {
  area: string[];
  sort: string;
  type: { type: string; subtypes: string[] };
  attributes: Record<string, string[]>;
};

type AccommodationFilter = BaseFilter & {
  rating: number;
  amenities: string[];
  lat?: number;
  lng?: number;
  radius?: number;
};

type DiningFilter = BaseFilter & {
  rating: number;
  amenities: string[];
};

type ActivityFilter = BaseFilter & {
  amenities: string[];
  duration: string;
};

type EventFilter = BaseFilter & {
  amenities: string[];
};

type ServiceFilter = BaseFilter;

type TransportationFilter = BaseFilter & {
  rating: number;
};

// Map categories to their specific filter shapes
type CategoryFilterMap = {
  accommodation: AccommodationFilter;
  dining: DiningFilter;
  activity: ActivityFilter;
  event: EventFilter;
  services: ServiceFilter;
  transportation: TransportationFilter;
};

type SearchState = {
  categories: {
    [K in Category]: {
      search: string;
      options: CategoryFilterMap[K];
    };
  };
  setSearch: (cat: Category, text: string) => void;
  updateOptions: <K extends Category>(
    cat: K,
    updates: Partial<CategoryFilterMap[K]>,
  ) => void;
  resetCategory: (cat: Category) => void;
};

const createInitialOptions = (cat: Category): any => {
  const base = {
    area: [],
    sort: "distance",
    rating: 0,
    type: { type: "", subtypes: [] },
  };

  switch (cat) {
    case "accommodation":
      return { ...base, amenities: [], attributes: {} };
    case "dining":
      return { ...base, amenities: [], attributes: {} };
    case "activity":
      return { ...base, amenities: [] };
    case "event":
      return { ...base, amenities: [] };
    case "services":
      return base;
    case "transportation":
      return { ...base, duration: "" };
    default:
      return base;
  }
};

const createInitialCategory = (cat: Category) => ({
  search: "",
  options: createInitialOptions(cat),
});

export const useFilterStore = create<SearchState>((set) => ({
  categories: {
    accommodation: createInitialCategory("accommodation"),
    dining: createInitialCategory("dining"),
    activity: createInitialCategory("activity"),
    event: createInitialCategory("event"),
    transportation: createInitialCategory("transportation"),
    services: createInitialCategory("services"),
  },

  setSearch: (cat, text) =>
    set((state) => ({
      categories: {
        ...state.categories,
        [cat]: { ...state.categories[cat], search: text },
      },
    })),

  updateOptions: (cat, updates) =>
    set((state) => {
      const currentCategory = state.categories[cat];

      return {
        categories: {
          ...state.categories,
          [cat]: {
            ...currentCategory,
            options: {
              ...currentCategory.options,
              ...updates,
              // Handle deep merging for the 'type' object specifically
              type: updates.type
                ? { ...currentCategory.options.type, ...updates.type }
                : currentCategory.options.type,
              // Handle deep merging for 'attributes' specifically if they exist
              attributes:
                updates.attributes && "attributes" in currentCategory.options
                  ? {
                      ...currentCategory.options.attributes,
                      ...updates.attributes,
                    }
                  : (currentCategory.options as any).attributes,
            },
          },
        },
      };
    }),

  resetCategory: (cat) =>
    set((state) => ({
      categories: {
        ...state.categories,
        [cat]: createInitialCategory(cat),
      },
    })),
}));
