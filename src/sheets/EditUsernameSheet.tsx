import HeaderSheet from "@/src/components/app/HeaderSheet";
import ControllerTextInput from "@/src/components/ui/ControllerTextInput";
import CustomButton from "@/src/components/ui/CustomButton";
import useAuthStore from "@/src/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import ActionSheet, {
  ScrollView,
  SheetManager,
  SheetProps,
} from "react-native-actions-sheet";
import { z } from "zod";

const UsernameSchema = z.object({
  userName: z.string().min(1, "Username is required"),
});

type UsernameFormValues = z.infer<typeof UsernameSchema>;

export default function EditUsernameSheet(props: SheetProps) {
  const user = useAuthStore((state) => state.user);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UsernameFormValues>({
    resolver: zodResolver(UsernameSchema),
    mode: "onChange",
    defaultValues: {
      userName: user?.userName ?? "",
    },
  });

  const handleCloseSheet = () => {
    SheetManager.hide(props.sheetId);
  };

  const onSubmit = (data: UsernameFormValues) => {
    console.log("Username updated", data);
    handleCloseSheet();
  };

  return (
    <ActionSheet
      id={props.sheetId}
      gestureEnabled={false}
      closeOnTouchBackdrop={true}
      defaultOverlayOpacity={0.64}
      useBottomSafeAreaPadding={false}
      containerStyle={styles.sheetContainer}
    >
      <View style={styles.wrapper}>
        <HeaderSheet
          title="Edit Username"
          handleCloseSheet={handleCloseSheet}
        />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <ControllerTextInput
            control={control}
            name="userName"
            label="Username"
            placeholder="Username"
            errors={errors}
            isRequired
          />

          <CustomButton
            title="Save"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        </ScrollView>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  sheetContainer: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "white",
  },
  wrapper: {
    height: 280,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
});
