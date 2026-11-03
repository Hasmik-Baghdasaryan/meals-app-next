import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getIngredientBySlug } from "@/app/_lib/ingredients";
import { getMealByIngredient } from "@/app/_lib/meals";
import { paginate } from "@/app/_helpers/pagination";
import { safeDecode } from "@/app/_lib/params";

import MealGrid from "@/app/_components/shared/MealGrid";
import Message from "@/app/_components/shared/Message";
import Pagination from "@/app/_components/shared/Pagination";
import { GridSkeleton } from "@/app/_components/shared/Loading";

type IngredientPageProps = {
  searchParams: Promise<{ page?: string }>;
  params: Promise<{ name: string }>;
};

async function resolveIngredient(params: IngredientPageProps["params"]) {
  const { name } = await params;
  return getIngredientBySlug(safeDecode(name));
}

export async function generateMetadata({
  params,
}: Pick<IngredientPageProps, "params">): Promise<Metadata> {
  const ingredient = await resolveIngredient(params).catch(() => null);
  if (!ingredient) return { title: "Ingredient not found" };

  return {
    title: ingredient.name,
    description: ingredient.description.slice(0, 155) || undefined,
  };
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
  const ingredient = await resolveIngredient(params);
  if (!ingredient) notFound();

  const { page = "1" } = await searchParams;
  const meals = await getMealByIngredient(ingredient.name);

  const { items, totalPages, currentPage } = paginate(meals, page);

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-neutral-900">
        {ingredient.name}
      </h1>
      {meals.length === 0 ? (
        <Message text={`No recipes use ${ingredient.name} yet.`} />
      ) : (
        <>
          <MealGrid meals={items} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={`/ingredients/${encodeURIComponent(ingredient.name)}`}
          />
        </>
      )}
    </>
  );
}
