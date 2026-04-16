import api from "@/src/config/axios";

export const accountService = {
  updateAccountInformation: async (form: FormData) => {
    const response = await api.post("/consumer/account/update", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  updatePassword: async (currentPassword: string, newPassword: string) => {
    const response = await api.post("/consumer/account", {
      currentPassword,
      newPassword,
    });

    return response.data;
  },

  deactivateAccount: async (
    username: string,
    email: string,
    reason: string,
  ) => {
    const response = await api.post("/consumer/account/deactivate", {
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
};
