import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getMealDetails } from "@/app/_lib/meals";
import MealDetails from "@/app/_components/meal/MealDetails";
import { RecipeSkeleton } from "@/app/_components/shared/Loading";

type RecipeProps = { params: Promise<{ id: string }> };

const ID_PATTERN = /^\d+$/;

async function resolveMeal(params: RecipeProps["params"]) {
  const { id } = await params;
  return ID_PATTERN.test(id) ? getMealDetails(id) : null;
}

export async function generateMetadata({
  params,
}: RecipeProps): Promise<Metadata> {
  const meal = await resolveMeal(params).catch(() => null);
  if (!meal) return { title: "Recipe not found" };

  const description = `${[meal.category, meal.area].filter(Boolean).join(" · ")} recipe with ${meal.ingredients.length} ingredients.`;
  return {
    title: meal.name,
    description,
    openGraph: {
      title: meal.name,
      description,
      images: meal.thumb ? [meal.thumb] : [],
    },
  };
}

export default function Recipe({ params }: RecipeProps) {
  return (
    <Suspense fallback={<RecipeSkeleton />}>
      <RecipeContent params={params} />
    </Suspense>
  );
}

async function RecipeContent({ params }: RecipeProps) {
  const meal = await resolveMeal(params);
  if (!meal) notFound();

  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-10">
      <Link
        href="/"
        className="mb-6 inline-flex text-sm font-bold text-primary-500 hover:text-primary-700"
      >
        ← Back to home
      </Link>
      <MealDetails meal={meal} />
    </article>
  );
}
