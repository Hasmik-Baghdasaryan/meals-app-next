"use client";

import { buttonClasses } from "@/app/styles";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-6 py-16 text-center"
    >
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="text-neutral-600">
        We couldn&apos;t load this page. Please try again.
      </p>
      <button
        type="button"
        onClick={reset}
        className={buttonClasses("primary")}
      >
        Try again
      </button>
    </div>
  );
}
