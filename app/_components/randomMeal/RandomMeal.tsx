import { getRandomMeal } from "@/app/_lib/meals";
import { Meal } from "@/app/_types/meals";
import { ERROR_MESSAGE, NOTFOUND_MESSAGE } from "@/app/_constants";
import Message from "@/app/_components/shared/Message";
import RandomMealView from "./RandomMealView";

export default async function RandomMeal() {
  let meal: Meal | null = null;
  try {
    meal = await getRandomMeal();
  } catch {
    return <Message text={ERROR_MESSAGE} type="error" />;
  }

  if (!meal) return <Message text={NOTFOUND_MESSAGE} type="info" />;

  return (
    <section className="mx-auto px-5 py-10">
      <div className="mx-auto mb-8 max-w-[60ch] text-center">
        <h2 className="text-2xl font-bold text-balance text-neutral-900">
          Not sure what to cook tonight?
        </h2>
        <p className="mt-2 leading-normal text-neutral-600">
          Here’s our pick for you. Not feeling it? Get another one.
        </p>
      </div>
      <RandomMealView initialMeal={meal} />
    </section>
  );
}
