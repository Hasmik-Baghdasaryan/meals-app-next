import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ERROR_MESSAGE } from "@/app/_constants";
import { getMealByIngredient } from "@/app/_lib/meals";
import { paginate } from "@/app/_helpers/pagination";
import { safeDecode } from "@/app/_lib/params";
import type { MealBasics } from "@/app/_types/meals";

import MealGrid from "@/app/_components/shared/MealGrid";
import Message from "@/app/_components/shared/Message";
import Pagination from "@/app/_components/shared/Pagination";
import { SearchSkeleton } from "@/app/_components/shared/Loading";

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
      <Suspense fallback={<SearchSkeleton />}>
        <PageContent searchParams={searchParams} params={params} />
      </Suspense>
    </section>
  );
}

async function PageContent({ searchParams, params }: IngredientPageProps) {
  const { name } = await params;
  const ingredientName = safeDecode(name);
  if (!ingredientName) notFound();

  const { page = "1" } = await searchParams;

  let meals: MealBasics[];
  try {
    meals = await getMealByIngredient(ingredientName);
  } catch {
    return <Message type="error" text={ERROR_MESSAGE} />;
  }

  if (meals.length === 0) notFound();

  const { items, totalPages, currentPage } = paginate(meals, page);

  return (
    <>
      <h1 className="mb-6 text-3xl font-bold text-neutral-900 capitalize">
        {ingredientName}
      </h1>
      <MealGrid meals={items} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        basePath={`/ingredients/${encodeURIComponent(ingredientName)}`}
      />
    </>
  );
}
