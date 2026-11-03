import { MealBasics, Meal } from "@/app/_types/meals";
import { mealImageUrl } from "@/app/_helpers/image";

import Card from "@/app/_components/shared/Card";
import CardLink from "./CardLink";

type MealGridProps = {
  meals: Meal[] | MealBasics[];
};

export default function MealGrid({ meals }: MealGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {meals.map((meal) => (
        <li key={meal.id}>
          <CardLink path={`/recipes/${meal.id}`}>
            <Card
              src={mealImageUrl(meal.thumb || "", "medium")}
              title={meal.name}
              description={meal.area || ""}
              fit="cover"
            />
          </CardLink>
        </li>
      ))}
    </ul>
  );
}
