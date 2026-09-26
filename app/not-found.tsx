import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { buttonClass } from "@/lib/ui";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-semibold text-brand-700">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-3 text-slate-600">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/builder" className={buttonClass("primary")}>
          Create my CV
        </Link>
        <Link href="/" className={buttonClass("secondary")}>
          Go to the homepage
        </Link>
      </div>
      </main>
      <SiteFooter />
    </>
  );
}
