type MessageProps = {
  text: string | null;
  type?: "info" | "error";
};

const styles = {
  info: "bg-neutral-50 text-neutral-600",
  error: "bg-primary-50 text-primary-700",
};

export default function Message({ text, type = "info" }: MessageProps) {
  return (
    <p
      className={`mx-auto my-4 max-w-[60ch] rounded-xl border border-neutral-200 px-3 py-2 text-center leading-normal ${styles[type]}`}
    >
      {text}
    </p>
  );
}
