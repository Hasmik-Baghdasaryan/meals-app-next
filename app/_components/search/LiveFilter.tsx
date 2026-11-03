"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import SearchInput from "./SearchInput";

type LiveFilterProps = { placeholder?: string };

export default function LiveFilter({
  placeholder = "Search ingredients...",
}: LiveFilterProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("query") ?? "";

  const update = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    if (value.trim()) params.set("query", value.trim());
    else params.delete("query");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  }, 300);

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        update.flush();
      }}
      className="mx-auto flex w-full max-w-2xl items-center gap-3"
    >
      <SearchInput
        placeholder={placeholder}
        defaultValue={urlQuery}
        onChange={(e) => update(e.target.value)}
      />
    </form>
  );
}
