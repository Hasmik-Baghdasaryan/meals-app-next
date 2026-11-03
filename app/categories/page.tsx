import { notFound } from "next/navigation";
import Message from "@/app/_components/shared/Message";
import { getCategories } from "@/app/_lib/categories";
import { Category } from "@/app/_types/category";
import Card from "@/app/_components/shared/Card";
import CardLink from "@/app/_components/shared/CardLink";
import { ERROR_MESSAGE } from "../_constants";

export const metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  let categories: Category[] | null = null;

  try {
    categories = await getCategories();
  } catch {
    return <Message text={ERROR_MESSAGE} type="error" />;
  }

  if (!categories) return notFound();

  return (
    <section className="w-full py-6">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-neutral-900">
          Browse by category
        </h2>
        <p className="mt-2 text-neutral-600">
          Pick a category to explore recipes.
        </p>
      </div>

      <ul className="grid w-full grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => (
          <li key={category.id}>
            <CardLink
              path={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
            >
              <Card title={category.name} src={category.thumb} />
            </CardLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
