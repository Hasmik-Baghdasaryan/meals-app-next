import { getCategories } from "@/app/_lib/categories";
import Card from "@/app/_components/shared/Card";
import CardLink from "@/app/_components/shared/CardLink";
import { GRID_CLASSES } from "@/app/styles";

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

      <ul className={GRID_CLASSES}>
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
