import {
  RecipeIngredient,
  MealBasics,
  Meal,
  RawIngredient,
  RawMeal,
  IngredientItem,
} from "@/app/_types/meals";
import { INGREDIENTS_COUNT } from "@/app/_constants";
import { Category, RawCategory } from "@/app/_types/category";

const STEP_PREFIX = /^(?:step\s*)?\d+\s*[.):]\s+/i;
const STEP_ONLY = /^(?:step\s*)?\d+[.):]?$/i;

function cleanText(text: string) {
  return text
    .replace(/[\u25A0-\u25FF]/g, "")
    .trim()
    .replace(STEP_PREFIX, "")
    .trim();
}

function parseMealInstructions(text: string) {
  return text
    .split(/\r?\n/)
    .map(cleanText)
    .filter((line) => line && !STEP_ONLY.test(line));
}

function parseMealIngredients(meal: RawMeal): RecipeIngredient[] {
  const ingredients: RecipeIngredient[] = [];

  for (let i = 1; i <= INGREDIENTS_COUNT; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    const measure = meal[`strMeasure${i}`]?.trim();

    if (name) ingredients.push({ name, measure: measure ?? "" });
  }

  return ingredients;
}

export function normalizeMealBasics(meal: RawMeal): MealBasics {
  return {
    id: meal.idMeal,
    name: meal.strMeal,
    thumb: meal.strMealThumb || "",
    category: meal.strCategory || "",
    area: meal.strCountry || meal.strArea || "",
  };
}

export function normalizeMealDetails(meal: RawMeal): Meal {
  return {
    ...normalizeMealBasics(meal),
    ingredients: parseMealIngredients(meal),
    instructions: parseMealInstructions(meal.strInstructions || ""),
    tags: meal.strTags
      ? meal.strTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [],
    source: meal.strSource || null,
    youtube: meal.strYoutube || null,
  };
}

export function normalizeCategory(category: RawCategory): Category {
  return {
    id: category.idCategory || "",
    name: category.strCategory || "",
    thumb: category.strCategoryThumb || "",
    description: (category.strCategoryDescription ?? "")
      .replace(/\[\d+\]/g, "")
      .trim(),
  };
}

export function normalizeIngredient(ingredient: RawIngredient): IngredientItem {
  return {
    id: ingredient.idIngredient,
    name: ingredient.strIngredient,
    description: ingredient.strDescription || "",
    thumb: ingredient.strThumb,
    type: ingredient.strType || "",
  };
}
