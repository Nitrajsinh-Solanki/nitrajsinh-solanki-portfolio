import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-32 text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="mt-4 text-[#555963]">
        <Link href="/projects" className="underline underline-offset-4">
          Browse projects
        </Link>
        {" "}or{" "}
        <Link href="/" className="underline underline-offset-4">
          go home
        </Link>
        .
      </p>
    </main>
  );
}
