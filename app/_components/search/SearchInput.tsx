type SearchInputProps = React.ComponentProps<"input"> & { placeholder: string };

export default function SearchInput({
  placeholder,
  ...props
}: SearchInputProps) {
  return (
    <input
      type="search"
      name="query"
      aria-label={placeholder.replace(/\.+$/, "")}
      placeholder={placeholder}
      className="h-12 min-w-0 flex-1 rounded-full border-[1.5px] border-accent-300 bg-neutral-50 px-5 text-neutral-900 shadow-[0_2px_8px_rgb(43_29_20/0.04)] transition placeholder:text-neutral-600/70 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15 focus:outline-none"
      {...props}
    />
  );
}
