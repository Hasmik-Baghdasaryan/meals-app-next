import Image from "next/image";
import { MealBasics, Meal } from "@/app/_types/meals";

type MealImageProps = {
  meal: MealBasics | Meal;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export default function MealImage({
  meal,
  sizes = "(min-width: 768px) 288px, 100vw",
  priority = false,
  className = "",
}: MealImageProps) {
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-2xl ${className}`}
    >
      {meal.thumb && (
        <Image
          src={meal.thumb}
          alt={meal.name}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
    </div>
  );
}
