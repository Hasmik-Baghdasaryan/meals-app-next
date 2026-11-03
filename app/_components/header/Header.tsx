import { Suspense } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="w-full border-b border-neutral-200">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
        <Logo />
        <Suspense fallback={<div aria-hidden className="h-6 w-40" />}>
          <Navigation />
        </Suspense>
      </div>
    </header>
  );
}
