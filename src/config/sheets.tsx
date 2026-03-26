import { SheetDefinition, SheetRegister } from "react-native-actions-sheet";
import AccommodationFilterSheet from "../components/sheets/accommodation/AccommodationFilterSheet";
import AccommodationSortSheet from "../components/sheets/accommodation/AccommodationSortSheet";
import AreaSheet from "../components/sheets/AreaSheet";
import DiningFilterSheet from "../components/sheets/DiningFilterSheet";
import OptionSheet from "../components/sheets/NavigationSheet";

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
        "area-sheet": AreaSheet,
        "filter-sheet": AccommodationFilterSheet,
        "sort-sheet": AccommodationSortSheet,
        "dining-filter-sheet": DiningFilterSheet,
        "accommodation-filter-sheet": AccommodationFilterSheet,
      }}
    />
  );
};
