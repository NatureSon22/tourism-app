import { create } from "zustand";

type Category = "accommodation";

type FilterOptions = {
  area: string[];
  sort: string;
  filter: {
    rating: number;
    type: { type: string; subtypes: string[] };
    amenities: string[];
  };
};

type UpdateOptionsPayload = Partial<Omit<FilterOptions, "filter">> & {
  filter?: Partial<FilterOptions["filter"]>;
};

type SearchState = {
  categories: Record<
    Category,
    {
      search: string;
      options: FilterOptions;
    }
  >;

  // actions
  setSearch: (cat: Category, text: string) => void;
  updateOptions: (cat: Category, updates: UpdateOptionsPayload) => void;
  resetCategory: (cat: Category) => void;
};

const createInitialCategory = () => ({
  search: "",
  options: {
    area: [],
    sort: "distance",
    filter: { rating: 0, type: { type: "", subtypes: [] }, amenities: [] },
  },
});

export const useFilterStore = create<SearchState>((set) => ({
  categories: { accommodation: createInitialCategory() },
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
      const currentOptions = currentCategory.options;
      const currentFilter = currentOptions.filter;

      return {
        categories: {
          ...state.categories,
          [cat]: {
            ...currentCategory,
            options: {
              ...currentOptions,
              ...updates, 
              filter: {
                ...currentFilter,
                ...updates.filter,
             
                type: {
                  ...currentFilter.type,
                  ...updates.filter?.type,
                },
              },
            },
          },
        },
      };
    }),
  resetCategory: (cat) =>
    set((state) => ({
      categories: { ...state.categories, [cat]: createInitialCategory() },
    })),
}));
