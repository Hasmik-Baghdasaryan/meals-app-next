import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { generatePagination } from "@/app/_helpers/pagination";

const itemStyle =
  "flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition-colors duration-150 " +
  "border-neutral-200 bg-neutral-50 text-neutral-900 " +
  "hover:border-accent-300 hover:bg-accent-200 " +
  "focus-visible:ring-4 focus-visible:ring-primary-500/20 focus-visible:outline-none " +
  "aria-[current=page]:pointer-events-none aria-[current=page]:border-primary-500 aria-[current=page]:bg-primary-500 aria-[current=page]:text-white " +
  "aria-disabled:pointer-events-none aria-disabled:text-neutral-600/40 aria-disabled:hover:border-neutral-200 aria-disabled:hover:bg-neutral-50";

type PaginationProps = {
  totalPages: number;
  currentPage: number;
  basePath: string;
  query?: Record<string, string>;
};

export default function Pagination({
  totalPages,
  currentPage,
  basePath,
  query = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const href = (page: number) => {
    const params = new URLSearchParams(query);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-center gap-2"
    >
      <Step
        target={currentPage > 1 ? href(currentPage - 1) : null}
        label="Previous page"
      >
        <ArrowLeftIcon className="size-4" aria-hidden />
      </Step>

      <ul className="hidden items-center gap-1 sm:flex">
        {generatePagination(currentPage, totalPages).map((page, i) => (
          <li key={`${page}-${i}`}>
            {page === "..." ? (
              <span className="flex h-10 min-w-10 items-center justify-center text-neutral-600">
                …
              </span>
            ) : (
              <Link
                href={href(page as number)}
                aria-current={page === currentPage ? "page" : undefined}
                className={itemStyle}
              >
                {page}
              </Link>
            )}
          </li>
        ))}
      </ul>

      <p className="px-2 text-sm text-neutral-600 sm:hidden">
        Page {currentPage} of {totalPages}
      </p>

      <Step
        target={currentPage < totalPages ? href(currentPage + 1) : null}
        label="Next page"
      >
        <ArrowRightIcon className="size-4" aria-hidden />
      </Step>
    </nav>
  );
}

function Step({
  target,
  label,
  children,
}: {
  target: string | null;
  label: string;
  children: React.ReactNode;
}) {
  return target ? (
    <Link href={target} aria-label={label} className={itemStyle}>
      {children}
    </Link>
  ) : (
    <span aria-hidden="true" aria-disabled="true" className={itemStyle}>
      {children}
    </span>
  );
}
