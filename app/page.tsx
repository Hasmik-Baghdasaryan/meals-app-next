import { Suspense } from "react";
import {
  RecipeSkeleton,
  SearchSkeleton,
} from "@/app/_components/shared/Loading";
import RandomMeal from "@/app/_components/randomMeal/RandomMeal";
import SearchForm from "./_components/search/SearchForm";

export default function Home() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-[clamp(32px,5vw,52px)] leading-[1.1] font-bold text-balance text-neutral-900">
          What are we cooking <span className="text-primary-500">tonight?</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[60ch] text-neutral-600">
          Search thousands of recipes, or let us pick one for you.
        </p>
      </div>
      <Suspense fallback={<SearchSkeleton />}>
        <SearchForm target="/search" />
      </Suspense>

      <Suspense fallback={<RecipeSkeleton />}>
        <RandomMeal />
      </Suspense>
    </section>
  );
}
