import Link from "next/link";

export default function InProgressPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#010817] text-white grid place-items-center px-6">
      <div className="max-w-xl text-center">
        <p className="text-blue-300 font-bold uppercase tracking-widest">
          Coming Soon
        </p>
        <h1 className="mt-4 text-5xl font-black">This page is in progress.</h1>
        <p className="mt-5 text-blue-100/70">
          This section is being built and will be available later.
        </p>
        <Link
          href="/dashboard"
          className="mt-8 inline-flex rounded-2xl bg-white px-6 py-3 font-black text-[#061633]"
        >
          Back to Dashboard
        </Link>
      </div>
    </main>
  );
}