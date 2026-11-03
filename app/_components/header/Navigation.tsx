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
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <nav aria-label="Main" className="text-[16px]">
      <ul className="flex gap-4">
        {routes.map((route) => (
          <li key={route.name}>
            <Link
              href={route.path}
              aria-current={isActive(route.path) ? "page" : undefined}
              className={
                isActive(route.path)
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
