import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/app/_components/header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Cozy Kitchen",
    default: "Cozy Kitchen",
  },
  description:
    "A clean, easy-to-use web page for discovering delicious recipes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-accent-50 text-neutral-900">
        <Header />
        <main className="mx-auto w-full max-w-7xl flex-1 px-5 sm:px-8 lg:px-12">
          {children}
        </main>
      </body>
    </html>
  );
}
