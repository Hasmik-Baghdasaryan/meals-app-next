import { MealBasics } from "@/app/_types/meals";
import { mealImageUrl } from "@/app/_helpers/image";

import Card from "@/app/_components/shared/Card";
import CardLink from "./CardLink";
import { GRID_CLASSES } from "@/app/styles";

type MealGridProps = {
  meals: MealBasics[];
};

export default function MealGrid({ meals }: MealGridProps) {
  return (
    <ul className={GRID_CLASSES}>
      {meals.map((meal) => (
        <li key={meal.id}>
          <CardLink path={`/recipes/${meal.id}`}>
            <Card
              src={mealImageUrl(meal.thumb, "medium")}
              title={meal.name}
              description={meal.area}
              fit="cover"
            />
          </CardLink>
        </li>
      ))}
    </ul>
  );
}
