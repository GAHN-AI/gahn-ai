"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  FileText,
  FileUp,
  Image as ImageIcon,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";

export default function HomeworkHelpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language, setLanguage] = useState(
    searchParams.get("language") || "English"
  );
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("gahn-language");
    if (!searchParams.get("language") && stored) setLanguage(stored);
  }, [searchParams]);

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function changeLanguage(nextLanguage: string) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("gahn-language", nextLanguage);
  }

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0] ?? null;
    setFile(selected);
  }

  function startTypedHomework(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    router.push(
      `/lesson/custom?world=school-help&section=homework&topic=${encodeURIComponent(
        cleanQuestion
      )}&language=${encodeURIComponent(language)}`
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FBFF] px-5 py-8 font-sans text-[#0B1739] sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/learn/school-help?language=${encodeURIComponent(language)}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#53657D] hover:text-[#1677FF]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to School Help
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector value={language} onChange={changeLanguage} compact />
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo/favicon.png"
                alt="GAHN AI"
                className="h-9 w-9 rounded-full object-cover"
              />
              <span className="hidden text-sm font-extrabold sm:block">GAHN AI</span>
            </Link>
          </div>
        </div>

        <section className="relative mt-8 overflow-hidden rounded-[1.75rem] border border-[#D7E3F2] bg-white p-7 shadow-[0_18px_55px_rgba(11,23,57,0.07)] sm:p-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-[#EAF3FF]"
          />

          <div className="relative max-w-3xl">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#EAF3FF] text-[#1677FF]">
              <FileUp className="h-6 w-6" strokeWidth={1.75} />
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-[#1677FF]">
              Homework Help
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              Bring your real school assignment
            </h1>
            <p className="mt-3 text-sm leading-7 text-[#53657D] sm:text-base">
              Upload a school file, screenshot, or photo of a physical worksheet.
              GAHN&apos;s homework system is designed to explain the instructions,
              teach the concepts, check your work, and guide you without simply
              doing the assignment for you.
            </p>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-[1.5rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_12px_35px_rgba(11,23,57,0.05)] sm:p-8">
            <div className="flex items-center gap-3">
              <FileUp className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
              <div>
                <h2 className="text-xl font-extrabold">Upload homework</h2>
                <p className="mt-1 text-sm text-[#53657D]">
                  PDF, document, image, screenshot, or phone photo.
                </p>
              </div>
            </div>

            {!file ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="cursor-pointer rounded-2xl border border-dashed border-[#BFD7F7] bg-[#F8FBFF] p-6 text-center hover:border-[#1677FF]">
                  <FileText className="mx-auto h-7 w-7 text-[#1677FF]" strokeWidth={1.75} />
                  <p className="mt-3 font-bold">Choose a school file</p>
                  <p className="mt-2 text-xs leading-5 text-[#53657D]">
                    PDF, DOC, DOCX, TXT, PNG, JPG, or WEBP
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,image/png,image/jpeg,image/webp"
                    onChange={selectFile}
                    className="sr-only"
                  />
                </label>

                <label className="cursor-pointer rounded-2xl border border-dashed border-[#BFD7F7] bg-[#F8FBFF] p-6 text-center hover:border-[#1677FF]">
                  <Camera className="mx-auto h-7 w-7 text-[#1677FF]" strokeWidth={1.75} />
                  <p className="mt-3 font-bold">Take a photo</p>
                  <p className="mt-2 text-xs leading-5 text-[#53657D]">
                    Useful for worksheets, textbook pages, and handwritten work.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={selectFile}
                    className="sr-only"
                  />
                </label>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-[#CFE0F5] bg-[#F8FBFF] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-[#1677FF]">
                      {file.type.startsWith("image/") ? (
                        <ImageIcon className="h-5 w-5" />
                      ) : (
                        <FileText className="h-5 w-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-bold">{file.name}</p>
                      <p className="mt-1 text-xs text-[#53657D]">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-[#D7E3F2] bg-white text-[#53657D]"
                    aria-label="Remove selected homework file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="Homework preview"
                    className="mt-5 max-h-[420px] w-full rounded-xl border border-[#D7E3F2] bg-white object-contain"
                  />
                )}

                <div className="mt-5 rounded-xl border border-[#D7E3F2] bg-white p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#1677FF]" />
                    <p className="text-sm leading-6 text-[#53657D]">
                      File selection is ready in the interface. The actual file
                      analysis will be connected to the live AI instructor engine
                      before homework uploads are released to learners.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled
                  className="mt-4 w-full rounded-xl bg-[#DCE6F2] px-5 py-3.5 text-sm font-bold text-[#7A8AA0]"
                >
                  AI File Analysis Not Connected Yet
                </button>
              </div>
            )}
          </div>

          <div className="rounded-[1.5rem] border border-[#D7E3F2] bg-white p-6 shadow-[0_12px_35px_rgba(11,23,57,0.05)] sm:p-8">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[#1677FF]" strokeWidth={1.75} />
              <div>
                <h2 className="text-xl font-extrabold">Or type the problem</h2>
                <p className="mt-1 text-sm text-[#53657D]">
                  Start a lesson immediately if you do not need to upload a file.
                </p>
              </div>
            </div>

            <form onSubmit={startTypedHomework} className="mt-6">
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Example: I do not understand how to solve 3x + 7 = 25. Teach me how it works."
                className="min-h-44 w-full resize-y rounded-xl border border-[#D7E3F2] bg-[#F8FBFF] p-4 text-sm leading-6 text-[#0B1739] outline-none placeholder:text-[#7A8AA0] focus:border-[#1677FF] focus:ring-2 focus:ring-[#1677FF]/15"
              />

              <button
                type="submit"
                disabled={!question.trim()}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#1677FF] px-5 py-3.5 text-sm font-bold text-white hover:bg-[#0F65E8] disabled:cursor-not-allowed disabled:bg-[#B8C7DA]"
              >
                Start Homework Lesson
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 rounded-xl bg-[#F1F7FF] p-4">
              <p className="text-sm font-bold text-[#0B1739]">Designed for learning, not answer dumping</p>
              <p className="mt-2 text-sm leading-6 text-[#53657D]">
                The instructor experience is intended to explain the concept,
                give hints, check attempts, and help the student understand why an
                answer works.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
