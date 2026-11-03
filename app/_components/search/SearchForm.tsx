"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { buttonClasses } from "@/app/styles";
import SearchInput from "./SearchInput";

type SearchFormProps = { target: string; placeholder?: string };

export default function SearchForm({
  target,
  placeholder = "Search recipes by name...",
}: SearchFormProps) {
  const router = useRouter();
  const urlQuery = useSearchParams().get("query") ?? "";

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = String(
      new FormData(e.currentTarget).get("query") ?? "",
    ).trim();
    router.push(
      value ? `${target}?${new URLSearchParams({ query: value })}` : target,
    );
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl items-center gap-3"
    >
      <SearchInput placeholder={placeholder} defaultValue={urlQuery} />
      <button type="submit" className={buttonClasses("primary")}>
        Search
      </button>
    </form>
  );
}
