import { Suspense } from "react";

import { getIngredients } from "@/app/_lib/meals";
import { paginate } from "@/app/_helpers/pagination";
import { SearchSkeleton } from "@/app/_components/shared/Loading";

import Card from "@/app/_components/shared/Card";
import Message from "@/app/_components/shared/Message";
import Search from "@/app/_components/shared/Search";
import Pagination from "@/app/_components/shared/Pagination";
import CardLink from "@/app/_components/shared/CardLink";
import { GridSkeleton } from "@/app/_components/shared/Loading";
import { GRID_CLASSES } from "../styles";

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
    <>
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
        <Search placeholder="Search ingredients..." />
      </Suspense>
      <Suspense fallback={<GridSkeleton />}>
        <PageContent searchParams={searchParams} />
      </Suspense>
    </>
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
      <ul className={`${GRID_CLASSES} my-6`}>
        {items.map((ingr) => (
          <li key={ingr.id}>
            <CardLink
              path={`/ingredients/${encodeURIComponent(ingr.name.toLocaleLowerCase())}`}
            >
              <Card src={ingr.thumb} title={ingr.name} />
            </CardLink>
          </li>
        ))}
      </ul>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        basePath="/ingredients"
        query={term ? { query: term } : {}}
      />
    </>
  );
}
