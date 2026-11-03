export function mealImageUrl(url: string, size: string) {
  return url ? `${url}/${size}` : url;
}
