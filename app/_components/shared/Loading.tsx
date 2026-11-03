import { PAGE_SIZE } from "@/app/_constants";
import { GRID_CLASSES } from "@/app/styles";

const pulse = "animate-pulse bg-neutral-200 motion-reduce:animate-none";

export function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 py-16 text-neutral-600"
    >
      <span
        aria-hidden
        className="size-8 animate-spin rounded-full border-[3px] border-accent-200 border-t-primary-500 motion-reduce:animate-pulse"
      />
      <span>{label}</span>
    </div>
  );
}

export function GridSkeleton({ count = PAGE_SIZE }: { count?: number }) {
  return (
    <div role="status" aria-busy="true">
      <span className="sr-only">Loading…</span>
      <ul aria-hidden className={`${GRID_CLASSES} my-6`}>
        {Array.from({ length: count }, (_, i) => (
          <li
            key={i}
            className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50"
          >
            <div className={`${pulse} aspect-4/3`} />
            <div className="px-4 pt-3 pb-4">
              <div className={`${pulse} mx-auto h-4 w-3/4 rounded`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div
      aria-hidden
      className={`${pulse} mx-auto h-12 w-full max-w-2xl rounded-full`}
    />
  );
}

export function RecipeSkeleton() {
  return (
    <div
      role="status"
      aria-busy="true"
      className="mx-auto w-full max-w-6xl px-5 py-10"
    >
      <span className="sr-only">Loading recipe…</span>
      <div aria-hidden className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className={`${pulse} aspect-square rounded-3xl`} />
        <div className="space-y-4">
          <div className={`${pulse} h-4 w-32 rounded`} />
          <div className={`${pulse} h-12 w-4/5 rounded`} />
          <div className={`${pulse} h-8 w-1/2 rounded`} />
        </div>
      </div>
    </div>
  );
}
