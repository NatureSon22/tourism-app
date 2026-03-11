import { create } from "zustand";
import { FILTER_DEFAULTS } from "../constants/filterConstants";

interface FilterState {
  selectedStar: number;
  reviewScore: number;
  propertyType: string;
  accommodationType: string[];
  amenities: string[];
  // Actions
  setSelectedStar: (star: number) => void;
  setReviewScore: (score: number) => void;
  setPropertyType: (type: string) => void;
  toggleAmenity: (name: string) => void;
  toggleAccommodation: (name: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  selectedStar: FILTER_DEFAULTS.selectedStar,
  reviewScore: FILTER_DEFAULTS.reviewScore,
  propertyType: FILTER_DEFAULTS.propertyType,
  accommodationType: FILTER_DEFAULTS.accommodationType,
  amenities: FILTER_DEFAULTS.amenities,

  setSelectedStar: (star) => set({ selectedStar: star }),
  setReviewScore: (score) => set({ reviewScore: score }),
  setPropertyType: (type) => set({ propertyType: type }),

  toggleAmenity: (name) =>
    set((state) => ({
      amenities: state.amenities.includes(name)
        ? state.amenities.filter((a) => a !== name)
        : [...state.amenities, name],
    })),

  toggleAccommodation: (name) =>
    set((state) => ({
      accommodationType: state.accommodationType.includes(name)
        ? state.accommodationType.filter((a) => a !== name)
        : [...state.accommodationType, name],
    })),

  resetFilters: () => set(FILTER_DEFAULTS),
}));
