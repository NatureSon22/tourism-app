import { useRef } from "react";
import { SheetManager } from "react-native-actions-sheet";

export const useSingleSheet = () => {
  const isSheetOpen = useRef(false);

  const openSheet = async (sheetName: string, payload?: any) => {
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
