import { cacheLife } from "next/cache";
import { IngredientItem, RawIngredient } from "@/app/_types/meals";
import { asArray, mealdb } from "./client";
import { normalizeIngredient } from "./normalizers";

export async function getIngredients(): Promise<IngredientItem[]> {
  "use cache";
  cacheLife("days");
  const data = await mealdb<{ meals: RawIngredient[] | null }>("list.php", {
    i: "list",
  });
  return asArray<RawIngredient>(data.meals).map(normalizeIngredient);
}

export async function getIngredientBySlug(
  slug: string | null,
): Promise<IngredientItem | null> {
  if (!slug) return null;
  const all = await getIngredients();
  return all.find((i) => i.name.toLowerCase() === slug.toLowerCase()) ?? null;
}
