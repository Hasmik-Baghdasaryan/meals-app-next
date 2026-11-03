export function mealImageUrl(url: string, size: "small" | "medium" | "large") {
  return url ? `${url}/${size}` : url;
}
