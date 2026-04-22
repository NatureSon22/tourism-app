import api, { ApiResponse } from "@/src/config/axios";
import { User } from "@/src/stores/authStore";

export type AccountUpdatePayload = Partial<User> | FormData;
export type AccountUpdateResponse = ApiResponse<User>;

const isFormData = (payload: AccountUpdatePayload): payload is FormData =>
  payload instanceof FormData ||
  (typeof payload === "object" && payload !== null && "append" in payload);

export const accountService = {
  updateAccountInformation: async (
    payload: AccountUpdatePayload,
  ): Promise<AccountUpdateResponse> => {
    if (isFormData(payload)) {
      const response = await api.post<AccountUpdateResponse>(
        "/consumer/me",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return response.data;
    }

    const response = await api.put<AccountUpdateResponse>(
      "/consumer/me",
      payload,
    );

    return response.data;
  },

  updatePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.post("/auth/change-password", {
      oldPassword: currentPassword,
      newPassword,
    });

    return response.data;
  },

  deactivateAccount: async (
    username: string,
    email: string,
    reason: string,
  ) => {
    const response = await api.post("/consumer/me/deactivate", {
      username,
      email,
      reason,
    });

    return response.data;
  },

  updatePreference: async (preference: string) => {
    const response = await api.post("/consumer/account/preference", {
      preference,
    });

    return response.data;
  },

  updateProfilePicture: async (
    formData: FormData,
  ): Promise<ApiResponse<{ mediaId: string; path: string }>> => {
    const response = await api.post<
      ApiResponse<{ mediaId: string; path: string }>
    >("/consumer/me/profile-picture", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
