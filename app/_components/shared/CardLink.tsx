import Link from "next/link";

type CardLinkProps = {
  children: React.ReactNode;
  path: string;
};

export default function CardLink({ path, children }: CardLinkProps) {
  return (
    <Link
      href={path}
      className="group block h-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50 transition duration-150 hover:-translate-y-1 hover:border-accent-300 hover:shadow-[0_8px_24px_rgb(43_29_20/0.08)] focus-visible:ring-4 focus-visible:ring-primary-500/20 focus-visible:outline-none"
    >
      {children}
    </Link>
  );
}
