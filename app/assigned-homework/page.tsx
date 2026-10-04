"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpenCheck,
  GraduationCap,
} from "lucide-react";

import { supabase } from "@/lib/supabaseClient";

export default function AssignedHomeworkPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      }
    }

    void checkUser();
  }, [router]);

  return (
    <main className="min-h-screen bg-[#F7F8FA] font-sans text-[#1D1E24]">
      <header className="border-b border-[#E7E7EA] bg-white">
        <div className="mx-auto flex min-h-[68px] max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D1E24]"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>

          <div className="flex items-center gap-2">
            <img
              src="/logo/favicon.png"
              alt=""
              className="h-7 w-7 rounded-full object-cover"
            />
            <span className="text-sm font-semibold text-[#0B1739]">GAHN AI</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="max-w-[720px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#D9E5F7] bg-white px-3 py-1.5 text-xs font-medium text-[#0B5CFF]">
            <GraduationCap className="h-3.5 w-3.5" />
            School Help
          </span>
          <h1 className="mt-5 text-[34px] font-semibold leading-[1.12] tracking-[-0.035em] text-[#1D1E24] sm:text-[40px]">
            Assigned homework
          </h1>
          <p className="mt-4 max-w-[650px] text-[15px] leading-7 text-[#34363D]">
            This page is reserved for independent practice assigned by a School Help AI instructor after a lesson. Notes remain available across every learning world.
          </p>
        </div>

        <section className="mt-9 rounded-[16px] border border-[#E1E3E8] bg-white p-7 shadow-[0_10px_30px_rgba(29,30,36,0.04)] sm:p-9">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#EEF4FF] text-[#0B5CFF]">
            <BookOpenCheck className="h-5 w-5" />
          </div>

          <h2 className="mt-5 text-xl font-semibold text-[#1D1E24]">
            No assigned homework yet
          </h2>
          <p className="mt-2 max-w-[620px] text-sm leading-6 text-[#4F515A]">
            When a School Help instructor assigns practice after a session, it will appear here with the subject, task, and what to review. GAHN will not invent assignments before that system saves them.
          </p>

          <Link
            href="/learn/school-help"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-[#0B5CFF] px-5 text-sm font-semibold text-white transition hover:bg-[#094FD9]"
          >
            Open School Help
          </Link>
        </section>
      </div>
    </main>
  );
}
