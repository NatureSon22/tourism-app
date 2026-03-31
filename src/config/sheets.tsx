import EditEmailSheet from "@/src/sheets/EditEmailSheet";
import EditNameSheet from "@/src/sheets/EditNameSheet";
import EditUsernameSheet from "@/src/sheets/EditUsernameSheet";
import EditProfileImageSheet from "@/src/sheets/EditProfileImageSheet";
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
    "edit-name-sheet": SheetDefinition;
    "edit-username-sheet": SheetDefinition;
    "edit-email-sheet": SheetDefinition;
    "edit-profile-image-sheet": SheetDefinition;
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
        "edit-name-sheet": EditNameSheet,
        "edit-username-sheet": EditUsernameSheet,
        "edit-email-sheet": EditEmailSheet,
        "edit-profile-image-sheet": EditProfileImageSheet,
      }}
    />
  );
};
