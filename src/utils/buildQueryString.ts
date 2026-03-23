import { QueryParams } from "@/src/types/filter";

export function buildQueryString(params: QueryParams): string {
  const query = new URLSearchParams();

  if (!params) return "";

  if (params.search?.trim()) {
    query.append("search", params.search.trim());
  }

  if (params.sort) {
    query.append("sort", params.sort);
  }

  if (typeof params.rating === "number" && !Number.isNaN(params.rating)) {
    query.append("rating", String(params.rating));
  }

  const appendArray = (key: string, value?: string | string[]) => {
    if (!value) return;
    if (Array.isArray(value)) {
      value
        .filter((v) => v != null && v !== "")
        .forEach((v) => query.append(key, v));
    } else if (value.trim()) {
      query.append(key, value.trim());
    }
  };

  appendArray("area", params.area);
  appendArray("type", params.type);
  appendArray("subtypes", params.subtypes);
  appendArray("amenities", params.amenities);

  return query.toString();
}