import HeaderSheet from "@/src/components/app/HeaderSheet";
import ControllerTextInput from "@/src/components/ui/ControllerTextInput";
import CustomButton from "@/src/components/ui/CustomButton";
import VStack from "@/src/layouts/VStack";
import { useAccount } from "@/src/services/request/useAccount";
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

const NameSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

type NameFormValues = z.infer<typeof NameSchema>;

export default function EditNameSheet(props: SheetProps) {
  const user = useAuthStore((state) => state.user);
  const accountMutation = useAccount();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<NameFormValues>({
    resolver: zodResolver(NameSchema),
    mode: "onChange",
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
    },
  });

  const handleCloseSheet = () => {
    SheetManager.hide(props.sheetId);
  };

  const onSubmit = (data: NameFormValues) => {
    accountMutation.mutate(
      { firstName: data.firstName, lastName: data.lastName },
      { onSuccess: handleCloseSheet },
    );
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
        <HeaderSheet title="Edit Name" handleCloseSheet={handleCloseSheet} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <VStack gap={16} style={styles.formContainer}>
            <ControllerTextInput
              control={control}
              name="firstName"
              label="First Name"
              placeholder="First Name"
              errors={errors}
              isRequired
            />

            <ControllerTextInput
              control={control}
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              errors={errors}
              isRequired
            />

            <CustomButton
              title="Save"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || accountMutation.isPending}
            />
          </VStack>
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
    height: 340,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 16,
  },
  formContainer: {
    width: "100%",
  },
});
