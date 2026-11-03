import { paginate } from "@/app/_helpers/pagination";
import type { MealBasics } from "@/app/_types/meals";
import MealGrid from "./MealGrid";
import Pagination from "./Pagination";

type PaginatedMealsProps = {
  meals: MealBasics[];
  searchParams: Promise<{ page?: string }>;
  basePath: string;
  query?: Record<string, string>;
};

export default async function PaginatedMeals({
  meals,
  searchParams,
  basePath,
  query,
}: PaginatedMealsProps) {
  const { page } = await searchParams;
  const { items, totalPages, currentPage } = paginate(meals, page);

  return (
    <>
      <MealGrid meals={items} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        basePath={basePath}
        query={query}
      />
    </>
  );
}
