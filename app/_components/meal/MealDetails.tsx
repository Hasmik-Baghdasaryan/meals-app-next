import { Meal } from "@/app/_types/meals";

import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import MealImage from "./MealImage";
import MealInfo from "./MealInfo";

type MealDetailsProps = {
  meal: Meal;
};

export default function MealDetails({ meal }: MealDetailsProps) {
  return (
    <>
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-12">
        <MealImage
          meal={meal}
          priority
          sizes="(min-width: 768px) 45vw, 100vw"
          className="w-full rounded-3xl shadow-[0_8px_30px_rgb(43_29_20/0.1)]"
        />
        <MealInfo meal={meal} showActions={true} headingAs="h1" />
      </div>
      <div className="mt-14 grid items-start gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-12">
        <div className="md:sticky md:top-6">
          <Ingredients ingredients={meal.ingredients} />
        </div>
        <Instructions instructions={meal.instructions} />
      </div>
    </>
  );
}
