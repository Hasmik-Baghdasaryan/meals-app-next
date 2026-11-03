export interface RawMeal {
  idMeal: string;
  strMeal: string;
  strMealAlternate?: string | null;
  strCategory?: string | null;
  strArea?: string | null;
  strCountry?: string | null;
  strInstructions?: string | null;
  strMealThumb?: string | null;
  strTags?: string | null;
  strYoutube?: string | null;
  strSource?: string | null;
  strImageSource?: string | null;
  strCreativeCommonsConfirmed?: string | null;
  dateModified?: string | null;
  [key: `strIngredient${number}`]: string | null | undefined;
  [key: `strMeasure${number}`]: string | null | undefined;
}

export interface RawIngredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strThumb: string | null;
  strType: string | null;
}

export type MealBasics = {
  id: string;
  name: string;
  thumb: string;
  category: string;
  area: string;
};

export type RecipeIngredient = {
  name: string;
  measure: string;
};

export type Meal = MealBasics & {
  ingredients: RecipeIngredient[];
  instructions: string[];
  tags: string[];
  source: string | null;
  youtube: string | null;
};

export type IngredientItem = {
  id: string;
  name: string;
  description: string;
  thumb: string | null;
  type: string | null;
};
