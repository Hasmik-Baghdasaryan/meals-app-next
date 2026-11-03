import { GRID_CLASSES } from "@/app/styles";
import Card from "./Card";
import CardLink from "./CardLink";

export type CardGridItem = {
  id: string;
  href: string;
  title: string;
  src: string | null;
  description?: string;
  fit?: "contain" | "cover";
};

type CardGridProps = {
  items: CardGridItem[];
  className?: string;
};

export default function CardGrid({ items, className = "" }: CardGridProps) {
  return (
    <ul className={`${GRID_CLASSES} ${className}`}>
      {items.map(({ id, href, ...card }) => (
        <li key={id}>
          <CardLink path={href}>
            <Card {...card} />
          </CardLink>
        </li>
      ))}
    </ul>
  );
}
