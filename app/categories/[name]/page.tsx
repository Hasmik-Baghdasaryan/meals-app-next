import { notFound } from "next/navigation";
import { Suspense } from "react";

import { paginate } from "@/app/_helpers/pagination";
import { getMealByCategory } from "@/app/_lib/meals";

import MealGrid from "@/app/_components/shared/MealGrid";
import Message from "@/app/_components/shared/Message";
import Pagination from "@/app/_components/shared/Pagination";
import { ERROR_MESSAGE } from "@/app/_constants";
import { safeDecode } from "@/app/_lib/params";
import { getCategories } from "@/app/_lib/categories";

type CategoryPageProps = {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  return {
    title: `${name.charAt(0).toUpperCase()}${name.slice(1)}`,
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ name: c.name.toLowerCase() }));
}

export default function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <p className="py-10 text-center text-neutral-600">Loading recipes...</p>
      }
    >
      <CategoryContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CategoryContent({ params, searchParams }: CategoryPageProps) {
  const { name } = await params;
  const { page = "1" } = await searchParams;
  const categoryName = safeDecode(name);

  if (!categoryName) notFound();

  let meals;
  try {
    meals = await getMealByCategory(categoryName);
  } catch {
    return <Message text={ERROR_MESSAGE} type="error" />;
  }

  if (!meals || !meals.length) notFound();

  const { items: pageMeals, totalPages, currentPage } = paginate(meals, page);

  return (
    <section className="w-full py-6">
      <h1 className="mb-6 text-3xl font-bold text-neutral-900 capitalize">
        {categoryName}
      </h1>
      <MealGrid meals={pageMeals} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        basePath={`/categories/${encodeURIComponent(categoryName)}`}
      />
    </section>
  );
}
