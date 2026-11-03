import { RecipeIngredient } from "@/app/_types/meals";

type IngredientsProps = {
  ingredients: RecipeIngredient[];
};

export default function Ingredients({ ingredients }: IngredientsProps) {
  return (
    <section className="rounded-xl border border-neutral-200 bg-neutral-50 px-6 pt-2 pb-3">
      <h2 className="mb-2 text-2xl font-bold text-neutral-900">Ingredients</h2>
      <ul>
        {ingredients.map((ing, index) => (
          <li
            key={`${ing.name}-${index}`}
            className="flex justify-between gap-4 border-b border-neutral-200 py-2.5 wrap-anywhere last:border-b-0"
          >
            <span>{ing.name}</span>
            <span className="text-right text-neutral-600">{ing.measure}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
