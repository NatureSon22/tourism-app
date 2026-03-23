import { SheetDefinition, SheetRegister } from "react-native-actions-sheet";
import DiningFilterSheet from "../components/sheets/DiningFilterSheet";
import OptionSheet from "../components/sheets/NavigationSheet";
import AccommodationAreaSheet from "../components/sheets/accommodation/AccommodationAreaSheet";
import AccommodationFilterSheet from "../components/sheets/accommodation/AccommodationFilterSheet";
import AccommodationSortSheet from "../components/sheets/accommodation/AccommodationSortSheet";

declare module "react-native-actions-sheet" {
  interface Sheets {
    "options-sheet": SheetDefinition;
    "area-sheet": SheetDefinition;
    "filter-sheet": SheetDefinition;
    "sort-sheet": SheetDefinition;
    "dining-filter-sheet": SheetDefinition;
    "accommodation-filter-sheet": SheetDefinition;
  }
}

export const Sheets = () => {
  return (
    <SheetRegister
      sheets={{
        "options-sheet": OptionSheet,
        "area-sheet": AccommodationAreaSheet,
        "filter-sheet": AccommodationFilterSheet,
        "sort-sheet": AccommodationSortSheet,
        "dining-filter-sheet": DiningFilterSheet,
        "accommodation-filter-sheet": AccommodationFilterSheet,
      }}
    />
  );
};
