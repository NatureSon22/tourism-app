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

  if (params.radius) {
    query.append("radius", String(params.radius));
  }

  if (params.lat) {
    query.append("lat", String(params.lat));
  }

  if (params.lng) {
    query.append("lng", String(params.lng));
  }

  if (params.page) {
    query.append("page", String(params.page));
  }

  if (params.moduleId) {
    query.append("moduleId", params.moduleId);
  }

  if (params.userId) {
    console.log("Appending userId to query string:", params.userId);
    query.append("userId", params.userId);
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
