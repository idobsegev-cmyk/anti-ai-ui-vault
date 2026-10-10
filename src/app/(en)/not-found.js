import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col justify-center px-5 pt-24 md:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-3">404</p>
      <h1 className="mt-2 text-[clamp(2.6rem,7vw,6rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
        This page was <span className="font-serif font-normal italic text-terracotta">hand-deleted.</span>
      </h1>
      <Link href="/#vault" className="focus-ring mt-8 w-fit rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper">Back to the specimens</Link>
    </section>
  );
}
