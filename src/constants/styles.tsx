export const Typography = {
  family: {
    light: "Poppins-Light",
    regular: "Poppins-Regular",
    medium: "Poppins-Medium",
    semiBold: "Poppins-Semibold",
    bold: "Poppins-Bold",
    mediumItalic: "Poppins-MediumItalic",
  },

  weight: {
    regular: "400" as const,
    medium: "500" as const,
    bold: "700" as const,
  },
};

export const Colors = {
  // Brand Colors
  primary: "#2E9CF4",
  secondary: "#1A2117",
  tertiary: "#4B5563",

  // Backgrounds & Surfaces
  background: "#F9FAFB",
  surface: "#FFFFFF",
  overlay: "#F4F4F4",

  // Neutral / Borders / Dividers
  border: "#D8D8D9", // Light gray for bordersf
  text: "#1A2117", // Primary text
  neutral: "#7b8ba1ff", // Neutral text
  textMuted: "#6B7280", // Secondary text
  textDimmed: "#9BAC94", // Disabled text

  //Button Colors
  buttonSecondary: "#D9D9D9",

  // Status Colors
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  successText: "#166534",

  // Icon Colors
  iconPrimary: "#1A2117",
  iconSecondary: "#6B7280",

  // Disabled State
  disabled: "#E5E7EB",
  disabledText: "#9CA3AF",

  // text colors
  textHeading: "#1A2117",
  textBody: "#6B7280",
  textCaption: "#9CA3AF",
  textOnPrimary: "#FFFFFF",
  textHighlight: "#2E9CF4",

  rating: "#E28F0B",
};

export type ColorKeys = keyof typeof Colors;
