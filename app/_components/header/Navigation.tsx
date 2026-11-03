"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Ingredients",
    path: "/ingredients",
  },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="text-[16px]">
      <ul className="flex gap-4">
        {routes.map((route) => (
          <li key={route.name}>
            <Link
              href={route.path}
              className={
                pathname.replace("/", "").toLocaleLowerCase() ===
                route.name.toLocaleLowerCase()
                  ? "text-primary-700 font-semibold underline"
                  : "text-neutral-900"
              }
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
