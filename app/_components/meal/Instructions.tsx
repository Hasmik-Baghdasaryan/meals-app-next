type InstructionsProps = { instructions: string[] };

export default function Instructions({ instructions }: InstructionsProps) {
  if (!instructions?.length) return null;

  return (
    <section className="min-w-0">
      <h2 className="mb-5 text-2xl font-bold text-neutral-900">Instructions</h2>
      <ol className="flex flex-col gap-6">
        {instructions.map((item, index) => (
          <li key={index} className="flex items-start gap-4">
            <span className="flex size-8 flex-none items-center justify-center rounded-full bg-primary-500 text-sm leading-none font-bold text-neutral-50">
              {index + 1}
            </span>
            <p className="leading-8 text-neutral-900/85 wrap-anywhere">
              {item}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
