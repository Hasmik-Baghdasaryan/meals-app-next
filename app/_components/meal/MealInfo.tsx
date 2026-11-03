import { Meal } from "@/app/_types/meals";
import Actions from "./Actions";

export type MealInfoProps = {
  meal: Meal;
  showActions?: boolean;
  headingAs?: "h1" | "h2";
  children?: React.ReactNode;
};

export default function MealInfo({
  meal,
  showActions = false,
  headingAs: Heading = "h2",
  children,
}: MealInfoProps) {
  const eyebrow = [meal.category, meal.area].filter(Boolean).join(" · ");

  return (
    <div className="flex min-w-0 flex-col gap-4.5">
      {eyebrow && (
        <p className="text-xs font-bold tracking-[0.08em] text-primary-500 uppercase">
          {eyebrow}
        </p>
      )}
      <Heading className="text-[clamp(30px,4vw,46px)] leading-[1.1] font-bold text-balance text-neutral-900">
        {meal.name}
      </Heading>

      {meal.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {meal.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-neutral-200 bg-accent-50 px-3.5 py-1.5 text-sm text-neutral-600"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        {showActions && <Actions youtube={meal.youtube} source={meal.source} />}
        {children}
      </div>
    </div>
  );
}
