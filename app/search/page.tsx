import { Suspense } from "react";
import { getMealByName } from "@/app/_lib/meals";
import { GridSkeleton, SearchSkeleton } from "@/app/_components/shared/Loading";
import Message from "@/app/_components/shared/Message";
import PaginatedMeals from "@/app/_components/shared/PaginatedMeals";
import SearchForm from "@/app/_components/search/SearchForm";

type SearchPageProps = {
  searchParams: Promise<{ query?: string; page?: string }>;
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <section className="w-full py-6">
      <Suspense fallback={<SearchSkeleton />}>
        <SearchForm target="/search" />
      </Suspense>
      <Suspense fallback={<GridSkeleton />}>
        <SearchDetails searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function SearchDetails({ searchParams }: SearchPageProps) {
  const { query = "" } = await searchParams;
  const term = typeof query === "string" ? query.trim().slice(0, 100) : "";

  if (!term) {
    return <Message text="Type something to search recipes." type="info" />;
  }

  const meals = await getMealByName(term.toLowerCase());

  if (!meals.length) {
    return <Message text={`No recipes found for “${term}”.`} type="info" />;
  }

  return (
    <>
      <h1 className="my-6 text-3xl font-bold text-neutral-900">
        Results for “{term}”
      </h1>
      <PaginatedMeals
        meals={meals}
        searchParams={searchParams}
        basePath="/search"
        query={{ query: term }}
      />
    </>
  );
}
