import { Suspense } from "react";

import { getIngredients } from "@/app/_lib/ingredients";
import { paginate } from "@/app/_helpers/pagination";
import { GridSkeleton, SearchSkeleton } from "@/app/_components/shared/Loading";

import Message from "@/app/_components/shared/Message";
import Pagination from "@/app/_components/shared/Pagination";
import CardGrid from "../_components/shared/CardGrid";
import LiveFilter from "../_components/search/LiveFilter";

type IngredientsPageProps = {
  searchParams: Promise<{ page?: string; query?: string }>;
};

export const metadata = {
  title: "Ingredients",
};

export default function IngredientsPage({
  searchParams,
}: IngredientsPageProps) {
  return (
    <section className="my-8">
      <div className="mb-8 text-center">
        <h1 className="text-[clamp(30px,4.5vw,46px)] leading-[1.1] font-bold text-balance text-neutral-900">
          What&apos;s in your <span className="text-primary-500">fridge?</span>
        </h1>
        <p className="mx-auto mt-3 max-w-[60ch] text-neutral-600">
          Not sure what to cook? Search for an ingredient you already have, and
          we&apos;ll show you the recipes that use it.
        </p>
      </div>
      <Suspense fallback={<SearchSkeleton />}>
        <LiveFilter />
      </Suspense>
      <Suspense fallback={<GridSkeleton />}>
        <PageContent searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function PageContent({ searchParams }: IngredientsPageProps) {
  const { page = "1", query = "" } = await searchParams;
  const term = typeof query === "string" ? query.trim().toLowerCase() : "";

  const ingredients = await getIngredients();

  const filtered = term
    ? ingredients.filter((ing) => ing.name.toLowerCase().includes(term))
    : ingredients;

  if (!filtered.length) {
    return (
      <Message
        text={`No ingredients found for “${query.trim()}”.`}
        type="info"
      />
    );
  }

  const { items, totalPages, currentPage } = paginate(filtered, page, 24);

  return (
    <>
      <CardGrid
        className="my-6"
        items={items.map((i) => ({
          id: i.id,
          href: `/ingredients/${encodeURIComponent(i.name)}`,
          title: i.name,
          src: i.thumb,
        }))}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        basePath="/ingredients"
        query={term ? { query: term } : {}}
      />
    </>
  );
}
