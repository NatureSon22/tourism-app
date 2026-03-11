import { SheetDefinition, SheetRegister } from "react-native-actions-sheet";
import AreaSheet from "../components/sheets/AreaSheet";
import { default as ExampleSheet } from "../components/sheets/ExampleSheet";
import FilterSheet from "../components/sheets/FilterSheet";
import OptionSheet from "../components/sheets/OptionSheet";
import SortSheet from "../components/sheets/SortSheet";

declare module "react-native-actions-sheet" {
  interface Sheets {
    "example-sheet": SheetDefinition;
    "options-sheet": SheetDefinition;
    "area-sheet": SheetDefinition;
    "filter-sheet": SheetDefinition;
    "sort-sheet": SheetDefinition;
  }
}

export const Sheets = () => {
  return (
    <SheetRegister
      sheets={{
        "example-sheet": ExampleSheet,
        "options-sheet": OptionSheet,
        "area-sheet": AreaSheet,
        "filter-sheet": FilterSheet,
        "sort-sheet": SortSheet,
      }}
    />
  );
};
