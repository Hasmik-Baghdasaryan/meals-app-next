import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getIngredients, getMealByIngredient } from "@/app/_lib/meals";
import { paginate } from "@/app/_helpers/pagination";
import { safeDecode } from "@/app/_lib/params";
import { GridSkeleton } from "@/app/_components/shared/Loading";

import MealGrid from "@/app/_components/shared/MealGrid";
import Pagination from "@/app/_components/shared/Pagination";

type IngredientPageProps = {
  searchParams: Promise<{ page?: string }>;
  params: Promise<{ name: string }>;
};

export async function generateMetadata({
  params,
}: Pick<IngredientPageProps, "params">): Promise<Metadata> {
  const name = safeDecode((await params).name);
  if (!name) return { title: "Not found" };

  return { title: name.charAt(0).toUpperCase() + name.slice(1) };
}

export default function IngredientPage({
  searchParams,
  params,
}: IngredientPageProps) {
  return (
    <section>
      <Suspense fallback={<GridSkeleton />}>
        <PageContent searchParams={searchParams} params={params} />
      </Suspense>
    </section>
  );
}

async function PageContent({ searchParams, params }: IngredientPageProps) {
  const { name } = await params;
  const ingredientName = safeDecode(name);
  const ingredients = await getIngredients();
  const { page = "1" } = await searchParams;

  const ingredient = ingredients.find(
    (i) => i.name.toLowerCase() === ingredientName?.toLowerCase(),
  );
  if (!ingredient) notFound();

  const meals = await getMealByIngredient(ingredient.name);

  if (!meals.length) notFound();

  const { items, totalPages, currentPage } = paginate(meals, page);

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-neutral-900">
        {ingredient.name}
      </h1>
      <MealGrid meals={items} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        basePath={`/ingredients/${encodeURIComponent(ingredient.name.toLowerCase())}`}
      />
    </>
  );
}
