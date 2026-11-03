"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { buttonClasses } from "@/app/styles";
import { Meal } from "@/app/_types/meals";

import Message from "@/app/_components/shared/Message";
import MealImage from "@/app/_components/meal/MealImage";
import MealInfo from "@/app/_components/meal/MealInfo";

type RandomMealViewProps = {
  initialMeal: Meal;
};
export default function RandomMealView({ initialMeal }: RandomMealViewProps) {
  const [meal, setMeal] = useState<Meal>(initialMeal);
  const [error, setError] = useState<string>("");

  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    setError("");
    if (isPending) return;

    startTransition(async () => {
      try {
        const res = await fetch("/api/randomMeal");
        if (!res.ok) throw new Error("Request failed");
        const randomMeal: Meal = await res.json();

        if (randomMeal) {
          setMeal(randomMeal);
        } else {
          setError("Meal not found");
        }
      } catch {
        setError("An error occured. Please try later");
      }
    });
  };

  return (
    <>
      <article className="flex flex-col items-center gap-8 rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-[0_8px_30px_rgb(43_29_20/0.06)] md:flex-row md:gap-12 md:p-10">
        <MealImage meal={meal} className="w-full max-w-sm shrink-0 md:w-72" />
        <MealInfo meal={meal}>
          <Link
            href={`/recipes/${meal.id}`}
            className={buttonClasses("secondary")}
          >
            View full recipe
          </Link>
        </MealInfo>
      </article>
      <div className="mt-8 flex flex-col items-center gap-3 text-center">
        <p className="text-neutral-600">
          Not feeling it? Press the button to get another recipe.
        </p>
        <button
          type="button"
          className={buttonClasses("primary")}
          disabled={isPending}
          onClick={handleClick}
        >
          {isPending ? "Fetching a recipe for you..." : "Surprise me"}
        </button>
      </div>
      {error ? <Message type="error" text={error} /> : null}
    </>
  );
}
