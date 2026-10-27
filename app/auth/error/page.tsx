import Link from "next/link";
export default function AuthErrorPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[#F6F9FF] px-5 py-16 text-[#0B1739]"
    >
      <section className="mx-auto max-w-xl rounded-3xl border bg-white p-8">
        <h1 className="text-2xl font-bold">
          We couldn&apos;t finish signing you in
        </h1>
        <p className="mt-4">
          Your link may have expired, or account setup may be temporarily
          unavailable. Your existing account and saved data have not been
          removed.
        </p>
        <p className="mt-4">
          For an email link, try the browser where you requested it, or request
          a fresh link.
        </p>
        <div className="mt-6 flex gap-5">
          <Link href="/auth/complete" className="font-semibold text-blue-700">
            Retry account setup
          </Link>
          <Link href="/login" className="font-semibold text-blue-700">
            Return to login
          </Link>
        </div>
      </section>
    </main>
  );
}
