"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { buttonClasses } from "@/app/styles";

type SearchProps = { placeholder?: string; target?: string };

export default function Search({
  placeholder = "Search recipes, ingredients, or cuisines...",
  target,
}: SearchProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push, replace } = useRouter();

  const updateQuery = (query: string) => {
    const params = target
      ? new URLSearchParams()
      : new URLSearchParams(searchParams);
    params.delete("page");

    if (query.trim()) {
      params.set("query", query.trim());
    } else {
      params.delete("query");
    }

    const base = target ?? pathname;
    const qs = params.toString();
    const url = qs ? `${base}?${qs}` : base;

    if (target) {
      push(url);
    } else {
      replace(url);
    }
  };

  const handleChange = useDebouncedCallback(updateQuery, 300);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleChange.cancel();
    const value = new FormData(e.currentTarget).get("query");
    updateQuery(typeof value === "string" ? value : "");
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center gap-3"
    >
      <input
        type="search"
        name="query"
        aria-label={placeholder.replace(/\.+$/, "")}
        placeholder={placeholder}
        defaultValue={searchParams.get("query") ?? ""}
        onChange={(e) => {
          if (!target) handleChange(e.target.value);
        }}
        className="h-12 min-w-0 flex-1 rounded-full border-[1.5px] border-accent-300 bg-neutral-50 px-5 text-neutral-900 shadow-[0_2px_8px_rgb(43_29_20/0.04)] transition placeholder:text-neutral-600/70 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15 focus:outline-none"
        key={searchParams.get("query") ?? ""}
      />
      {target && (
        <button type="submit" className={buttonClasses("primary")}>
          Search
        </button>
      )}
    </form>
  );
}
