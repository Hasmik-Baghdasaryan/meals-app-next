import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { paginate } from "@/app/_helpers/pagination";
import { getMealByCategory } from "@/app/_lib/meals";
import { safeDecode } from "@/app/_lib/params";
import {
  categorySlug,
  getCategories,
  getCategoryBySlug,
} from "@/app/_lib/categories";

import MealGrid from "@/app/_components/shared/MealGrid";
import Pagination from "@/app/_components/shared/Pagination";
import { GridSkeleton } from "@/app/_components/shared/Loading";

type CategoryPageProps = {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ page?: string }>;
};

async function resolveCategory(params: CategoryPageProps["params"]) {
  const { name } = await params;
  return getCategoryBySlug(safeDecode(name));
}

export async function generateMetadata({
  params,
}: Pick<CategoryPageProps, "params">): Promise<Metadata> {
  const category = await resolveCategory(params);
  if (!category) return { title: "Category not found" };

  return {
    title: category.name,
    description: category.description.slice(0, 155),
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ name: categorySlug(c.name) }));
}

export default function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  return (
    <Suspense fallback={<GridSkeleton />}>
      <CategoryContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function CategoryContent({ params, searchParams }: CategoryPageProps) {
  const category = await resolveCategory(params);
  if (!category) notFound();

  const { page = "1" } = await searchParams;

  const meals = await getMealByCategory(category.name);
  if (!meals.length) notFound();

  const { items, totalPages, currentPage } = paginate(meals, page);

  return (
    <section className="w-full py-6">
      <h1 className="mb-6 text-3xl font-bold text-neutral-900">
        {category.name}
      </h1>
      <MealGrid meals={items} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        basePath={`/categories/${encodeURIComponent(categorySlug(category.name))}`}
      />
    </section>
  );
}
