import { create } from "zustand";

// 1. Unified Types & Constants
export type SortValue = "popularity_desc" | "review_desc" | "distance_asc";

export const FILTER_DEFAULTS = {
  selectedArea: null as string | null,
  selectedStar: 4,
  reviewScore: 3,
  propertyType: "hotel",
  accommodationType: [] as string[],
  amenities: [] as string[],
};

interface ActivityState {
  // Search & Sort
  search: string;
  sort: SortValue;

  // Advanced Filter Object
  filters: typeof FILTER_DEFAULTS;

  // Actions
  setSearch: (query: string) => void;
  setSort: (option: SortValue) => void;

  /** * Updates specific filter fields without overwriting the whole object.
   * Usage: updateFilters({ selectedArea: 'baguio' })
   */
  updateFilters: (updates: Partial<typeof FILTER_DEFAULTS>) => void;

  // Resets
  resetFilters: () => void; // Resets only the filter criteria
  clearAll: () => void; // Wipes search, sort, and filters
}

export const useActivityStore = create<ActivityState>((set) => ({
  // Initial State
  search: "",
  sort: "popularity_desc",
  filters: { ...FILTER_DEFAULTS },

  // Setters
  setSearch: (search) => set({ search }),

  setSort: (sort) => set({ sort }),

  updateFilters: (updates) =>
    set((state) => ({
      filters: { ...state.filters, ...updates },
    })),

  resetFilters: () =>
    set({
      filters: { ...FILTER_DEFAULTS },
    }),

  clearAll: () =>
    set({
      search: "",
      sort: "popularity_desc",
      filters: { ...FILTER_DEFAULTS },
    }),
}));
