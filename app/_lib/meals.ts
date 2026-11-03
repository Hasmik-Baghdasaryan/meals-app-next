import { cacheLife } from "next/cache";
import type { MealBasics, Meal, RawMeal } from "@/app/_types/meals";
import { asArray, mealdb } from "./client";
import { normalizeMealBasics, normalizeMealDetails } from "./normalizers";

type MealsResponse = { meals: RawMeal[] | null };

export async function getMealByCategory(
  category: string,
): Promise<MealBasics[]> {
  "use cache";
  cacheLife("days");
  const data = await mealdb<MealsResponse>("filter.php", { c: category });
  return asArray<RawMeal>(data.meals).map(normalizeMealBasics);
}

export async function getMealByIngredient(
  ingredient: string,
): Promise<MealBasics[]> {
  "use cache";
  cacheLife("days");
  const data = await mealdb<MealsResponse>("filter.php", {
    i: ingredient.trim().replace(/\s+/g, "_"),
  });
  return asArray<RawMeal>(data.meals).map(normalizeMealBasics);
}

export async function getMealDetails(id: string): Promise<Meal | null> {
  "use cache";
  cacheLife("days");
  const data = await mealdb<MealsResponse>("lookup.php", { i: id });
  const [meal] = asArray<RawMeal>(data.meals);
  return meal ? normalizeMealDetails(meal) : null;
}

export async function getMealByName(query: string): Promise<MealBasics[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 1800, expire: 3600 });
  const data = await mealdb<MealsResponse>("search.php", { s: query });
  return asArray<RawMeal>(data.meals).map(normalizeMealBasics);
}

export async function getRandomMeal(): Promise<Meal | null> {
  const data = await mealdb<MealsResponse>(
    "random.php",
    {},
    { cache: "no-store" },
  );
  const [meal] = asArray<RawMeal>(data.meals);
  return meal ? normalizeMealDetails(meal) : null;
}
