import { Suspense } from "react";
import { getMealByName } from "@/app/_lib/meals";
import { MealBasics } from "@/app/_types/meals";
import { paginate } from "@/app/_helpers/pagination";
import Search from "@/app/_components/shared/Search";
import Message from "@/app/_components/shared/Message";
import MealGrid from "@/app/_components/shared/MealGrid";
import Pagination from "@/app/_components/shared/Pagination";
import { ERROR_MESSAGE } from "@/app/_constants";
import { GridSkeleton } from "@/app/_components/shared/Loading";

type SearchPageProps = {
  searchParams: Promise<{ query?: string; page?: string }>;
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <section className="w-full py-6">
      <Suspense fallback={<GridSkeleton />}>
        <SearchDetails searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function SearchDetails({ searchParams }: SearchPageProps) {
  const { query = "", page = "1" } = await searchParams;
  const term = typeof query === "string" ? query.trim() : "";

  if (!term) {
    return (
      <>
        <Search target="/search" />
        <Message text="Type something to search recipes." type="info" />
      </>
    );
  }

  let meals: MealBasics[];
  try {
    meals = await getMealByName(term.toLocaleLowerCase());
  } catch {
    return <Message text={ERROR_MESSAGE} type="error" />;
  }

  const { items: pageMeals, totalPages, currentPage } = paginate(meals, page);

  if (!meals.length) {
    return (
      <>
        <Search target="/search" />
        <Message text={`No recipes found for “${term}”.`} type="info" />
      </>
    );
  }

  return (
    <>
      <Search target="/search" />
      <h1 className="my-6 text-3xl font-bold text-neutral-900">
        Results for “{term}”
      </h1>
      <MealGrid meals={pageMeals} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        basePath="/search"
        query={{ query: term }}
      />
    </>
  );
}
