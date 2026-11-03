import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getMealDetails } from "@/app/_lib/meals";

import MealDetails from "@/app/_components/meal/MealDetails";
import { Meal } from "@/app/_types/meals";
import Message from "@/app/_components/shared/Message";
import { ERROR_MESSAGE } from "@/app/_constants";
import { RecipeSkeleton } from "@/app/_components/shared/Loading";

type RecipeProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meal = await getMealDetails(id);

  return {
    title: meal ? `${meal.name}` : "",
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
  const { id } = await params;
  let meal: Meal | null = null;

  try {
    meal = await getMealDetails(id);
  } catch {
    return <Message text={ERROR_MESSAGE} />;
  }

  if (!meal) notFound();

  return (
    <article className="mx-auto w-full max-w-6xl px-5 py-10">
      <Link
        href="/"
        className="mb-6 inline-flex text-sm font-bold text-primary-500 hover:text-primary-700"
      >
        ← Back to recipes
      </Link>
      <MealDetails meal={meal} />
    </article>
  );
}
