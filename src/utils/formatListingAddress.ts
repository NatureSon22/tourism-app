import { Address } from "../types/baseListing";

export const formatListingAddress = (
  address: Partial<Address> | any,
  mode: "full" | "short" = "full",
): string => {
  if (!address) return "";

  // Mapping fields to handle both camelCase (from your JSON)
  // and snake_case (from your DB schema)
  const street = address.street;
  const barangay = address.barangay;
  const city = address.city || address.city_code;
  const province = address.province || address.province_code;
  const postalCode = address.postalCode || address.postal_code;

  if (mode === "short") {
    // Returns: "City, Province"
    return [city, province].filter(Boolean).join(", ");
  }

  // Returns: "Street, Barangay, City, Province, Postal Code"
  return [street, barangay, city, province, postalCode]
    .filter(Boolean) // Removes null/undefined fields
    .join(", ");
};
