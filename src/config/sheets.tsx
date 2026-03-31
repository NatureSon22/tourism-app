import EditEmailSheet from "@/src/components/sheets/account/EditEmailSheet";
import EditNameSheet from "@/src/components/sheets/account/EditNameSheet";
import EditProfileImageSheet from "@/src/components/sheets/account/EditProfileImageSheet";
import EditUsernameSheet from "@/src/components/sheets/account/EditUsernameSheet";
import { SheetDefinition, SheetRegister } from "react-native-actions-sheet";
import FilterSheet from "../components/sheets/accommodation/FilterSheet";
import ActivityFilterSheet from "../components/sheets/activity/ActivityFilterSheet";
import AreaSheet from "../components/sheets/AreaSheet";
import DiningFilterSheet from "../components/sheets/dining/DiningFilterSheet";
import EventFilterSheet from "../components/sheets/event/EventFilterSheet";
import OptionSheet from "../components/sheets/NavigationSheet";
import ServiceFilterSheet from "../components/sheets/service/ServiceFilterSheet";
import TransportationFilterSheet from "../components/sheets/transportation/TransportationFilterSheet";
import SortSheet from "../components/sheets/SortSheet";

declare module "react-native-actions-sheet" {
  interface Sheets {
    "options-sheet": SheetDefinition;
    "area-sheet": SheetDefinition;
    "filter-sheet": SheetDefinition;
    "sort-sheet": SheetDefinition;

    "accommodation-filter-sheet": SheetDefinition;

    "dining-filter-sheet": SheetDefinition;

    "activity-filter-sheet": SheetDefinition;

    "event-filter-sheet": SheetDefinition;

    "service-filter-sheet": SheetDefinition;

    "transportation-filter-sheet": SheetDefinition;

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
        "filter-sheet": FilterSheet,
        "sort-sheet": SortSheet,

        "accommodation-filter-sheet": FilterSheet,

        "dining-filter-sheet": DiningFilterSheet,

        "activity-filter-sheet": ActivityFilterSheet,

        "event-filter-sheet": EventFilterSheet,

        "service-filter-sheet": ServiceFilterSheet,

        "transportation-filter-sheet": TransportationFilterSheet,

        "edit-name-sheet": EditNameSheet,
        "edit-username-sheet": EditUsernameSheet,
        "edit-email-sheet": EditEmailSheet,
        "edit-profile-image-sheet": EditProfileImageSheet,
      }}
    />
  );
};
