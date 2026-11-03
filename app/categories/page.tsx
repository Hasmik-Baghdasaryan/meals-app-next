import { categorySlug, getCategories } from "@/app/_lib/categories";
import CardGrid from "../_components/shared/CardGrid";

export const metadata = {
  title: "Categories",
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <section className="w-full py-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-neutral-900">
          Browse by category
        </h1>
        <p className="mt-2 text-neutral-600">
          Pick a category to explore recipes.
        </p>
      </div>
      <CardGrid
        items={categories.map((c) => ({
          id: c.id,
          href: `/categories/${encodeURIComponent(categorySlug(c.name))}`,
          title: c.name,
          src: c.thumb,
        }))}
      />
    </section>
  );
}
