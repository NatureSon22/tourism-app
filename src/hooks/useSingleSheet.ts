import { useRef } from "react";
import { SheetManager } from "react-native-actions-sheet";
import { SortOption } from "../config/sort";

type Payload = {
  options: SortOption[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
};

export const useSingleSheet = () => {
  const isSheetOpen = useRef(false);

  const openSheet = async (sheetName: string, payload?: Payload) => {
    if (isSheetOpen.current) return;

    isSheetOpen.current = true;

    try {
      await SheetManager.show(sheetName, {
        payload,
        onClose: () => {
          isSheetOpen.current = false;
        },
      });
    } catch (error) {
      console.error(`Error opening sheet ${sheetName}:`, error);
      isSheetOpen.current = false;
    }
  };

  return { openSheet };
};
