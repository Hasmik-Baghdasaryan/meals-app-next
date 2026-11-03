import { cacheLife } from "next/cache";
import { normalizeCategory } from "@/app/_lib/normalizers";
import { Category, RawCategory } from "@/app/_types/category";
import { asArray, mealdb } from "./client";

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("days");
  const data = await mealdb<{ categories: RawCategory[] | null }>(
    "categories.php",
  );
  return asArray<RawCategory>(data.categories).map(normalizeCategory);
}
