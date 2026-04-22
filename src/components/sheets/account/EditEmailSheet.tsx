import HeaderSheet from "@/src/components/app/HeaderSheet";
import ControllerTextInput from "@/src/components/ui/ControllerTextInput";
import CustomButton from "@/src/components/ui/CustomButton";
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

const EmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type EmailFormValues = z.infer<typeof EmailSchema>;

export default function EditEmailSheet(props: SheetProps) {
  const user = useAuthStore((state) => state.user);
  const accountMutation = useAccount();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(EmailSchema),
    mode: "onChange",
    defaultValues: {
      email: user?.email ?? "",
    },
  });

  const handleCloseSheet = () => {
    SheetManager.hide(props.sheetId);
  };

  const onSubmit = (data: EmailFormValues) => {
    accountMutation.mutate(
      { email: data.email },
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
        <HeaderSheet title="Edit Email" handleCloseSheet={handleCloseSheet} />

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
            name="email"
            label="Email"
            placeholder="Email"
            errors={errors}
            isRequired
          />

          <CustomButton
            title="Save"
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || accountMutation.isPending}
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
