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

export const categorySlug = (name: string) => name.toLowerCase();

export async function getCategoryBySlug(
  slug: string | null,
): Promise<Category | null> {
  if (!slug) return null;
  const categories = await getCategories();
  return (
    categories.find((c) => categorySlug(c.name) === slug.toLowerCase()) ?? null
  );
}
