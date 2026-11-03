export type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] px-6 font-bold no-underline " +
  "transition-[background-color,color,transform] duration-150 ease-in-out " +
  "active:scale-[0.98] " +
  "disabled:cursor-not-allowed disabled:border-transparent disabled:bg-accent-200 disabled:text-neutral-600 disabled:active:scale-100 " +
  "aria-disabled:pointer-events-none aria-disabled:border-transparent aria-disabled:bg-accent-200 aria-disabled:text-neutral-600 " +
  "aria-busy:cursor-progress";

const variants: Record<Variant, string> = {
  primary:
    "border-primary-500 bg-primary-500 text-white hover:border-primary-700 hover:bg-primary-700 disabled:hover:bg-accent-200",
  secondary:
    "border-neutral-900 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-accent-50 disabled:hover:bg-accent-200 disabled:hover:text-neutral-600",
};

export function buttonClasses(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export const GRID_CLASSES =
  "grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
export const CARD_LINK_CLASSES =
  "group flex h-full flex-col overflow-hidden rounded-2xl border …"; // your existing string
