import Image from "next/image";

type CardProps = {
  src: string | null;
  title: string;
  description?: string;
  country?: string;
  fit?: "contain" | "cover";
};

export default function Card({
  src,
  title,
  description,
  fit = "contain",
}: CardProps) {
  return (
    <>
      {src && (
        <div className="relative aspect-4/3 shrink-0 overflow-hidden bg-[color-mix(in_srgb,var(--color-accent-200)_45%,var(--color-neutral-50))]">
          <Image
            src={src}
            alt={title}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className={
              fit === "cover"
                ? "object-cover transition duration-300 group-hover:scale-105"
                : "object-contain p-2"
            }
          />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-1.5 px-4 pt-3 pb-4 text-center">
        <h3 className="line-clamp-2 text-base leading-snug font-semibold text-neutral-900 transition-colors group-hover:text-primary-500">
          {title}
        </h3>
        {description ? (
          <p className="mt-auto text-sm text-neutral-600">{description}</p>
        ) : null}
      </div>
    </>
  );
}
