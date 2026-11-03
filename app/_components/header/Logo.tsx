import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex gap-2 items-center">
      <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      <span className="text-xl font-semibold text-primary-500">
        Cozy Kitchen
      </span>
    </Link>
  );
}
