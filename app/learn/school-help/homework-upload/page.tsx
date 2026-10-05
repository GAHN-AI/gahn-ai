"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, FileText, GraduationCap, Upload } from "lucide-react";

import LanguageSelector from "@/components/LanguageSelector";
import { lessonIdFromParts } from "@/lib/ai/lessonEngine";
import { supabase } from "@/lib/supabaseClient";

const levels = [
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "College",
];

const subjects = [
  "Math",
  "Science",
  "English & Writing",
  "Reading & Study Skills",
  "Other",
];

export default function HomeworkUploadPage() {
  const [language, setLanguage] = useState("English");
  const [subject, setSubject] = useState("Science");
  const [level, setLevel] = useState("Grade 9");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryLanguage = params.get("language");
    const stored = window.localStorage.getItem("gahn-language");

    if (queryLanguage) {
      setLanguage(queryLanguage);
    } else if (stored) {
      setLanguage(stored);
    }
  }, []);

  function changeLanguage(nextLanguage: string) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("gahn-language", nextLanguage);
  }

  const lessonTitle = useMemo(() => {
    const cleanTopic = topic.trim() || "Homework Help";
    return `${level} ${subject}: ${cleanTopic}`;
  }, [level, subject, topic]);

  async function uploadHomework(file: File) {
    setError("");
    setAnalysis("");

    if (!topic.trim()) {
      setError("Tell GAHN what topic the homework is about before uploading.");
      return;
    }

    setUploading(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("You must sign up or log in before uploading homework.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("Files must be 10 MB or smaller.");
        return;
      }

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
      const storagePath = `${user.id}/${Date.now()}-${safeName}`;
      const lessonId = lessonIdFromParts(
        "school-help",
        "homework-upload",
        lessonTitle
      );

      const { error: uploadError } = await supabase.storage
        .from("learning-files")
        .upload(storagePath, file, {
          upsert: false,
          contentType: file.type || undefined,
        });

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      const { data: record, error: recordError } = await supabase
        .from("learning_files")
        .insert({
          user_id: user.id,
          world_slug: "school-help",
          topic: lessonTitle,
          lesson_id: lessonId,
          lesson_title: lessonTitle,
          file_name: file.name,
          mime_type: file.type || null,
          storage_path: storagePath,
          file_size: file.size,
          analysis_status: "uploaded",
        })
        .select("id")
        .single();

      if (recordError) {
        await supabase.storage.from("learning-files").remove([storagePath]);
        setError(recordError.message);
        return;
      }

      setUploadedFileName(file.name);

      const learnerQuestion = [
        `Level: ${level}`,
        `Subject: ${subject}`,
        `Topic: ${topic.trim()}`,
        question.trim()
          ? `What I need help with: ${question.trim()}`
          : "Help me understand what this homework is asking. Read the material, explain the needed idea, and guide me through the questions step by step.",
      ].join("\n");

      const response = await fetch("/api/homework/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileId: record.id,
          learnerQuestion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.uploaded) {
          setAnalysis(
            "Your homework file is saved. The deeper AI analysis will become available when the teaching service is connected for your account."
          );
        } else {
          setError(data.error || "The homework could not be analyzed.");
        }
        return;
      }

      setAnalysis(
        data.analysis ||
          "Your homework was analyzed, but no explanation was returned."
      );
    } catch {
      setError("The homework could not be uploaded right now.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F8FA] font-sans text-black">
      <header className="border-b border-[#E7E7EA] bg-white">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href={`/learn/school-help?language=${encodeURIComponent(language)}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D1E24]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to School Help
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSelector
              value={language}
              onChange={changeLanguage}
              compact
            />
            <Link href="/" className="font-semibold text-[#1D1E24]">
              GAHN AI
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-[#E7E7EA] bg-white text-[#1D1E24]">
        <div className="mx-auto max-w-[1180px] px-5 py-9 sm:px-8 sm:py-12">
          <div className="flex max-w-4xl items-start gap-5">
            <div className="hidden h-14 w-14 shrink-0 place-items-center rounded-[12px] bg-[#EAF2FF] text-[#0B5CFF] sm:grid">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0B5CFF]">
                School Help
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-[#1D1E24] sm:text-5xl">
                Homework Upload
              </h1>
              <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-[#34363D]">
                Upload the exact homework your teacher gave you. Tell GAHN the
                subject, grade, topic, and what is confusing so the AI can read
                the material and guide you through it.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1180px] gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-[16px] border border-[#E1E3E8] bg-white p-6 shadow-[0_16px_40px_rgba(11,23,57,0.05)] sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0B5CFF]">
            Tell GAHN what you are working on
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-[#1D1E24]">
            Add the homework context first
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label>
              <span className="text-sm font-semibold text-[#1D1E24]">Subject</span>
              <select
                value={subject}
                onChange={(event) => setSubject(event.target.value)}
                className="mt-2 h-12 w-full rounded-[12px] border border-[#C9D6E5] bg-white px-3 text-sm font-semibold text-[#1D1E24] outline-none focus:border-[#1677FF]"
              >
                {subjects.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label>
              <span className="text-sm font-semibold text-[#1D1E24]">Level</span>
              <select
                value={level}
                onChange={(event) => setLevel(event.target.value)}
                className="mt-2 h-12 w-full rounded-[12px] border border-[#C9D6E5] bg-white px-3 text-sm font-semibold text-[#1D1E24] outline-none focus:border-[#1677FF]"
              >
                {levels.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-[#1D1E24]">
              What topic is the homework about?
            </span>
            <input
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              placeholder="Example: Ecology, linear equations, essay evidence"
              className="mt-2 h-12 w-full rounded-[12px] border border-[#C9D6E5] bg-white px-4 text-sm font-semibold text-[#1D1E24] outline-none focus:border-[#1677FF]"
            />
          </label>

          <label className="mt-5 block">
            <span className="text-sm font-semibold text-[#1D1E24]">
              What do you need help understanding?
            </span>
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows={5}
              placeholder="Example: I do not understand the paragraph about food webs or questions 3 and 4."
              className="mt-2 w-full resize-none rounded-[12px] border border-[#C9D6E5] bg-white px-4 py-3 text-sm font-medium leading-6 text-[#1D1E24] outline-none focus:border-[#1677FF]"
            />
          </label>

          <label className="mt-5 flex cursor-pointer items-center justify-center gap-2 rounded-[12px] border border-dashed border-[#8EB8EB] bg-[#EEF4FF] px-5 py-4 text-sm font-semibold text-[#1D1E24] hover:bg-[#DDEEFF]">
            <Upload className="h-4 w-4 text-[#0B5CFF]" />
            {uploading ? "Uploading and reading homework..." : "Choose homework file"}
            <input
              type="file"
              disabled={uploading}
              accept=".jpg,.jpeg,.png,.webp,.pdf,.txt,.doc,.docx,image/*,application/pdf,text/plain"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void uploadHomework(file);
                event.currentTarget.value = "";
              }}
            />
          </label>

          <p className="mt-3 text-xs font-medium leading-5 text-[#65758A]">
            Photos, screenshots, PDFs, text files, and Word documents are
            supported up to 10 MB.
          </p>

          {error && (
            <div className="mt-5 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700">
              {error}
              {error.includes("sign up") && (
                <span>
                  {" "}
                  <Link href="/signup" className="font-semibold underline">
                    Sign up
                  </Link>{" "}
                  or{" "}
                  <Link href="/login" className="font-semibold underline">
                    log in
                  </Link>
                  .
                </span>
              )}
            </div>
          )}
        </section>

        <section className="rounded-[16px] border border-[#E1E3E8] bg-white p-6 shadow-[0_16px_40px_rgba(11,23,57,0.05)] sm:p-7">
          <div className="flex items-start gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-[#EEF4FF] text-[#0B5CFF]">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#0B5CFF]">
                Homework workspace
              </p>
              <h2 className="mt-1 text-2xl font-semibold text-[#1D1E24]">
                GAHN reads the material with you
              </h2>
              <p className="mt-2 text-sm font-medium leading-7 text-[#52647C]">
                The goal is to help you understand the assignment, paragraphs,
                questions, and ideas instead of simply handing you answers.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[12px] bg-[#F7F8FA] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#65758A]">
              Example
            </p>
            <p className="mt-2 text-sm font-semibold leading-7 text-[#24344D]">
              Grade 9 Science, Ecology. Upload the worksheet or reading, then
              ask GAHN to explain the ecology paragraph and guide you through
              the questions you do not understand.
            </p>
          </div>

          {uploadedFileName && (
            <div className="mt-5 rounded-[12px] border border-[#E1E3E8] bg-[#EEF4FF] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#0B5CFF]">
                Uploaded file
              </p>
              <p className="mt-1 text-sm font-semibold text-[#1D1E24]">
                {uploadedFileName}
              </p>
            </div>
          )}

          {analysis ? (
            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#0B5CFF]">
                GAHN explanation
              </p>
              <div className="mt-3 max-h-[520px] overflow-y-auto whitespace-pre-wrap rounded-[12px] border border-[#E1E3E8] bg-[#F8FAFD] p-5 text-sm font-medium leading-7 text-[#24344D]">
                {analysis}
              </div>
            </div>
          ) : (
            <div className="mt-5 rounded-[12px] border border-dashed border-[#C9D6E5] px-5 py-10 text-center">
              <p className="text-sm font-semibold text-[#1D1E24]">
                Your homework explanation will appear here
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-[#65758A]">
                Add the subject and topic, then upload the homework file.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
