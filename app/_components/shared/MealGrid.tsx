import { MealBasics } from "@/app/_types/meals";
import { mealImageUrl } from "@/app/_helpers/image";
import CardGrid from "./CardGrid";

type MealGridProps = {
  meals: MealBasics[];
};

export default function MealGrid({ meals }: MealGridProps) {
  return (
    <CardGrid
      items={meals.map((m) => ({
        id: m.id,
        href: `/recipes/${m.id}`,
        title: m.name,
        src: mealImageUrl(m.thumb, "medium"),
        description: m.area,
        fit: "cover",
      }))}
    />
  );
}
